import { firstValueFrom } from 'rxjs';
import { assertType, describe, expect, test } from 'vitest';

import type { components, paths } from '../common/schemas/common.js';
import { openapiTestingClient } from '../testing.js';

// Perform some basic type tests
// but with `strictNullChecks` disabled in tsconfig.json

type Entity = components['schemas']['Entity'];

const entity1: Entity = { id: 123 };
const entity2: Entity = { id: 456 };
const entity3: Entity = { id: 789 };

describe('params', () => {
  describe('path', () => {
    test('typechecks', async () => {
      using client = openapiTestingClient<paths>({}, (req) => {
        const found = [entity1, entity2, entity3].find(
          (post) => String(post.id) === req.url.split('/entities/')[1],
        );
        return found ? { body: found } : { body: { code: 404, message: 'Not found' }, status: 404 };
      });

      // assert missing options throws error
      await expect(
        firstValueFrom(
          client
            // @ts-expect-error
            .get('/entities/{id}'),
        ),
      ).rejects.toThrowError();

      // assert missing options.params throws error
      await expect(
        firstValueFrom(
          client
            // @ts-expect-error
            .get('/entities/{id}', {}),
        ),
      ).rejects.toThrowError();

      // assert missing path params throws error
      await expect(
        firstValueFrom(
          client.get('/entities/{id}', {
            // @ts-expect-error
            params: {},
          }),
        ),
      ).rejects.toThrowError();

      // assert empty paths object throws error
      await expect(
        firstValueFrom(
          client.get('/entities/{id}', {
            params: {
              // @ts-expect-error
              path: {},
            },
          }),
        ),
      ).rejects.toThrowError();

      // assert right name, mismatched type throws error
      await firstValueFrom(
        client.get('/entities/{id}', {
          params: {
            path: {
              // @ts-expect-error
              id: '123',
            },
          },
        }),
      );

      // assert right name, right type passes
      const data = await firstValueFrom(
        client.get('/entities/{id}', { params: { path: { id: 456 } } }),
      );
      expect(data).toEqual(entity2);
    });

    test('typechecks (empty path params)', async () => {
      using client = openapiTestingClient<paths>({}, () => ({
        body: [entity1, entity2, entity3],
      }));

      // assert unneeded path params throws type error
      await firstValueFrom(
        client.get('/entities', {
          params: {
            // @ts-expect-error
            path: { id: 123 },
          },
        }),
      );

      // assert even empty objects throw type error
      await firstValueFrom(
        client.get('/entities', {
          params: {
            // @ts-expect-error
            path: {},
          },
        }),
      );

      const data = await firstValueFrom(client.get('/entities'));

      // assert data matches expected type
      if (data) {
        assertType<Entity[]>(data);
        expect(data).toEqual([entity1, entity2, entity3]); // also test runtime, too
      } else {
        // note: even though this is not a reachable code path, type tests still work!
        // assertType<undefined>(data);
      }
    });
  });
});
