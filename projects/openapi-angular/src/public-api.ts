/*
 * Public API Surface of openapi-angular
 */

export { openapiClient } from './lib/factory';
export type { OpenapiClient, OpenapiClientOptions } from './lib/types/client';
export type { OpenapiInitParam, OpenapiMaybeOptionalInit } from './lib/types/init';
export type { OpenapiPathsWithMethod } from './lib/types/path';
export type {
  OpenapiDefaultParamsOption,
  OpenapiHttpRequestOptions,
  OpenapiParamsOption,
  OpenapiRequest,
  OpenapiRequestBodyOption,
  OpenapiRequestCommonOptions,
  OpenapiRequestOptions,
} from './lib/types/request';
export type {
  OpenapiBodyType,
  OpenapiObserve,
  OpenapiResponse,
  OpenapiResponseObserve,
  OpenapiResponseType,
} from './lib/types/response';
export type {
  OpenapiBodySerializer,
  OpenapiQuerySerializer,
  OpenapiQuerySerializerOptions,
} from './lib/types/serializer';
