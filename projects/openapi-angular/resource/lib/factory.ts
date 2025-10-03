import type { OpenapiClientOptions } from 'openapi-angular';
import type { MediaType } from 'openapi-typescript-helpers';

import { makeOpenapiResourceFn } from './resource';
import type { OpenapiResourceFn } from './types/resource';

export function openapiResourceFactory<Paths extends {}, Media extends MediaType = MediaType>(
  options?: OpenapiClientOptions,
): OpenapiResourceFn<Paths, Media> {
  const jsonFn = makeOpenapiResourceFn('json', options) as OpenapiResourceFn<Paths, Media>;
  // jsonFn.arrayBuffer = makeOpenapiResourceFn('arraybuffer', options);
  // jsonFn.blob = makeOpenapiResourceFn('blob', options);
  // jsonFn.text = makeOpenapiResourceFn('text', options);
  return jsonFn;
}
