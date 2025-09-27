import { describe, expect, test } from 'vitest';
import type { paths } from './schemas/put.js';
import { openapiTestingClient } from '../testing.js';
import { firstValueFrom } from 'rxjs';

describe('PUT', () => {
  test('sends the correct method', async () => {
    let method = '';
    using client = openapiTestingClient<paths>({}, (req) => {
      method = req.method;
      return {};
    });
    await firstValueFrom(
      client.put('/resources', {
        body: { name: 'New name' },
      }),
    );
    expect(method).toBe('PUT');
  });
});
