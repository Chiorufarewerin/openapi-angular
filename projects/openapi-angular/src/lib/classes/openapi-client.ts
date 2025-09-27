import { HttpClient } from '@angular/common/http';
import { assertInInjectionContext, inject } from '@angular/core';
import { HttpMethod, MediaType, PathsWithMethod } from 'openapi-typescript-helpers';
import { OpenapiClient, OpenapiClientOptions } from '../types/openapi-client';
import { Observable, identity } from 'rxjs';
import { OpenapiMaybeOptionalInit, OpenapiInitParam } from '../types/openapi-init';
import { OpenapiResponse } from '../types/openapi-response';
import { removeTrailingSlash } from '../utils/common';
import { createFinalURL } from '../serializers/url';
import { combineQuerySerializers } from '../serializers/query';

export function openapiClient<Paths extends {}, Media extends MediaType = MediaType>(
  options?: OpenapiClientOptions,
): OpenapiClient<Paths, Media> {
  if (ngDevMode && !options?.injector) {
    assertInInjectionContext(openapiClient);
  }
  const http = inject(HttpClient);

  return new OpenapiClientImpl<Paths, Media>(http, options);
}

export class OpenapiClientImpl<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Media extends MediaType = MediaType,
> implements OpenapiClient<Paths, Media>
{
  constructor(
    private readonly http: HttpClient,
    private readonly clientOptions: OpenapiClientOptions = {},
  ) {}

  request<
    Method extends HttpMethod,
    Path extends PathsWithMethod<Paths, Method>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], Method>,
  >(
    method: Method,
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path][Method], Init, Media>> {
    const {
      baseUrl: localBaseUrl,
      params = {},
      body,
      querySerializer: requestQuerySerializer,
      bodySerializer = this.clientOptions.bodySerializer ?? identity,
      ...restOptions
    } = init[0] || {};
    const baseUrl =
      (localBaseUrl ? removeTrailingSlash(localBaseUrl) : this.clientOptions.baseUrl) ?? '';
    const querySerializer = combineQuerySerializers(
      this.clientOptions.querySerializer,
      requestQuerySerializer,
    );
    const serializedBody = body === undefined ? undefined : bodySerializer(body as any);
    const url = createFinalURL(path, { baseUrl, params, querySerializer });
    const requestOptions = { body: serializedBody, ...restOptions };

    return this.http.request<OpenapiResponse<Paths[Path][Method], Init, Media>>(
      method.toUpperCase(),
      url,
      requestOptions,
    );
  }

  get<
    Path extends PathsWithMethod<Paths, 'get'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'get'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['get'], Init, Media>> {
    return this.request('get', path, ...init);
  }

  head<
    Path extends PathsWithMethod<Paths, 'head'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'head'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['head'], Init, Media>> {
    return this.request('head', path, ...init);
  }

  options<
    Path extends PathsWithMethod<Paths, 'options'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'options'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['options'], Init, Media>> {
    return this.request('options', path, ...init);
  }

  patch<
    Path extends PathsWithMethod<Paths, 'patch'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'patch'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['patch'], Init, Media>> {
    return this.request('patch', path, ...init);
  }

  post<
    Path extends PathsWithMethod<Paths, 'post'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'post'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['post'], Init, Media>> {
    return this.request('post', path, ...init);
  }

  put<
    Path extends PathsWithMethod<Paths, 'put'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'put'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['put'], Init, Media>> {
    return this.request('put', path, ...init);
  }

  trace<
    Path extends PathsWithMethod<Paths, 'trace'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'trace'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['trace'], Init, Media>> {
    return this.request('trace', path, ...init);
  }

  delete<
    Path extends PathsWithMethod<Paths, 'delete'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'delete'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['delete'], Init, Media>> {
    return this.request('delete', path, ...init);
  }
}
