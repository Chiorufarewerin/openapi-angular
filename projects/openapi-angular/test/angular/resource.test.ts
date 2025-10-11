/**
 * Copied from original angular repository and slightly modified
 */

import {
  HttpContext,
  HttpContextToken,
  HttpEventType,
  provideHttpClient,
} from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApplicationRef, Injector, provideZonelessChangeDetection, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, expectTypeOf, it } from 'vitest';

import type { OpenapiResourceRef } from '../../resource/public-api';
import { openapiResourceFactory } from '../../resource/public-api';
import type { paths } from './schemas/client';

const openapiResource = openapiResourceFactory<paths>();

describe('openapiResource', () => {
  beforeEach(() => {
    globalThis['ngServerMode'] = !!(globalThis as any).isNode;
  });

  afterEach(() => {
    globalThis['ngServerMode'] = undefined;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should throw if used outside injection context', () => {
    expect(() => openapiResource(() => '/data')).toThrowError(
      'openapiResource() can only be used within an injection context',
    );
  });

  it('should send a basic request', async () => {
    const backend = TestBed.inject(HttpTestingController);
    const res = openapiResource(() => '/data', { injector: TestBed.inject(Injector) });
    TestBed.tick();
    const req = backend.expectOne('/data');
    req.flush([]);
    await TestBed.inject(ApplicationRef).whenStable();
    expect(res.value()).toEqual([]);
  });

  it('should be reactive in its request URL', async () => {
    const id = signal(0);
    const backend = TestBed.inject(HttpTestingController);
    const res = openapiResource(() => ({ url: '/data/{id}', params: { path: { id: id() } } }), {
      injector: TestBed.inject(Injector),
    });
    TestBed.tick();
    const req1 = backend.expectOne('/data/0');
    req1.flush(0);
    await TestBed.inject(ApplicationRef).whenStable();
    expect(res.value()).toEqual(0);

    id.set(1);
    TestBed.tick();
    const req2 = backend.expectOne('/data/1');
    req2.flush(1);
    await TestBed.inject(ApplicationRef).whenStable();
    expect(res.value()).toEqual(1);
  });

  it('should not make backend requests if the request is undefined', async () => {
    const id = signal(0);
    const backend = TestBed.inject(HttpTestingController);
    const res = openapiResource(
      () => (id() !== 1 ? { url: '/data/{id}', params: { path: { id: id() } } } : undefined),
      {
        injector: TestBed.inject(Injector),
      },
    );
    TestBed.tick();
    backend.expectOne('/data/0').flush(0);
    await TestBed.inject(ApplicationRef).whenStable();
    expect(res.value()).toEqual(0);

    id.set(1);
    TestBed.tick();

    // Verify no requests have been made.
    backend.verify({ ignoreCancelled: false });
    await TestBed.inject(ApplicationRef).whenStable();
    backend.verify({ ignoreCancelled: false });

    id.set(2);
    TestBed.tick();
    backend.expectOne('/data/2').flush(2);
    await TestBed.inject(ApplicationRef).whenStable();
    expect(res.value()).toBe(2);
  });

  it('should support the suite of HttpRequest APIs', async () => {
    const backend = TestBed.inject(HttpTestingController);
    const res = openapiResource(
      () => ({
        url: '/data',
        method: 'POST',
        body: { message: 'Hello, backend!' },
        headers: {
          'X-Special': 'true',
        },
        params: {
          query: {
            fast: 'yes',
          },
        },
        withCredentials: true,
        keepalive: true,
        cache: 'force-cache',
        priority: 'high',
        mode: 'cors',
        redirect: 'follow',
        credentials: 'include',
        integrity: 'sha256-abc123',
        referrer: 'https://example.com',
      }),
      { injector: TestBed.inject(Injector) },
    );
    TestBed.tick();
    const req = backend.expectOne('/data?fast=yes');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ message: 'Hello, backend!' });
    expect(req.request.headers.get('X-Special')).toBe('true');
    expect(req.request.withCredentials).toBe(true);
    expect(req.request.keepalive).toBe(true);
    expect(req.request.cache).toBe('force-cache');
    expect(req.request.priority).toBe('high');
    expect(req.request.mode).toBe('cors');
    expect(req.request.redirect).toBe('follow');
    expect(req.request.credentials).toBe('include');
    expect(req.request.integrity).toBe('sha256-abc123');
    expect(req.request.referrer).toBe('https://example.com');

    req.flush([]);

    await TestBed.inject(ApplicationRef).whenStable();
    expect(res.value()).toEqual([]);
  });

  it('should return response headers & status when resolved', async () => {
    const backend = TestBed.inject(HttpTestingController);
    const res = openapiResource(() => '/data', { injector: TestBed.inject(Injector) });
    TestBed.tick();
    const req = backend.expectOne('/data');
    req.flush([], {
      headers: {
        'X-Special': '123',
      },
    });
    await TestBed.inject(ApplicationRef).whenStable();
    expect(res.value()).toEqual([]);
    expect(res.headers()?.get('X-Special')).toBe('123');
    expect(res.statusCode()).toBe(200);
  });

  it('should return response headers & status when request errored', async () => {
    const backend = TestBed.inject(HttpTestingController);
    const res = openapiResource(() => '/data', { injector: TestBed.inject(Injector) });
    TestBed.tick();
    const req = backend.expectOne('/data');
    req.flush([], {
      headers: {
        'X-Special': '123',
      },
      status: 429,
      statusText: 'Too many requests',
    });
    await TestBed.inject(ApplicationRef).whenStable();
    expect((res.error() as any).error).toEqual([]);
    expect(res.headers()?.get('X-Special')).toBe('123');
    expect(res.statusCode()).toBe(429);
  });

  it('should support progress events', async () => {
    const backend = TestBed.inject(HttpTestingController);
    const res = openapiResource(
      () => ({
        url: '/data',
        reportProgress: true,
      }),
      { injector: TestBed.inject(Injector) },
    );
    TestBed.tick();
    const req = backend.expectOne('/data');
    req.event({
      type: HttpEventType.DownloadProgress,
      loaded: 100,
      total: 200,
    });

    expect(res.progress()).toEqual({
      type: HttpEventType.DownloadProgress,
      loaded: 100,
      total: 200,
    });

    req.flush([]);

    await TestBed.inject(ApplicationRef).whenStable();
    expect(res.value()).toEqual([]);
  });

  it('should pass all request parameters', () => {
    TestBed.inject(HttpTestingController);

    const CTX_TOKEN = new HttpContextToken(() => 'value');
    openapiResource(
      () => ({
        url: '/data',
        params: {
          query: {
            fast: 'yes',
          },
        },
        responseType: 'text', // This one is not overwritten (and no excess property check from ts)
        headers: {
          'X-Tag': 'alpha,beta',
        },
        reportProgress: true,
        context: new HttpContext().set(CTX_TOKEN, 'bar'),
        withCredentials: true,
        keepalive: true,
        transferCache: { includeHeaders: ['Y-Tag'] },
        timeout: 1234,
      }),
      {
        injector: TestBed.inject(Injector),
      },
    );
    TestBed.tick();

    const req = TestBed.inject(HttpTestingController).expectOne('/data?fast=yes');
    expect(req.request.headers.get('X-Tag')).toEqual('alpha,beta');
    expect(req.request.responseType).toEqual('json');
    expect(req.request.withCredentials).toEqual(true);
    expect(req.request.context.get(CTX_TOKEN)).toEqual('bar');
    expect(req.request.reportProgress).toEqual(true);
    expect(req.request.keepalive).toBe(true);
    expect(req.request.transferCache).toEqual({ includeHeaders: ['Y-Tag'] });
    expect(req.request.timeout).toBe(1234);
  });

  it('should allow mapping data to an arbitrary type', async () => {
    const backend = TestBed.inject(HttpTestingController);
    const res = openapiResource(
      () => ({
        url: '/data',
        reportProgress: true,
      }),
      {
        injector: TestBed.inject(Injector),
        parse: (value) => JSON.stringify(value),
      },
    );
    TestBed.tick();
    const req = backend.expectOne('/data');
    req.flush([1, 2, 3]);

    await TestBed.inject(ApplicationRef).whenStable();
    expect(res.value()).toEqual('[1,2,3]');
  });

  it('should allow defining an equality function', async () => {
    const backend = TestBed.inject(HttpTestingController);
    const res = openapiResource(() => '/data', {
      injector: TestBed.inject(Injector),
      equal: (_a, _b) => true,
    });
    TestBed.tick();
    const req = backend.expectOne('/data');
    req.flush(1);

    await TestBed.inject(ApplicationRef).whenStable();
    expect(res.value()).toEqual(1);

    res.value.set(5);
    expect(res.value()).toBe(1); // equality blocked writes
  });

  it('should support text responses', async () => {
    const backend = TestBed.inject(HttpTestingController);
    const res = openapiResource.text(
      () => ({
        url: '/data',
        reportProgress: true,
      }),
      { injector: TestBed.inject(Injector) },
    );
    TestBed.tick();
    const req = backend.expectOne('/data');
    req.flush('[1,2,3]');

    await TestBed.inject(ApplicationRef).whenStable();
    expect(res.value()).toEqual('[1,2,3]');
  });

  it('should support ArrayBuffer responses', async () => {
    const backend = TestBed.inject(HttpTestingController);
    const res = openapiResource.arrayBuffer(
      () => ({
        url: '/data',
        reportProgress: true,
      }),
      { injector: TestBed.inject(Injector) },
    );
    TestBed.tick();
    const req = backend.expectOne('/data');
    const buffer = new ArrayBuffer();
    req.flush(buffer);

    await TestBed.inject(ApplicationRef).whenStable();
    expect(res.value()).toBe(buffer);
  });

  it('should send request on reload', async () => {
    const backend = TestBed.inject(HttpTestingController);
    const res = openapiResource(() => '/data', { injector: TestBed.inject(Injector) });
    TestBed.tick();
    let req = backend.expectOne('/data');
    req.flush([]);
    await TestBed.inject(ApplicationRef).whenStable();

    res.reload();
    TestBed.tick();
    req = backend.expectOne('/data');
    req.flush([]);
  });

  it('should reset past request data when using set()', async () => {
    const backend = TestBed.inject(HttpTestingController);
    const res = openapiResource(() => '/data', { injector: TestBed.inject(Injector) });
    TestBed.tick();
    const req = backend.expectOne('/data');
    req.flush([]);
    await TestBed.inject(ApplicationRef).whenStable();

    res.set([]);

    expect(res.headers()).toBe(undefined);
    expect(res.progress()).toBe(undefined);
    expect(res.statusCode()).toBe(undefined);
  });

  describe('types', () => {
    it('should narrow hasValue() when the value can be undefined', () => {
      const result: OpenapiResourceRef<number | undefined> = openapiResource(() => '/data', {
        injector: TestBed.inject(Injector),
        parse: () => 0,
      });

      if (result.hasValue()) {
        const value: number = result.value();
        expectTypeOf(value).toEqualTypeOf<number>();
      } else if (result.isLoading()) {
        // @ts-expect-error
        const value: number = result.value();
        expectTypeOf(value).toEqualTypeOf<number>();
      } else if (result.error()) {
      }
    });

    it('should not narrow hasValue() when a default value is provided', () => {
      const result: OpenapiResourceRef<number> = openapiResource(() => '/data', {
        injector: TestBed.inject(Injector),
        parse: () => 0,
        defaultValue: 0,
      });

      if (result.hasValue()) {
        const value: number = result.value();
        expectTypeOf(value).toEqualTypeOf<number>();
      } else if (result.isLoading()) {
        const value: number = result.value();
        expectTypeOf(value).toEqualTypeOf<number>();
      } else if (result.error()) {
      }
    });

    it('should not narrow hasValue() when the resource type is unknown', () => {
      const result: OpenapiResourceRef<unknown> = openapiResource(() => '/data', {
        injector: TestBed.inject(Injector),
      });

      if (result.hasValue()) {
        const value: unknown = result.value();
        expectTypeOf(value).toEqualTypeOf<unknown>();
      } else if (result.isLoading()) {
        const value: unknown = result.value();
        expectTypeOf(value).toEqualTypeOf<unknown>();
      } else if (result.error()) {
      }
    });
  });
});
