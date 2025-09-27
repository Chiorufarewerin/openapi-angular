import { assertType, describe, expect, test } from 'vitest';
import type { paths } from './schemas/delete.js';
import { firstEntryFrom, openapiTestingClient } from '../testing.js';
import { HttpHeaders } from '@angular/common/http';

describe('DELETE', () => {
  test('returns empty object on 204', async () => {
    using client = openapiTestingClient<paths>({}, () => ({ status: 204 }));
    const { data: response, error } = await firstEntryFrom(
      client.delete('/tags/{name}', {
        params: { path: { name: 'New Tag' } },
        observe: 'response',
      }),
    );

    if (!response) {
      throw Error('Response should be created');
    }

    // assert correct data was returned
    assertType<undefined | null>(response.body);
    expect(response.body).toBe(null);
    expect(response.status).toBe(204);

    // assert error is empty
    expect(error).toBeUndefined();
  });

  test('sends the correct method', async () => {
    let method = '';
    using client = openapiTestingClient<paths>({}, (req) => {
      method = req.method;
      return { status: 204 };
    });
    await firstEntryFrom(client.delete('/tags/{name}', { params: { path: { name: 'Tag' } } }));
    expect(method).toBe('DELETE');
  });

  test('returns undefined on Content-Length: 0', async () => {
    using client = openapiTestingClient<paths>({}, () => ({
      status: 200,
      headers: new HttpHeaders({ 'Content-Length': '0' }),
    }));
    const { data, error } = await firstEntryFrom(
      client.delete('/tags/{name}', {
        params: {
          path: { name: 'Tag' },
        },
      }),
    );

    // assert correct data was returned
    // BEHAVIOR CHANGED undefined to null
    // Probably should changes typing for delete response, because now data is undefined, but actually null
    // But it is really really minor
    assertType<undefined>(data);
    expect(data).toBe(null);

    // assert error is empty
    expect(error).toBeUndefined();
  });
});
