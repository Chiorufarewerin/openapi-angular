import { firstValueFrom } from 'rxjs';
import { assertType, test } from 'vitest';

import { openapiTestingClient } from '../testing.js';
import type { paths as GitHub } from './schemas/github.js';
import type { paths as Stripe } from './schemas/stripe.js';

test('github', async () => {
  using client = openapiTestingClient<GitHub>();
  const pathname = '/users/{username}';
  const data = await firstValueFrom(
    client.get(pathname, {
      params: { path: { username: 'octocat' } },
    }),
  );
  if (data) {
    assertType<
      NonNullable<GitHub[typeof pathname]['get']['responses']['200']['content']['application/json']>
    >(data);
  } else {
    // BEHAVIOR CHANGED errors are untyped
    // assertType<
    //   NonNullable<GitHub[typeof pathname]['get']['responses']['404']['content']['application/json']>
    // >(error);
  }
});

test('stripe', async () => {
  using client = openapiTestingClient<Stripe>();
  const pathname = '/v1/accounts/{account}';
  const data = await firstValueFrom(
    client.get(pathname, {
      params: { path: { account: 'acct_1' } },
    }),
  );
  if (data) {
    assertType<
      NonNullable<Stripe[typeof pathname]['get']['responses']['200']['content']['application/json']>
    >(data);
  } else {
    // BEHAVIOR CHANGED errors are untyped
    // assertType<
    //   NonNullable<
    //     Stripe[typeof pathname]['get']['responses']['default']['content']['application/json']
    //   >
    // >(error);
  }
});
