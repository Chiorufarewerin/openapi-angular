import { HttpEvent, HttpResponse } from '@angular/common/http';
import { MediaType, ResponseObjectMap, SuccessResponse } from 'openapi-typescript-helpers';

export type OpenapiResponse<
  T extends Record<string | number, any>,
  Options,
  Media extends MediaType,
> = Options extends {
  observe: 'response';
}
  ? HttpResponse<OpenapiResponseType<SuccessResponse<ResponseObjectMap<T>, Media>, Options>>
  : Options extends {
        observe: 'events';
      }
    ? HttpEvent<OpenapiResponseType<SuccessResponse<ResponseObjectMap<T>, Media>, Options>>
    : OpenapiResponseType<SuccessResponse<ResponseObjectMap<T>, Media>, Options>;

export type OpenapiResponseType<T, Options> = Options extends {
  responseType: keyof OpenapiBodyType;
}
  ? OpenapiBodyType<T>[Options['responseType']]
  : T;

export type OpenapiBodyType<T = unknown> = {
  json: T;
  text: string;
  arraybuffer: ArrayBuffer;
  blob: Blob;
};
