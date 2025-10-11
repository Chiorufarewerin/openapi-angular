import type { HttpMethod, MediaType } from 'openapi-typescript-helpers';

import type { OpenapiResourceOptions } from './options';
import type { OpenapiResourceRef } from './ref';
import type { PathFor, RequestFor, ResourceHttpMethod, ResponseFor } from './util';

export interface OpenapiResourceFn<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Media extends MediaType = MediaType,
> {
  <
    Path extends PathFor<Paths, Method>,
    Request extends RequestFor<Paths, Path, Method>,
    Response extends ResponseFor<Paths, Path, Method, Media, Request>,
    Method extends ResourceHttpMethod<Paths> = ResourceHttpMethod<Paths>,
    TResult = Response,
  >(
    url: () => (Request & { method?: Method; url: Path }) | Path,
    options: OpenapiResourceOptions<TResult, Response> & { defaultValue: NoInfer<TResult> },
  ): OpenapiResourceRef<TResult>;

  <
    Path extends PathFor<Paths, Method>,
    Request extends RequestFor<Paths, Path, Method>,
    Response extends ResponseFor<Paths, Path, Method, Media, Request>,
    Method extends ResourceHttpMethod<Paths> = ResourceHttpMethod<Paths>,
    TResult = Response,
  >(
    url: () => (Request & { method?: Method; url: Path }) | Path,
    options?: OpenapiResourceOptions<TResult, Response>,
  ): OpenapiResourceRef<TResult | undefined>;

  (
    url: () => undefined,
    options?: OpenapiResourceOptions<undefined, undefined>,
  ): OpenapiResourceRef<undefined>;

  <
    Path extends PathFor<Paths, Method>,
    Request extends RequestFor<Paths, Path, Method>,
    Response extends ResponseFor<Paths, Path, Method, Media, Request>,
    Method extends ResourceHttpMethod<Paths> = ResourceHttpMethod<Paths>,
    TResult = Response,
  >(
    url: () => (Request & { method?: Method; url: Path }) | Path | undefined,
    options: OpenapiResourceOptions<TResult, Response> & { defaultValue: NoInfer<TResult> },
  ): OpenapiResourceRef<TResult>;

  <
    Path extends PathFor<Paths, Method>,
    Request extends RequestFor<Paths, Path, Method>,
    Response extends ResponseFor<Paths, Path, Method, Media, Request>,
    Method extends ResourceHttpMethod<Paths> = ResourceHttpMethod<Paths>,
    TResult = Response,
  >(
    url: () => (Request & { method?: Method; url: Path }) | Path | undefined,
    options?: OpenapiResourceOptions<TResult, Response>,
  ): OpenapiResourceRef<TResult | undefined>;

  arrayBuffer: {
    <
      Path extends PathFor<Paths, Method>,
      Request extends RequestFor<Paths, Path, Method>,
      Method extends ResourceHttpMethod<Paths> = ResourceHttpMethod<Paths>,
      TResult = ArrayBuffer,
    >(
      url: () => (Request & { method?: Method; url: Path }) | Path,
      options: OpenapiResourceOptions<TResult, ArrayBuffer> & { defaultValue: NoInfer<TResult> },
    ): OpenapiResourceRef<TResult>;

    <
      Path extends PathFor<Paths, Method>,
      Request extends RequestFor<Paths, Path, Method>,
      Method extends ResourceHttpMethod<Paths> = ResourceHttpMethod<Paths>,
      TResult = ArrayBuffer,
    >(
      url: () => (Request & { method?: Method; url: Path }) | Path,
      options?: OpenapiResourceOptions<TResult, ArrayBuffer>,
    ): OpenapiResourceRef<TResult | undefined>;

    (
      url: () => undefined,
      options?: OpenapiResourceOptions<undefined, ArrayBuffer>,
    ): OpenapiResourceRef<undefined>;

    <
      Path extends PathFor<Paths, Method>,
      Request extends RequestFor<Paths, Path, Method>,
      Method extends ResourceHttpMethod<Paths> = ResourceHttpMethod<Paths>,
      TResult = ArrayBuffer,
    >(
      url: () => (Request & { method?: Method; url: Path }) | Path | undefined,
      options: OpenapiResourceOptions<TResult, ArrayBuffer> & { defaultValue: NoInfer<TResult> },
    ): OpenapiResourceRef<TResult>;

    <
      Path extends PathFor<Paths, Method>,
      Request extends RequestFor<Paths, Path, Method>,
      Method extends ResourceHttpMethod<Paths> = ResourceHttpMethod<Paths>,
      TResult = ArrayBuffer,
    >(
      url: () => (Request & { method?: Method; url: Path }) | Path | undefined,
      options?: OpenapiResourceOptions<TResult, ArrayBuffer>,
    ): OpenapiResourceRef<TResult | undefined>;
  };

  blob: {
    <
      Path extends PathFor<Paths, Method>,
      Request extends RequestFor<Paths, Path, Method>,
      Method extends ResourceHttpMethod<Paths> = ResourceHttpMethod<Paths>,
      TResult = Blob,
    >(
      url: () => (Request & { method?: Method; url: Path }) | Path,
      options: OpenapiResourceOptions<TResult, Blob> & { defaultValue: NoInfer<TResult> },
    ): OpenapiResourceRef<TResult>;

    <
      Path extends PathFor<Paths, Method>,
      Request extends RequestFor<Paths, Path, Method>,
      Method extends ResourceHttpMethod<Paths> = ResourceHttpMethod<Paths>,
      TResult = Blob,
    >(
      url: () => (Request & { method?: Method; url: Path }) | Path,
      options?: OpenapiResourceOptions<TResult, Blob>,
    ): OpenapiResourceRef<TResult | undefined>;

    (
      url: () => undefined,
      options?: OpenapiResourceOptions<undefined, Blob>,
    ): OpenapiResourceRef<undefined>;

    <
      Path extends PathFor<Paths, Method>,
      Request extends RequestFor<Paths, Path, Method>,
      Method extends ResourceHttpMethod<Paths> = ResourceHttpMethod<Paths>,
      TResult = Blob,
    >(
      url: () => (Request & { method?: Method; url: Path }) | Path | undefined,
      options: OpenapiResourceOptions<TResult, Blob> & { defaultValue: NoInfer<TResult> },
    ): OpenapiResourceRef<TResult>;

    <
      Path extends PathFor<Paths, Method>,
      Request extends RequestFor<Paths, Path, Method>,
      Method extends ResourceHttpMethod<Paths> = ResourceHttpMethod<Paths>,
      TResult = Blob,
    >(
      url: () => (Request & { method?: Method; url: Path }) | Path | undefined,
      options?: OpenapiResourceOptions<TResult, Blob>,
    ): OpenapiResourceRef<TResult | undefined>;
  };

  text: {
    <
      Path extends PathFor<Paths, Method>,
      Request extends RequestFor<Paths, Path, Method>,
      Method extends ResourceHttpMethod<Paths> = ResourceHttpMethod<Paths>,
      TResult = string,
    >(
      url: () => (Request & { method?: Method; url: Path }) | Path,
      options: OpenapiResourceOptions<TResult, string> & { defaultValue: NoInfer<TResult> },
    ): OpenapiResourceRef<TResult>;

    <
      Path extends PathFor<Paths, Method>,
      Request extends RequestFor<Paths, Path, Method>,
      Method extends ResourceHttpMethod<Paths> = ResourceHttpMethod<Paths>,
      TResult = string,
    >(
      url: () => (Request & { method?: Method; url: Path }) | Path,
      options?: OpenapiResourceOptions<TResult, string>,
    ): OpenapiResourceRef<TResult | undefined>;

    (
      url: () => undefined,
      options?: OpenapiResourceOptions<undefined, string>,
    ): OpenapiResourceRef<undefined>;

    <
      Path extends PathFor<Paths, Method>,
      Request extends RequestFor<Paths, Path, Method>,
      Method extends ResourceHttpMethod<Paths> = ResourceHttpMethod<Paths>,
      TResult = string,
    >(
      url: () => (Request & { method?: Method; url: Path }) | Path | undefined,
      options: OpenapiResourceOptions<TResult, string> & { defaultValue: NoInfer<TResult> },
    ): OpenapiResourceRef<TResult>;

    <
      Path extends PathFor<Paths, Method>,
      Request extends RequestFor<Paths, Path, Method>,
      Method extends ResourceHttpMethod<Paths> = ResourceHttpMethod<Paths>,
      TResult = string,
    >(
      url: () => (Request & { method?: Method; url: Path }) | Path | undefined,
      options?: OpenapiResourceOptions<TResult, string>,
    ): OpenapiResourceRef<TResult | undefined>;
  };
}
