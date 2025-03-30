import type { HttpClient, HttpContext, HttpEvent, HttpResponse } from "@angular/common/http";
import type {
  FilterKeys,
  IsOperationRequestBodyOptional,
  MediaType,
  OperationRequestBodyContent,
  PathsWithMethod,
  RequiredKeysOf,
  ResponseObjectMap,
  SuccessResponse,
} from "openapi-typescript-helpers";
import type { Observable } from "rxjs";
import type { paths } from "./github.d.ts";

type PickBody<T> = "body" extends keyof T
  ? T["body"]
  : T extends { body?: any }
    ? Exclude<T["body"], undefined> | null
    : null;
type OmitBody<T> = Omit<T, "body">;

export type FetchResponse<T extends Record<string | number, any>, Media extends MediaType> = SuccessResponse<
  ResponseObjectMap<T>,
  Media
>;

export type RequestBodyOption<T> = OperationRequestBodyContent<T> extends never
  ? { body?: never }
  : IsOperationRequestBodyOptional<T> extends true
    ? { body?: OperationRequestBodyContent<T> }
    : { body: OperationRequestBodyContent<T> };

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
  reportProgress?: boolean;
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
};

export type FetchOptions<T> = ParamsOption<T> & RequestBodyOption<T>;

export type MaybeOptionalInit<Params, Location extends keyof Params> = RequiredKeysOf<
  FetchOptions<FilterKeys<Params, Location>>
> extends never
  ? FetchOptions<FilterKeys<Params, Location>> | undefined
  : FetchOptions<FilterKeys<Params, Location>>;

type InitParam<Init> = RequiredKeysOf<Init> extends never
  ? [(Init & { [key: string]: unknown })?]
  : [Init & { [key: string]: unknown }];

export interface OpenapiHttpClient<Paths extends Record<string, any>> extends HttpClient {
  /**
   * Constructs a `DELETE` request that interprets the body as an `ArrayBuffer`
   *  and returns the response as an `ArrayBuffer`.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return  An `Observable` of the response body as an `ArrayBuffer`.
   */
  delete<Path extends PathsWithMethod<Paths, "delete">, Init extends MaybeOptionalInit<Paths[Path], "delete">>(
    url: Path,
    options: Omit<RequestOptions, "transferCache"> &
      Init & {
        observe?: "body";
        responseType: "arraybuffer";
      },
  ): Observable<ArrayBuffer>;
  /**
   * Constructs a `DELETE` request that interprets the body as a `Blob` and returns
   * the response as a `Blob`.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response body as a `Blob`.
   */
  delete<Path extends PathsWithMethod<Paths, "delete">, Init extends MaybeOptionalInit<Paths[Path], "delete">>(
    url: Path,
    options: Omit<RequestOptions, "transferCache"> &
      Init & {
        observe?: "body";
        responseType: "blob";
      },
  ): Observable<Blob>;
  /**
   * Constructs a `DELETE` request that interprets the body as a text string and returns
   * a string.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body of type string.
   */
  delete<Path extends PathsWithMethod<Paths, "delete">, Init extends MaybeOptionalInit<Paths[Path], "delete">>(
    url: Path,
    options: Omit<RequestOptions, "transferCache"> &
      Init & {
        observe?: "body";
        responseType: "text";
      },
  ): Observable<string>;
  /**
   * Constructs a `DELETE` request that interprets the body as an `ArrayBuffer`
   *  and returns the full event stream.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of all `HttpEvent`s for the request,
   * with response body as an `ArrayBuffer`.
   */
  delete<Path extends PathsWithMethod<Paths, "delete">, Init extends MaybeOptionalInit<Paths[Path], "delete">>(
    url: Path,
    options: Omit<RequestOptions, "transferCache"> &
      Init & {
        observe: "events";
        responseType: "arraybuffer";
      },
  ): Observable<HttpEvent<ArrayBuffer>>;
  /**
   * Constructs a `DELETE` request that interprets the body as a `Blob`
   *  and returns the full event stream.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of all the `HttpEvent`s for the request, with the response body as a
   * `Blob`.
   */
  delete<Path extends PathsWithMethod<Paths, "delete">, Init extends MaybeOptionalInit<Paths[Path], "delete">>(
    url: Path,
    options: Omit<RequestOptions, "transferCache"> &
      Init & {
        observe: "events";
        responseType: "blob";
      },
  ): Observable<HttpEvent<Blob>>;
  /**
   * Constructs a `DELETE` request that interprets the body as a text string
   * and returns the full event stream.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of all `HttpEvent`s for the request, with the response
   * body of type string.
   */
  delete<Path extends PathsWithMethod<Paths, "delete">, Init extends MaybeOptionalInit<Paths[Path], "delete">>(
    url: Path,
    options: Omit<RequestOptions, "transferCache"> &
      Init & {
        observe: "events";
        responseType: "text";
      },
  ): Observable<HttpEvent<string>>;
  /**
   * Constructs a `DELETE` request that interprets the body as JSON
   * and returns the full event stream.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of all `HttpEvent`s for the request, with response body of
   * type `Object`.
   */
  delete<Path extends PathsWithMethod<Paths, "delete">, Init extends MaybeOptionalInit<Paths[Path], "delete">>(
    url: Path,
    options: Omit<RequestOptions, "transferCache"> &
      Init & {
        observe: "events";
        responseType?: "json";
      },
  ): Observable<HttpEvent<FetchResponse<Paths[Path]["delete"], "application/json">>>;
  /**
   * Constructs a `DELETE` request that interprets the body as an `ArrayBuffer` and returns
   *  the full `HttpResponse`.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the full `HttpResponse`, with the response body as an `ArrayBuffer`.
   */
  delete<Path extends PathsWithMethod<Paths, "delete">, Init extends MaybeOptionalInit<Paths[Path], "delete">>(
    url: Path,
    options: Omit<RequestOptions, "transferCache"> &
      Init & {
        observe: "response";
        responseType: "arraybuffer";
      },
  ): Observable<HttpResponse<ArrayBuffer>>;
  /**
   * Constructs a `DELETE` request that interprets the body as a `Blob` and returns the full
   * `HttpResponse`.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HttpResponse`, with the response body of type `Blob`.
   */
  delete<Path extends PathsWithMethod<Paths, "delete">, Init extends MaybeOptionalInit<Paths[Path], "delete">>(
    url: Path,
    options: Omit<RequestOptions, "transferCache"> &
      Init & {
        observe: "response";
        responseType: "blob";
      },
  ): Observable<HttpResponse<Blob>>;
  /**
   * Constructs a `DELETE` request that interprets the body as a text stream and
   *  returns the full `HttpResponse`.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the full `HttpResponse`, with the response body of type string.
   */
  delete<Path extends PathsWithMethod<Paths, "delete">, Init extends MaybeOptionalInit<Paths[Path], "delete">>(
    url: Path,
    options: Omit<RequestOptions, "transferCache"> &
      Init & {
        observe: "response";
        responseType: "text";
      },
  ): Observable<HttpResponse<string>>;
  /**
   * Constructs a `DELETE` request the interprets the body as a JavaScript object and returns
   * the full `HttpResponse`.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HttpResponse`, with the response body of type `Object`.
   *
   */
  delete<Path extends PathsWithMethod<Paths, "delete">, Init extends MaybeOptionalInit<Paths[Path], "delete">>(
    url: Path,
    options: Omit<RequestOptions, "transferCache"> &
      Init & {
        observe: "response";
        responseType?: "json";
      },
  ): Observable<HttpResponse<FetchResponse<Paths[Path]["delete"], "application/json">>>;
  /**
   * Constructs a `DELETE` request that interprets the body as JSON and
   * returns the response body as an object parsed from JSON.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body of type `Object`.
   */
  delete<Path extends PathsWithMethod<Paths, "delete">, Init extends MaybeOptionalInit<Paths[Path], "delete">>(
    url: Path,
    ...options: InitParam<
      Omit<RequestOptions, "transferCache"> &
        Init & {
          observe?: "body";
          responseType?: "json";
        }
    >
  ): Observable<FetchResponse<Paths[Path]["delete"], "application/json">>;
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
      OmitBody<Init> & {
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
      OmitBody<Init> & {
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
  get<Path extends PathsWithMethod<Paths, "get">, Init extends MaybeOptionalInit<Paths[Path], "get">>(
    url: Path,
    options: RequestOptions &
      OmitBody<Init> & {
        observe?: "body";
        responseType: "text";
      },
  ): Observable<string>;
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
      OmitBody<Init> & {
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
      OmitBody<Init> & {
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
      OmitBody<Init> & {
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
  get<Path extends PathsWithMethod<Paths, "get">, Init extends MaybeOptionalInit<Paths[Path], "get">>(
    url: Path,
    options: RequestOptions &
      OmitBody<Init> & {
        observe: "events";
        responseType?: "json";
      },
  ): Observable<HttpEvent<FetchResponse<Paths[Path]["get"], "application/json">>>;
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
      OmitBody<Init> & {
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
      OmitBody<Init> & {
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
      OmitBody<Init> & {
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
  get<Path extends PathsWithMethod<Paths, "get">, Init extends MaybeOptionalInit<Paths[Path], "get">>(
    url: Path,
    options: RequestOptions &
      OmitBody<Init> & {
        observe: "response";
        responseType?: "json";
      },
  ): Observable<HttpResponse<FetchResponse<Paths[Path]["get"], "application/json">>>;
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
  get<Path extends PathsWithMethod<Paths, "get">, Init extends MaybeOptionalInit<Paths[Path], "get">>(
    url: Path,
    ...options: InitParam<
      RequestOptions &
        OmitBody<Init> & {
          observe?: "body";
          responseType?: "json";
        }
    >
  ): Observable<FetchResponse<Paths[Path]["get"], "application/json">>;
  /**
   * Constructs a `HEAD` request that interprets the body as an `ArrayBuffer` and
   * returns the response as an `ArrayBuffer`.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
   */
  head<Path extends PathsWithMethod<Paths, "head">, Init extends MaybeOptionalInit<Paths[Path], "head">>(
    url: Path,
    options: RequestOptions &
      OmitBody<Init> & {
        observe?: "body";
        responseType: "arraybuffer";
      },
  ): Observable<ArrayBuffer>;
  /**
   * Constructs a `HEAD` request that interprets the body as a `Blob` and returns
   * the response as a `Blob`.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return  An `Observable` of the response, with the response body as a `Blob`.
   */
  head<Path extends PathsWithMethod<Paths, "head">, Init extends MaybeOptionalInit<Paths[Path], "head">>(
    url: Path,
    options: RequestOptions &
      OmitBody<Init> & {
        observe?: "body";
        responseType: "blob";
      },
  ): Observable<Blob>;
  /**
   * Constructs a `HEAD` request that interprets the body as a text string and returns the response
   * as a string value.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body of type string.
   */
  head<Path extends PathsWithMethod<Paths, "head">, Init extends MaybeOptionalInit<Paths[Path], "head">>(
    url: Path,
    options: RequestOptions &
      OmitBody<Init> & {
        observe?: "body";
        responseType: "text";
      },
  ): Observable<string>;
  /**
   * Constructs a `HEAD` request that interprets the body as an  `ArrayBuffer`
   *  and returns the full event stream.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of all `HttpEvent`s for the request,
   * with the response body as an `ArrayBuffer`.
   */
  head<Path extends PathsWithMethod<Paths, "head">, Init extends MaybeOptionalInit<Paths[Path], "head">>(
    url: Path,
    options: RequestOptions &
      OmitBody<Init> & {
        observe: "events";
        responseType: "arraybuffer";
      },
  ): Observable<HttpEvent<ArrayBuffer>>;
  /**
   * Constructs a `HEAD` request that interprets the body as a `Blob` and
   * returns the full event stream.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of all `HttpEvent`s for the request,
   * with the response body as a `Blob`.
   */
  head<Path extends PathsWithMethod<Paths, "head">, Init extends MaybeOptionalInit<Paths[Path], "head">>(
    url: Path,
    options: RequestOptions &
      OmitBody<Init> & {
        observe: "events";
        responseType: "blob";
      },
  ): Observable<HttpEvent<Blob>>;
  /**
   * Constructs a `HEAD` request that interprets the body as a text string
   * and returns the full event stream.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of all `HttpEvent`s for the request, with the response body of type
   * string.
   */
  head<Path extends PathsWithMethod<Paths, "head">, Init extends MaybeOptionalInit<Paths[Path], "head">>(
    url: Path,
    options: RequestOptions &
      OmitBody<Init> & {
        observe: "events";
        responseType: "text";
      },
  ): Observable<HttpEvent<string>>;
  /**
   * Constructs a `HEAD` request that interprets the body as JSON
   * and returns the full HTTP event stream.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of all `HttpEvent`s for the request, with a response body of
   * type `Object`.
   */
  head<Path extends PathsWithMethod<Paths, "head">, Init extends MaybeOptionalInit<Paths[Path], "head">>(
    url: Path,
    options: RequestOptions &
      OmitBody<Init> & {
        observe: "events";
        responseType?: "json";
      },
  ): Observable<HttpEvent<FetchResponse<Paths[Path]["head"], "application/json">>>;
  /**
   * Constructs a `HEAD` request that interprets the body as an `ArrayBuffer`
   *  and returns the full HTTP response.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   * with the response body as an `ArrayBuffer`.
   */
  head<Path extends PathsWithMethod<Paths, "head">, Init extends MaybeOptionalInit<Paths[Path], "head">>(
    url: Path,
    options: RequestOptions &
      OmitBody<Init> & {
        observe: "response";
        responseType: "arraybuffer";
      },
  ): Observable<HttpResponse<ArrayBuffer>>;
  /**
   * Constructs a `HEAD` request that interprets the body as a `Blob` and returns
   * the full `HttpResponse`.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   * with the response body as a blob.
   */
  head<Path extends PathsWithMethod<Paths, "head">, Init extends MaybeOptionalInit<Paths[Path], "head">>(
    url: Path,
    options: RequestOptions &
      OmitBody<Init> & {
        observe: "response";
        responseType: "blob";
      },
  ): Observable<HttpResponse<Blob>>;
  /**
   * Constructs a `HEAD` request that interprets the body as text stream
   * and returns the full `HttpResponse`.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   * with the response body of type string.
   */
  head<Path extends PathsWithMethod<Paths, "head">, Init extends MaybeOptionalInit<Paths[Path], "head">>(
    url: Path,
    options: RequestOptions &
      OmitBody<Init> & {
        observe: "response";
        responseType: "text";
      },
  ): Observable<HttpResponse<string>>;
  /**
   * Constructs a `HEAD` request that interprets the body as JSON and
   * returns the full `HttpResponse`.
   *
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   * with the response body of type `Object`.
   */
  head<Path extends PathsWithMethod<Paths, "head">, Init extends MaybeOptionalInit<Paths[Path], "head">>(
    url: Path,
    options: RequestOptions &
      OmitBody<Init> & {
        observe: "response";
        responseType?: "json";
      },
  ): Observable<HttpResponse<FetchResponse<Paths[Path]["head"], "application/json">>>;
  /**
      
         * Constructs a `HEAD` request that interprets the body as JSON and
         * returns the response body as an object parsed from JSON.
         *
         * @param url     The endpoint URL.
         * @param options The HTTP options to send with the request.
         *
         * @return An `Observable` of the response, with the response body as an object parsed from JSON.
         */
  head<Path extends PathsWithMethod<Paths, "head">, Init extends MaybeOptionalInit<Paths[Path], "head">>(
    url: Path,
    ...options: InitParam<
      RequestOptions &
        OmitBody<Init> & {
          observe?: "body";
          responseType?: "json";
        }
    >
  ): Observable<FetchResponse<Paths[Path]["head"], "application/json">>;
  /**
   * Constructs an `OPTIONS` request that interprets the body as an
   * `ArrayBuffer` and returns the response as an `ArrayBuffer`.
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
   */
  options<Path extends PathsWithMethod<Paths, "options">, Init extends MaybeOptionalInit<Paths[Path], "options">>(
    url: Path,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe?: "body";
        responseType: "arraybuffer";
      },
  ): Observable<ArrayBuffer>;
  /**
   * Constructs an `OPTIONS` request that interprets the body as a `Blob` and returns
   * the response as a `Blob`.
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return An `Observable` of the response, with the response body as a `Blob`.
   */
  options<Path extends PathsWithMethod<Paths, "options">, Init extends MaybeOptionalInit<Paths[Path], "options">>(
    url: Path,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe?: "body";
        responseType: "blob";
        withCredentials?: boolean;
      },
  ): Observable<Blob>;
  /**
   * Constructs an `OPTIONS` request that interprets the body as a text string and
   * returns a string value.
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return An `Observable` of the response, with the response body of type string.
   */
  options<Path extends PathsWithMethod<Paths, "options">, Init extends MaybeOptionalInit<Paths[Path], "options">>(
    url: Path,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe?: "body";
        responseType: "text";
      },
  ): Observable<string>;
  /**
   * Constructs an `OPTIONS` request that interprets the body as an `ArrayBuffer`
   *  and returns the full event stream.
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return  An `Observable` of all `HttpEvent`s for the request,
   * with the response body as an `ArrayBuffer`.
   */
  options<Path extends PathsWithMethod<Paths, "options">, Init extends MaybeOptionalInit<Paths[Path], "options">>(
    url: Path,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "events";
        responseType: "arraybuffer";
      },
  ): Observable<HttpEvent<ArrayBuffer>>;
  /**
   * Constructs an `OPTIONS` request that interprets the body as a `Blob` and
   * returns the full event stream.
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return An `Observable` of all `HttpEvent`s for the request,
   * with the response body as a `Blob`.
   */
  options<Path extends PathsWithMethod<Paths, "options">, Init extends MaybeOptionalInit<Paths[Path], "options">>(
    url: Path,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "events";
        responseType: "blob";
      },
  ): Observable<HttpEvent<Blob>>;
  /**
   * Constructs an `OPTIONS` request that interprets the body as a text string
   * and returns the full event stream.
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return An `Observable` of all the `HttpEvent`s for the request,
   * with the response body of type string.
   */
  options<Path extends PathsWithMethod<Paths, "options">, Init extends MaybeOptionalInit<Paths[Path], "options">>(
    url: Path,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "events";
        responseType: "text";
      },
  ): Observable<HttpEvent<string>>;
  /**
   * Constructs an `OPTIONS` request that interprets the body as JSON
   * and returns the full event stream.
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return An `Observable` of all the `HttpEvent`s for the request with the response
   * body of type `Object`.
   */
  options<Path extends PathsWithMethod<Paths, "options">, Init extends MaybeOptionalInit<Paths[Path], "options">>(
    url: Path,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "events";
        responseType?: "json";
      },
  ): Observable<HttpEvent<FetchResponse<Paths[Path]["options"], "application/json">>>;
  /**
   * Constructs an `OPTIONS` request that interprets the body as an `ArrayBuffer`
   *  and returns the full HTTP response.
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   * with the response body as an `ArrayBuffer`.
   */
  options<Path extends PathsWithMethod<Paths, "options">, Init extends MaybeOptionalInit<Paths[Path], "options">>(
    url: Path,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "response";
        responseType: "arraybuffer";
      },
  ): Observable<HttpResponse<ArrayBuffer>>;
  /**
   * Constructs an `OPTIONS` request that interprets the body as a `Blob`
   *  and returns the full `HttpResponse`.
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   * with the response body as a `Blob`.
   */
  options<Path extends PathsWithMethod<Paths, "options">, Init extends MaybeOptionalInit<Paths[Path], "options">>(
    url: Path,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "response";
        responseType: "blob";
      },
  ): Observable<HttpResponse<Blob>>;
  /**
   * Constructs an `OPTIONS` request that interprets the body as text stream
   * and returns the full `HttpResponse`.
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   * with the response body of type string.
   */
  options<Path extends PathsWithMethod<Paths, "options">, Init extends MaybeOptionalInit<Paths[Path], "options">>(
    url: Path,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "response";
        responseType: "text";
      },
  ): Observable<HttpResponse<string>>;
  /**
   * Constructs an `OPTIONS` request that interprets the body as JSON
   * and returns the full `HttpResponse`.
   *
   * @param url The endpoint URL.
   * @param options HTTP options.
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   * with the response body of type `Object`.
   */
  options<Path extends PathsWithMethod<Paths, "options">, Init extends MaybeOptionalInit<Paths[Path], "options">>(
    url: Path,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "response";
        responseType?: "json";
      },
  ): Observable<HttpResponse<FetchResponse<Paths[Path]["options"], "application/json">>>;
  /**
    
       * Constructs an `OPTIONS` request that interprets the body as JSON and returns the
       * response body as an object parsed from JSON.
       *
       * @param url The endpoint URL.
       * @param options HTTP options.
       *
       * @return An `Observable` of the response, with the response body as an object parsed from JSON.
       */
  options<Path extends PathsWithMethod<Paths, "options">, Init extends MaybeOptionalInit<Paths[Path], "options">>(
    url: Path,
    ...options: InitParam<
      Omit<RequestOptions, "transferCache"> &
        OmitBody<Init> & {
          observe?: "body";
          responseType?: "json";
        }
    >
  ): Observable<FetchResponse<Paths[Path]["options"], "application/json">>;
  /**
   * Constructs a `POST` request that interprets the body as an `ArrayBuffer` and returns
   * an `ArrayBuffer`.
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options.
   *
   * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
   */
  post<Path extends PathsWithMethod<Paths, "post">, Init extends MaybeOptionalInit<Paths[Path], "post">>(
    url: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe?: "body";
        responseType: "arraybuffer";
      },
  ): Observable<ArrayBuffer>;
  /**
   * Constructs a `POST` request that interprets the body as a `Blob` and returns the
   * response as a `Blob`.
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return An `Observable` of the response, with the response body as a `Blob`.
   */
  post<Path extends PathsWithMethod<Paths, "post">, Init extends MaybeOptionalInit<Paths[Path], "post">>(
    url: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe?: "body";
        responseType: "blob";
      },
  ): Observable<Blob>;
  /**
   * Constructs a `POST` request that interprets the body as a text string and
   * returns the response as a string value.
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return An `Observable` of the response, with a response body of type string.
   */
  post<Path extends PathsWithMethod<Paths, "post">, Init extends MaybeOptionalInit<Paths[Path], "post">>(
    url: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe?: "body";
        responseType: "text";
      },
  ): Observable<string>;
  /**
   * Constructs a `POST` request that interprets the body as an `ArrayBuffer` and
   * returns the full event stream.
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return An `Observable` of all `HttpEvent`s for the request,
   * with the response body as an `ArrayBuffer`.
   */
  post<Path extends PathsWithMethod<Paths, "post">, Init extends MaybeOptionalInit<Paths[Path], "post">>(
    url: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "events";
        responseType: "arraybuffer";
      },
  ): Observable<HttpEvent<ArrayBuffer>>;
  /**
   * Constructs a `POST` request that interprets the body as a `Blob`
   * and returns the response in an observable of the full event stream.
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return An `Observable` of all `HttpEvent`s for the request, with the response body as `Blob`.
   */
  post<Path extends PathsWithMethod<Paths, "post">, Init extends MaybeOptionalInit<Paths[Path], "post">>(
    url: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "events";
        responseType: "blob";
      },
  ): Observable<HttpEvent<Blob>>;
  /**
   * Constructs a `POST` request that interprets the body as a text string and returns the full
   * event stream.
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return  An `Observable` of all `HttpEvent`s for the request,
   * with a response body of type string.
   */
  post<Path extends PathsWithMethod<Paths, "post">, Init extends MaybeOptionalInit<Paths[Path], "post">>(
    url: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "events";
        responseType: "text";
      },
  ): Observable<HttpEvent<string>>;
  /**
   * Constructs a POST request that interprets the body as JSON and returns the full
   * event stream.
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return  An `Observable` of all `HttpEvent`s for the request,
   * with a response body of type `Object`.
   */
  post<Path extends PathsWithMethod<Paths, "post">, Init extends MaybeOptionalInit<Paths[Path], "post">>(
    url: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "events";
        responseType?: "json";
      },
  ): Observable<HttpEvent<FetchResponse<Paths[Path]["post"], "application/json">>>;
  /**
   * Constructs a POST request that interprets the body as an `ArrayBuffer`
   *  and returns the full `HttpResponse`.
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return  An `Observable` of the `HttpResponse` for the request, with the response body as an
   * `ArrayBuffer`.
   */
  post<Path extends PathsWithMethod<Paths, "post">, Init extends MaybeOptionalInit<Paths[Path], "post">>(
    url: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "response";
        responseType: "arraybuffer";
      },
  ): Observable<HttpResponse<ArrayBuffer>>;
  /**
   * Constructs a `POST` request that interprets the body as a `Blob` and returns the full
   * `HttpResponse`.
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   * with the response body as a `Blob`.
   */
  post<Path extends PathsWithMethod<Paths, "post">, Init extends MaybeOptionalInit<Paths[Path], "post">>(
    url: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "response";
        responseType: "blob";
      },
  ): Observable<HttpResponse<Blob>>;
  /**
   * Constructs a `POST` request that interprets the body as a text stream and returns
   * the full `HttpResponse`.
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return  An `Observable` of the `HttpResponse` for the request,
   * with a response body of type string.
   */
  post<Path extends PathsWithMethod<Paths, "post">, Init extends MaybeOptionalInit<Paths[Path], "post">>(
    url: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "response";
        responseType: "text";
      },
  ): Observable<HttpResponse<string>>;
  /**
   * Constructs a `POST` request that interprets the body as JSON
   * and returns the full `HttpResponse`.
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return An `Observable` of the `HttpResponse` for the request, with a response body of type
   * `Object`.
   */
  post<Path extends PathsWithMethod<Paths, "post">, Init extends MaybeOptionalInit<Paths[Path], "post">>(
    url: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "response";
        responseType?: "json";
      },
  ): Observable<HttpResponse<FetchResponse<Paths[Path]["post"], "application/json">>>;
  /**
   * Constructs a `POST` request that interprets the body as JSON
   * and returns the response body as an object parsed from JSON.
   *
   * @param url The endpoint URL.
   * @param body The content to replace with.
   * @param options HTTP options
   *
   * @return An `Observable` of the response, with the response body as an object parsed from JSON.
   */
  post<Path extends PathsWithMethod<Paths, "post">, Init extends MaybeOptionalInit<Paths[Path], "post">>(
    url: Path,
    body: PickBody<Init>,
    ...options: InitParam<
      Omit<RequestOptions, "transferCache"> &
        OmitBody<Init> & {
          observe?: "body";
          responseType?: "json";
        }
    >
  ): Observable<FetchResponse<Paths[Path]["post"], "application/json">>;
}

export declare const http: OpenapiHttpClient<paths>;

http.options("", "test").subscribe((v) => {});
