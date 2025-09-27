import { firstValueFrom } from 'rxjs';
import { describe, expect, test } from 'vitest';
import type { paths } from './schemas/options.js';
import { openapiTestingClient } from '../testing.js';
import { HttpHeaders } from '@angular/common/http';

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
