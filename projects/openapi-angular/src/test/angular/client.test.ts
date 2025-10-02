/**
 * Copied from original angular repository and slightly modified
 */

import type { HttpErrorResponse } from '@angular/common/http';
import {
  HttpEventType,
  HttpResponse,
  HttpStatusCode,
  provideHttpClient,
} from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Injector, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { toArray } from 'rxjs/operators';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { openapiClient } from '../../public-api';
import type { paths } from './schemas/client';

describe('OpenapiClient', () => {
  let client: ReturnType<typeof openapiClient<paths>>;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    client = openapiClient({ injector: TestBed.inject(Injector) });
    backend = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    try {
      backend.verify();
    } finally {
      TestBed.resetTestingModule();
    }
  });

  describe('makes a basic request', () => {
    it('for JSON data', () =>
      new Promise<void>((done) => {
        client.get('/test').subscribe((res) => {
          expect((res as any)['data']).toEqual('hello world');
          done();
        });
        backend.expectOne('/test').flush({ data: 'hello world' });
      }));

    it('should allow flushing requests with a boolean value', () =>
      new Promise<void>((done) => {
        client.get('/test').subscribe((res) => {
          expect(res as any).toEqual(true);
          done();
        });
        backend.expectOne('/test').flush(true);
      }));

    it('for text data', () =>
      new Promise<void>((done) => {
        client.get('/test', { responseType: 'text' }).subscribe((res) => {
          expect(res).toEqual('hello world');
          done();
        });
        backend.expectOne('/test').flush('hello world');
      }));

    it('with headers', () =>
      new Promise<void>((done) => {
        client.get('/test', { headers: { 'X-Option': 'true' } }).subscribe(() => done());
        const req = backend.expectOne('/test');
        expect(req.request.headers.get('X-Option')).toEqual('true');
        req.flush({});
      }));

    it('with string params', () =>
      new Promise<void>((done) => {
        client.get('/test', { params: { query: { test: 'true' } } }).subscribe(() => done());
        backend.expectOne('/test?test=true').flush({});
      }));

    it('with an array of string params', () =>
      new Promise<void>((done) => {
        client.get('/test', { params: { query: { test: ['a', 'b'] } } }).subscribe(() => done());
        backend.expectOne('/test?test=a&test=b').flush({});
      }));

    it('with number params', () =>
      new Promise<void>((done) => {
        client.get('/test', { params: { query: { test: 2 } } }).subscribe(() => done());
        backend.expectOne('/test?test=2').flush({});
      }));

    it('with an array of number params', () =>
      new Promise<void>((done) => {
        client.get('/test', { params: { query: { test: [2, 3] } } }).subscribe(() => done());
        backend.expectOne('/test?test=2&test=3').flush({});
      }));

    it('with boolean params', () =>
      new Promise<void>((done) => {
        client.get('/test', { params: { query: { test: true } } }).subscribe(() => done());
        backend.expectOne('/test?test=true').flush({});
      }));

    it('with an array of boolean params', () =>
      new Promise<void>((done) => {
        client.get('/test', { params: { query: { test: [true, false] } } }).subscribe(() => done());
        backend.expectOne('/test?test=true&test=false').flush({});
      }));

    it('with an array of params of different types', () =>
      new Promise<void>((done) => {
        client
          .get('/test', { params: { query: { test: [true, 'a', 2] } } })
          .subscribe(() => done());
        backend.expectOne('/test?test=true&test=a&test=2').flush({});
      }));

    it('for an arraybuffer', () =>
      new Promise<void>((done) => {
        const body = new ArrayBuffer(4);
        client.get('/test', { responseType: 'arraybuffer' }).subscribe((res) => {
          expect(res).toBe(body);
          done();
        });
        backend.expectOne('/test').flush(body);
      }));

    if (typeof Blob !== 'undefined') {
      it('for a blob', () =>
        new Promise<void>((done) => {
          const body = new Blob([new ArrayBuffer(4)]);
          client.get('/test', { responseType: 'blob' }).subscribe((res) => {
            expect(res).toBe(body);
            done();
          });
          backend.expectOne('/test').flush(body);
        }));
    }

    it('that returns a response', () =>
      new Promise<void>((done) => {
        const body = { data: 'hello world' };
        client.get('/test', { observe: 'response' }).subscribe((res) => {
          expect(res instanceof HttpResponse).toBe(true);
          expect(res.body).toBe(body);
          done();
        });
        backend.expectOne('/test').flush(body);
      }));

    it('that returns a stream of events', () =>
      new Promise<void>((done) => {
        client
          .get('/test', { observe: 'events' })
          .pipe(toArray())
          .toPromise()
          .then((events) => {
            expect(events!.length).toBe(2);
            expect(events![0].type).toBe(HttpEventType.Sent);
            expect(events![1].type).toBe(HttpEventType.Response);
            expect(events![1] instanceof HttpResponse).toBeTruthy();
            done();
          });
        backend.expectOne('/test').flush({ data: 'hello world' });
      }));

    it('with progress events enabled', () =>
      new Promise<void>((done) => {
        client.get('/test', { reportProgress: true }).subscribe(() => done());
        const req = backend.expectOne('/test');
        expect(req.request.reportProgress).toEqual(true);
        req.flush({});
      }));
  });
  describe('makes a POST request', () => {
    it('with text data', () =>
      new Promise<void>((done) => {
        client
          .post('/test', { body: 'text body', observe: 'response', responseType: 'text' })
          .subscribe((res) => {
            expect(res.ok).toBeTruthy();
            expect(res.status).toBe(HttpStatusCode.Ok);
            done();
          });
        backend.expectOne('/test').flush('hello world');
      }));

    it('with json data', () =>
      new Promise<void>((done) => {
        const body = { data: 'json body' };
        client
          .post('/test', { body, observe: 'response', responseType: 'text' })
          .subscribe((res) => {
            expect(res.ok).toBeTruthy();
            expect(res.status).toBe(HttpStatusCode.Ok);
            done();
          });
        const testReq = backend.expectOne('/test');
        expect(testReq.request.body).toBe(body);
        testReq.flush('hello world');
      }));

    it('validates all fetch API options are properly handled', () =>
      new Promise<void>((done) => {
        client
          .post('/test', {
            body: {},
            credentials: 'include',
            cache: 'force-cache',
            priority: 'high',
            mode: 'cors',
            redirect: 'follow',
            referrer: 'www.example.com',
            integrity: 'sha256-abc',
            timeout: 1000,
            keepalive: true,
            withCredentials: true,
          })
          .subscribe(() => {
            done();
          });
        const testReq = backend.expectOne('/test');
        expect(testReq.request.credentials).toBe('include');
        expect(testReq.request.cache).toBe('force-cache');
        expect(testReq.request.priority).toBe('high');
        expect(testReq.request.mode).toBe('cors');
        expect(testReq.request.redirect).toBe('follow');
        expect(testReq.request.referrer).toBe('www.example.com');
        expect(testReq.request.integrity).toBe('sha256-abc');
        expect(testReq.request.timeout).toBe(1000);
        expect(testReq.request.keepalive).toBe(true);
        expect(testReq.request.withCredentials).toBe(true);
        expect(testReq.request.body).toEqual({});
        testReq.flush({});
      }));

    it('with a json body of false', () =>
      new Promise<void>((done) => {
        client
          .post('/test', { body: false, observe: 'response', responseType: 'text' })
          .subscribe((res) => {
            expect(res.ok).toBeTruthy();
            expect(res.status).toBe(HttpStatusCode.Ok);
            done();
          });
        const testReq = backend.expectOne('/test');
        expect(testReq.request.body).toBe(false);
        testReq.flush('hello world');
      }));

    it('with a json body of 0', () =>
      new Promise<void>((done) => {
        client
          .post('/test', { body: 0, observe: 'response', responseType: 'text' })
          .subscribe((res) => {
            expect(res.ok).toBeTruthy();
            expect(res.status).toBe(HttpStatusCode.Ok);
            done();
          });
        const testReq = backend.expectOne('/test');
        expect(testReq.request.body).toBe(0);
        testReq.flush('hello world');
      }));

    it('with an arraybuffer', () =>
      new Promise<void>((done) => {
        const body = new ArrayBuffer(4);
        client
          .post('/test', { body, observe: 'response', responseType: 'text' })
          .subscribe((res) => {
            expect(res.ok).toBeTruthy();
            expect(res.status).toBe(HttpStatusCode.Ok);
            done();
          });
        const testReq = backend.expectOne('/test');
        expect(testReq.request.body).toBe(body);
        testReq.flush('hello world');
      }));
  });
  describe('makes a DELETE request', () => {
    it('with body', () =>
      new Promise<void>((done) => {
        const body = { data: 'json body' };
        client
          .delete('/test', { observe: 'response', responseType: 'text', body: body })
          .subscribe((res) => {
            expect(res.ok).toBeTruthy();
            expect(res.status).toBe(200);
            done();
          });
        const testReq = backend.expectOne('/test');
        expect(testReq.request.body).toBe(body);
        testReq.flush('hello world');
      }));

    it('without body', () =>
      new Promise<void>((done) => {
        client.delete('/test', { observe: 'response', responseType: 'text' }).subscribe((res) => {
          expect(res.ok).toBeTruthy();
          expect(res.status).toBe(200);
          done();
        });
        const testReq = backend.expectOne('/test');
        expect(testReq.request.body).toBe(null);
        testReq.flush('hello world');
      }));
  });
  describe('makes a request for an error response', () => {
    it('with a JSON body', () =>
      new Promise<void>((done) => {
        client.get('/test').subscribe(
          () => {},
          (res: HttpErrorResponse) => {
            expect(res.error.data).toEqual('hello world');
            done();
          },
        );
        backend
          .expectOne('/test')
          .flush(
            { data: 'hello world' },
            { status: HttpStatusCode.InternalServerError, statusText: 'Server error' },
          );
      }));
  });

  describe('do not throw error', () => {
    // The behavior has changed. Now `null` it is removes the header

    it('for a request with nullish header', () => {
      client.request('GET', '/test', { headers: { foo: null } }).subscribe();
      expect(() =>
        backend.expectOne('/test').request.headers.has('random-header'),
      ).not.toThrowError();
    });
  });
});
