import type { ValueEqualityFn } from '@angular/core';
import { assertInInjectionContext, inject, Injector } from '@angular/core';

import { OpenapiResourceImpl } from './resource';
import type {
  OpenapiResourceOptions,
  OpenapiResourceRef,
  OpenapiResourceRequest,
} from './types/options';
import type { OpenapiResourceFn } from './types/resource';

export const openapiResource: OpenapiResourceFn<any, any> = (() => {
  const jsonFn = makeOpenapiResourceFn<unknown>('json') as OpenapiResourceFn<any, any>;
  jsonFn.arrayBuffer = makeOpenapiResourceFn<ArrayBuffer>('arraybuffer');
  jsonFn.blob = makeOpenapiResourceFn('blob');
  jsonFn.text = makeOpenapiResourceFn('text');
  return jsonFn;
})();

type ResponseType = 'json' | 'text' | 'arraybuffer' | 'blob';
type RawRequestType =
  | (() => string | undefined)
  | (() => OpenapiResourceRequest<any, any, any> | undefined);

function makeOpenapiResourceFn<TRaw>(responseType: ResponseType) {
  return function openapiResource<TResult = TRaw>(
    request: RawRequestType,
    options?: OpenapiResourceOptions<TResult, TRaw>,
  ): OpenapiResourceRef<TResult> {
    if (ngDevMode && !options?.injector) {
      assertInInjectionContext(openapiResource);
    }
    const injector = options?.injector ?? inject(Injector);
    return new OpenapiResourceImpl(
      injector,
      () => normalizeRequest(request, responseType),
      options?.defaultValue,
      options?.parse as (value: unknown) => TResult,
      options?.equal as ValueEqualityFn<unknown>,
    ) as OpenapiResourceRef<TResult>;
  };
}

function normalizeRequest(
  request: RawRequestType,
  responseType: ResponseType,
): OpenapiResourceRequest<any, any, any> | undefined {
  const unwrappedRequest = typeof request === 'function' ? request() : request;
  if (unwrappedRequest === undefined) {
    return undefined;
  } else if (typeof unwrappedRequest === 'string') {
    return { url: unwrappedRequest, responseType };
  }

  return { ...unwrappedRequest, responseType };
}
