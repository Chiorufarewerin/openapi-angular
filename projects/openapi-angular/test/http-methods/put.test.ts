import { firstValueFrom } from 'rxjs';
import { describe, expect, test } from 'vitest';

import { openapiTestingClient } from '../testing.js';
import type { paths } from './schemas/put.js';

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
