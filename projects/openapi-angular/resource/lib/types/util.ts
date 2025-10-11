import type { OpenapiPathsWithMethod, OpenapiRequest, OpenapiResponse } from 'openapi-angular';
import type { FilterKeys, HttpMethod, MediaType } from 'openapi-typescript-helpers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const __HTTP_METHOD__: unique symbol;

export type ResourceHttpMethod<Paths extends Record<string, Record<HttpMethod, {}>>> =
  | keyof {
      [Method in HttpMethod as Paths[keyof Paths][Method] extends undefined
        ? never
        : Uppercase<Method>]: Paths[keyof Paths][Method];
    }
  | typeof __HTTP_METHOD__
  | undefined;

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

export type PathFor<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Method extends ResourceHttpMethod<Paths>,
> = {
  [M in HttpMethod]: M extends EffectiveMethod<Paths, Method>
    ? OpenapiPathsWithMethod<Paths, M>
    : never;
}[HttpMethod];

export type RequestFor<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Path extends string,
  Method extends ResourceHttpMethod<Paths>,
> = {
  [M in HttpMethod]: M extends EffectiveMethod<Paths, Method>
    ? {
        [P in keyof Paths]: P extends Path ? OpenapiRequest<FilterKeys<Paths[P], M>> : never;
      }[keyof Paths]
    : never;
}[HttpMethod];

export type ResponseFor<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Path extends string,
  Method extends ResourceHttpMethod<Paths>,
  Media extends MediaType,
  Request,
> = {
  [M in HttpMethod]: M extends EffectiveMethod<Paths, Method>
    ? {
        [P in keyof Paths]: P extends Path ? OpenapiResponse<Paths[P][M], Request, Media> : never;
      }[keyof Paths]
    : never;
}[HttpMethod];
