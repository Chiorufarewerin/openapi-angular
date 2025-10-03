import type { HttpClient } from '@angular/common/http';
import type { HttpMethod, MediaType } from 'openapi-typescript-helpers';
import type { Observable } from 'rxjs';
import { identity } from 'rxjs';

import { combineQuerySerializers } from '../serializers/query';
import { createFinalURL } from '../serializers/url';
import type { OpenapiClient, OpenapiClientOptions } from '../types/client';
import type { OpenapiInitParam, OpenapiMaybeOptionalInit } from '../types/init';
import type { OpenapiPathsWithMethod } from '../types/path';
import type { OpenapiResponse } from '../types/response';
import { removeTrailingSlash } from '../utils/common';
import { mergeHeaders } from '../utils/headers';

export class OpenapiClientImpl<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Media extends MediaType = MediaType,
> implements OpenapiClient<Paths, Media>
{
  constructor(
    private readonly http: HttpClient,
    private readonly opts: OpenapiClientOptions = {},
  ) {}

  request<
    Method extends Uppercase<HttpMethod>,
    Path extends OpenapiPathsWithMethod<Paths, Lowercase<Method>>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], Lowercase<Method>>,
  >(
    method: Method,
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path][Lowercase<Method>], Init, Media>> {
    const {
      baseUrl: localBaseUrl,
      params = {},
      body,
      headers,
      querySerializer: requestQuerySerializer,
      bodySerializer = this.opts.bodySerializer ?? identity,
      ...restOptions
    } = init[0] || {};
    const baseUrl = removeTrailingSlash((localBaseUrl ? localBaseUrl : this.opts.baseUrl) ?? '');
    const querySerializer = combineQuerySerializers(
      this.opts.querySerializer,
      requestQuerySerializer,
    );
    const serializedBody = body === undefined ? undefined : bodySerializer(body as any);
    const url = createFinalURL(path, { baseUrl, params, querySerializer });
    const finalHeaders = mergeHeaders(this.opts.headers, headers, params.header);
    const requestOptions = { body: serializedBody, headers: finalHeaders, ...restOptions };

    return this.http.request<OpenapiResponse<Paths[Path][Lowercase<Method>], Init, Media>>(
      method,
      url,
      requestOptions,
    );
  }

  get<
    Path extends OpenapiPathsWithMethod<Paths, 'get'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'get'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['get'], Init, Media>> {
    return this.request('GET', path, ...init);
  }

  head<
    Path extends OpenapiPathsWithMethod<Paths, 'head'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'head'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['head'], Init, Media>> {
    return this.request('HEAD', path, ...init);
  }

  options<
    Path extends OpenapiPathsWithMethod<Paths, 'options'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'options'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['options'], Init, Media>> {
    return this.request('OPTIONS', path, ...init);
  }

  patch<
    Path extends OpenapiPathsWithMethod<Paths, 'patch'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'patch'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['patch'], Init, Media>> {
    return this.request('PATCH', path, ...init);
  }

  post<
    Path extends OpenapiPathsWithMethod<Paths, 'post'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'post'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['post'], Init, Media>> {
    return this.request('POST', path, ...init);
  }

  put<
    Path extends OpenapiPathsWithMethod<Paths, 'put'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'put'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['put'], Init, Media>> {
    return this.request('PUT', path, ...init);
  }

  trace<
    Path extends OpenapiPathsWithMethod<Paths, 'trace'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'trace'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['trace'], Init, Media>> {
    return this.request('TRACE', path, ...init);
  }

  delete<
    Path extends OpenapiPathsWithMethod<Paths, 'delete'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'delete'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Observable<OpenapiResponse<Paths[Path]['delete'], Init, Media>> {
    return this.request('DELETE', path, ...init);
  }
}
