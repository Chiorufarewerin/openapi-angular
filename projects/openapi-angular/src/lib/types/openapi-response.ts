import { MediaType, ResponseObjectMap, SuccessResponse } from 'openapi-typescript-helpers';

export type OpenapiResponse<
  T extends Record<string | number, any>,
  Options,
  Media extends MediaType,
> = OpenapiResponseType<SuccessResponse<ResponseObjectMap<T>, Media>, Options>;

export type OpenapiResponseType<T, Options> = Options extends {
  responseType: keyof OpenapiBodyType;
}
  ? OpenapiBodyType<T>[Options['responseType']]
  : T;

export type OpenapiBodyType<T = unknown> = {
  json: T;
};
