import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { assertType, describe, expect, expectTypeOf, test } from 'vitest';

import { firstEntryFrom, openapiTestingClient } from '../testing.js';
import type { components, paths } from './schemas/common.js';

type Resource = components['schemas']['Resource'];

describe('response', () => {
  describe('data/error', () => {
    test('valid path', async () => {
      using client = openapiTestingClient<paths>();

      const result = await firstEntryFrom(client.get('/resources'));

      // 1. assert data & error may be undefined initially
      assertType<Resource[] | undefined>(result.data);
      // BEHAVIOR CHANGED errors are untyped
      // assertType<Error | undefined>(result.error);

      // 2. assert data is not undefined inside condition block
      if (result.data) {
        assertType<NonNullable<Resource[]>>(result.data);
        assertType<undefined>(result.error);
      }

      // BEHAVIOR CHANGED errors are untyped
      // 2b. inverse should work, too
      // if (!result.error) {
      //   assertType<NonNullable<Resource[]>>(result.data);
      //   assertType<undefined>(result.error);
      // }

      // // 3. assert error is not undefined inside condition block
      // if (result.error) {
      //   assertType<undefined>(result.data);
      //   assertType<NonNullable<Error>>(result.error);
      // }
      // 3b. inverse should work, too
      if (!result.data) {
        assertType<undefined>(result.data);
        // BEHAVIOR CHANGED errors are untyped
        // assertType<NonNullable<Error>>(result.error);
      }
    });

    test('invalid path', async () => {
      using client = openapiTestingClient<paths>();

      const result = await firstEntryFrom(
        client.get(
          // @ts-expect-error this should throw an error
          '/not-a-real-path',
          {},
        ),
      );

      //@ts-expect-error impossible to determine data type for invalid path
      assertType<never>(result.data);

      // BEHAVIOR CHANGED errors are untyped
      // assertType<undefined>(result.error);
    });

    test('returns union for mismatched response', async () => {
      using client = openapiTestingClient<paths>();
      const result = await firstEntryFrom(client.get('/mismatched-response'));
      if (result.data) {
        expectTypeOf(result.data).toEqualTypeOf<Resource | Resource[]>();
      } else {
        // BEHAVIOR CHANGED errors are untyped
        // expectTypeOf(result.error)
        //   .extract<{ code: number }>()
        //   .toEqualTypeOf<{ code: number; message: string }>();
        // expectTypeOf(result.error).exclude<{ code: number }>().toEqualTypeOf<never>();
      }
    });

    test('returns union for mismatched errors', async () => {
      using client = openapiTestingClient<paths>();
      const result = await firstEntryFrom(client.get('/mismatched-errors'));
      if (result.data) {
        expectTypeOf(result.data).toEqualTypeOf<Resource>();
      } else {
        expectTypeOf(result.data).toBeUndefined();
        // BEHAVIOR CHANGED errors are untyped
        // expectTypeOf(result.error)
        //   .extract<{ code: number }>()
        //   .toEqualTypeOf<{ code: number; message: string }>();
        // expectTypeOf(result.error).exclude<{ code: number }>().toEqualTypeOf(undefined);
      }
    });

    describe('media union', () => {
      using client = openapiTestingClient<paths>();

      // ⚠️ Warning: DO NOT iterate over type tests! Deduplicating runtime tests
      // is good. But these do not test runtime.
      test('application/json', async () => {
        const { data } = await firstEntryFrom(client.get('/media-json'));
        assertType<Resource[] | undefined>(data);
      });

      test('application/vnd.api+json', async () => {
        const { data } = await firstEntryFrom(client.get('/media-vnd-json'));
        assertType<Resource[] | undefined>(data);
      });

      test('text/html', async () => {
        const { data } = await firstEntryFrom(client.get('/media-text'));
        assertType<string | undefined>(data);
      });

      test('multiple', async () => {
        const { data } = await firstEntryFrom(client.get('/media-multiple'));
        assertType<{ foo: string } | { bar: string } | { baz: string } | string | undefined>(data);
      });

      test('invalid', async () => {
        const { data } = await firstEntryFrom(
          client.get(
            // @ts-expect-error not a real path
            '/invalid',
            {},
          ),
        );
        assertType<unknown>(data);
      });
    });

    test('`default` is an error', async () => {
      using client = openapiTestingClient<paths>(
        { headers: { 'Cache-Control': 'max-age=10000000' } },
        () => ({ body: { code: 500, message: 'An unexpected error occurred' }, status: 500 }),
      );

      const { error } = await firstEntryFrom(client.get('/error-default'));
      if (error) {
        // BEHAVIOR CHANGED errors are untyped
        // assertType<Error>(error);
      }
    });
  });

  describe('response object', () => {
    test.each([200, 404, 500] as const)('%s', async (status) => {
      using client = openapiTestingClient<paths>({}, () => ({
        body: { status, message: 'OK' },
        status,
      }));

      try {
        const response = await firstValueFrom(
          client.get(status === 200 ? '/resources' : `/error-${status}`, { observe: 'response' }),
        );
        expect(response.status).toBe(status);
        expect(response.status).toBe(200);
      } catch (error: unknown) {
        if (!(error instanceof HttpErrorResponse)) {
          throw error;
        }
        expect(error.status).toBe(status);
      }
    });
  });

  describe('responseType', () => {
    test('text', async () => {
      using client = openapiTestingClient<paths>({}, () => ({ body: 'hello' }));

      const data = (await firstValueFrom(
        client.get('/resources', {
          responseType: 'text',
        }),
      )) satisfies string;

      expect(data).toBe('hello');
    });

    test('arrayBuffer', async () => {
      using client = openapiTestingClient<paths>({}, () => ({
        body: new Uint8Array([1, 10, 15, 2]).buffer,
      }));

      const data = (await firstValueFrom(
        client.get('/resources', {
          responseType: 'arraybuffer',
        }),
      )) satisfies ArrayBuffer;

      expect(data?.byteLength).toBe(4);
    });

    test('blob', async () => {
      using client = openapiTestingClient<paths>({}, () => ({ body: new Blob([]) }));

      const data = (await firstValueFrom(
        client.get('/resources', {
          responseType: 'blob',
        }),
      )) satisfies Blob;

      expect(data?.constructor.name).toBe('Blob');
    });

    test('use the selected content', async () => {
      using client = openapiTestingClient<paths, 'application/ld+json'>({}, () => ({
        body: { bar: 'bar' },
      }));
      const { data } = await firstEntryFrom(
        client.get('/media-multiple', {
          headers: { Accept: 'application/ld+json' },
        }),
      );
      if (data) {
        assertType<{ bar: string }>(data);
      }
    });
  });
});
