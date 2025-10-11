import type { HttpMethod, MediaType } from 'openapi-typescript-helpers';

import type { MethodFor } from './method';
import type { OpenapiResourceOptions } from './options';
import type { PathFor } from './path';
import type { OpenapiResourceRef } from './ref';
import type { RequestFor } from './request';
import type { ResponseFor } from './response';

/**
 * Type for the `OpenapiResource` top-level function, which includes the call signatures for the JSON-
 * based `OpenapiRequest` as well as sub-functions for `ArrayBuffer`, `Blob`, and `string` type
 * requests.
 */
export interface OpenapiResourceFn<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Media extends MediaType = MediaType,
> {
  <
    Method extends MethodFor<Paths>,
    Path extends PathFor<Paths, Method>,
    Resp = ResponseFor<Paths, Method, Path, Media, RequestFor<Paths, Method, Path>>,
    TResult = Resp,
  >(
    request: () => RequestFor<Paths, Method, Path>,
    options: OpenapiResourceOptions<TResult, Resp> & { defaultValue: NoInfer<TResult> },
  ): OpenapiResourceRef<TResult>;

  <
    Method extends MethodFor<Paths>,
    Path extends PathFor<Paths, Method>,
    Resp = ResponseFor<Paths, Method, Path, Media, RequestFor<Paths, Method, Path>>,
    TResult = Resp,
  >(
    request: () => RequestFor<Paths, Method, Path>,
    options?: OpenapiResourceOptions<TResult, Resp>,
  ): OpenapiResourceRef<TResult | undefined>;

  <Resp = undefined, TResult = undefined>(
    request: () => undefined,
    options?: OpenapiResourceOptions<TResult, Resp>,
  ): OpenapiResourceRef<undefined>;

  <
    Method extends MethodFor<Paths>,
    Path extends PathFor<Paths, Method>,
    Resp = ResponseFor<Paths, Method, Path, Media, RequestFor<Paths, Method, Path>>,
    TResult = Resp,
  >(
    request: () => RequestFor<Paths, Method, Path> | undefined,
    options: OpenapiResourceOptions<TResult, Resp> & { defaultValue: NoInfer<TResult> },
  ): OpenapiResourceRef<TResult>;

  <
    Method extends MethodFor<Paths>,
    Path extends PathFor<Paths, Method>,
    Resp = ResponseFor<Paths, Method, Path, Media, RequestFor<Paths, Method, Path>>,
    TResult = Resp,
  >(
    request: () => RequestFor<Paths, Method, Path> | undefined,
    options?: OpenapiResourceOptions<TResult, Resp>,
  ): OpenapiResourceRef<TResult | undefined>;

  arrayBuffer: {
    <
      Method extends MethodFor<Paths>,
      Path extends PathFor<Paths, Method>,
      Resp = ArrayBuffer,
      TResult = Resp,
    >(
      request: () => RequestFor<Paths, Method, Path>,
      options: OpenapiResourceOptions<TResult, Resp> & { defaultValue: NoInfer<TResult> },
    ): OpenapiResourceRef<TResult>;

    <
      Method extends MethodFor<Paths>,
      Path extends PathFor<Paths, Method>,
      Resp = ArrayBuffer,
      TResult = Resp,
    >(
      request: () => RequestFor<Paths, Method, Path>,
      options?: OpenapiResourceOptions<TResult, Resp>,
    ): OpenapiResourceRef<TResult | undefined>;

    <Resp = ArrayBuffer, TResult = undefined>(
      request: () => undefined,
      options?: OpenapiResourceOptions<TResult, Resp>,
    ): OpenapiResourceRef<undefined>;

    <
      Method extends MethodFor<Paths>,
      Path extends PathFor<Paths, Method>,
      Resp = ArrayBuffer,
      TResult = Resp,
    >(
      request: () => RequestFor<Paths, Method, Path> | undefined,
      options: OpenapiResourceOptions<TResult, Resp> & { defaultValue: NoInfer<TResult> },
    ): OpenapiResourceRef<TResult>;

    <
      Method extends MethodFor<Paths>,
      Path extends PathFor<Paths, Method>,
      Resp = ArrayBuffer,
      TResult = Resp,
    >(
      request: () => RequestFor<Paths, Method, Path> | undefined,
      options?: OpenapiResourceOptions<TResult, Resp>,
    ): OpenapiResourceRef<TResult | undefined>;
  };

  blob: {
    <
      Method extends MethodFor<Paths>,
      Path extends PathFor<Paths, Method>,
      Resp = Blob,
      TResult = Resp,
    >(
      request: () => RequestFor<Paths, Method, Path>,
      options: OpenapiResourceOptions<TResult, Resp> & { defaultValue: NoInfer<TResult> },
    ): OpenapiResourceRef<TResult>;

    <
      Method extends MethodFor<Paths>,
      Path extends PathFor<Paths, Method>,
      Resp = Blob,
      TResult = Resp,
    >(
      request: () => RequestFor<Paths, Method, Path>,
      options?: OpenapiResourceOptions<TResult, Resp>,
    ): OpenapiResourceRef<TResult | undefined>;

    <Resp = Blob, TResult = undefined>(
      request: () => undefined,
      options?: OpenapiResourceOptions<TResult, Resp>,
    ): OpenapiResourceRef<undefined>;

    <
      Method extends MethodFor<Paths>,
      Path extends PathFor<Paths, Method>,
      Resp = Blob,
      TResult = Resp,
    >(
      request: () => RequestFor<Paths, Method, Path> | undefined,
      options: OpenapiResourceOptions<TResult, Resp> & { defaultValue: NoInfer<TResult> },
    ): OpenapiResourceRef<TResult>;

    <
      Method extends MethodFor<Paths>,
      Path extends PathFor<Paths, Method>,
      Resp = Blob,
      TResult = Resp,
    >(
      request: () => RequestFor<Paths, Method, Path> | undefined,
      options?: OpenapiResourceOptions<TResult, Resp>,
    ): OpenapiResourceRef<TResult | undefined>;
  };

  text: {
    <
      Method extends MethodFor<Paths>,
      Path extends PathFor<Paths, Method>,
      Resp = string,
      TResult = Resp,
    >(
      request: () => RequestFor<Paths, Method, Path>,
      options: OpenapiResourceOptions<TResult, Resp> & { defaultValue: NoInfer<TResult> },
    ): OpenapiResourceRef<TResult>;

    <
      Method extends MethodFor<Paths>,
      Path extends PathFor<Paths, Method>,
      Resp = string,
      TResult = Resp,
    >(
      request: () => RequestFor<Paths, Method, Path>,
      options?: OpenapiResourceOptions<TResult, Resp>,
    ): OpenapiResourceRef<TResult | undefined>;

    <Resp = string, TResult = undefined>(
      request: () => undefined,
      options?: OpenapiResourceOptions<TResult, Resp>,
    ): OpenapiResourceRef<undefined>;

    <
      Method extends MethodFor<Paths>,
      Path extends PathFor<Paths, Method>,
      Resp = string,
      TResult = Resp,
    >(
      request: () => RequestFor<Paths, Method, Path> | undefined,
      options: OpenapiResourceOptions<TResult, Resp> & { defaultValue: NoInfer<TResult> },
    ): OpenapiResourceRef<TResult>;

    <
      Method extends MethodFor<Paths>,
      Path extends PathFor<Paths, Method>,
      Resp = string,
      TResult = Resp,
    >(
      request: () => RequestFor<Paths, Method, Path> | undefined,
      options?: OpenapiResourceOptions<TResult, Resp>,
    ): OpenapiResourceRef<TResult | undefined>;
  };
}
