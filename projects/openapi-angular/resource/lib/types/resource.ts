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
    url: () => { method?: Method; url: Path } | Path,
    options: OpenapiResourceOptions<TResult, Response> & { defaultValue: NoInfer<TResult> },
  ): OpenapiResourceRef<TResult>;

  <
    Path extends PathFor<Paths, Method>,
    Request extends RequestFor<Paths, Path, Method>,
    Response extends ResponseFor<Paths, Path, Method, Media, Request>,
    Method extends ResourceHttpMethod<Paths> = ResourceHttpMethod<Paths>,
    TResult = Response,
  >(
    url: () => { method?: Method; url: Path } | Path,
    options?: OpenapiResourceOptions<TResult, Response>,
  ): OpenapiResourceRef<TResult | undefined>;

  (
    url: () => undefined,
    options?: OpenapiResourceOptions<undefined, Response>,
  ): OpenapiResourceRef<undefined>;

  <
    Path extends PathFor<Paths, Method>,
    Request extends RequestFor<Paths, Path, Method>,
    Response extends ResponseFor<Paths, Path, Method, Media, Request>,
    Method extends ResourceHttpMethod<Paths> = ResourceHttpMethod<Paths>,
    TResult = Response,
  >(
    url: () => { method?: Method; url: Path } | Path | undefined,
    options: OpenapiResourceOptions<TResult, Response> & { defaultValue: NoInfer<TResult> },
  ): OpenapiResourceRef<TResult>;

  <
    Path extends PathFor<Paths, Method>,
    Request extends RequestFor<Paths, Path, Method>,
    Response extends ResponseFor<Paths, Path, Method, Media, Request>,
    Method extends ResourceHttpMethod<Paths> = ResourceHttpMethod<Paths>,
    TResult = Response,
  >(
    url: () => { method?: Method; url: Path } | Path | undefined,
    options?: OpenapiResourceOptions<TResult, Response>,
  ): OpenapiResourceRef<TResult | undefined>;

  // <Input extends { method: HttpMethod } | undefined>(
  //   request: () => Input,
  //   options?: unknown,
  // ): Input;

  // <
  //   Input extends
  //     | {
  //         url: PathFor<
  //           Paths,
  //           Input extends { method?: Uppercase<HttpMethod> }
  //             ? Lowercase<Default<Input['method'], 'GET'>>
  //             : undefined
  //         >;
  //         method?: Uppercase<HttpMethod>;
  //       }
  //     | undefined,
  // >(
  //   request: () => Input,
  //   options?: unknown,
  // ): Input;

  // <
  //   Method extends HttpMethod | undefined,
  //   Path extends PathFor<Paths, Method>,
  //   Request extends RequestFor<Paths, Path, Method>,
  //   Response extends ResponseFor<Paths, Path, Method, Media, Request>,
  //   TResult = Response,
  // >(
  //   request: () => OpenapiResourceRequest<Default<Method, 'GET'>, Path> | undefined,
  //   options?: OpenapiResourceOptions<TResult, Response>,
  // ): OpenapiResourceRef<TResult | undefined>;

  // arrayBuffer: {
  //   <
  //     Method extends 'GET',
  //     Path extends OpenapiPathsWithMethod<Paths, Lowercase<Default<Method, 'GET'>>>,
  //     TResult = ArrayBuffer,
  //   >(
  //     url: () => Path | undefined,
  //     options: OpenapiResourceOptions<TResult, ArrayBuffer> & { defaultValue: NoInfer<TResult> },
  //   ): OpenapiResourceRef<TResult>;

  //   <
  //     Method extends 'GET',
  //     Path extends OpenapiPathsWithMethod<Paths, Lowercase<Default<Method, 'GET'>>>,
  //     TResult = ArrayBuffer,
  //   >(
  //     url: () => Path | undefined,
  //     options?: OpenapiResourceOptions<TResult, ArrayBuffer>,
  //   ): OpenapiResourceRef<TResult | undefined>;

  //   <
  //     Method extends Uppercase<HttpMethod> | undefined,
  //     Path extends OpenapiPathsWithMethod<Paths, Lowercase<Default<Method, 'GET'>>>,
  //     Init extends OpenapiMaybeOptionalInit<Paths[Path], Lowercase<Default<Method, 'GET'>>>,
  //     TResult = ArrayBuffer,
  //   >(
  //     request: () => OpenapiResourceRequest<Default<Method, 'GET'>, Path> | undefined,
  //     options: OpenapiResourceOptions<TResult, ArrayBuffer> & { defaultValue: NoInfer<TResult> },
  //   ): OpenapiResourceRef<TResult>;

  //   <
  //     Method extends Uppercase<HttpMethod> | undefined,
  //     Path extends OpenapiPathsWithMethod<Paths, Lowercase<Default<Method, 'GET'>>>,
  //     Init extends OpenapiMaybeOptionalInit<Paths[Path], Lowercase<Default<Method, 'GET'>>>,
  //     TResult = ArrayBuffer,
  //   >(
  //     request: () => OpenapiResourceRequest<Default<Method, 'GET'>, Path> | undefined,
  //     options?: OpenapiResourceOptions<TResult, ArrayBuffer>,
  //   ): OpenapiResourceRef<TResult | undefined>;
  // };

  // blob: {
  //   <
  //     Method extends 'GET',
  //     Path extends OpenapiPathsWithMethod<Paths, Lowercase<Default<Method, 'GET'>>>,
  //     TResult = Blob,
  //   >(
  //     url: () => Path | undefined,
  //     options: OpenapiResourceOptions<TResult, Blob> & { defaultValue: NoInfer<TResult> },
  //   ): OpenapiResourceRef<TResult>;

  //   <
  //     Method extends 'GET',
  //     Path extends OpenapiPathsWithMethod<Paths, Lowercase<Default<Method, 'GET'>>>,
  //     TResult = Blob,
  //   >(
  //     url: () => Path | undefined,
  //     options?: OpenapiResourceOptions<TResult, Blob>,
  //   ): OpenapiResourceRef<TResult | undefined>;

  //   <
  //     Method extends Uppercase<HttpMethod> | undefined,
  //     Path extends OpenapiPathsWithMethod<Paths, Lowercase<Default<Method, 'GET'>>>,
  //     Init extends OpenapiMaybeOptionalInit<Paths[Path], Lowercase<Default<Method, 'GET'>>>,
  //     TResult = Blob,
  //   >(
  //     request: () => OpenapiResourceRequest<Default<Method, 'GET'>, Path> | undefined,
  //     options: OpenapiResourceOptions<TResult, Blob> & { defaultValue: NoInfer<TResult> },
  //   ): OpenapiResourceRef<TResult>;

  //   <
  //     Method extends Uppercase<HttpMethod> | undefined,
  //     Path extends OpenapiPathsWithMethod<Paths, Lowercase<Default<Method, 'GET'>>>,
  //     Init extends OpenapiMaybeOptionalInit<Paths[Path], Lowercase<Default<Method, 'GET'>>>,
  //     TResult = Blob,
  //   >(
  //     request: () => OpenapiResourceRequest<Default<Method, 'GET'>, Path> | undefined,
  //     options?: OpenapiResourceOptions<TResult, Blob>,
  //   ): OpenapiResourceRef<TResult | undefined>;
  // };

  // text: {
  //   <
  //     Method extends 'GET',
  //     Path extends OpenapiPathsWithMethod<Paths, Lowercase<Default<Method, 'GET'>>>,
  //     TResult = string,
  //   >(
  //     url: () => Path | undefined,
  //     options: OpenapiResourceOptions<TResult, string> & { defaultValue: NoInfer<TResult> },
  //   ): OpenapiResourceRef<TResult>;

  //   <
  //     Method extends 'GET',
  //     Path extends OpenapiPathsWithMethod<Paths, Lowercase<Default<Method, 'GET'>>>,
  //     TResult = string,
  //   >(
  //     url: () => Path | undefined,
  //     options?: OpenapiResourceOptions<TResult, string>,
  //   ): OpenapiResourceRef<TResult | undefined>;

  //   <
  //     Method extends Uppercase<HttpMethod> | undefined,
  //     Path extends OpenapiPathsWithMethod<Paths, Lowercase<Default<Method, 'GET'>>>,
  //     Init extends OpenapiMaybeOptionalInit<Paths[Path], Lowercase<Default<Method, 'GET'>>>,
  //     TResult = string,
  //   >(
  //     request: () => OpenapiResourceRequest<Default<Method, 'GET'>, Path> | undefined,
  //     options: OpenapiResourceOptions<TResult, string> & { defaultValue: NoInfer<TResult> },
  //   ): OpenapiResourceRef<TResult>;

  //   <
  //     Method extends Uppercase<HttpMethod> | undefined,
  //     Path extends OpenapiPathsWithMethod<Paths, Lowercase<Default<Method, 'GET'>>>,
  //     Init extends OpenapiMaybeOptionalInit<Paths[Path], Lowercase<Default<Method, 'GET'>>>,
  //     TResult = string,
  //   >(
  //     request: () => OpenapiResourceRequest<Default<Method, 'GET'>, Path> | undefined,
  //     options?: OpenapiResourceOptions<TResult, string>,
  //   ): OpenapiResourceRef<TResult | undefined>;
  // };
}
