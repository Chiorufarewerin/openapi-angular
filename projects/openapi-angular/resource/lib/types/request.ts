import type { OpenapiRequest } from 'openapi-angular';
import type { HttpMethod } from 'openapi-typescript-helpers';

import type { Default, ResponseType } from './util';

export interface OpenapiResourceRequest<Method extends HttpMethod | undefined>
  extends Omit<OpenapiRequest<unknown>, 'observe' | 'responseType'> {
  method?: Uppercase<Default<Method, 'get'>>;
  url: string;
}

/**
 * @internal
 */
export interface ResourceRequest extends OpenapiResourceRequest<HttpMethod> {
  method: Uppercase<HttpMethod>;
  responseType: ResponseType;
  observe: 'events';
}
