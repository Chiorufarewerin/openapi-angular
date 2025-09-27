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

  head<
    Path extends PathsWithMethod<Paths, 'head'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'head'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['head'], Init, Media>>;

  options<
    Path extends PathsWithMethod<Paths, 'options'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'options'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['options'], Init, Media>>;

  patch<
    Path extends PathsWithMethod<Paths, 'patch'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'patch'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['patch'], Init, Media>>;

  post<
    Path extends PathsWithMethod<Paths, 'post'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'post'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['post'], Init, Media>>;

  put<
    Path extends PathsWithMethod<Paths, 'put'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'put'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['put'], Init, Media>>;

  trace<
    Path extends PathsWithMethod<Paths, 'trace'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'trace'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['trace'], Init, Media>>;

  delete<
    Path extends PathsWithMethod<Paths, 'delete'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'delete'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['delete'], Init, Media>>;
}
