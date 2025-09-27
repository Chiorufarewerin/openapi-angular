import { assertType, test } from 'vitest';
import { createObservedClient } from '../helpers.js';
import type { paths as GitHub } from './schemas/github.js';
import type { paths as Stripe } from './schemas/stripe.js';
import { firstEntryFrom, openapiTestingClient } from '../testing.js';

test('github', async () => {
  using client = openapiTestingClient<GitHub>();
  const pathname = '/users/{username}';
  const { data, error } = await firstEntryFrom(
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
  const { data, error } = await firstEntryFrom(
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
