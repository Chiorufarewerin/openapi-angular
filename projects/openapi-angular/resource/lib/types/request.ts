import type { OpenapiHttpRequestOptions, OpenapiRequest } from 'openapi-angular';
import type { HttpMethod } from 'openapi-typescript-helpers';

export type OpenapiResourceRequest<T> = Omit<OpenapiRequest<T>, 'observe' | 'responseType'> & {
  method?: Uppercase<HttpMethod> | undefined;
  url?: string;
};

/**
 * @internal
 */
export type ResourceResponseType = Extract<OpenapiHttpRequestOptions['responseType'], string>;

/**
 * @internal
 */
export type ResourceRequest = OpenapiResourceRequest<any> & {
  method: Uppercase<HttpMethod>;
  url: string;
  responseType: ResourceResponseType;
  observe: 'events';
};
