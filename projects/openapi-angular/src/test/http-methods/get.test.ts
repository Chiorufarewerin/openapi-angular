import { describe, expect, test } from 'vitest';
import type { paths } from './schemas/get.js';
import { firstEntryFrom, openapiTestingClient } from '../testing.js';
import { HttpErrorResponse } from '@angular/common/http';

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
      title: 'My Post',
      body: '<p>This is a very good post</p>',
      publish_date: new Date('2023-03-01T12:00:00Z').getTime(),
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

    // assert correct URL was called
    expect(actualPathname).toBe('/posts/123');

    // assert correct data was returned
    expect(response.body).toEqual(mockData);
    expect(response.status).toBe(200);

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

  // note: this was a previous bug in the type inference
  test('handles array-type responses', async () => {
    using client = openapiTestingClient<paths>({}, () => ({ body: [] }));

    const { data } = await firstEntryFrom(client.get('/posts', { params: {} }));
    if (!data) {
      throw new Error('data empty');
    }

    // assert array type (and only array type) was inferred
    expect(data.length).toBe(0);
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
