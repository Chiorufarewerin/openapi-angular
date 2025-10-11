import type { ValueEqualityFn } from '@angular/core';
import { assertInInjectionContext, inject, Injector } from '@angular/core';
import type { OpenapiClientOptions } from 'openapi-angular';
import type { HttpMethod } from 'openapi-typescript-helpers';

import { OpenapiResourceImpl } from './classes/resource';
import type { MethodFor } from './types/method';
import type { OpenapiResourceOptions } from './types/options';
import type { PathFor } from './types/path';
import type { OpenapiResourceRef } from './types/ref';
import type { ResourceRequest, ResourceResponseType } from './types/request';
import type { RequestFor } from './types/util';

export function makeOpenapiResourceFn<Paths extends Record<string, Record<HttpMethod, {}>>>(
  responseType: ResourceResponseType,
  openapiOptions: OpenapiClientOptions | undefined,
) {
  return function openapiResource<
    Method extends MethodFor<Paths>,
    Path extends PathFor<Paths, Method>,
    Resp = unknown,
    TResult = Resp,
  >(
    request: () => RequestFor<Paths, Method, Path> | undefined,
    options?: OpenapiResourceOptions<TResult, Response>,
  ): OpenapiResourceRef<TResult | undefined> {
    if (ngDevMode && !options?.injector && !openapiOptions?.injector) {
      assertInInjectionContext(openapiResource);
    }
    const injector = options?.injector ?? openapiOptions?.injector ?? inject(Injector);
    return new OpenapiResourceImpl<TResult | undefined>(
      injector,
      () => normalizeRequest(request, responseType),
      options?.defaultValue,
      options?.parse as (value: unknown) => TResult,
      options?.equal as ValueEqualityFn<unknown>,
      openapiOptions,
    );
  };
}

function normalizeRequest<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Method extends MethodFor<Paths>,
  Path extends PathFor<Paths, Method>,
>(
  request:
    | (() => RequestFor<Paths, Method, Path> | undefined)
    | RequestFor<Paths, Method, Path>
    | undefined,
  responseType: ResourceResponseType,
): ResourceRequest | undefined {
  const unwrappedRequest = typeof request === 'function' ? request() : request;
  if (unwrappedRequest === undefined) {
    return undefined;
  }
  if (typeof unwrappedRequest === 'string') {
    return { method: 'GET', url: unwrappedRequest, responseType, observe: 'events' };
  }
  if (typeof unwrappedRequest === 'symbol') {
    throw new Error(
      `openapi-angular/resource: Symbols are not allowed: ${String(unwrappedRequest)}`,
    );
  }
  if (typeof unwrappedRequest !== 'object') {
    throw new Error(
      `openapi-angular/resource: unwrappedRequest must be a non-null object ${String(unwrappedRequest)}`,
    );
  }

  const { method, ...rest } = unwrappedRequest;

  return { method: method ?? 'GET', ...rest, responseType, observe: 'events' };
}
