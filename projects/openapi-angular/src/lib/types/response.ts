import type { HttpEvent, HttpResponse } from '@angular/common/http';
import type { MediaType, ResponseObjectMap, SuccessResponse } from 'openapi-typescript-helpers';

export type OpenapiResponse<
  T extends Record<string | number, unknown>,
  Options,
  Media extends MediaType,
> = OpenapiResponseObserve<
  OpenapiResponseType<SuccessResponse<ResponseObjectMap<T>, Media>, Options>,
  Options
>;

export type OpenapiResponseType<T, Options> = Options extends {
  responseType: keyof OpenapiBodyType;
}
  ? OpenapiBodyType<T>[Options['responseType']]
  : T;

export type OpenapiResponseObserve<T, Options> = Options extends {
  observe: keyof OpenapiObserve;
}
  ? OpenapiObserve<T>[Options['observe']]
  : T;

export type OpenapiBodyType<T = unknown> = {
  json: T;
  text: string;
  arraybuffer: ArrayBuffer;
  blob: Blob;
};

export type OpenapiObserve<T = unknown> = {
  body: T;
  response: HttpResponse<T>;
  events: HttpEvent<T>;
};
