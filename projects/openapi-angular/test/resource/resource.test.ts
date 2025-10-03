import type { HttpRequest } from '@angular/common/http';
import { signal } from '@angular/core';
import { describe, expect, expectTypeOf, test } from 'vitest';

import type { components, paths } from '../common/schemas/common.js';
import { openapiTestingResource } from './testing';

type Entity = components['schemas']['Entity'];

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
});
