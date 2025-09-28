import { HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { describe, expect, test } from 'vitest';

import { openapiTestingClient } from '../testing.js';
import type { paths } from './schemas/options.js';

describe('OPTIONS', () => {
  test('sends the correct method', async () => {
    let method = '';
    using client = openapiTestingClient<paths>({}, (req) => {
      method = req.method;
      return { headers: new HttpHeaders({ Allow: 'OPTIONS, GET, HEAD, POST' }) };
    });
    await firstValueFrom(client.options('/resources', { parseAs: 'text' }));
    expect(method).toBe('OPTIONS');
  });
});
