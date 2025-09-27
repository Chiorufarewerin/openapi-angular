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
import { firstValueFrom } from 'rxjs';
import { OpenapiObservedResponse } from './helpers.types';
import { provideZonelessChangeDetection } from '@angular/core';

export function createObservedClient<T extends {}, M extends MediaType = MediaType>(
  options?: Parameters<typeof openapiClient<T>>[0],
  onRequest: (input: Request) => Promise<Response> = async () =>
    Response.json({ status: 200, message: 'OK' }),
) {
  globalThis.fetch = (url, input) => onRequest(new Request(url, input));

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

export class OpenapiObservedClient<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Media extends MediaType = MediaType,
> {
  constructor(private readonly client: OpenapiClient<Paths, Media>) {}

  async get<
    Path extends PathsWithMethod<Paths, 'get'>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], 'get'>,
  >(
    path: Path,
    ...init: OpenapiInitParam<Init>
  ): Promise<OpenapiObservedResponse<Paths[Path]['get'], Init, Media>> {
    try {
      const response = (await firstValueFrom(
        this.client.get<Path, Init>(path, {
          ...(init[0] || {}),
          observe: 'response',
        } as any),
      )) as HttpResponse<unknown>;

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
}
