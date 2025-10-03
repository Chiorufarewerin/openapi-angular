import type { OpenapiPathsWithMethod, OpenapiRequest, OpenapiResponse } from 'openapi-angular';
import type { FilterKeys, HttpMethod, MediaType } from 'openapi-typescript-helpers';

import type { OpenapiResourceOptions } from './options';
import type { OpenapiResourceRef } from './ref';

export interface OpenapiResourceFn<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Media extends MediaType = MediaType,
> {
  <
    Path extends OpenapiPathsWithMethod<Paths, 'get'> | undefined,
    Request extends OpenapiRequest<
      Extract<Path, string> extends string
        ? FilterKeys<Paths[Extract<Path, string>], 'get'>
        : unknown
    >,
    Response extends Extract<Path, string> extends string
      ? OpenapiResponse<Paths[Extract<Path, string>]['get'], Request, Media>
      : undefined,
    TResult = Response,
  >(
    url: () => Path,
    options: OpenapiResourceOptions<TResult, Response> & { defaultValue: NoInfer<TResult> },
  ): OpenapiResourceRef<TResult>;

  <
    Path extends OpenapiPathsWithMethod<Paths, 'get'> | undefined,
    Request extends OpenapiRequest<
      Extract<Path, string> extends string
        ? FilterKeys<Paths[Extract<Path, string>], 'get'>
        : unknown
    >,
    Response extends Extract<Path, string> extends string
      ? OpenapiResponse<Paths[Extract<Path, string>]['get'], Request, Media>
      : undefined,
    TResult = Response,
  >(
    url: () => Path,
    options?: OpenapiResourceOptions<TResult, Response>,
  ): OpenapiResourceRef<TResult | undefined>;

  // <
  //   Method extends Uppercase<HttpMethod> | undefined,
  //   Path extends OpenapiPathsWithMethod<Paths, Lowercase<Default<Method, 'GET'>>>,
  //   Init extends OpenapiMaybeOptionalInit<Paths[Path], Lowercase<Default<Method, 'GET'>>>,
  //   Response extends OpenapiResponse<Paths[Path][Lowercase<Default<Method, 'GET'>>], Init, Media>,
  //   TResult = Response,
  // >(
  //   request: () => OpenapiResourceRequest<Default<Method, 'GET'>, Path> | undefined,
  //   options: OpenapiResourceOptions<TResult, Response> & { defaultValue: NoInfer<TResult> },
  // ): OpenapiResourceRef<TResult>;

  // <
  //   Method extends Uppercase<HttpMethod> | undefined,
  //   Path extends OpenapiPathsWithMethod<Paths, Lowercase<Default<Method, 'GET'>>>,
  //   Init extends OpenapiMaybeOptionalInit<Paths[Path], Lowercase<Default<Method, 'GET'>>>,
  //   Response extends OpenapiResponse<Paths[Path][Lowercase<Default<Method, 'GET'>>], Init, Media>,
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
