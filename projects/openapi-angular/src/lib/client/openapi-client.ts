import { HttpClient } from '@angular/common/http';
import { assertInInjectionContext, inject } from '@angular/core';
import { HttpMethod, MediaType, PathsWithMethod } from 'openapi-typescript-helpers';
import { OpenapiClient, OpenapiClientOptions } from '../models/openapi-client';
import { Observable, identity } from 'rxjs';
import { OpenapiMaybeOptionalInit, OpenapiInitParam } from '../models/openapi-init';
import { OpenapiResponse } from '../models/openapi-response';
import { removeTrailingSlash } from '../utils/common';
import { createFinalURL } from '../serializer/url';
import {
  OpenapiQuerySerializer,
  OpenapiQuerySerializerOptions,
} from '../models/openapi-serializer';
import { combineQuerySerializers, openapiCreateQuerySerializer } from '../serializer/query';

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
    private readonly options: OpenapiClientOptions = {},
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
      bodySerializer = this.options.bodySerializer ?? identity,
      ...restOptions
    } = init[0] || {};
    const baseUrl = (localBaseUrl ? removeTrailingSlash(localBaseUrl) : this.options.baseUrl) ?? '';
    const querySerializer = combineQuerySerializers(
      this.options.querySerializer,
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
}
