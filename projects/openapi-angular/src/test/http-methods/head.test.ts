import { describe, expect, test } from 'vitest';
import type { paths } from './schemas/head.js';
import { openapiTestingClient } from '../testing.js';
import { HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

describe('HEAD', () => {
  test('sends the correct method', async () => {
    let method = '';
    using client = openapiTestingClient<paths>({}, (req) => {
      method = req.method;
      return {
        headers: new HttpHeaders({ 'Content-Length': '0' }),
      };
    });
    await firstValueFrom(client.head('/resources/{id}', { params: { path: { id: 123 } } }));
    expect(method).toBe('HEAD');
  });

  test('handles HEAD requests with non-zero Content-Length without parsing the body', async () => {
    using client = openapiTestingClient<paths>({}, () => {
      return {
        headers: new HttpHeaders({ 'Content-Length': '42', 'Content-Type': 'application/json' }),
      };
    });
    const response = await firstValueFrom(
      client.head('/resources/{id}', { params: { path: { id: 123 } }, observe: 'response' }),
    );

    // BEHAVIOR CHANGED undefined to null
    expect(response.body).toBe(null);
    expect(response.ok).toBe(true);
  });
});
