import type {
  FilterKeys,
  HttpMethod,
  IsOperationRequestBodyOptional,
  OperationRequestBodyContent,
  PathsWithMethod,
  RequiredKeysOf,
  ResponseObjectMap,
  SuccessResponse,
} from "openapi-typescript-helpers";
import type { Observable } from "rxjs";
import type { Provider } from "@angular/core";
import type { HttpClient, HttpContext, HttpEvent, HttpRequest, HttpResponse } from "@angular/common/http";

export type OpenapiOptions = { baseUrl: string; querySerializer: QuerySerializer<unknown> };

export function provideOpenapiOptions(options: Partial<OpenapiOptions>): Provider[];

export function injectOpenapiClient<Paths extends Record<string, any>>(
  options?: Partial<OpenapiOptions>,
): OpenapiClient<Paths>;

export interface OpenapiClient<Paths extends Record<string, any>> extends HttpClient {
  /**
   * Sends an `HttpRequest` and returns a stream of `HttpEvent`s.
   *
   * @return An `Observable` of the response, with the response body as a stream of `HttpEvent`s.
   */
  request<R>(req: HttpRequest<any>): Observable<HttpEvent<R>>;
  /**
   * Constructs a request that interprets the body as an `ArrayBuffer` and returns the response in
   * an `ArrayBuffer`.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   *
   * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
   */
  request<
    Method extends HttpMethod,
    Path extends PathsWithMethod<Paths, Method>,
    Init extends MaybeOptionalInit<Paths[Path], Method>,
  >(
    method: Method,
    path: Path,
    options: RequestOptions &
      Init & {
        observe?: "body";
        responseType: "arraybuffer";
      },
  ): Observable<ArrayBuffer>;
  /**
   * Constructs a request that interprets the body as a blob and returns
   * the response as a blob.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body of type `Blob`.
   */
  request<
    Method extends HttpMethod,
    Path extends PathsWithMethod<Paths, Method>,
    Init extends MaybeOptionalInit<Paths[Path], Method>,
  >(
    method: Method,
    path: Path,
    options: RequestOptions &
      Init & {
        observe?: "body";
        responseType: "blob";
      },
  ): Observable<Blob>;
  /**
   * Constructs a request that interprets the body as a text string and
   * returns a string value.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body of type string.
   */
  request<
    Method extends HttpMethod,
    Path extends PathsWithMethod<Paths, Method>,
    Init extends MaybeOptionalInit<Paths[Path], Method>,
  >(
    method: Method,
    path: Path,
    options: RequestOptions &
      Init & {
        observe?: "body";
        responseType: "text";
      },
  ): Observable<string>;
  /**
   * Constructs a request that interprets the body as an `ArrayBuffer` and returns the
   * the full event stream.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the response, with the response body as an array of `HttpEvent`s for
   * the request.
   */
  request<
    Method extends HttpMethod,
    Path extends PathsWithMethod<Paths, Method>,
    Init extends MaybeOptionalInit<Paths[Path], Method>,
  >(
    method: Method,
    path: Path,
    options: RequestOptions &
      Init & {
        observe: "events";
        responseType: "arraybuffer";
      },
  ): Observable<HttpEvent<ArrayBuffer>>;
  /**
   * Constructs a request that interprets the body as a `Blob` and returns
   * the full event stream.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of all `HttpEvent`s for the request,
   * with the response body of type `Blob`.
   */
  request<
    Method extends HttpMethod,
    Path extends PathsWithMethod<Paths, Method>,
    Init extends MaybeOptionalInit<Paths[Path], Method>,
  >(
    method: Method,
    path: Path,
    options: RequestOptions &
      Init & {
        observe: "events";
        responseType: "blob";
      },
  ): Observable<HttpEvent<Blob>>;
  /**
   * Constructs a request which interprets the body as a text string and returns the full event
   * stream.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of all `HttpEvent`s for the request,
   * with the response body of type string.
   */
  request<
    Method extends HttpMethod,
    Path extends PathsWithMethod<Paths, Method>,
    Init extends MaybeOptionalInit<Paths[Path], Method>,
  >(
    method: Method,
    path: Path,
    options: RequestOptions &
      Init & {
        observe: "events";
        responseType: "text";
      },
  ): Observable<HttpEvent<string>>;
  /**
   * Constructs a request which interprets the body as a JavaScript object and returns the full
   * event stream.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the  request.
   *
   * @return An `Observable` of all `HttpEvent`s for the request,
   * with the response body of type `Object`.
   */
  request<
    Method extends HttpMethod,
    Path extends PathsWithMethod<Paths, Method>,
    Init extends MaybeOptionalInit<Paths[Path], Method>,
  >(
    method: Method,
    path: Path,
    options: RequestOptions &
      Init & {
        observe: "events";
        responseType?: "json";
      },
  ): Observable<HttpEvent<JsonResponse<Paths[Path][Method]>>>;
  /**
   * Constructs a request which interprets the body as an `ArrayBuffer`
   * and returns the full `HttpResponse`.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HttpResponse`, with the response body as an `ArrayBuffer`.
   */
  request<
    Method extends HttpMethod,
    Path extends PathsWithMethod<Paths, Method>,
    Init extends MaybeOptionalInit<Paths[Path], Method>,
  >(
    method: Method,
    path: Path,
    options: RequestOptions &
      Init & {
        observe: "response";
        responseType: "arraybuffer";
      },
  ): Observable<HttpResponse<ArrayBuffer>>;
  /**
   * Constructs a request which interprets the body as a `Blob` and returns the full `HttpResponse`.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HttpResponse`, with the response body of type `Blob`.
   */
  request<
    Method extends HttpMethod,
    Path extends PathsWithMethod<Paths, Method>,
    Init extends MaybeOptionalInit<Paths[Path], Method>,
  >(
    method: Method,
    path: Path,
    options: RequestOptions &
      Init & {
        observe: "response";
        responseType: "blob";
      },
  ): Observable<HttpResponse<Blob>>;
  /**
   * Constructs a request which interprets the body as a text stream and returns the full
   * `HttpResponse`.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the HTTP response, with the response body of type string.
   */
  request<
    Method extends HttpMethod,
    Path extends PathsWithMethod<Paths, Method>,
    Init extends MaybeOptionalInit<Paths[Path], Method>,
  >(
    method: Method,
    path: Path,
    options: RequestOptions &
      Init & {
        observe: "response";
        responseType: "text";
      },
  ): Observable<HttpResponse<string>>;
  /**
   * Constructs a request which interprets the body as a JavaScript object and returns the full
   * `HttpResponse`.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the full `HttpResponse`,
   * with the response body of type `Object`.
   */
  request<
    Method extends HttpMethod,
    Path extends PathsWithMethod<Paths, Method>,
    Init extends MaybeOptionalInit<Paths[Path], Method>,
  >(
    method: Method,
    path: Path,
    options: RequestOptions &
      Init & {
        observe: "response";
        responseType?: "json";
      },
  ): Observable<HttpResponse<JsonResponse<Paths[Path][Method]>>>;
  /**
   * Constructs a request which interprets the body as a JavaScript object and returns the full
   * `HttpResponse` as a JavaScript object.
   *
   * @param method  The HTTP method.
   * @param url     The endpoint URL.
   * @param options The HTTP options to send with the request.
   *
   * @return An `Observable` of the `HttpResponse`, with the response body of type `Object`.
   */
  request<
    Method extends HttpMethod,
    Path extends PathsWithMethod<Paths, Method>,
    Init extends MaybeOptionalInit<Paths[Path], Method>,
  >(
    method: Method,
    path: Path,
    ...options: InitParam<
      RequestOptions &
        Init & {
          observe?: "body";
          responseType?: "json";
        }
    >
  ): Observable<JsonResponse<Paths[Path][Method]>>;
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
    options: Omit<RequestOptions, "transferCache"> &
      Init & {
        observe: "events";
        responseType?: "json";
      },
  ): Observable<HttpEvent<JsonResponse<Paths[Path]["delete"]>>>;
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
    options: Omit<RequestOptions, "transferCache"> &
      Init & {
        observe: "response";
        responseType?: "json";
      },
  ): Observable<HttpResponse<JsonResponse<Paths[Path]["delete"]>>>;
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
    path: Path,
    ...options: InitParam<
      Omit<RequestOptions, "transferCache"> &
        Init & {
          observe?: "body";
          responseType?: "json";
        }
    >
  ): Observable<JsonResponse<Paths[Path]["delete"]>>;
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
    options: RequestOptions &
      OmitBody<Init> & {
        observe: "events";
        responseType?: "json";
      },
  ): Observable<HttpEvent<JsonResponse<Paths[Path]["get"]>>>;
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
    options: RequestOptions &
      OmitBody<Init> & {
        observe: "response";
        responseType?: "json";
      },
  ): Observable<HttpResponse<JsonResponse<Paths[Path]["get"]>>>;
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
    path: Path,
    ...options: InitParam<
      RequestOptions &
        OmitBody<Init> & {
          observe?: "body";
          responseType?: "json";
        }
    >
  ): Observable<JsonResponse<Paths[Path]["get"]>>;
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
    options: RequestOptions &
      OmitBody<Init> & {
        observe: "events";
        responseType?: "json";
      },
  ): Observable<HttpEvent<JsonResponse<Paths[Path]["head"]>>>;
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
    options: RequestOptions &
      OmitBody<Init> & {
        observe: "response";
        responseType?: "json";
      },
  ): Observable<HttpResponse<JsonResponse<Paths[Path]["head"]>>>;
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
    path: Path,
    ...options: InitParam<
      RequestOptions &
        OmitBody<Init> & {
          observe?: "body";
          responseType?: "json";
        }
    >
  ): Observable<JsonResponse<Paths[Path]["head"]>>;
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "events";
        responseType?: "json";
      },
  ): Observable<HttpEvent<JsonResponse<Paths[Path]["options"]>>>;
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "response";
        responseType?: "json";
      },
  ): Observable<HttpResponse<JsonResponse<Paths[Path]["options"]>>>;
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
    path: Path,
    ...options: InitParam<
      Omit<RequestOptions, "transferCache"> &
        OmitBody<Init> & {
          observe?: "body";
          responseType?: "json";
        }
    >
  ): Observable<JsonResponse<Paths[Path]["options"]>>;
  /**
   * Constructs a `PATCH` request that interprets the body as an `ArrayBuffer` and returns
   * the response as an `ArrayBuffer`.
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
   */
  patch<Path extends PathsWithMethod<Paths, "patch">, Init extends MaybeOptionalInit<Paths[Path], "patch">>(
    path: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe?: "body";
        responseType: "arraybuffer";
      },
  ): Observable<ArrayBuffer>;
  /**
   * Constructs a `PATCH` request that interprets the body as a `Blob` and returns the response
   * as a `Blob`.
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return An `Observable` of the response, with the response body as a `Blob`.
   */
  patch<Path extends PathsWithMethod<Paths, "patch">, Init extends MaybeOptionalInit<Paths[Path], "patch">>(
    path: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe?: "body";
        responseType: "blob";
      },
  ): Observable<Blob>;
  /**
   * Constructs a `PATCH` request that interprets the body as a text string and
   * returns the response as a string value.
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return An `Observable` of the response, with a response body of type string.
   */
  patch<Path extends PathsWithMethod<Paths, "patch">, Init extends MaybeOptionalInit<Paths[Path], "patch">>(
    path: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe?: "body";
        responseType: "text";
      },
  ): Observable<string>;
  /**
   * Constructs a `PATCH` request that interprets the body as an `ArrayBuffer` and
   *  returns the full event stream.
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return An `Observable` of all the `HttpEvent`s for the request,
   * with the response body as an `ArrayBuffer`.
   */
  patch<Path extends PathsWithMethod<Paths, "patch">, Init extends MaybeOptionalInit<Paths[Path], "patch">>(
    path: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "events";
        responseType: "arraybuffer";
      },
  ): Observable<HttpEvent<ArrayBuffer>>;
  /**
   * Constructs a `PATCH` request that interprets the body as a `Blob`
   *  and returns the full event stream.
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return An `Observable` of all the `HttpEvent`s for the request, with the
   * response body as `Blob`.
   */
  patch<Path extends PathsWithMethod<Paths, "patch">, Init extends MaybeOptionalInit<Paths[Path], "patch">>(
    path: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "events";
        responseType: "blob";
      },
  ): Observable<HttpEvent<Blob>>;
  /**
   * Constructs a `PATCH` request that interprets the body as a text string and
   * returns the full event stream.
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return An `Observable` of all the `HttpEvent`s for the request, with a
   * response body of type string.
   */
  patch<Path extends PathsWithMethod<Paths, "patch">, Init extends MaybeOptionalInit<Paths[Path], "patch">>(
    path: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "events";
        responseType: "text";
      },
  ): Observable<HttpEvent<string>>;
  /**
   * Constructs a `PATCH` request that interprets the body as JSON
   * and returns the full event stream.
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return An `Observable` of all the `HttpEvent`s for the request,
   * with a response body of type `Object`.
   */
  patch<Path extends PathsWithMethod<Paths, "patch">, Init extends MaybeOptionalInit<Paths[Path], "patch">>(
    path: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "events";
        responseType?: "json";
      },
  ): Observable<HttpEvent<JsonResponse<Paths[Path]["patch"]>>>;
  /**
   * Constructs a `PATCH` request that interprets the body as an `ArrayBuffer`
   *  and returns the full `HttpResponse`.
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return  An `Observable` of the `HttpResponse` for the request,
   * with the response body as an `ArrayBuffer`.
   */
  patch<Path extends PathsWithMethod<Paths, "patch">, Init extends MaybeOptionalInit<Paths[Path], "patch">>(
    path: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "response";
        responseType: "arraybuffer";
      },
  ): Observable<HttpResponse<ArrayBuffer>>;
  /**
   * Constructs a `PATCH` request that interprets the body as a `Blob` and returns the full
   * `HttpResponse`.
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return  An `Observable` of the `HttpResponse` for the request,
   * with the response body as a `Blob`.
   */
  patch<Path extends PathsWithMethod<Paths, "patch">, Init extends MaybeOptionalInit<Paths[Path], "patch">>(
    path: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "response";
        responseType: "blob";
      },
  ): Observable<HttpResponse<Blob>>;
  /**
   * Constructs a `PATCH` request that interprets the body as a text stream and returns the
   * full `HttpResponse`.
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return  An `Observable` of the `HttpResponse` for the request,
   * with a response body of type string.
   */
  patch<Path extends PathsWithMethod<Paths, "patch">, Init extends MaybeOptionalInit<Paths[Path], "patch">>(
    path: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "response";
        responseType: "text";
      },
  ): Observable<HttpResponse<string>>;
  /**
   * Constructs a `PATCH` request that interprets the body as JSON
   * and returns the full `HttpResponse`.
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   * with a response body in the requested type.
   */
  patch<Path extends PathsWithMethod<Paths, "patch">, Init extends MaybeOptionalInit<Paths[Path], "patch">>(
    path: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "response";
        responseType?: "json";
      },
  ): Observable<HttpResponse<JsonResponse<Paths[Path]["patch"]>>>;
  /**
   * Constructs a `PATCH` request that interprets the body as JSON and
   * returns the response body as an object parsed from JSON.
   *
   * @param url The endpoint URL.
   * @param body The resources to edit.
   * @param options HTTP options.
   *
   * @return An `Observable` of the response, with the response body as an object parsed from JSON.
   */
  patch<Path extends PathsWithMethod<Paths, "patch">, Init extends MaybeOptionalInit<Paths[Path], "patch">>(
    path: Path,
    body: PickBody<Init>,
    ...options: InitParam<
      Omit<RequestOptions, "transferCache"> &
        OmitBody<Init> & {
          observe?: "body";
          responseType?: "json";
        }
    >
  ): Observable<JsonResponse<Paths[Path]["patch"]>>;
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "events";
        responseType?: "json";
      },
  ): Observable<HttpEvent<JsonResponse<Paths[Path]["post"]>>>;
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
    path: Path,
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
    path: Path,
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
    path: Path,
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
    path: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "response";
        responseType?: "json";
      },
  ): Observable<HttpResponse<JsonResponse<Paths[Path]["post"]>>>;
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
    path: Path,
    body: PickBody<Init>,
    ...options: InitParam<
      Omit<RequestOptions, "transferCache"> &
        OmitBody<Init> & {
          observe?: "body";
          responseType?: "json";
        }
    >
  ): Observable<JsonResponse<Paths[Path]["post"]>>;
  /**
   * Constructs a `PUT` request that interprets the body as an `ArrayBuffer` and returns the
   * response as an `ArrayBuffer`.
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
   */
  put<Path extends PathsWithMethod<Paths, "put">, Init extends MaybeOptionalInit<Paths[Path], "put">>(
    path: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe?: "body";
        responseType: "arraybuffer";
      },
  ): Observable<ArrayBuffer>;
  /**
   * Constructs a `PUT` request that interprets the body as a `Blob` and returns
   * the response as a `Blob`.
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of the response, with the response body as a `Blob`.
   */
  put<Path extends PathsWithMethod<Paths, "put">, Init extends MaybeOptionalInit<Paths[Path], "put">>(
    path: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe?: "body";
        responseType: "blob";
      },
  ): Observable<Blob>;
  /**
   * Constructs a `PUT` request that interprets the body as a text string and
   * returns the response as a string value.
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of the response, with a response body of type string.
   */
  put<Path extends PathsWithMethod<Paths, "put">, Init extends MaybeOptionalInit<Paths[Path], "put">>(
    path: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe?: "body";
        responseType: "text";
      },
  ): Observable<string>;
  /**
   * Constructs a `PUT` request that interprets the body as an `ArrayBuffer` and
   * returns the full event stream.
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of all `HttpEvent`s for the request,
   * with the response body as an `ArrayBuffer`.
   */
  put<Path extends PathsWithMethod<Paths, "put">, Init extends MaybeOptionalInit<Paths[Path], "put">>(
    path: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "events";
        responseType: "arraybuffer";
      },
  ): Observable<HttpEvent<ArrayBuffer>>;
  /**
   * Constructs a `PUT` request that interprets the body as a `Blob` and returns the full event
   * stream.
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of all `HttpEvent`s for the request,
   * with the response body as a `Blob`.
   */
  put<Path extends PathsWithMethod<Paths, "put">, Init extends MaybeOptionalInit<Paths[Path], "put">>(
    path: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "events";
        responseType: "blob";
      },
  ): Observable<HttpEvent<Blob>>;
  /**
   * Constructs a `PUT` request that interprets the body as a text string and returns the full event
   * stream.
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of all `HttpEvent`s for the request, with a response body
   * of type string.
   */
  put<Path extends PathsWithMethod<Paths, "put">, Init extends MaybeOptionalInit<Paths[Path], "put">>(
    path: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "events";
        responseType: "text";
      },
  ): Observable<HttpEvent<string>>;
  /**
   * Constructs a `PUT` request that interprets the body as JSON and returns the full
   * event stream.
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of all `HttpEvent`s for the request, with a response body of
   * type `Object`.
   */
  put<Path extends PathsWithMethod<Paths, "put">, Init extends MaybeOptionalInit<Paths[Path], "put">>(
    path: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "events";
        responseType?: "json";
      },
  ): Observable<HttpEvent<JsonResponse<Paths[Path]["put"]>>>;
  /**
   * Constructs a `PUT` request that interprets the body as an
   * `ArrayBuffer` and returns an observable of the full HTTP response.
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of the `HttpResponse` for the request, with the response body as an
   * `ArrayBuffer`.
   */
  put<Path extends PathsWithMethod<Paths, "put">, Init extends MaybeOptionalInit<Paths[Path], "put">>(
    path: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "response";
        responseType: "arraybuffer";
      },
  ): Observable<HttpResponse<ArrayBuffer>>;
  /**
   * Constructs a `PUT` request that interprets the body as a `Blob` and returns the
   * full HTTP response.
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of the `HttpResponse` for the request,
   * with the response body as a `Blob`.
   */
  put<Path extends PathsWithMethod<Paths, "put">, Init extends MaybeOptionalInit<Paths[Path], "put">>(
    path: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "response";
        responseType: "blob";
      },
  ): Observable<HttpResponse<Blob>>;
  /**
   * Constructs a `PUT` request that interprets the body as a text stream and returns the
   * full HTTP response.
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of the `HttpResponse` for the request, with a response body of type
   * string.
   */
  put<Path extends PathsWithMethod<Paths, "put">, Init extends MaybeOptionalInit<Paths[Path], "put">>(
    path: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "response";
        responseType: "text";
      },
  ): Observable<HttpResponse<string>>;
  /**
   * Constructs a `PUT` request that interprets the body as JSON and returns the full
   * HTTP response.
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of the `HttpResponse` for the request, with a response body
   * of type 'Object`.
   */
  put<Path extends PathsWithMethod<Paths, "put">, Init extends MaybeOptionalInit<Paths[Path], "put">>(
    path: Path,
    body: PickBody<Init>,
    options: Omit<RequestOptions, "transferCache"> &
      OmitBody<Init> & {
        observe: "response";
        responseType?: "json";
      },
  ): Observable<HttpResponse<JsonResponse<Paths[Path]["put"]>>>;
  /**
   * Constructs a `PUT` request that interprets the body as JSON
   * and returns an observable of JavaScript object.
   *
   * @param url The endpoint URL.
   * @param body The resources to add/update.
   * @param options HTTP options
   *
   * @return An `Observable` of the response as a JavaScript object.
   */
  put<Path extends PathsWithMethod<Paths, "put">, Init extends MaybeOptionalInit<Paths[Path], "put">>(
    path: Path,
    body: PickBody<Init>,
    ...options: InitParam<
      Omit<RequestOptions, "transferCache"> &
        OmitBody<Init> & {
          observe?: "body";
          responseType?: "json";
        }
    >
  ): Observable<JsonResponse<Paths[Path]["put"]>>;
}

type PickBody<T> = "body" extends keyof T
  ? T["body"]
  : T extends { body?: any }
    ? Exclude<T["body"], undefined> | null
    : null;
type OmitBody<T> = Omit<T, "body">;

type JsonResponse<T extends Record<string | number, any>> = SuccessResponse<ResponseObjectMap<T>, "application/json">;

type RequestBodyOption<T> = OperationRequestBodyContent<T> extends never
  ? { body?: never }
  : IsOperationRequestBodyOptional<T> extends true
    ? { body?: OperationRequestBodyContent<T> }
    : { body: OperationRequestBodyContent<T> };

type ParamsOption<T> = T extends {
  parameters: any;
}
  ? RequiredKeysOf<T["parameters"]> extends never
    ? { params?: T["parameters"] }
    : { params: T["parameters"] }
  : {};

type RequestOptions = {
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

type InitOptions<T> = ParamsOption<T> & RequestBodyOption<T>;

type MaybeOptionalInit<Params, Location extends keyof Params> = RequiredKeysOf<
  InitOptions<FilterKeys<Params, Location>>
> extends never
  ? InitOptions<FilterKeys<Params, Location>> | undefined
  : InitOptions<FilterKeys<Params, Location>>;

type InitParam<Init> = RequiredKeysOf<Init> extends never
  ? [(Init & { [key: string]: unknown })?]
  : [Init & { [key: string]: unknown }];

// utils

/** Serialize primitive params to string */
export declare function serializePrimitiveParam(
  name: string,
  value: string,
  options?: { allowReserved?: boolean },
): string;

/** Serialize object param to string */
export declare function serializeObjectParam(
  name: string,
  value: Record<string, unknown>,
  options: {
    style: "simple" | "label" | "matrix" | "form" | "deepObject";
    explode: boolean;
    allowReserved?: boolean;
  },
): string;

/** Serialize array param to string */
export declare function serializeArrayParam(
  name: string,
  value: unknown[],
  options: {
    style: "simple" | "label" | "matrix" | "form" | "spaceDelimited" | "pipeDelimited";
    explode: boolean;
    allowReserved?: boolean;
  },
): string;

export type QuerySerializer<T> = (
  query: T extends { parameters: any } ? NonNullable<T["parameters"]["query"]> : Record<string, unknown>,
) => string;

/** @see https://swagger.io/docs/specification/serialization/#query */
export type QuerySerializerOptions = {
  /** Set serialization for arrays. @see https://swagger.io/docs/specification/serialization/#query */
  array?: {
    /** default: "form" */
    style: "form" | "spaceDelimited" | "pipeDelimited";
    /** default: true */
    explode: boolean;
  };
  /** Set serialization for objects. @see https://swagger.io/docs/specification/serialization/#query */
  object?: {
    /** default: "deepObject" */
    style: "form" | "deepObject";
    /** default: true */
    explode: boolean;
  };
  /**
   * The `allowReserved` keyword specifies whether the reserved characters
   * `:/?#[]@!$&'()*+,;=` in parameter values are allowed to be sent as they
   * are, or should be percent-encoded. By default, allowReserved is `false`,
   * and reserved characters are percent-encoded.
   * @see https://swagger.io/docs/specification/serialization/#query
   */
  allowReserved?: boolean;
};

/** Serialize query params to string */
export declare function createQuerySerializer<T = unknown>(
  options?: QuerySerializerOptions,
): (queryParams: T) => string;

/**
 * Handle different OpenAPI 3.x serialization styles
 * @type {import("./index.js").defaultPathSerializer}
 * @see https://swagger.io/docs/specification/serialization/#path
 */
export declare function defaultPathSerializer(pathname: string, pathParams: Record<string, unknown>): string;

/** Construct URL string from baseUrl and handle path and query params */
export declare function createFinalURL<O>(
  pathname: string,
  options: {
    baseUrl: string;
    params: {
      query?: Record<string, unknown>;
      path?: Record<string, unknown>;
    };
    querySerializer: QuerySerializer<O>;
  },
): string;

/** Remove trailing slash from url */
export declare function removeTrailingSlash(url: string): string;
