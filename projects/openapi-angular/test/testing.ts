import type { HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import {
  HttpBackend,
  HttpErrorResponse,
  HttpResponse,
  provideHttpClient,
} from '@angular/common/http';
import { inject, InjectionToken, Injector, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { MediaType } from 'openapi-typescript-helpers';
import type { Observable } from 'rxjs';
import { firstValueFrom, of, throwError } from 'rxjs';

import type { OpenapiClient, OpenapiClientOptions } from '../public-api';
import { openapiClient } from '../public-api';

type OpenapiTestingResponseData<T> = {
  body?: T | null;
  headers?: HttpHeaders;
  status?: number;
  statusText?: string;
  url?: string;
  redirected?: boolean;
};
export type OpenapiTestingOnRequestFn = (
  input: HttpRequest<unknown>,
) => OpenapiTestingResponseData<unknown> | void;

const OPENAPI_ON_REQUEST = new InjectionToken<OpenapiTestingOnRequestFn>('OPENAPI_ON_REQUEST');

class OpenapiProxyBackend implements HttpBackend {
  private readonly onRequest = inject(OPENAPI_ON_REQUEST);

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    const { body, ...rest } = this.onRequest(req) ?? {};
    // ok determines whether the response will be transmitted on the event or error channel.
    const ok = !rest.status || (rest.status >= 200 && rest.status < 300);

    return ok
      ? of(new HttpResponse({ body, ...rest }))
      : throwError(() => new HttpErrorResponse({ error: body, ...rest }));
  }
}

export function openapiTestingClient<Paths extends {}, Media extends MediaType = MediaType>(
  options?: OpenapiClientOptions,
  onRequest: OpenapiTestingOnRequestFn = () => ({}),
): OpenapiClient<Paths, Media> & { [Symbol.dispose]: () => void; _options_: OpenapiClientOptions } {
  TestBed.configureTestingModule({
    providers: [
      provideZonelessChangeDetection(),
      provideHttpClient(),
      { provide: OPENAPI_ON_REQUEST, useValue: onRequest },
      { provide: HttpBackend, useClass: OpenapiProxyBackend },
    ],
  });

  options = {
    ...options,
    baseUrl: options?.baseUrl || 'https://fake-api.example',
    injector: options?.injector || TestBed.inject(Injector),
  };

  const client = openapiClient<Paths, Media>(options);

  (client as any)[Symbol.dispose] = () => {
    TestBed.resetTestingModule();
  };

  (client as any)._options_ = options;

  return client as any;
}

export async function firstEntryFrom<T>(
  source: Observable<T>,
): Promise<{ data: T; error?: never } | { data?: never; error: unknown }> {
  try {
    return { data: await firstValueFrom(source) };
  } catch (error: unknown) {
    return { error };
  }
}
