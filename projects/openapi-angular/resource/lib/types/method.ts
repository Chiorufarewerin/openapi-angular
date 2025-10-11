import type { HttpMethod } from 'openapi-typescript-helpers';

/**
 * @internal
 * Symbol is used for determine whether user define method or not. It only referse as a type for internal purpose only.
 */
export declare const __OPENAPI_RESOURCE_METHOD__: unique symbol;

/**
 * @internal
 * Returns all available methods in paths
 */
export type MethodFor<Paths extends Record<string, Record<HttpMethod, {}>>> =
  | keyof {
      [Method in HttpMethod as Paths[keyof Paths][Method] extends undefined
        ? never
        : Uppercase<Method>]: Paths[keyof Paths][Method];
    }
  | typeof __OPENAPI_RESOURCE_METHOD__
  | undefined;

/**
 * @internal
 * Checks whether is defined method
 * - if not (every method with __OPENAPI_RESOURCE_METHOD__) nor explicity undefined, then returns `get`
 * - otherwise Method
 */
export type EffectiveMethod<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Method extends MethodFor<Paths>,
> = [MethodFor<Paths>] extends [Method]
  ? 'get'
  : Method extends undefined
    ? 'get'
    : Method extends Uppercase<HttpMethod>
      ? Lowercase<Method>
      : never;
