import type { ValueEqualityFn } from '@angular/core';
import { assertInInjectionContext, inject, Injector } from '@angular/core';
import type {
  OpenapiClientOptions,
  OpenapiPathsWithMethod,
  OpenapiRequest,
  OpenapiResponse,
} from 'openapi-angular';
import type { FilterKeys, HttpMethod, MediaType } from 'openapi-typescript-helpers';

import { OpenapiResourceImpl } from './classes/resource';
import type { OpenapiResourceOptions } from './types/options';
import type { OpenapiResourceRef } from './types/ref';
import type { OpenapiResourceRequest, ResourceRequest } from './types/request';
import type { Default, ResponseType } from './types/util';

export function makeOpenapiResourceFn<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Media extends MediaType = MediaType,
>(responseType: ResponseType, openapiOptions: OpenapiClientOptions | undefined) {
  return function openapiResource<
    Method extends Uppercase<HttpMethod> | undefined,
    Path extends OpenapiPathsWithMethod<Paths, Lowercase<Default<Method, 'GET'>>>,
    Request extends OpenapiRequest<FilterKeys<Paths[Path], Lowercase<Default<Method, 'GET'>>>>,
    Response extends OpenapiResponse<
      Paths[Path][Lowercase<Default<Method, 'GET'>>],
      Request,
      Media
    >,
    TResult = Response,
  >(
    request: (() => Path | undefined) | (() => OpenapiResourceRequest<Method> | undefined),
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

function normalizeRequest(
  request:
    | (() => OpenapiResourceRequest<Uppercase<HttpMethod> | undefined> | string | undefined)
    | OpenapiResourceRequest<Uppercase<HttpMethod> | undefined>
    | string
    | undefined,
  responseType: ResponseType,
): ResourceRequest | undefined {
  const unwrappedRequest = typeof request === 'function' ? request() : request;
  if (unwrappedRequest === undefined) {
    return undefined;
  } else if (typeof unwrappedRequest === 'string') {
    return { method: 'GET', url: unwrappedRequest, responseType, observe: 'events' };
  }

  return { method: 'GET', ...unwrappedRequest, responseType, observe: 'events' };
}
