import type { OpenapiQuerySerializer, OpenapiQuerySerializerOptions } from '../types/serializer';
import { isRecord } from '../utils/common';
import { serializeArrayParam, serializeObjectParam, serializePrimitiveParam } from './common';

export function createQuerySerializer(
  options?: OpenapiQuerySerializerOptions,
): OpenapiQuerySerializer<unknown> {
  return function querySerializer(queryParams) {
    const search = [];
    if (queryParams && typeof queryParams === 'object') {
      for (const name in queryParams) {
        const value = queryParams[name];
        if (value === undefined || value === null) {
          continue;
        }
        if (Array.isArray(value)) {
          if (value.length === 0) {
            continue;
          }
          search.push(
            serializeArrayParam(name, value, {
              style: 'form',
              explode: true,
              ...options?.array,
              allowReserved: options?.allowReserved || false,
            }),
          );
          continue;
        }

        if (isRecord(value)) {
          search.push(
            serializeObjectParam(name, value, {
              style: 'deepObject',
              explode: true,
              ...options?.object,
              allowReserved: options?.allowReserved || false,
            }),
          );
          continue;
        }

        search.push(serializePrimitiveParam(name, value, options));
      }
    }
    return search.join('&');
  };
}

export function combineQuerySerializers<T>(
  globalQuerySerializer?: OpenapiQuerySerializer<T> | OpenapiQuerySerializerOptions,
  requestQuerySerializer?: OpenapiQuerySerializer<T> | OpenapiQuerySerializerOptions,
): OpenapiQuerySerializer<T> {
  const querySerializer =
    typeof globalQuerySerializer === 'function'
      ? globalQuerySerializer
      : createQuerySerializer(globalQuerySerializer);
  if (requestQuerySerializer) {
    return typeof requestQuerySerializer === 'function'
      ? requestQuerySerializer
      : createQuerySerializer({
          ...(typeof globalQuerySerializer === 'object' ? globalQuerySerializer : {}),
          ...requestQuerySerializer,
        });
  }
  return querySerializer;
}
