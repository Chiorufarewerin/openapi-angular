import type { HttpEvent, HttpResponse } from '@angular/common/http';
import type { MediaType, ResponseObjectMap, SuccessResponse } from 'openapi-typescript-helpers';
import { describe, expectTypeOf, test } from 'vitest';

import type { OpenapiResponse, OpenapiResponseType } from '../../public-api';
import type { paths } from './schemas/common';

describe('response types', () => {
  test('whether new response type the same', () => {
    type OpenapiResponseOld<
      T extends Record<string | number, unknown>,
      Options,
      Media extends MediaType,
    > = Options extends {
      observe: 'response';
    }
      ? HttpResponse<OpenapiResponseType<SuccessResponse<ResponseObjectMap<T>, Media>, Options>>
      : Options extends {
            observe: 'events';
          }
        ? HttpEvent<OpenapiResponseType<SuccessResponse<ResponseObjectMap<T>, Media>, Options>>
        : OpenapiResponseType<SuccessResponse<ResponseObjectMap<T>, Media>, Options>;

    expectTypeOf<
      OpenapiResponseOld<paths['/media-multiple']['get'], {}, MediaType>
    >().toEqualTypeOf<OpenapiResponse<paths['/media-multiple']['get'], {}, MediaType>>();
  });
});
