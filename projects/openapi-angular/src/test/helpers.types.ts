import { HttpResponse, HttpResponseBase } from '@angular/common/http';
import {
  MediaType,
  SuccessResponse,
  ResponseObjectMap,
  ErrorResponse,
} from 'openapi-typescript-helpers';
import { Observable } from 'rxjs';
import { OpenapiResponseType } from '../public-api';

export type OpenapiObservedResponse<
  T extends Record<string | number, any>,
  Options,
  Media extends MediaType,
> =
  | {
      data: OpenapiResponseType<SuccessResponse<ResponseObjectMap<T>, Media>, Options>;
      error?: never;
      response: HttpResponseBase;
    }
  | {
      data?: never;
      error: ErrorResponse<ResponseObjectMap<T>, Media>;
      response: HttpResponseBase;
    };
