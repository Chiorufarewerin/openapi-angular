import type { OpenapiResponse } from 'openapi-angular';
import type { HttpMethod, MediaType } from 'openapi-typescript-helpers';

import type { EffectiveMethod, MethodFor } from './method';
import type { EffectivePath, PathFor } from './path';

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
