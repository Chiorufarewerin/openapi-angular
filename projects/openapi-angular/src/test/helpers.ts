import type {
  ErrorResponse,
  HttpMethod,
  MediaType,
  PathsWithMethod,
  ResponseObjectMap,
  SuccessResponse,
} from 'openapi-typescript-helpers';
import { TestBed } from '@angular/core/testing';
import {
  FetchBackend,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
  HttpResponseBase,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import {
  OpenapiClient,
  openapiClient,
  OpenapiInitParam,
  OpenapiMaybeOptionalInit,
  OpenapiResponseType,
} from '../public-api';
import { firstValueFrom, Observable } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { getHeadersIterator } from '../lib/utils/headers';

export function createObservedClient<T extends {}, M extends MediaType = MediaType>(
  options?: Parameters<typeof openapiClient<T>>[0],
  onRequest: (input: Request) => Promise<Response> = async () =>
    Response.json({ status: 200, message: 'OK' }),
) {
  TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection(), provideHttpClient(withFetch())],
  });

  const fetchBackend = TestBed.inject(FetchBackend);
  // @ts-expect-error
  fetchBackend['fetchImpl'] = async (url: any, input: any) => {
    const response = await onRequest(new Request(url, input));
    return response;
  };

  const client = TestBed.runInInjectionContext(() => {
    return openapiClient<T, M>({
      ...options,
      baseUrl: options?.baseUrl || 'https://fake-api.example',
    });
  });

  return new OpenapiObservedClient(client);
}

async function patch(method: HttpMethod, options: any, data: Observable<any>): Promise<any> {
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
      data: convertHttpResponse(options.responseType, response) as any,
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
    const options = {
      ...(init[0] || {}),
      observe: 'response',
    } as any;
    return patch(method, options, this.client.request<Method, Path, Init>(method, path, options));
  }

  async GET<
    Path extends PathsWithMethod<Paths, 'get'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'get'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Promise<OpenapiObservedResponse<Paths[Path]['get'], Init, Media>> {
    const options = {
      ...(init[0] || {}),
      observe: 'response',
    } as any;
    return patch('get', options, this.client.get<Path, Init>(path, options));
  }

  async HEAD<
    Path extends PathsWithMethod<Paths, 'head'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'head'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Promise<OpenapiObservedResponse<Paths[Path]['head'], Init, Media>> {
    const options = {
      ...(init[0] || {}),
      observe: 'response',
    } as any;
    return patch('head', options, this.client.head<Path, Init>(path, options));
  }

  async OPTIONS<
    Path extends PathsWithMethod<Paths, 'options'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'options'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Promise<OpenapiObservedResponse<Paths[Path]['options'], Init, Media>> {
    const options = {
      ...(init[0] || {}),
      observe: 'response',
    } as any;
    return patch('options', options, this.client.options<Path, Init>(path, options));
  }

  async PATCH<
    Path extends PathsWithMethod<Paths, 'patch'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'patch'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Promise<OpenapiObservedResponse<Paths[Path]['patch'], Init, Media>> {
    const options = {
      ...(init[0] || {}),
      observe: 'response',
    } as any;
    return patch('patch', options, this.client.patch<Path, Init>(path, options));
  }

  async POST<
    Path extends PathsWithMethod<Paths, 'post'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'post'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Promise<OpenapiObservedResponse<Paths[Path]['post'], Init, Media>> {
    const options = {
      ...(init[0] || {}),
      observe: 'response',
    } as any;
    return patch('post', options, this.client.post<Path, Init>(path, options));
  }

  async PUT<
    Path extends PathsWithMethod<Paths, 'put'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'put'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Promise<OpenapiObservedResponse<Paths[Path]['put'], Init, Media>> {
    const options = {
      ...(init[0] || {}),
      observe: 'response',
    } as any;
    return patch('put', options, this.client.put<Path, Init>(path, options));
  }

  async TRACE<
    Path extends PathsWithMethod<Paths, 'trace'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'trace'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Promise<OpenapiObservedResponse<Paths[Path]['trace'], Init, Media>> {
    const options = {
      ...(init[0] || {}),
      observe: 'response',
    } as any;
    return patch('trace', options, this.client.trace<Path, Init>(path, options));
  }

  async DELETE<
    Path extends PathsWithMethod<Paths, 'delete'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'delete'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Promise<OpenapiObservedResponse<Paths[Path]['delete'], Init, Media>> {
    const options = {
      ...(init[0] || {}),
      observe: 'response',
    } as any;
    return patch('delete', options, this.client.delete<Path, Init>(path, options));
  }
}

/**
 * Convert a Headers object to a plain object for easier comparison
 */
export function headersToObj(
  headers: Headers | Record<string, string> | HttpHeaders,
): Record<string, string> {
  const iter = getHeadersIterator(headers);
  const result: Record<string, string> = {};
  for (const [k, v] of iter) {
    result[k] = (Array.isArray(v) ? v[0] : v) as string;
  }
  return result;
}

function convertHttpResponse<T>(responseType: string, res: HttpResponse<T>): any {
  switch (responseType) {
    case 'arraybuffer':
      if (res.body !== null && !(res.body instanceof ArrayBuffer)) {
        throw new Error();
      }
      return res.body;
    case 'blob':
      if (res.body !== null && !(res.body instanceof Blob)) {
        throw new Error();
      }
      return res.body;
    case 'text':
      if (res.body !== null && typeof res.body !== 'string') {
        throw new Error();
      }
      return res.body;
    default:
      return res.body;
  }
}
