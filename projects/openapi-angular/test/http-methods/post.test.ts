import type { HttpRequest } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { describe, expect, test } from 'vitest';

import { firstEntryFrom, openapiTestingClient } from '../testing.js';
import type { paths } from './schemas/post.js';

describe('POST', () => {
  test('sends the correct method', async () => {
    let method = '';
    using client = openapiTestingClient<paths>({}, (req) => {
      method = req.method;
      return {};
    });
    await firstValueFrom(
      client.post('/posts', {
        body: {
          title: 'My Post',
          body: 'Post body',
          publish_date: new Date('2024-06-06T12:00:00Z').getTime(),
        },
      }),
    );
    expect(method).toBe('POST');
  });

  describe('request body', () => {
    test('requires necessary requestBodies', async () => {
      using client = openapiTestingClient<paths>({});

      // expect error on missing `body`
      // @ts-expect-error
      await client.post(
        '/posts', // this isn’t the error
        // missing 2nd param is the error
      );

      // expect error on missing fields
      await client.post('/posts', {
        // @ts-expect-error
        body: {
          title: 'Foo',
        },
      });

      // expect present body to be good enough (all fields optional)
      // (no error)
      await client.post('/posts', {
        body: {
          title: 'Foo',
          body: 'Bar',
          publish_date: new Date('2023-04-01T12:00:00Z').getTime(),
        },
      });
    });

    test('requestBody (inline)', async () => {
      using client = openapiTestingClient<paths>({});

      // expect error on wrong body type
      await client.post('/posts-optional-inline', {
        // @ts-expect-error
        body: { error: true },
      });

      // (no error)
      await client.post('/posts-optional-inline', {
        body: {
          title: '',
          publish_date: 3,
          body: '',
        },
      });
    });

    test('requestBody with required: false', async () => {
      using client = openapiTestingClient<paths>({});

      // assert missing `body` doesn’t raise a TS error
      await client.post('/posts-optional');

      // assert error on type mismatch
      await client.post('/posts-optional', {
        body: {
          // @ts-expect-error
          error: true,
        },
      });

      // assert error on type mismatch
      await client.post('/posts-optional', {
        body: {
          // @ts-expect-error
          title: 42,
          body: '',
        },
      });

      // (no error)
      await client.post('/posts-optional', {
        body: {
          title: '',
          publish_date: 3,
          body: '',
        },
      });
    });
  });

  test('sends correct options, returns success', async () => {
    const mockData = { status: 'success' };
    let actualPathname = '';
    using client = openapiTestingClient<paths>({}, (rqq) => {
      actualPathname = new URL(rqq.url).pathname;
      return { body: mockData, status: 201 };
    });

    const { data: response, error } = await firstEntryFrom(
      client.post('/posts', {
        body: {
          title: 'New Post',
          body: '<p>Best post yet</p>',
          publish_date: new Date('2023-03-31T12:00:00Z').getTime(),
        },
        observe: 'response',
      }),
    );

    if (!response) {
      throw Error('Response should be created');
    }

    // assert correct URL was called
    expect(actualPathname).toBe('/posts');

    // assert correct data was returned
    expect(response.body).toEqual(mockData);
    expect(response.status).toBe(201);

    // assert error is empty
    expect(error).toBeUndefined();
  });

  describe('multipart/form-data', () => {
    test('simple', async () => {
      let actualRequest!: HttpRequest<unknown>;
      using client = openapiTestingClient<paths>({}, (req) => {
        actualRequest = req.clone();
        return {};
      });
      const reqBody = {
        title: 'My Post',
        body: 'Post body',
        publish_date: new Date('2024-06-06T12:00:00Z').getTime(),
      };
      await firstValueFrom(
        client.post('/posts', {
          body: reqBody,
          bodySerializer(body) {
            const fd = new FormData();
            for (const name in body) {
              fd.append(name, body[name as keyof typeof body] as string);
            }
            return fd;
          },
        }),
      );

      const body = actualRequest.body as FormData;
      expect(body.get('title')).toBe(reqBody.title);
      // BEHAVIOR CHANGED no sending Content-Type multipart/form-data
      // Angular doesn't send it, probably there are no need for FormData
      // expect(actualRequest.headers.get('Content-Type')).toMatch(/multipart\/form-data;/);
    });

    test('file', async () => {
      const TEST_STRING = 'Hello this is text file string';

      const file = new Blob([TEST_STRING], { type: 'text/plain' });
      const formData = new FormData();
      formData.append('file', file);

      const initialSize = file.size;

      using client = openapiTestingClient<paths>({}, (req) => {
        const formData = req.body as FormData;
        const file = formData.get('file') as File;
        return { body: { size: file.size } };
      });

      const data = await firstValueFrom(
        client.post('/multipart-form-data-file-upload', {
          // TODO: how to get this to accept FormData?
          body: formData as unknown as string,
        }),
      );

      expect(data?.size).toBe(initialSize);
    });
  });
});
