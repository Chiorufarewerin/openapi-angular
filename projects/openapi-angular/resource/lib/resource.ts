import type { ValueEqualityFn } from '@angular/core';
import { assertInInjectionContext, inject, Injector } from '@angular/core';
import type { OpenapiClientOptions } from 'openapi-angular';
import type { HttpMethod, MediaType } from 'openapi-typescript-helpers';

import { OpenapiResourceImpl } from './classes/resource';
import type { OpenapiResourceOptions } from './types/options';
import type { OpenapiResourceRef } from './types/ref';
import type {
  OpenapiResourceRequest,
  ResourceRequest,
  ResourceResponseType,
} from './types/request';
import type { PathFor, RequestFor, ResourceHttpMethod, ResponseFor } from './types/util';

export function makeOpenapiResourceFn<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Media extends MediaType = MediaType,
>(responseType: ResourceResponseType, openapiOptions: OpenapiClientOptions | undefined) {
  return function openapiResource<
    Method extends ResourceHttpMethod<Paths>,
    Path extends PathFor<Paths, Method>,
    Request extends RequestFor<Paths, Path, Method>,
    Response extends ResponseFor<Paths, Path, Method, Media, Request>,
    TResult = Response,
  >(
    request: () => (Request & { method?: Method; url: Path }) | Path | undefined,
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
    | (() => OpenapiResourceRequest<any> | string | undefined)
    | OpenapiResourceRequest<any>
    | string
    | undefined,
  responseType: ResourceResponseType,
): ResourceRequest | undefined {
  const unwrappedRequest = typeof request === 'function' ? request() : request;
  if (unwrappedRequest === undefined) {
    return undefined;
  } else if (typeof unwrappedRequest === 'string') {
    return { method: 'GET', url: unwrappedRequest, responseType, observe: 'events' };
  }

  return { method: 'GET', ...unwrappedRequest, responseType, observe: 'events' };
}
