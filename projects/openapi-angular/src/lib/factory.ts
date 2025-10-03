import { HttpClient } from '@angular/common/http';
import { assertInInjectionContext, inject, Injector } from '@angular/core';
import type { MediaType } from 'openapi-typescript-helpers';

import { OpenapiClientImpl } from './classes/client';
import type { OpenapiClient, OpenapiClientOptions } from './types/client';

export function openapiClient<Paths extends {}, Media extends MediaType = MediaType>(
  options?: OpenapiClientOptions,
): OpenapiClient<Paths, Media> {
  if (ngDevMode && !options?.injector) {
    assertInInjectionContext(openapiClient);
  }

  const injector = options?.injector ?? inject(Injector);
  const http = injector.get(HttpClient);

  return new OpenapiClientImpl<Paths, Media>(http, options);
}
