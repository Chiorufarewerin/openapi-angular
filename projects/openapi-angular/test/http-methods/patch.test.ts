import { firstValueFrom } from 'rxjs';
import { describe, expect, test } from 'vitest';

import { openapiTestingClient } from '../testing.js';
import type { paths } from './schemas/patch.js';

describe('PATCH', () => {
  test('sends the correct method', async () => {
    let method = '';
    using client = openapiTestingClient<paths>({}, (req) => {
      method = req.method;
      return {};
    });
    await firstValueFrom(
      client.patch('/resources/{id}', {
        params: { path: { id: 123 } },
        body: { name: 'New name' },
      }),
    );
    expect(method).toBe('PATCH');
  });
});
