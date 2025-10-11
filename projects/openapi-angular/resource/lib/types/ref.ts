import type { HttpResourceRef } from '@angular/common/http';

/**
 * A `WritableResource` that represents the results of a reactive HTTP request.
 */
export interface OpenapiResourceRef<T> extends HttpResourceRef<T> {
  hasValue(
    this: T extends undefined ? this : never,
  ): this is OpenapiResourceRef<Exclude<T, undefined>>;

  hasValue(): boolean;
}
