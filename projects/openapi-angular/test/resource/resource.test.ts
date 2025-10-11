import type { HttpRequest } from '@angular/common/http';
import { signal } from '@angular/core';
import { describe, expect, expectTypeOf, test } from 'vitest';

import type { components, paths } from '../common/schemas/common.js';
import { openapiTestingResource } from './testing';

type Entity = components['schemas']['Entity'];
type Post = components['schemas']['Post'];

describe('resource', () => {
  let request!: HttpRequest<unknown>;

  test('undefined', async () => {
    using resource = openapiTestingResource<paths>({}, (req: HttpRequest<unknown>) => {
      request = req;
    });

    const ref = resource(() => undefined);

    await resource.whenStable();

    const val = ref.value();

    expect(request).toBe(undefined);
    expect(val).toBe(undefined);
    expectTypeOf(val).toEqualTypeOf<undefined>();
  });

  test('undefined with default value', async () => {
    using resource = openapiTestingResource<paths>({}, (req: HttpRequest<unknown>) => {
      request = req;
    });

    // @ts-expect-error
    resource(() => undefined, { defaultValue: 0 }).destroy();

    const ref = resource(() => undefined, { defaultValue: undefined });

    await resource.whenStable();

    const val = ref.value();

    expect(request).toBe(undefined);
    expect(val).toBe(undefined);
    expectTypeOf(val).toEqualTypeOf<undefined>();
  });

  test('path', async () => {
    const body: Entity[] = [{ id: 123 }];
    using resource = openapiTestingResource<paths>({}, (req: HttpRequest<unknown>) => {
      request = req;
      return { body };
    });

    const ref = resource(() => '/entities');

    expect(ref.value()).toBe(undefined);

    await resource.whenStable();

    expect(ref.error()).toBe(undefined);

    const val = ref.value();

    expect(request.url).toBe('https://fake-api.example/entities');
    expect(val).toBe(body);
    expectTypeOf(val).toEqualTypeOf<Entity[] | undefined>();
  });

  test('path with default value', async () => {
    const body: Entity[] = [{ id: 123 }];
    using resource = openapiTestingResource<paths>({}, (req: HttpRequest<unknown>) => {
      request = req;
      return { body };
    });

    const defaultValue: Entity[] = [];

    const ref = resource(() => '/entities', { defaultValue });

    expect(ref.value()).toBe(defaultValue);

    await resource.whenStable();

    expect(ref.error()).toBe(undefined);

    const val = ref.value();

    expect(request.url).toBe('https://fake-api.example/entities');
    expect(val).toBe(body);
    expectTypeOf(val).toEqualTypeOf<Entity[]>();
  });

  test('path and undefined', async () => {
    const body: Entity[] = [{ id: 123 }];
    using resource = openapiTestingResource<paths>({}, (req: HttpRequest<unknown>) => {
      request = req;
      return { body };
    });

    const value = signal(false);

    const ref = resource(() => (value() ? '/entities' : undefined));

    expect(ref.value()).toBe(undefined);

    await resource.whenStable();

    expect(ref.error()).toBe(undefined);

    const val = ref.value();

    expect(request.url).toBe('https://fake-api.example/entities');
    expect(val).toBe(undefined);
    expectTypeOf(val).toEqualTypeOf<Entity[] | undefined>();
  });

  test('path and undefined with default undefined value', async () => {
    const body: Entity[] = [{ id: 123 }];
    using resource = openapiTestingResource<paths>({}, (req: HttpRequest<unknown>) => {
      request = req;
      return { body };
    });

    const value = signal(true);

    // @ts-expect-error
    resource(() => (value() ? '/entities' : undefined), { defaultValue: null });

    // @ts-expect-error
    resource(() => (value() ? '/entities' : undefined), { defaultValue: {} });

    const ref = resource(() => (value() ? '/entities' : undefined), { defaultValue: undefined });

    expect(ref.value()).toBe(undefined);

    await resource.whenStable();

    expect(ref.error()).toBe(undefined);

    const val = ref.value();

    expect(request.url).toBe('https://fake-api.example/entities');
    expect(val).toBe(body);
    expectTypeOf(val).toEqualTypeOf<Entity[] | undefined>();
  });

  test('path and undefined with default object value', async () => {
    const body: Entity[] = [{ id: 123 }];
    using resource = openapiTestingResource<paths>({}, (req: HttpRequest<unknown>) => {
      request = req;
      return { body };
    });

    const value = signal(false);

    const defaultValue: Entity[] = [];

    const ref = resource(() => (value() ? '/entities' : undefined), { defaultValue });

    expect(ref.value()).toBe(defaultValue);

    await resource.whenStable();

    expect(ref.error()).toBe(undefined);

    const val = ref.value();

    expect(request.url).toBe('https://fake-api.example/entities');
    expect(val).toBe(defaultValue);
    expectTypeOf(val).toEqualTypeOf<Entity[]>();
  });

  test('request', async () => {
    const body: Entity[] = [{ id: 123 }];
    using resource = openapiTestingResource<paths>({}, (req: HttpRequest<unknown>) => {
      request = req;
      return { body };
    });

    const ref = resource(() => ({ url: '/entities' }));

    expect(ref.value()).toBe(undefined);

    await resource.whenStable();

    expect(ref.error()).toBe(undefined);

    const val = ref.value();

    expect(request.url).toBe('https://fake-api.example/entities');
    expect(val).toBe(body);
    expectTypeOf(val).toEqualTypeOf<Entity[] | undefined>();
  });

  test('request with default value', async () => {
    const body: Entity[] = [{ id: 123 }];
    using resource = openapiTestingResource<paths>({}, (req: HttpRequest<unknown>) => {
      request = req;
      return { body };
    });

    const defaultValue: Entity[] = [];

    const ref = resource(() => ({ url: '/entities' }), { defaultValue });

    expect(ref.value()).toBe(defaultValue);

    await resource.whenStable();

    expect(ref.error()).toBe(undefined);

    const val = ref.value();

    expect(request.url).toBe('https://fake-api.example/entities');
    expect(val).toBe(body);
    expectTypeOf(val).toEqualTypeOf<Entity[]>();
  });

  test('request and undefined', async () => {
    const body: Entity[] = [{ id: 123 }];
    using resource = openapiTestingResource<paths>({}, (req: HttpRequest<unknown>) => {
      request = req;
      return { body };
    });

    const value = signal(false);

    const ref = resource(() => (value() ? { url: '/entities' } : undefined));

    expect(ref.value()).toBe(undefined);

    await resource.whenStable();

    expect(ref.error()).toBe(undefined);

    const val = ref.value();

    expect(request.url).toBe('https://fake-api.example/entities');
    expect(val).toBe(undefined);
    expectTypeOf(val).toEqualTypeOf<Entity[] | undefined>();
  });

  test('request and undefined with default undefined value', async () => {
    const body: Entity[] = [{ id: 123 }];
    using resource = openapiTestingResource<paths>({}, (req: HttpRequest<unknown>) => {
      request = req;
      return { body };
    });

    const value = signal(true);

    // @ts-expect-error
    resource(() => (value() ? { url: '/entities' } : undefined), { defaultValue: null });

    // @ts-expect-error
    resource(() => (value() ? { url: '/entities' } : undefined), { defaultValue: {} });

    const ref = resource(() => (value() ? { url: '/entities' } : undefined), {
      defaultValue: undefined,
    });

    expect(ref.value()).toBe(undefined);

    await resource.whenStable();

    expect(ref.error()).toBe(undefined);

    const val = ref.value();

    expect(request.url).toBe('https://fake-api.example/entities');
    expect(val).toBe(body);
    expectTypeOf(val).toEqualTypeOf<Entity[] | undefined>();
  });

  test('request and undefined with default object value', async () => {
    const body: Entity[] = [{ id: 123 }];
    using resource = openapiTestingResource<paths>({}, (req: HttpRequest<unknown>) => {
      request = req;
      return { body };
    });

    const value = signal(false);

    const defaultValue: Entity[] = [];

    const ref = resource(() => (value() ? { url: '/entities' } : undefined), { defaultValue });

    expect(ref.value()).toBe(defaultValue);

    await resource.whenStable();

    expect(ref.error()).toBe(undefined);

    const val = ref.value();

    expect(request.url).toBe('https://fake-api.example/entities');
    expect(val).toBe(defaultValue);
    expectTypeOf(val).toEqualTypeOf<Entity[]>();
  });

  test('request with method', async () => {
    const body: Post = { status: 'draft' };
    using resource = openapiTestingResource<paths>({}, (req: HttpRequest<unknown>) => {
      request = req;
      return { body };
    });

    // @ts-expect-error
    resource(() => ({ method: 'POST' }));

    // @ts-expect-error
    resource(() => ({ method: 'POST', url: '/entities' }));

    // TODO: check body
    const ref = resource(() => ({ method: 'POST', url: '/posts' }));

    await resource.whenStable();

    expect(ref.error()).toBe(undefined);

    const val = ref.value();

    expect(request.method).toBe('POST');
    expect(request.url).toBe('https://fake-api.example/posts');
    expectTypeOf(val).toEqualTypeOf<Post | undefined>();
  });

  test('request with two methods', async () => {
    const body1: Entity[] = [{ id: 123 }];
    const body2: Post = { status: 'draft' };
    using resource = openapiTestingResource<paths>({}, (req: HttpRequest<unknown>) => {
      request = req;
      if (req.url.endsWith('/entities')) {
        return { body: body1 };
      }

      if (req.url.endsWith('/posts')) {
        return { body: body2 };
      }

      return {};
    });

    const value = signal(true);

    const ref = resource(() =>
      value() ? { method: 'POST', url: '/posts' } : { method: 'GET', url: '/entities' },
    );

    await resource.whenStable();

    expect(ref.error()).toBe(undefined);

    const val = ref.value();

    expect(request.method).toBe('POST');
    expect(request.url).toBe('https://fake-api.example/posts');
    expectTypeOf(val).toEqualTypeOf<Post | Entity[] | undefined>();
  });
});
