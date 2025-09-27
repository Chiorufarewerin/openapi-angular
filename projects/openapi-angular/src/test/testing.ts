import {
  HttpBackend,
  HttpEvent,
  HttpRequest,
  HttpResponse,
  provideHttpClient,
} from '@angular/common/http';
import { inject, InjectionToken, Injector, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MediaType } from 'openapi-typescript-helpers';
import { OpenapiClient, openapiClient, OpenapiClientOptions } from '../public-api';
import { Observable, of } from 'rxjs';

type OnRequestFn = (input: HttpRequest<unknown>) => HttpResponse<unknown>;

const OPENAPI_ON_REQUEST = new InjectionToken<OnRequestFn>('OPENAPI_ON_REQUEST');

class OpenapiProxyBackend implements HttpBackend {
  private readonly onRequest = inject(OPENAPI_ON_REQUEST);

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return of(this.onRequest(req));
  }
}

export function openapiTestingClient<Paths extends {}, Media extends MediaType = MediaType>(
  options?: OpenapiClientOptions,
  onRequest: (input: HttpRequest<unknown>) => HttpResponse<unknown> = () => new HttpResponse(),
): OpenapiClient<Paths, Media> & { [Symbol.dispose]: () => void } {
  TestBed.configureTestingModule({
    providers: [
      provideZonelessChangeDetection(),
      provideHttpClient(),
      { provide: OPENAPI_ON_REQUEST, useValue: onRequest },
      { provide: HttpBackend, useClass: OpenapiProxyBackend },
    ],
  });

  const client = openapiClient<Paths, Media>({
    ...options,
    baseUrl: options?.baseUrl || 'https://fake-api.example',
    injector: options?.injector || TestBed.inject(Injector),
  });

  (client as any)[Symbol.dispose] = () => {
    TestBed.resetTestingModule();
  };

  return client as any;
}
