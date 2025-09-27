import { describe, test } from 'vitest';
import type { paths } from './schemas/trace.js';
import { openapiTestingClient } from '../testing.js';
import { firstValueFrom } from 'rxjs';

describe('TRACE()', () => {
  test('(not supported in Node.js)', async () => {
    using client = openapiTestingClient<paths>();
    await firstValueFrom(client.trace('/resources/{id}', { params: { path: { id: 123 } } }));
  });
});
