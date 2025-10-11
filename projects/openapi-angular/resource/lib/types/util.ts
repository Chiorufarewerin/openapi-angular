import type { OpenapiPathsWithMethod, OpenapiResponse } from 'openapi-angular';
import type { FilterKeys, HttpMethod, MediaType } from 'openapi-typescript-helpers';

import type { OpenapiResourceRequest } from './request';

/**
 * @internal
 * Symbol is used for determine whether user define method or not. It only referse as a type.
 * Without method it has to be get
 */
export declare const __RESOURCE_HTTP_METHOD__: unique symbol;

/**
 * @internal
 */
export type ResourceHttpMethod<Paths extends Record<string, Record<HttpMethod, {}>>> =
  | keyof {
      [Method in HttpMethod as Paths[keyof Paths][Method] extends undefined
        ? never
        : Uppercase<Method>]: Paths[keyof Paths][Method];
    }
  | typeof __RESOURCE_HTTP_METHOD__
  | undefined;

/**
 * @internal
 */
export type EffectiveMethod<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Method extends ResourceHttpMethod<Paths>,
> = [ResourceHttpMethod<Paths>] extends [Method]
  ? 'get'
  : Method extends undefined
    ? 'get'
    : Method extends Uppercase<HttpMethod>
      ? Lowercase<Method>
      : never;

/**
 * @internal
 */
export type PathFor<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Method extends ResourceHttpMethod<Paths>,
> = {
  [M in HttpMethod]: M extends EffectiveMethod<Paths, Method>
    ? OpenapiPathsWithMethod<Paths, M>
    : never;
}[HttpMethod];

/**
 * @internal
 */
export type RequestFor<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Path extends string,
  Method extends ResourceHttpMethod<Paths>,
> = OpenapiResourceRequest<FilterKeys<Paths[Path], EffectiveMethod<Paths, Method>>>;

/**
 * @internal
 */
export type ResponseFor<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Path extends string,
  Method extends ResourceHttpMethod<Paths>,
  Media extends MediaType,
  Request,
> = OpenapiResponse<Paths[Path][EffectiveMethod<Paths, Method>], Request, Media>;
