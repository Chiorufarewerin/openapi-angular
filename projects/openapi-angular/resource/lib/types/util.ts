import type { OpenapiHttpRequestOptions } from 'openapi-angular';
import type { RequiredKeysOf } from 'openapi-typescript-helpers';

export type Default<T, U> = T extends undefined ? U : T;

export type OptionalUndefined<T> = Pick<T, RequiredKeysOf<T>> & Partial<Omit<T, RequiredKeysOf<T>>>;

export type ResponseType = NonNullable<OpenapiHttpRequestOptions['responseType']>;

export type PathStr<P> = Extract<P, string>;
export type MaybeUndef<P, T> = Extract<P, undefined> extends never ? T : T | undefined;
