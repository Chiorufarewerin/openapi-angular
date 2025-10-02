import type {
  OpenapiClientOptions,
  OpenapiMaybeOptionalInit,
  OpenapiPathsWithMethod,
  OpenapiResponse,
} from 'openapi-angular';
import type { HttpMethod, MediaType } from 'openapi-typescript-helpers';

import type { OpenapiResourceOptions, OpenapiResourceRef, OpenapiResourceRequest } from './options';

export type OpenapiResourceFactory<Paths extends {}, Media extends MediaType = MediaType> = (
  options: OpenapiClientOptions,
) => OpenapiResourceFn<Paths, Media>;

export interface OpenapiResourceFn<
  Paths extends Record<string, Record<HttpMethod, {}>>,
  Media extends MediaType = MediaType,
> {
  <
    Method extends 'GET',
    Path extends OpenapiPathsWithMethod<Paths, Lowercase<Method>>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], Lowercase<Method>>,
    Response extends OpenapiResponse<Paths[Path][Lowercase<Method>], Init, Media>,
    TResult = Response,
  >(
    url: () => Path | undefined,
    options: OpenapiResourceOptions<TResult, Response> & { defaultValue: NoInfer<TResult> },
  ): OpenapiResourceRef<TResult>;

  <
    Method extends 'GET',
    Path extends OpenapiPathsWithMethod<Paths, Lowercase<Method>>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], Lowercase<Method>>,
    Response extends OpenapiResponse<Paths[Path][Lowercase<Method>], Init, Media>,
    TResult = Response,
  >(
    url: () => Path | undefined,
    options?: OpenapiResourceOptions<TResult, Response>,
  ): OpenapiResourceRef<TResult | undefined>;

  <
    Method extends Uppercase<HttpMethod>,
    Path extends OpenapiPathsWithMethod<Paths, Lowercase<Method>>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], Lowercase<Method>>,
    Response extends OpenapiResponse<Paths[Path][Lowercase<Method>], Init, Media>,
    TResult = Response,
  >(
    request: () => OpenapiResourceRequest<Method, Path, Init> | undefined,
    options: OpenapiResourceOptions<TResult, Response> & { defaultValue: NoInfer<TResult> },
  ): OpenapiResourceRef<TResult>;

  <
    Method extends Uppercase<HttpMethod>,
    Path extends OpenapiPathsWithMethod<Paths, Lowercase<Method>>,
    Init extends OpenapiMaybeOptionalInit<Paths[Path], Lowercase<Method>>,
    Response extends OpenapiResponse<Paths[Path][Lowercase<Method>], Init, Media>,
    TResult = Response,
  >(
    request: () => OpenapiResourceRequest<Method, Path, Init> | undefined,
    options?: OpenapiResourceOptions<TResult, Response>,
  ): OpenapiResourceRef<TResult | undefined>;

  arrayBuffer: {
    <
      Method extends 'GET',
      Path extends OpenapiPathsWithMethod<Paths, Lowercase<Method>>,
      TResult = ArrayBuffer,
    >(
      url: () => Path | undefined,
      options: OpenapiResourceOptions<TResult, ArrayBuffer> & { defaultValue: NoInfer<TResult> },
    ): OpenapiResourceRef<TResult>;

    <
      Method extends 'GET',
      Path extends OpenapiPathsWithMethod<Paths, Lowercase<Method>>,
      TResult = ArrayBuffer,
    >(
      url: () => Path | undefined,
      options?: OpenapiResourceOptions<TResult, ArrayBuffer>,
    ): OpenapiResourceRef<TResult | undefined>;

    <
      Method extends Uppercase<HttpMethod>,
      Path extends OpenapiPathsWithMethod<Paths, Lowercase<Method>>,
      Init extends OpenapiMaybeOptionalInit<Paths[Path], Lowercase<Method>>,
      TResult = ArrayBuffer,
    >(
      request: () => OpenapiResourceRequest<Method, Path, Init> | undefined,
      options: OpenapiResourceOptions<TResult, ArrayBuffer> & { defaultValue: NoInfer<TResult> },
    ): OpenapiResourceRef<TResult>;

    <
      Method extends Uppercase<HttpMethod>,
      Path extends OpenapiPathsWithMethod<Paths, Lowercase<Method>>,
      Init extends OpenapiMaybeOptionalInit<Paths[Path], Lowercase<Method>>,
      TResult = ArrayBuffer,
    >(
      request: () => OpenapiResourceRequest<Method, Path, Init> | undefined,
      options?: OpenapiResourceOptions<TResult, ArrayBuffer>,
    ): OpenapiResourceRef<TResult | undefined>;
  };

  blob: {
    <
      Method extends 'GET',
      Path extends OpenapiPathsWithMethod<Paths, Lowercase<Method>>,
      TResult = Blob,
    >(
      url: () => Path | undefined,
      options: OpenapiResourceOptions<TResult, Blob> & { defaultValue: NoInfer<TResult> },
    ): OpenapiResourceRef<TResult>;

    <
      Method extends 'GET',
      Path extends OpenapiPathsWithMethod<Paths, Lowercase<Method>>,
      TResult = Blob,
    >(
      url: () => Path | undefined,
      options?: OpenapiResourceOptions<TResult, Blob>,
    ): OpenapiResourceRef<TResult | undefined>;

    <
      Method extends Uppercase<HttpMethod>,
      Path extends OpenapiPathsWithMethod<Paths, Lowercase<Method>>,
      Init extends OpenapiMaybeOptionalInit<Paths[Path], Lowercase<Method>>,
      TResult = Blob,
    >(
      request: () => OpenapiResourceRequest<Method, Path, Init> | undefined,
      options: OpenapiResourceOptions<TResult, Blob> & { defaultValue: NoInfer<TResult> },
    ): OpenapiResourceRef<TResult>;

    <
      Method extends Uppercase<HttpMethod>,
      Path extends OpenapiPathsWithMethod<Paths, Lowercase<Method>>,
      Init extends OpenapiMaybeOptionalInit<Paths[Path], Lowercase<Method>>,
      TResult = Blob,
    >(
      request: () => OpenapiResourceRequest<Method, Path, Init> | undefined,
      options?: OpenapiResourceOptions<TResult, Blob>,
    ): OpenapiResourceRef<TResult | undefined>;
  };

  text: {
    <
      Method extends 'GET',
      Path extends OpenapiPathsWithMethod<Paths, Lowercase<Method>>,
      TResult = string,
    >(
      url: () => Path | undefined,
      options: OpenapiResourceOptions<TResult, string> & { defaultValue: NoInfer<TResult> },
    ): OpenapiResourceRef<TResult>;

    <
      Method extends 'GET',
      Path extends OpenapiPathsWithMethod<Paths, Lowercase<Method>>,
      TResult = string,
    >(
      url: () => Path | undefined,
      options?: OpenapiResourceOptions<TResult, string>,
    ): OpenapiResourceRef<TResult | undefined>;

    <
      Method extends Uppercase<HttpMethod>,
      Path extends OpenapiPathsWithMethod<Paths, Lowercase<Method>>,
      Init extends OpenapiMaybeOptionalInit<Paths[Path], Lowercase<Method>>,
      TResult = string,
    >(
      request: () => OpenapiResourceRequest<Method, Path, Init> | undefined,
      options: OpenapiResourceOptions<TResult, string> & { defaultValue: NoInfer<TResult> },
    ): OpenapiResourceRef<TResult>;

    <
      Method extends Uppercase<HttpMethod>,
      Path extends OpenapiPathsWithMethod<Paths, Lowercase<Method>>,
      Init extends OpenapiMaybeOptionalInit<Paths[Path], Lowercase<Method>>,
      TResult = string,
    >(
      request: () => OpenapiResourceRequest<Method, Path, Init> | undefined,
      options?: OpenapiResourceOptions<TResult, string>,
    ): OpenapiResourceRef<TResult | undefined>;
  };
}
