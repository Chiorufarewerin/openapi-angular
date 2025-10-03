import type { FilterKeys, RequiredKeysOf } from 'openapi-typescript-helpers';

import type { OpenapiRequest } from './request';

export type OpenapiMaybeOptionalInit<Params, Location extends keyof Params> =
  RequiredKeysOf<OpenapiRequest<FilterKeys<Params, Location>>> extends never
    ? OpenapiRequest<FilterKeys<Params, Location>> | undefined
    : OpenapiRequest<FilterKeys<Params, Location>>;

export type OpenapiInitParam<Init> =
  RequiredKeysOf<Init> extends never
    ? readonly [(Init & { [key: string]: unknown })?]
    : readonly [Init & { [key: string]: unknown }];
