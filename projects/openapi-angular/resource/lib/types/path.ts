import type { OpenapiPathsWithMethod } from 'openapi-angular';
import type { HttpMethod } from 'openapi-typescript-helpers';

import type { EffectiveMethod, MethodFor } from './method';

/**
 * Symbol is used for determine whether user define path. It only referse as a type for internal purpose only.
 *
 * @internal
 */
export declare const __OPENAPI_RESOURCE_PATH__: unique symbol;

/**
 * Returns all available paths for method
 *
 * @internal
 */
export type PathFor<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Method extends MethodFor<Paths>,
> =
  | {
      [M in HttpMethod]: M extends EffectiveMethod<Paths, Method>
        ? OpenapiPathsWithMethod<Paths, M>
        : never;
    }[HttpMethod]
  | typeof __OPENAPI_RESOURCE_PATH__;

/**
 * Checks whether is defined path
 * - if not (every path with __OPENAPI_RESOURCE_PATH__), then returns never
 * - otherwise Path
 *
 * @internal
 */
export type EffectivePath<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Method extends MethodFor<Paths>,
  Path extends PathFor<Paths, Method>,
> = [PathFor<Paths, Method>] extends [Path] ? never : Path extends string ? Path : never;
