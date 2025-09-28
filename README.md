# OpenAPI Angular

**openapi-angular** is a type-safe HTTP client for Angular that uses your OpenAPI schema to provide fully typed API calls.

> Inspired by [OpenAPI Fetch](https://www.npmjs.com/package/openapi-fetch), adapted for Angular’s `HttpClient`.

## Features

- **End-to-end type safety** for requests and responses
- **Path parameter** and request shape validation via types
- **Autocomplete** for endpoints and params from your schema
- **Angular DI** friendly (built on `HttpClient`)
- Lightweight **proxy API** over `HttpClient`

## Installation

```bash
npm install openapi-angular
```

## Usage

1. Generate OpenAPI types with `openapi-typescript`:

   ```bash
   npx openapi-typescript ./path-to-your-schema.yaml -o ./src/app/shared/api/types.ts
   ```

2. Create your service:

   ```ts
   import { Injectable } from '@angular/core';
   import { openapiClient } from 'openapi-angular';
   import type { paths } from './my-openapi-3-schema'; // generated types

   @Injectable({ providedIn: 'root' })
   export class BlogService {
     private readonly client = openapiClient<paths>({
       baseUrl: 'https://myapi.dev/v1/',
     });

     // Get a post with type-safe params and response
     getPost(postId: string) {
       return this.client.get('/blogposts/{post_id}', {
         params: {
           path: { post_id: postId }, // ✅ type-checked path params
           query: { version: 2 }, // ✅ type-checked query params
         },
       });
       // Observable<{ title: string; content: string }>
     }

     // Create a post with a type-safe body
     createPost(title: string, content: string) {
       return this.client.post('/blogposts', {
         body: {
           title,
           content,
           publishedAt: new Date().toISOString(),
         }, // ✅ type-checked body
       });
       // Observable<{ id: string; title: string }>
     }
   }
   ```

## How it differs from `HttpClient`

1. **Path-based URLs:** Use OpenAPI paths instead of hardcoded URLs.

   ```ts
   // Instead of:
   http.get('https://myapi.dev/v1/blogposts/123');

   // Use:
   client.get('/blogposts/{post_id}', {
     baseUrl: 'https://myapi.dev/v1/',
     params: { path: { post_id: '123' } },
   });
   ```

2. **Structured params**: Parameters are grouped by location.

   ```ts
   {
     params: {
       path:  { post_id: string }
       query: { version?: number }
       header:{ 'X-Request-ID': string }
     }
   }
   ```

3. **Base URL management:** Set a default and optionally override per request.

   ```ts
   const client = openapiClient({ baseUrl: 'https://api.example.com/v1' });
   client.get('/endpoint', { baseUrl: 'https://backup.example.com' });
   ```

4. **Typed responses:** Automatic typing for `application/json` payloads.

5. **Body placement for `POST`/`PUT`/`PATCH`:**  
   In Angular’s `HttpClient`, these methods accept the **body as the 2nd argument** and options as the 3rd:

   ```ts
   // HttpClient
   http.post(url, body, options?);
   http.put(url, body, options?);
   http.patch(url, body, options?);
   ```

   In **openapi-angular**, the **body is part of the options object** (alongside `params`, `headers`, etc.). This keeps the API uniform across methods and allows the body to be fully type-checked against your OpenAPI schema:

   ```ts
   // openapi-angular
   client.post('/posts', {
     body: { title: 'Hello', content: 'World' }, // ✅ strongly typed body
     params: { query: { draft: true } }, // ✅ typed query
     headers: { 'X-Request-ID': '123' },
   });

   client.put('/posts/{id}', {
     body: { title: 'Updated' },
     params: { path: { id: '42' } },
   });

   client.patch('/posts/{id}', {
     body: { title: 'Patched' },
     params: { path: { id: '42' } },
   });
   ```

   > Bonus: whether the `body` is **required or optional** is inferred from the OpenAPI operation. If an endpoint has no request body, you simply omit `body`.

## Error Handling

The client provides typed success responses; handle failures as usual:

```ts
import { catchError, throwError } from 'rxjs';

this.blogService.getPost('123').pipe(
  catchError((error: unknown) => {
    console.error('API error:', error);
    return throwError(() => new Error('Failed to load post'));
  }),
);
```

## How it compares to `openapi-fetch` (and why)

This library is conceptually very close to `openapi-fetch`: you call endpoints by OpenAPI path, and you get strongly typed requests/responses from your schema. However, a few design choices differ to better fit Angular’s `HttpClient` and common Angular app patterns.

### 1) No typed error unions (by design)

Unlike `openapi-fetch`, this client does **not** return typed error unions. In many Angular codebases:

- Error payloads follow **one, uniform model** across endpoints.
- Errors are typically handled centrally via **HTTP interceptors** (e.g., showing a toast/notification).
- At the call site, developers commonly use `catchError` for logging/reporting, while the majority of value comes from **strongly typed success data**.

To keep the API surface lean (and because typed error unions often add noise with little practical benefit in Angular apps), the library focuses on **type-safe success** responses only.

If you do want typed errors, you can still create a small wrapper around the client (as shown in tests originally). Example reference:
[tests/helpers.ts](https://github.com/Chiorufarewerin/openapi-angular/blob/34f59170b9ccbe0d15da95a534e808d93b4c19bf/projects/openapi-angular/src/test/helpers.ts)

A typical Angular pattern:

```ts
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

// Interceptor: centralize UX for failures
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err: unknown) => {
      // Show user-friendly message, report to monitoring, etc.
      console.error('API error:', err);

      // Re-throw so callers can handle it (e.g., with catchError at call site)
      return throwError(() => err);
    }),
  );
};

// Call site: focus on typed success; log as needed
client.get('/posts/{id}', { params: { path: { id: '123' } } }).pipe(
  catchError((err: unknown) => {
    console.error('Failed to load post', err);
    return EMPTY;
  }),
);
```

### 2) `undefined` vs `null` for empty bodies

With `openapi-fetch`, a missing request/response body is often `undefined`.
With Angular’s `HttpClient`, it’s commonly `null`.

Keep this in mind if you branch on body presence—prefer truthiness checks (or schema knowledge) over strict `if (body !== undefined)`.

### 3) No implicit `application/x-www-form-urlencoded` conversion (by design)

Unlike `openapi-fetch`, this library **does not** auto-convert plain objects into `application/x-www-form-urlencoded`.
If you need `application/x-www-form-urlencoded`, explicitly build the body as `HttpParams`; setting the header **alone** is not enough.

```ts
import { HttpParams } from '@angular/common/http';

client.post('/auth/login', {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, // optional; Angular sets it when body is HttpParams
  body: { username: 'alice', password: 'secret' },
  bodySerializer: (body) => new HttpParams({ fromObject: body }),
});
```

### 4) Observables instead of Promises

`openapi-fetch` is Promise-based; this library is **Observable-based** to align with Angular (`HttpClient` returns `Observable`).
If you need a Promise, use `firstValueFrom`/`lastValueFrom`:

```ts
import { firstValueFrom } from 'rxjs';

const res = await firstValueFrom(client.get('/posts/{id}', { params: { path: { id: '123' } } }));
```

These differences are intentional to keep the developer experience idiomatic in Angular applications while preserving the strong typing benefits inspired by `openapi-fetch`.

## Limitations

- ❌ JSONP is not supported
- ❌ Cookie parameters are not yet implemented
- ❌ Non-JSON response bodies may lose type safety (use `responseType` carefully)

## Best Practices

- **Validate at runtime** when needed (e.g., with Zod) to complement compile-time types.
- **Centralize error handling** with an HTTP interceptor.

## Contributing

Found a bug or have an idea? Contributions are welcome!

1. Fork the repo
2. Create a feature branch
3. Open a pull request

## Attribution

This project is adapted from [openapi-fetch](https://github.com/openapi-ts/openapi-typescript) for Angular’s `HttpClient`.

Licensed under MIT.
