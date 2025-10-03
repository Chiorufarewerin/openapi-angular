import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { MediaType } from 'openapi-typescript-helpers';

import type { OpenapiClientOptions } from '../../public-api';
import type { OpenapiResourceFn } from '../../resource/public-api';
import { openapiResourceFactory } from '../../resource/public-api';
import { openapiTestingClient, type OpenapiTestingOnRequestFn } from '../testing';

export function openapiTestingResource<Paths extends {}, Media extends MediaType = MediaType>(
  options?: OpenapiClientOptions,
  onRequest: OpenapiTestingOnRequestFn = () => ({}),
): OpenapiResourceFn<Paths, Media> & {
  [Symbol.dispose]: () => void;
  whenStable: () => Promise<void>;
} {
  const client = openapiTestingClient(options, onRequest);
  const resource = openapiResourceFactory(client._options_);
  const applicationRef = TestBed.inject(ApplicationRef);

  (resource as any)[Symbol.dispose] = client[Symbol.dispose];
  (resource as any)['whenStable'] = applicationRef.whenStable.bind(applicationRef);

  return resource as any;
}
