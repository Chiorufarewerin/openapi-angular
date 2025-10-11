import type { OpenapiResponse } from 'openapi-angular';
import type { FilterKeys, HttpMethod, MediaType, RequiredKeysOf } from 'openapi-typescript-helpers';

import type { EffectiveMethod, MethodFor } from './method';
import type { EffectivePath, PathFor } from './path';
import type { OpenapiResourceRequest } from './request';

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

/**
 * @internal
 */
export type ResponseFor<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Method extends MethodFor<Paths>,
  Path extends PathFor<Paths, Method>,
  Media extends MediaType,
  Request,
> = OpenapiResponse<
  Paths[EffectivePath<Paths, Method, Path>][EffectiveMethod<Paths, Method>],
  Request,
  Media
>;
