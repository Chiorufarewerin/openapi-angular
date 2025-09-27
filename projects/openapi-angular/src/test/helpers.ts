import type { HttpMethod, MediaType, PathsWithMethod } from 'openapi-typescript-helpers';
import { TestBed } from '@angular/core/testing';
import {
  HttpErrorResponse,
  HttpResponse,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import {
  OpenapiClient,
  openapiClient,
  OpenapiInitParam,
  OpenapiMaybeOptionalInit,
} from '../public-api';
import { firstValueFrom, Observable } from 'rxjs';
import { OpenapiObservedResponse } from './helpers.types';
import { provideZonelessChangeDetection } from '@angular/core';

export function createObservedClient<T extends {}, M extends MediaType = MediaType>(
  options?: Parameters<typeof openapiClient<T>>[0],
  onRequest: (input: Request) => Promise<Response> = async () =>
    Response.json({ status: 200, message: 'OK' }),
) {
  globalThis.fetch = async (url, input) => {
    const response = await onRequest(new Request(url, input));
    return response;
  };

  TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection(), provideHttpClient(withFetch())],
  });

  const client = TestBed.runInInjectionContext(() => {
    return openapiClient<T, M>({
      ...options,
      baseUrl: options?.baseUrl || 'https://fake-api.example',
    });
  });

  return new OpenapiObservedClient(client);
}

async function patch(method: HttpMethod, data: Observable<any>): Promise<any> {
  try {
    const response = (await firstValueFrom(data)) as HttpResponse<unknown>;

    if (
      response.status === 204 ||
      method === 'head' ||
      response.headers.get('Content-Length') === '0'
    ) {
      return { data: undefined, response };
    }

    return {
      data: response.body as any,
      response,
    };
  } catch (e: unknown) {
    if (e instanceof HttpErrorResponse) {
      return {
        error: e.error,
        response: e,
      };
    }
    throw e;
  }
}

export class OpenapiObservedClient<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Media extends MediaType = MediaType,
> {
  constructor(private readonly client: OpenapiClient<Paths, Media>) {}

  async request<
    Method extends HttpMethod,
    Path extends PathsWithMethod<Paths, Method>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], Method>,
  >(
    method: Method,
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Promise<OpenapiObservedResponse<Paths[Path][Method], Init, Media>> {
    return patch(
      method,
      this.client.request<Method, Path, Init>(method, path, {
        ...(init[0] || {}),
        observe: 'response',
      } as any),
    );
  }

  async GET<
    Path extends PathsWithMethod<Paths, 'get'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'get'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Promise<OpenapiObservedResponse<Paths[Path]['get'], Init, Media>> {
    return patch(
      'get',
      this.client.get<Path, Init>(path, {
        ...(init[0] || {}),
        observe: 'response',
      } as any),
    );
  }

  async HEAD<
    Path extends PathsWithMethod<Paths, 'head'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'head'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Promise<OpenapiObservedResponse<Paths[Path]['head'], Init, Media>> {
    return patch(
      'head',
      this.client.head<Path, Init>(path, {
        ...(init[0] || {}),
        observe: 'response',
      } as any),
    );
  }

  async OPTIONS<
    Path extends PathsWithMethod<Paths, 'options'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'options'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Promise<OpenapiObservedResponse<Paths[Path]['options'], Init, Media>> {
    return patch(
      'options',
      this.client.options<Path, Init>(path, {
        ...(init[0] || {}),
        observe: 'response',
      } as any),
    );
  }

  async PATCH<
    Path extends PathsWithMethod<Paths, 'patch'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'patch'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Promise<OpenapiObservedResponse<Paths[Path]['patch'], Init, Media>> {
    return patch(
      'patch',
      this.client.patch<Path, Init>(path, {
        ...(init[0] || {}),
        observe: 'response',
      } as any),
    );
  }

  async POST<
    Path extends PathsWithMethod<Paths, 'post'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'post'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Promise<OpenapiObservedResponse<Paths[Path]['post'], Init, Media>> {
    return patch(
      'post',
      this.client.post<Path, Init>(path, {
        ...(init[0] || {}),
        observe: 'response',
      } as any),
    );
  }

  async PUT<
    Path extends PathsWithMethod<Paths, 'put'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'put'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Promise<OpenapiObservedResponse<Paths[Path]['put'], Init, Media>> {
    return patch(
      'put',
      this.client.put<Path, Init>(path, {
        ...(init[0] || {}),
        observe: 'response',
      } as any),
    );
  }

  async TRACE<
    Path extends PathsWithMethod<Paths, 'trace'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'trace'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Promise<OpenapiObservedResponse<Paths[Path]['trace'], Init, Media>> {
    return patch(
      'trace',
      this.client.trace<Path, Init>(path, {
        ...(init[0] || {}),
        observe: 'response',
      } as any),
    );
  }

  async DELETE<
    Path extends PathsWithMethod<Paths, 'delete'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'delete'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Promise<OpenapiObservedResponse<Paths[Path]['delete'], Init, Media>> {
    return patch(
      'delete',
      this.client.delete<Path, Init>(path, {
        ...(init[0] || {}),
        observe: 'response',
      } as any),
    );
  }
}

/**
 * Convert a Headers object to a plain object for easier comparison
 */
export function headersToObj(headers: Headers | Record<string, string>): Record<string, string> {
  const iter = headers instanceof Headers ? headers.entries() : Object.entries(headers);
  const result: Record<string, string> = {};
  for (const [k, v] of iter) {
    result[k] = v;
  }
  return result;
}
