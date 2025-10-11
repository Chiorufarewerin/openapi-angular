# openapiResource

A reactive, **signal-based** API for calling your OpenAPI endpoints in Angular. It mirrors Angular’s `httpResource`, but with end‑to‑end typing from your OpenAPI schema and full access to `openapi-angular` request options.

> Use `openapiResource` when you want a declarative request that automatically re-fetches whenever its _inputs (signals)_ change.

---

## At a glance

```ts
import { openapiResourceFactory } from 'openapi-angular/resource';
import type { paths } from './generated/openapi-types';

const openapiResource = openapiResourceFactory<paths>({
  baseUrl: 'https://api.example.com/v1',
});

// GET /posts/{id} — reactive by `postId()`
const postId = signal('1');
const post = openapiResource(() => ({
  url: '/posts/{id}',
  params: { path: { id: postId() } },
}));

// In a template
// @if (post.isLoading()) { ... }
// @if (post.error()) { ... }
// @if (post.hasValue()) { {{ post.value().title }} }
```

---

## Installation

Use the same package as the client:

```bash
npm i openapi-angular
```

No extra peer dependencies beyond Angular’s HTTP module.

---

## Creating the factory

```ts
import { openapiResourceFactory } from 'openapi-angular/resource';
import type { paths } from './generated/schema';

export const openapiResource = openapiResourceFactory<paths>({
  baseUrl: 'https://api.example.com',
  // ...any OpenAPI client options (interceptors via HttpClient are supported)
});
```

The factory exposes sub-constructors for alternate response types:

- `openapiResource` (JSON, default)
- `openapiResource.text`
- `openapiResource.blob`
- `openapiResource.arrayBuffer`

---

## API

### `openapiResource(() => request | url | undefined, options?)`

Creates a `OpenapiResourceRef<T>` which exposes request _state_ and _value_ as signals.

**Parameters**

- **request**: a function returning either
  - a **string URL** (OpenAPI path, e.g. `'/users'`), or
  - a **request object** (see below), or
  - **`undefined`** to _skip_ the request. When the function evaluates to `undefined`, no HTTP call is made; once it becomes defined again, the resource refetches.
- **options?**: identical to Angular’s `HttpResourceOptions<TResult, TRaw>`:
  - `parse?: (raw: TRaw) => TResult` — transform/validate raw response
  - `defaultValue?: TResult` — initial value (and type) while idle/loading
  - `injector?: Injector` — required outside injection context (e.g. tests)
  - `equal?: ValueEqualityFn<TResult>` — equality for `value.set()` writes

> See **TypeScript** section for generics and inference.

**Returns**: `OpenapiResourceRef<TResult | undefined>` with:

- `value(): TResult | undefined` — last successful value
- `isLoading(): boolean` — request in flight
- `error(): Error | undefined` — last error
- `headers(): HttpHeaders | undefined` — last response headers
- `statusCode(): number | undefined` — last status code
- `progress(): HttpProgressEvent | undefined` — last progress event (if enabled)
- `reload(): void` — refetch the current request
- `set(next: TResult): void` — imperatively override `value()`; resets `headers/progress/status`
- `hasValue(): this is OpenapiResourceRef<Exclude<TResult, undefined>>` — narrows `value()` type when you didn’t set a `defaultValue`

### Request object shape

When you don’t pass a plain URL string, you can specify the full request:

```ts
openapiResource(() => ({
  url: '/users/{id}',
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', // default: 'GET'
  params: {
    path?:   Record<string, string | number | boolean>;
    query?:  Record<string, string | number | boolean | (string | number | boolean)[]>;
    header?: Record<string, string>;
  },
  headers?: Record<string, string>,
  body?: unknown, // type-checked from your OpenAPI schema
  // Any HttpClient/OpenAPI options — context, reportProgress, withCredentials,
  // transferCache, timeout, etc. Fetch-only flags are forwarded when using the
  // Fetch backend (keepalive, priority, cache, mode, redirect, credentials, integrity, referrer).
}));
```

---

## Examples

### 1) Basic GET

```ts
const users = openapiResource(() => '/users');
```

### 2) Reactive path & query params

```ts
const userId = signal('42');
const search = signal('');

const user = openapiResource(() => ({
  url: '/users/{id}',
  params: { path: { id: userId() } },
}));

const results = openapiResource(() => ({
  url: '/users',
  params: { query: { q: search() || undefined } },
}));
```

### 3) POST + headers + credentials

```ts
const create = openapiResource(() => ({
  url: '/posts',
  method: 'POST',
  body: { title: 'Hello', content: 'World' },
  headers: { 'X-Tag': 'alpha' },
  withCredentials: true,
}));
```

### 4) Text / Blob / ArrayBuffer responses

```ts
const txt = openapiResource.text(() => ({ url: '/readme.txt' }));
const file = openapiResource.blob(() => ({ url: '/export', reportProgress: true }));
const bin = openapiResource.arrayBuffer(() => ({ url: '/bytes' }));
```

### 5) Skipping & resuming

```ts
const enabled = signal(false);
const maybe = openapiResource(() => (enabled() ? { url: '/stats' } : undefined));

enabled.set(true); // triggers the first request
```

### 6) Access headers, status, and progress

```ts
const download = openapiResource(() => ({ url: '/large', reportProgress: true }));

// in template or effects
if (download.progress()) {
  const { loaded, total } = download.progress()!;
}

const etag = download.headers()?.get('ETag');
const status = download.statusCode();
```

### 7) Parse & narrow types (with Zod)

```ts
import { z } from 'zod';

const User = z.object({ id: z.string(), name: z.string() });
const user = openapiResource(() => '/users/me', {
  parse: (raw) => User.parse(raw), // throws on invalid; type narrows to {id:string;name:string}
});
```

### 8) `defaultValue` & `hasValue()`

```ts
// Without defaultValue — type is T | undefined, but narrows after hasValue()
const r1 = openapiResource(() => '/users/me');
if (r1.hasValue()) {
  r1.value().id; // T is narrowed
}

// With defaultValue — always has a value of that type
const r2 = openapiResource(() => '/users', { defaultValue: [] as const });
r2.value(); // string[] (no undefined)
```

### 9) Equality for writes

```ts
const r = openapiResource(() => '/users/me', { equal: (a, b) => true });
r.value.set({ id: '1', name: 'Alice' }); // ignored by equality fn
```

### 10) Manual reload

```ts
const r = openapiResource(() => '/users');
r.reload();
```

---

## Type safety

`openapiResource` is fully generic over your `paths` type, so both the **request** (method, params, body) and the **response** are inferred from the path & method you use.

- Passing `url: '/users/{id}'` requires `params.path.id`.
- `method: 'POST'` switches to the POST operation typing for that path.
- `openapiResource.text`/`.blob`/`.arrayBuffer` change only the **response** type.

---

## When to use `openapiResource` vs `openapiClient`

- Use **`openapiClient`** for _imperative_ calls (fire-and-forget, debounced actions, etc.).
- Use **`openapiResource`** for _declarative_ data that should track inputs and update automatically.

They can coexist — both share the same request options and interceptors.

---

## SSR & Testing

- Works with Angular’s Fetch or XHR backends, interceptors, `HttpTestingController`, TransferCache, etc.
- In tests or outside DI, pass `options.injector`.

```ts
const res = openapiResource(() => '/data', { injector: TestBed.inject(Injector) });
```
