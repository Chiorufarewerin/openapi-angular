import { OpenapiQuerySerializer } from '../models/openapi-serializer';
import { defaultPathSerializer } from './path';

export function createFinalURL<O>(
  pathname: string,
  options: {
    baseUrl: string;
    params: {
      query?: Record<string, unknown>;
      path?: Record<string, unknown>;
    };
    querySerializer: OpenapiQuerySerializer<O>;
  },
): string {
  let finalURL = `${options.baseUrl}${pathname}`;
  if (options.params?.path) {
    finalURL = defaultPathSerializer(finalURL, options.params.path);
  }
  let search = options.querySerializer((options.params.query as any) ?? {});
  if (search.startsWith('?')) {
    search = search.substring(1);
  }
  if (search) {
    finalURL += `?${search}`;
  }
  return finalURL;
}
