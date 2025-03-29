import type { HttpClient, HttpContext, HttpEvent, HttpResponse } from "@angular/common/http";
import type {
  FilterKeys,
  MediaType,
  PathsWithMethod,
  RequiredKeysOf,
  ResponseObjectMap,
  SuccessResponse,
} from "openapi-typescript-helpers";
import type { Observable } from "rxjs";
import type { paths } from "./common.d.ts";
import type { ParseAsResponse } from "./index.js";

export type FetchResponse<T extends Record<string | number, any>, Options, Media extends MediaType> = ParseAsResponse<
  SuccessResponse<ResponseObjectMap<T>, Media>,
  Options
>;

export type ParamsOption<T> = T extends {
  parameters: any;
}
  ? RequiredKeysOf<T["parameters"]> extends never
    ? { params?: T["parameters"] }
    : { params: T["parameters"] }
  : {};

export type RequestOptions = {
  baseUrl?: string;
  context?: HttpContext;
  reportProgress?: number;
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
};

export type FetchOptions<T> = ParamsOption<T>;

export type MaybeOptionalInit<Params, Location extends keyof Params> = RequiredKeysOf<
  FetchOptions<FilterKeys<Params, Location>>
> extends never
  ? FetchOptions<FilterKeys<Params, Location>> | undefined
  : FetchOptions<FilterKeys<Params, Location>>;

type InitParam<Init> = RequiredKeysOf<Init> extends never
  ? [(Init & { [key: string]: unknown })?]
  : [Init & { [key: string]: unknown }];

export interface OpenapiHttpClient<Paths extends Record<string, any>, Media extends MediaType = MediaType>
  extends HttpClient {
  /**
   * Constructs a `GET` request that interprets the body as an `ArrayBuffer` and returns the
   * response in an `ArrayBuffer`.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
   */
  get<Path extends PathsWithMethod<Paths, "get">, Init extends MaybeOptionalInit<Paths[Path], "get">>(
    url: Path,
    options: RequestOptions &
      Init & {
        observe?: "body";
        responseType: "arraybuffer";
      },
  ): Observable<ArrayBuffer>;
  /**
   * Constructs a `GET` request that interprets the body as a `Blob`
   * and returns the response as a `Blob`.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body as a `Blob`.
   */
  get<Path extends PathsWithMethod<Paths, "get">, Init extends MaybeOptionalInit<Paths[Path], "get">>(
    url: Path,
    options: RequestOptions &
      Init & {
        observe?: "body";
        responseType: "blob";
      },
  ): Observable<Blob>;
  /**
   * Constructs a `GET` request that interprets the body as a text string
   * and returns the response as a string value.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body of type string.
   */
  get<
    Path extends PathsWithMethod<Paths, "get">,
    Init extends MaybeOptionalInit<Paths[Path], "get">,
    Media extends "application/text" | `text/${string}`,
  >(
    url: Path,
    options: RequestOptions &
      Init & {
        observe?: "body";
        responseType: "text";
      },
  ): Observable<FetchResponse<Paths[Path]["get"], Init, Media>>;
  /**
   * Constructs a `GET` request that interprets the body as an `ArrayBuffer` and returns
   *  the full event stream.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of all `HttpEvent`s for the request, with the response
   * body as an `ArrayBuffer`.
   */
  get<Path extends PathsWithMethod<Paths, "get">, Init extends MaybeOptionalInit<Paths[Path], "get">>(
    url: Path,
    options: RequestOptions &
      Init & {
        observe: "events";
        responseType: "arraybuffer";
      },
  ): Observable<HttpEvent<ArrayBuffer>>;
  /**
   * Constructs a `GET` request that interprets the body as a `Blob` and
   * returns the full event stream.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body as a `Blob`.
   */
  get<Path extends PathsWithMethod<Paths, "get">, Init extends MaybeOptionalInit<Paths[Path], "get">>(
    url: Path,
    options: RequestOptions &
      Init & {
        observe: "events";
        responseType: "blob";
      },
  ): Observable<HttpEvent<Blob>>;
  /**
   * Constructs a `GET` request that interprets the body as a text string and returns
   * the full event stream.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body of type string.
   */
  get<Path extends PathsWithMethod<Paths, "get">, Init extends MaybeOptionalInit<Paths[Path], "get">>(
    url: Path,
    options: RequestOptions &
      Init & {
        observe: "events";
        responseType: "text";
      },
  ): Observable<HttpEvent<string>>;
  /**
   * Constructs a `GET` request that interprets the body as JSON
   * and returns the full event stream.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body of type `Object`.
   */
  get<
    Path extends PathsWithMethod<Paths, "get">,
    Init extends MaybeOptionalInit<Paths[Path], "get">,
    Media extends "application/json",
  >(
    url: Path,
    options: RequestOptions &
      Init & {
        observe: "events";
        responseType?: "json";
      },
  ): Observable<HttpEvent<FetchResponse<Paths[Path]["get"], Init, Media>>>;
  /**
   * Constructs a `GET` request that interprets the body as an `ArrayBuffer` and
   * returns the full `HttpResponse`.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   * with the response body as an `ArrayBuffer`.
   */
  get<Path extends PathsWithMethod<Paths, "get">, Init extends MaybeOptionalInit<Paths[Path], "get">>(
    url: Path,
    options: RequestOptions &
      Init & {
        observe: "response";
        responseType: "arraybuffer";
      },
  ): Observable<HttpResponse<ArrayBuffer>>;
  /**
   * Constructs a `GET` request that interprets the body as a `Blob` and
   * returns the full `HttpResponse`.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   * with the response body as a `Blob`.
   */
  get<Path extends PathsWithMethod<Paths, "get">, Init extends MaybeOptionalInit<Paths[Path], "get">>(
    url: Path,
    options: RequestOptions &
      Init & {
        observe: "response";
        responseType: "blob";
      },
  ): Observable<HttpResponse<Blob>>;
  /**
   * Constructs a `GET` request that interprets the body as a text stream and
   * returns the full `HttpResponse`.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   * with the response body of type string.
   */
  get<Path extends PathsWithMethod<Paths, "get">, Init extends MaybeOptionalInit<Paths[Path], "get">>(
    url: Path,
    options: RequestOptions &
      Init & {
        observe: "response";
        responseType: "text";
      },
  ): Observable<HttpResponse<string>>;
  /**
   * Constructs a `GET` request that interprets the body as JSON and
   * returns the full `HttpResponse`.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the full `HttpResponse`,
   * with the response body of type `Object`.
   */
  get<
    Path extends PathsWithMethod<Paths, "get">,
    Init extends MaybeOptionalInit<Paths[Path], "get">,
    Media extends "application/json",
  >(
    url: Path,
    options: RequestOptions &
      Init & {
        observe: "response";
        responseType?: "json";
      },
  ): Observable<HttpResponse<FetchResponse<Paths[Path]["get"], Init, Media>>>;
  /**
   * Constructs a `GET` request that interprets the body as JSON and
   * returns the response body as an object parsed from JSON.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   *
   * @return An `Observable` of the response body as a JavaScript object.
   */
  get<
    Path extends PathsWithMethod<Paths, "get">,
    Init extends MaybeOptionalInit<Paths[Path], "get">,
    Media extends "application/json",
  >(
    url: Path,
    ...options: InitParam<
      RequestOptions &
        Init & {
          observe?: "body";
          responseType?: "json";
        }
    >
  ): Observable<FetchResponse<Paths[Path]["get"], Init, Media>>;
}

export declare const http: OpenapiHttpClient<paths>;
