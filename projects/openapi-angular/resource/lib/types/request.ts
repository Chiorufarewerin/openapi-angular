import type { OpenapiHttpRequestOptions, OpenapiRequest } from 'openapi-angular';
import type { FilterKeys, HttpMethod, RequiredKeysOf } from 'openapi-typescript-helpers';

import type { EffectiveMethod, MethodFor } from './method';
import type { EffectivePath, PathFor } from './path';

/**
 * Openapi resource request params
 */
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

/**
 * @internal
 */
export type RequestFor<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Method extends MethodFor<Paths>,
  Path extends PathFor<Paths, Method>,
> =
  | (OpenapiResourceRequest<
      FilterKeys<Paths[EffectivePath<Paths, Method, Path>], EffectiveMethod<Paths, Method>>
    > & {
      method?: Method;
      url: Path;
    })
  | {
      [Pathname in keyof Paths]: Paths[Pathname] extends {
        [K in EffectiveMethod<Paths, Method>]: any;
      }
        ? Pathname extends Path
          ? RequiredKeysOf<
              OpenapiResourceRequest<
                FilterKeys<
                  Paths[EffectivePath<Paths, Method, Pathname>],
                  EffectiveMethod<Paths, Method>
                >
              >
            > extends never
            ? Pathname
            : never
          : never
        : never;
    }[keyof Paths];
