import type { OpenapiRequest } from 'openapi-angular';
import type { HttpMethod } from 'openapi-typescript-helpers';

import type { ResponseType } from './util';

export interface OpenapiResourceRequest<Method extends Uppercase<HttpMethod> | undefined>
  extends Omit<OpenapiRequest<unknown>, 'observe' | 'responseType'> {
  method?: [Method] extends [string] ? Method : never;
  url: string;
}

/**
 * @internal
 */
export interface ResourceRequest extends OpenapiResourceRequest<Uppercase<HttpMethod>> {
  method: Uppercase<HttpMethod>;
  responseType: ResponseType;
  observe: 'events';
}
