import { HttpMethod, MediaType, PathsWithMethod } from 'openapi-typescript-helpers';
import { Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { OpenapiResponse } from './openapi-response';
import { OpenapiInitParam, OpenapiMaybeOptionalInit } from './openapi-init';
import { OpenapiRequestCommonOptions } from './openapi-request';

export interface OpenapiClientOptions extends OpenapiRequestCommonOptions<unknown> {
  /** Overrides the `Injector` */
  injector?: Injector;
}

export interface OpenapiClient<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Media extends MediaType = MediaType,
> {
  request<
    Method extends HttpMethod,
    Path extends PathsWithMethod<Paths, Method>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], Method>,
  >(
    method: Method,
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path][Method], Init, Media>>;

  get<
    Path extends PathsWithMethod<Paths, 'get'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'get'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['get'], Init, Media>>;
}
