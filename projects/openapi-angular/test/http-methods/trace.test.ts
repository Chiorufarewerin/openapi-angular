import { firstValueFrom } from 'rxjs';
import { describe, test } from 'vitest';

import { openapiTestingClient } from '../testing.js';
import type { paths } from './schemas/trace.js';

describe('TRACE()', () => {
  test('(not supported in Node.js)', async () => {
    using client = openapiTestingClient<paths>();
    await firstValueFrom(client.trace('/resources/{id}', { params: { path: { id: 123 } } }));
  });
});
