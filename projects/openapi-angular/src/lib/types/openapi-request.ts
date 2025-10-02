import type { HttpContext } from '@angular/common/http';
import type {
  IsOperationRequestBodyOptional,
  OperationRequestBodyContent,
  RequiredKeysOf,
} from 'openapi-typescript-helpers';

import type { OpenapiHeadersOptions } from './openapi-header';
import type {
  OpenapiBodySerializer,
  OpenapiQuerySerializer,
  OpenapiQuerySerializerOptions,
} from './openapi-serializer';

export type OpenapiRequest<T> = OpenapiRequestOptions<T> & OpenapiHttpRequestOptions;

export type OpenapiRequestOptions<T> = OpenapiParamsOption<T> &
  OpenapiRequestBodyOption<T> &
  OpenapiRequestCommonOptions<T>;

export type OpenapiParamsOption<T> = T extends {
  parameters: any;
}
  ? RequiredKeysOf<T['parameters']> extends never
    ? { params?: T['parameters'] }
    : { params: T['parameters'] }
  : OpenapiDefaultParamsOption;

export type OpenapiRequestBodyOption<T> =
  OperationRequestBodyContent<T> extends never
    ? { body?: never }
    : IsOperationRequestBodyOptional<T> extends true
      ? { body?: OperationRequestBodyContent<T> }
      : { body: OperationRequestBodyContent<T> };

export interface OpenapiDefaultParamsOption {
  params?: {
    query?: Record<string, unknown>;
  };
}

export interface OpenapiRequestCommonOptions<T> {
  baseUrl?: string;
  headers?: OpenapiHeadersOptions;
  querySerializer?: OpenapiQuerySerializer<T> | OpenapiQuerySerializerOptions;
  bodySerializer?: OpenapiBodySerializer<T>;
}

export interface OpenapiHttpRequestOptions {
  context?: HttpContext;
  reportProgress?: boolean;
  withCredentials?: boolean;
  credentials?: RequestCredentials;
  keepalive?: boolean;
  priority?: RequestPriority;
  cache?: RequestCache;
  mode?: RequestMode;
  redirect?: RequestRedirect;
  referrer?: string;
  integrity?: string;
  transferCache?: { includeHeaders?: string[] } | boolean;
  timeout?: number;
  responseType?: 'json' | 'text' | 'arraybuffer' | 'blob';
  observe?: 'body' | 'response' | 'events';
}
