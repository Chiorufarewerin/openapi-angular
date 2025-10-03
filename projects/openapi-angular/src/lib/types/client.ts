import type { Injector } from '@angular/core';
import type { HttpMethod, MediaType } from 'openapi-typescript-helpers';
import type { Observable } from 'rxjs';

import type { OpenapiInitParam, OpenapiMaybeOptionalInit } from './init';
import type { OpenapiPathsWithMethod } from './path';
import type { OpenapiRequestCommonOptions } from './request';
import type { OpenapiResponse } from './response';

export interface OpenapiClientOptions extends OpenapiRequestCommonOptions<unknown> {
  /** Overrides the `Injector` */
  injector?: Injector;
}

export interface OpenapiClient<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Media extends MediaType = MediaType,
> {
  request<
    Method extends Uppercase<HttpMethod>,
    Path extends OpenapiPathsWithMethod<Paths, Lowercase<Method>>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], Lowercase<Method>>,
  >(
    method: Method,
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path][Lowercase<Method>], Init, Media>>;

  get<
    Path extends OpenapiPathsWithMethod<Paths, 'get'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'get'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['get'], Init, Media>>;

  head<
    Path extends OpenapiPathsWithMethod<Paths, 'head'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'head'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['head'], Init, Media>>;

  options<
    Path extends OpenapiPathsWithMethod<Paths, 'options'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'options'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['options'], Init, Media>>;

  patch<
    Path extends OpenapiPathsWithMethod<Paths, 'patch'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'patch'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['patch'], Init, Media>>;

  post<
    Path extends OpenapiPathsWithMethod<Paths, 'post'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'post'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['post'], Init, Media>>;

  put<
    Path extends OpenapiPathsWithMethod<Paths, 'put'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'put'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['put'], Init, Media>>;

  trace<
    Path extends OpenapiPathsWithMethod<Paths, 'trace'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'trace'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['trace'], Init, Media>>;

  delete<
    Path extends OpenapiPathsWithMethod<Paths, 'delete'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'delete'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['delete'], Init, Media>>;
}
