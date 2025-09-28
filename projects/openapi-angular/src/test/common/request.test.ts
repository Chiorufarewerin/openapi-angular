import type { HttpHeaders, HttpRequest } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { describe, expect, test, vi } from 'vitest';

import { getHeadersIterator } from '../../lib/utils/headers.js';
import type { OpenapiBodySerializer, OpenapiRequest } from '../../public-api.js';
import { openapiTestingClient } from '../testing.js';
import type { components, paths } from './schemas/common.js';

type Resource = components['schemas']['Resource'];

const resource1: Resource = { id: 123 };
const resource2: Resource = { id: 456 };
const resource3: Resource = { id: 789 };

function headersToObj(
  headers: Headers | Record<string, string> | HttpHeaders,
): Record<string, string> {
  const iter = getHeadersIterator(headers);
  const result: Record<string, string> = {};
  for (const [k, v] of iter) {
    result[k] = (Array.isArray(v) ? v[0] : v) as string;
  }
  return result;
}

describe('request', () => {
  describe('headers', () => {
    test('default headers are preserved', async () => {
      let headers!: HttpHeaders;
      using client = openapiTestingClient<paths>({ headers: { foo: 'bar' } }, (req) => {
        headers = req.headers;
        return { body: [resource1, resource2, resource3] };
      });
      await firstValueFrom(client.get('/resources'));
      expect(headersToObj(headers)).toEqual({
        foo: 'bar',
      });
    });

    test('default headers can be overridden', async () => {
      let headers!: HttpHeaders;
      using client = openapiTestingClient<paths>(
        {
          headers: {
            foo: 'bar',
            bar: 'baz',
            baz: 'bat',
            box: 'cat',
          },
        },
        (req) => {
          headers = req.headers;
          return { body: [resource1, resource2, resource3] };
        },
      );
      await firstValueFrom(
        client.get('/resources', {
          headers: {
            foo: '',
            bar: 0,
            baz: undefined, // keeps original
            box: false,
          },
        }),
      );
      expect(headersToObj(headers)).toEqual({
        foo: '',
        bar: '0',
        baz: 'bat',
        box: 'false',
      });
    });

    test('default headers are unset with "null"', async () => {
      let headers!: HttpHeaders;
      using client = openapiTestingClient<paths>({ headers: { foo: 'bar', bar: 'baz' } }, (req) => {
        headers = req.headers;
        return { body: [resource1, resource2, resource3] };
      });
      await firstValueFrom(client.get('/resources', { headers: { foo: null } }));
      expect(headersToObj(headers)).toEqual({
        // "foo" removed!
        bar: 'baz',
      });
    });

    test('arbitrary headers are allowed on any request', async () => {
      let headers!: HttpHeaders;
      using client = openapiTestingClient<paths>({ headers }, (req) => {
        headers = req.headers;
        return { body: [resource1, resource2, resource3] };
      });
      await firstValueFrom(
        client.get('/resources', {
          headers: {
            foo: 'bar',
            bar: 123,
            baz: true,
          },
        }),
      );
      expect(headersToObj(headers)).toEqual({
        foo: 'bar',
        bar: '123',
        baz: 'true',
      });
    });

    test('supports arrays', async () => {
      let headers!: HttpHeaders;
      using client = openapiTestingClient<paths>({}, (req) => {
        headers = req.headers;
        return { body: [resource1, resource2, resource3] };
      });

      const list = ['one', 'two', 'three'];

      await firstValueFrom(client.get('/resources', { headers: { list } }));

      expect(headers.get('list')).toEqual(list.join(', '));
    });
  });

  describe('request body', () => {
    const BODY_ACCEPTING_METHODS = [['put'], ['post'], ['delete'], ['options'], ['patch']] as const;
    const ALL_METHODS = [...BODY_ACCEPTING_METHODS, ['get'], ['head']] as const;

    async function fireRequestAndGetBodyInformation(options: {
      bodySerializer?: OpenapiBodySerializer<unknown>;
      method: (typeof ALL_METHODS)[number][number];
      fetchOptions: OpenapiRequest<any>;
    }) {
      let actualRequest!: HttpRequest<unknown>;
      using client = openapiTestingClient<any>(
        { bodySerializer: options.bodySerializer },
        (req) => {
          actualRequest = req.clone();
          return { body: [] };
        },
      );
      await firstValueFrom(
        client[options.method]('/blogposts-optional', options.fetchOptions as any),
      );

      const bodyUsed = actualRequest.body !== null;
      const bodyText = actualRequest.serializeBody();
      return { bodyUsed, bodyText };
    }

    test.each(ALL_METHODS)('missing body (with body serializer) - %s', async (method) => {
      const bodySerializer = vi.fn((body) => `Serialized: ${JSON.stringify(body)}`);
      const { bodyUsed, bodyText } = await fireRequestAndGetBodyInformation({
        bodySerializer,
        method,
        fetchOptions: {},
      });

      expect(bodyUsed).toBe(false);
      expect(bodyText).toBe(null); // BEHAVIOR CHANGED '' -> null
      expect(bodySerializer).not.toBeCalled();
    });

    test.each(ALL_METHODS)('missing body (without body serializer) - %s', async (method) => {
      const { bodyUsed, bodyText } = await fireRequestAndGetBodyInformation({
        method,
        fetchOptions: {},
      });

      expect(bodyUsed).toBe(false);
      expect(bodyText).toBe(null); // BEHAVIOR CHANGED '' -> null
    });

    test.each(ALL_METHODS)('`undefined` body (with body serializer) - %s', async (method) => {
      const bodySerializer = vi.fn((body) => `Serialized: ${JSON.stringify(body)}`);
      const { bodyUsed, bodyText } = await fireRequestAndGetBodyInformation({
        bodySerializer,
        method,
        fetchOptions: {
          body: undefined,
        },
      });

      expect(bodyUsed).toBe(false);
      expect(bodyText).toBe(null); // BEHAVIOR CHANGED '' -> null
      expect(bodySerializer).not.toBeCalled();
    });

    test.each(ALL_METHODS)('`undefined` body (without body serializer) - %s', async (method) => {
      const { bodyUsed, bodyText } = await fireRequestAndGetBodyInformation({
        method,
        fetchOptions: {
          body: undefined,
        },
      });

      expect(bodyUsed).toBe(false);
      expect(bodyText).toBe(null); // BEHAVIOR CHANGED '' -> null
    });

    test.each(BODY_ACCEPTING_METHODS)('`null` body (with body serializer) - %s', async (method) => {
      const bodySerializer = vi.fn((body) => `Serialized: ${JSON.stringify(body)}`);
      const { bodyUsed, bodyText } = await fireRequestAndGetBodyInformation({
        bodySerializer,
        method,
        fetchOptions: {
          body: null,
        },
      });

      expect(bodyUsed).toBe(true);
      expect(bodyText).toBe('Serialized: null');
      expect(bodySerializer).toBeCalled();
    });

    test.each(BODY_ACCEPTING_METHODS)(
      '`null` body (without body serializer) - %s',
      async (method) => {
        const { bodyUsed, bodyText } = await fireRequestAndGetBodyInformation({
          method,
          fetchOptions: {
            body: null,
          },
        });

        expect(bodyUsed).toBe(false); // BEHAVIOR CHANGED
        expect(bodyText).toBe(null); // BEHAVIOR CHANGED
      },
    );

    test.each(BODY_ACCEPTING_METHODS)(
      '`false` body (with body serializer) - %s',
      async (method) => {
        const bodySerializer = vi.fn((body) => `Serialized: ${JSON.stringify(body)}`);
        const { bodyUsed, bodyText } = await fireRequestAndGetBodyInformation({
          bodySerializer,
          method,
          fetchOptions: {
            body: false,
          },
        });

        expect(bodyUsed).toBe(true);
        expect(bodyText).toBe('Serialized: false');
        expect(bodySerializer).toBeCalled();
      },
    );

    test.each(BODY_ACCEPTING_METHODS)(
      '`false` body (without body serializer) - %s',
      async (method) => {
        const { bodyUsed, bodyText } = await fireRequestAndGetBodyInformation({
          method,
          fetchOptions: {
            body: false,
          },
        });

        expect(bodyUsed).toBe(true);
        expect(bodyText).toBe('false');
      },
    );

    test.each(BODY_ACCEPTING_METHODS)("`''` body (with body serializer) - %s", async (method) => {
      const bodySerializer = vi.fn((body) => `Serialized: ${JSON.stringify(body)}`);
      const { bodyUsed, bodyText } = await fireRequestAndGetBodyInformation({
        bodySerializer,
        method,
        fetchOptions: {
          body: '',
        },
      });

      expect(bodyUsed).toBe(true);
      expect(bodyText).toBe('Serialized: ""');
      expect(bodySerializer).toBeCalled();
    });

    test.each(BODY_ACCEPTING_METHODS)(
      "`''` body (without body serializer) - %s",
      async (method) => {
        const { bodyUsed, bodyText } = await fireRequestAndGetBodyInformation({
          method,
          fetchOptions: {
            body: '',
          },
        });

        expect(bodyUsed).toBe(true);
        expect(bodyText).toBe(''); // BEHAVIOR CHANGED '""' -> ''
      },
    );

    test.each(BODY_ACCEPTING_METHODS)('`0` body (with body serializer) - %s', async (method) => {
      const bodySerializer = vi.fn((body) => `Serialized: ${JSON.stringify(body)}`);
      const { bodyUsed, bodyText } = await fireRequestAndGetBodyInformation({
        bodySerializer,
        method,
        fetchOptions: {
          body: 0,
        },
      });

      expect(bodyUsed).toBe(true);
      expect(bodyText).toBe('Serialized: 0');
      expect(bodySerializer).toBeCalled();
    });

    test.each(BODY_ACCEPTING_METHODS)('`0` body (without body serializer) - %s', async (method) => {
      const { bodyUsed, bodyText } = await fireRequestAndGetBodyInformation({
        method,
        fetchOptions: {
          body: 0,
        },
      });

      expect(bodyUsed).toBe(true);
      expect(bodyText).toBe('0');
    });

    // BEHAVIOR CHANGED now user needs by himself use serializer
    test('`application/x-www-form-urlencoded` body', async () => {
      const { bodyUsed, bodyText } = await fireRequestAndGetBodyInformation({
        method: 'post',
        fetchOptions: {
          body: { key1: 'value1', key2: 'value2' },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          bodySerializer: (body) => new HttpParams({ fromObject: body }),
        },
      });

      expect(bodyUsed).toBe(true);
      expect(bodyText).toBe('key1=value1&key2=value2');
    });
  });

  test('cookie header is preserved', async () => {
    let headers!: HttpHeaders;
    using client = openapiTestingClient<paths>({}, (req) => {
      headers = req.headers;
      return { body: {} };
    });
    await firstValueFrom(
      client.get('/resources', {
        credentials: 'include',
        headers: {
          Cookie: 'session=1234',
        },
      }),
    );
    expect(headers.get('cookie')).toEqual('session=1234');
  });
});
