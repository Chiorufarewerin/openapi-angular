import { RequiredKeysOf, FilterKeys } from 'openapi-typescript-helpers';
import { OpenapiRequest } from './openapi-request';

export type OpenapiMaybeOptionalInit<Params, Location extends keyof Params> =
  RequiredKeysOf<OpenapiRequest<FilterKeys<Params, Location>>> extends never
    ? OpenapiRequest<FilterKeys<Params, Location>> | undefined
    : OpenapiRequest<FilterKeys<Params, Location>>;

export type OpenapiInitParam<Init> =
  RequiredKeysOf<Init> extends never
    ? [(Init & { [key: string]: unknown })?]
    : [Init & { [key: string]: unknown }];
