import type { HttpHeaders, HttpProgressEvent } from '@angular/common/http';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import type { Injector, ResourceStreamItem, Signal, ValueEqualityFn } from '@angular/core';
import {
  computed,
  linkedSignal,
  ɵencapsulateResourceError as encapsulateResourceError,
  ɵResourceImpl as ResourceImpl,
  ɵRuntimeError as RuntimeError,
  signal,
} from '@angular/core';
import { type OpenapiClient, openapiClient } from 'openapi-angular';
import type { Subscription } from 'rxjs';

import type { OpenapiResourceRef, OpenapiResourceRequest } from './types/options';

export class OpenapiResourceImpl<T>
  extends ResourceImpl<T, OpenapiResourceRequest<any, any, any> | undefined>
  implements OpenapiResourceRef<T>
{
  private client!: OpenapiClient<any, any>;
  private _headers = linkedSignal({
    source: this.extRequest,
    computation: () => undefined as HttpHeaders | undefined,
  });
  private _progress = linkedSignal({
    source: this.extRequest,
    computation: () => undefined as HttpProgressEvent | undefined,
  });
  private _statusCode = linkedSignal({
    source: this.extRequest,
    computation: () => undefined as number | undefined,
  });

  readonly headers = computed(() =>
    this.status() === 'resolved' || this.status() === 'error' ? this._headers() : undefined,
  );
  readonly progress = this._progress.asReadonly();
  readonly statusCode = this._statusCode.asReadonly();

  constructor(
    injector: Injector,
    request: () => OpenapiResourceRequest<any, any, any> | undefined,
    defaultValue: T,
    parse?: (value: unknown) => T,
    equal?: ValueEqualityFn<unknown>,
  ) {
    super(
      request,
      ({ params: { method, url, ...init }, abortSignal }) => {
        // eslint-disable-next-line prefer-const
        let sub: Subscription;

        // Track the abort listener so it can be removed if the Observable completes (as a memory
        // optimization).
        const onAbort = () => sub.unsubscribe();
        abortSignal.addEventListener('abort', onAbort);

        // Start off stream as undefined.
        const stream = signal<ResourceStreamItem<T>>({ value: undefined as T });
        let resolve: ((value: Signal<ResourceStreamItem<T>>) => void) | undefined;
        const promise = new Promise<Signal<ResourceStreamItem<T>>>((r) => (resolve = r));

        const send = (value: ResourceStreamItem<T>): void => {
          stream.set(value);
          resolve?.(stream);
          resolve = undefined;
        };

        sub = this.client.request(method ?? 'GET', url, init).subscribe({
          next: (event) => {
            switch (event.type) {
              case HttpEventType.Response:
                this._headers.set(event.headers);
                this._statusCode.set(event.status);
                try {
                  send({ value: parse ? parse(event.body) : (event.body as T) });
                } catch (error) {
                  send({ error: encapsulateResourceError(error) });
                }
                break;
              case HttpEventType.DownloadProgress:
                this._progress.set(event);
                break;
            }
          },
          error: (error) => {
            if (error instanceof HttpErrorResponse) {
              this._headers.set(error.headers);
              this._statusCode.set(error.status);
            }

            send({ error });
            abortSignal.removeEventListener('abort', onAbort);
          },
          complete: () => {
            if (resolve) {
              send({
                error: new RuntimeError(
                  991, // RESOURCE_COMPLETED_BEFORE_PRODUCING_VALUE
                  ngDevMode && 'Resource completed before producing a value',
                ),
              });
            }
            abortSignal.removeEventListener('abort', onAbort);
          },
        });

        return promise;
      },
      defaultValue,
      equal,
      injector,
    );
    this.client = openapiClient({ injector });
  }

  override set(value: T): void {
    super.set(value);

    this._headers.set(undefined);
    this._progress.set(undefined);
    this._statusCode.set(undefined);
  }

  // This is a type only override of the method
  declare hasValue: () => this is OpenapiResourceRef<Exclude<T, undefined>>;
}
