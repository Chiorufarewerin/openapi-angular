/*
 * Public API Surface of openapi-angular
 */

export { openapiClient } from './lib/classes/openapi-client';
export type { OpenapiClient, OpenapiClientOptions } from './lib/types/openapi-client';
export type { OpenapiInitParam, OpenapiMaybeOptionalInit } from './lib/types/openapi-init';
export type {
  OpenapiDefaultParamsOption,
  OpenapiHttpRequestOptions,
  OpenapiParamsOption,
  OpenapiRequest,
  OpenapiRequestBodyOption,
  OpenapiRequestCommonOptions,
  OpenapiRequestOptions,
} from './lib/types/openapi-request';
export type {
  OpenapiBodyType,
  OpenapiResponse,
  OpenapiResponseType,
} from './lib/types/openapi-response';
export type {
  OpenapiBodySerializer,
  OpenapiQuerySerializer,
  OpenapiQuerySerializerOptions,
} from './lib/types/openapi-serializer';
