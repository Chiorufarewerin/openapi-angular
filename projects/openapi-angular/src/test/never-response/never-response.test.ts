import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { assertType, describe, expect, test } from 'vitest';

import { firstEntryFrom, openapiTestingClient } from '../testing.js';
import type { components, paths } from './schemas/never-response.js';

describe('GET', () => {
  test('sends correct method', async () => {
    let method = '';
    using client = openapiTestingClient<paths>({}, (req) => {
      method = req.method;
      return {};
    });
    await firstEntryFrom(client.get('/posts'));
    expect(method).toBe('GET');
  });

  test('sends correct options, returns success', async () => {
    const mockData = {
      id: 123,
      title: 'My Post',
    };

    let actualPathname = '';
    using client = openapiTestingClient<paths>({}, (req) => {
      actualPathname = new URL(req.url).pathname;
      return { body: mockData };
    });

    const { data: response, error } = await firstEntryFrom(
      client.get('/posts/{id}', {
        params: { path: { id: 123 } },
        observe: 'response',
      }),
    );

    if (!response) {
      throw Error('Response should be created');
    }

    assertType<typeof mockData | undefined | null>(response.body);

    // assert correct URL was called
    expect(actualPathname).toBe('/posts/123');

    // assert correct data was returned
    expect(response.body).toEqual(mockData);
    expect(response.status).toBe(200);

    // assert error is empty
    expect(error).toBeUndefined();
  });

  test('sends correct options, returns undefined on 204', async () => {
    let actualPathname = '';
    using client = openapiTestingClient<paths>({}, (req) => {
      actualPathname = new URL(req.url).pathname;
      return { body: null, status: 204 };
    });

    const { data: response, error } = await firstEntryFrom(
      client.get('/posts/{id}', {
        params: { path: { id: 123 } },
        observe: 'response',
      }),
    );

    if (!response) {
      throw Error('Response should be created');
    }

    assertType<components['schemas']['Post'] | undefined | null>(response.body);

    // assert correct URL was called
    expect(actualPathname).toBe('/posts/123');

    // assert 204 to be transformed to be null
    // BEHAVIOR CHANGED undefined to null
    expect(response.body).toBe(null);
    expect(response.status).toBe(204);

    // assert error is empty
    expect(error).toBeUndefined();
  });

  test('sends correct options, returns error', async () => {
    const mockError = { code: 404, message: 'Post not found' };

    let method = '';
    let actualPathname = '';
    using client = openapiTestingClient<paths>({}, (req) => {
      method = req.method;
      actualPathname = new URL(req.url).pathname;
      return { body: mockError, status: 404 };
    });

    const { data, error } = await firstEntryFrom(
      client.get('/posts/{id}', {
        params: { path: { id: 123 } },
      }),
    );

    if (!(error instanceof HttpErrorResponse)) {
      throw Error('Incorrect error');
    }

    // BEHAVIOR CHANGED errors are untyped
    // assertType<typeof mockError | undefined>(error);

    // assert correct URL was called
    expect(actualPathname).toBe('/posts/123');

    // assert correct method was called
    expect(method).toBe('GET');

    // assert correct error was returned
    expect(error.error).toEqual(mockError);
    expect(error.status).toBe(404);

    // assert data is empty
    expect(data).toBeUndefined();
  });

  test('handles array-type responses', async () => {
    using client = openapiTestingClient<paths>({}, () => ({ body: [] }));

    const data = await firstValueFrom(client.get('/posts', { params: {} }));
    if (!data) {
      throw new Error('data empty');
    }

    // assert array type (and only array type) was inferred
    expect(data.length).toBe(0);
  });

  test('handles empty-array-type 204 response', async () => {
    let method = '';
    let actualPathname = '';
    using client = openapiTestingClient<paths>({}, (req) => {
      method = req.method;
      actualPathname = new URL(req.url).pathname;
      return { body: null, status: 204 };
    });

    const data = await firstValueFrom(client.get('/posts', { params: {} }));

    assertType<components['schemas']['Post'][] | unknown[] | undefined>(data);

    // assert correct URL was called
    expect(actualPathname).toBe('/posts');

    // assert correct method was called
    expect(method).toBe('GET');

    // assert 204 to be transformed to null
    // BEHAVIOR CHANGED undefined to null
    expect(data).toBe(null);
  });

  test('gracefully handles invalid JSON for errors', async () => {
    using client = openapiTestingClient<paths>({}, () => ({ body: 'Unauthorized', status: 401 }));

    const { data, error } = await firstEntryFrom(client.get('/posts'));

    if (!(error instanceof HttpErrorResponse)) {
      throw Error('Incorrect error');
    }

    expect(data).toBeUndefined();
    expect(error.error).toBe('Unauthorized');
  });
});
