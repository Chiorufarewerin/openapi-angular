import type { HttpResourceOptions, HttpResourceRef } from '@angular/common/http';
import type { HttpMethod } from 'openapi-typescript-helpers';

export type OpenapiResourceOptions<TResult, TRaw> = HttpResourceOptions<TResult, TRaw>;

export interface OpenapiResourceRef<T> extends HttpResourceRef<T> {
  hasValue(
    this: T extends undefined ? this : never,
  ): this is OpenapiResourceRef<Exclude<T, undefined>>;
}

export type OpenapiResourceRequest<
  Method extends Uppercase<HttpMethod>,
  Path extends string,
  Init,
> = {
  url: Path;
  method?: Method;
} & Omit<Init, 'observe' | 'responseType'>;
