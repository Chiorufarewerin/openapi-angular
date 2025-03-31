# OpenAPI Angular

**openapi-angular** is a type-safe HTTP client for Angular that leverages your OpenAPI schema to provide fully typed API interactions.

> Inspired by [OpenAPI Fetch](https://www.npmjs.com/package/openapi-fetch), but specifically adapted for Angular's `HttpClient`.

## Features

- **Type-safe** requests and responses
- **Path parameter** validation
- **Autocompletion** for API endpoints
- **Angular DI** ready (uses `HttpClient` under the hood)
- Lightweight **proxy interface** to `HttpClient`

## Installation

```bash
npm install openapi-angular
```

## Usage

1. First, generate your OpenAPI types using openapi-typescript:

```bash
npx openapi-typescript ./path-to-your-schema.yaml -o ./src/app/shared/api/types.ts
```

1. Create your service:

```ts
import { injectOpenapiClient } from "openapi-angular";
import { paths } from "./my-openapi-3-schema"; // generated types

@Injectable({ providedIn: "root" })
export class BlogService {
  private readonly client = injectOpenapiClient<paths>({
    baseUrl: "https://myapi.dev/v1/",
  });

  // Get a post with type-safe params and response
  getPost(postId: string) {
    return this.client.get("/blogposts/{post_id}", {
      params: {
        path: { post_id: postId }, // ✅ Type-checked path params
        query: { version: 2 }, // ✅ Type-checked query params
      },
    });
    // Returns Observable<{ title: string; content: string }>
  }

  // Create a post with type-safe body
  createPost(title: string, content: string) {
    return this.client.post("/blogposts", {
      title,
      content,
      publishedAt: new Date().toISOString(),
    });
    // Returns Observable<{ id: string; title: string }>
  }
}
```

## Key Differences from HttpClient

1. Path-based URLs: Specify OpenAPI paths instead of full URLs

```ts
// Instead of:
http.get("https://myapi.dev/v1/blogposts/123");

// You write:
client.get("/blogposts/{post_id}", {
  baseUrl: "https://myapi.dev/v1/",
  params: { path: { post_id: "123" } },
});
```

2. Structured Params: All parameters are organized by type:

```ts
{
  params: {
    path: { post_id: string },
    query: { version?: number },
    header: { 'X-Request-ID': string }
  }
}
```

3. Base URL Management: Set a default but override per-request:

```ts
// Set default:
const client = injectOpenapiClient({ baseUrl: "https://api.example.com/v1" });

// Override:
client.get("/endpoint", { baseUrl: "https://backup.example.com" });
```

4. Response Typing: Automatic typing for application/json responses

## Error Handling

The client provides proper typing for successful responses, but you should handle errors:

```ts
this.blogService.getPost("123").pipe(
  catchError((error: HttpErrorResponse) => {
    console.error("API Error:", error);
    return throwError(() => new Error("Failed to load post"));
  })
);
```

## Limitations

- ❌ No support for JSONP requests

- ❌ Cookie parameters not yet implemented

- ❌ Non-JSON response bodies lose type safety (use responseType options carefully)

## Best Practices

- Validate responses: Consider using zod or other validation libraries for runtime type checking

- Handle errors globally: Implement an HTTP interceptor for consistent error handling

## Contribution

Found an issue? Want to improve the library? We welcome contributions!

1. Fork the repository

1. Create a feature branch

1. Submit a pull request

## Attribution

This project is a modified version of [openapi-typescript](https://github.com/openapi-ts/openapi-typescript), adapted specifically for `openapi-angular`.

Both projects are licensed under MIT.
