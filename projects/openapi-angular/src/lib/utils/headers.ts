import { HttpHeaders } from '@angular/common/http';
import { OpenapiHeadersOptions } from '../types/openapi-header';

export function mergeHeaders(...allHeaders: (OpenapiHeadersOptions | undefined)[]): HttpHeaders {
  const finalHeaders = new Headers();
  for (const h of allHeaders) {
    if (!h || typeof h !== 'object') {
      continue;
    }
    for (const [k, v] of getHeadersIterator(h)) {
      if (v === null) {
        finalHeaders.delete(k);
      } else if (Array.isArray(v)) {
        for (const v2 of v) {
          finalHeaders.append(k, v2);
        }
      } else if (v !== undefined) {
        finalHeaders.set(k, typeof v === 'boolean' || typeof v === 'number' ? String(v) : v);
      }
    }
  }
  return new HttpHeaders(finalHeaders);
}

export function getHeadersIterator(
  headers: OpenapiHeadersOptions,
): Iterable<[string, string | string[] | boolean | number | null | undefined]> {
  if (headers instanceof Headers) {
    return headers.entries();
  }
  if (headers instanceof HttpHeaders) {
    return headers.keys().map((key) => [key, headers.getAll(key)]);
  }
  return Object.entries(headers);
}
