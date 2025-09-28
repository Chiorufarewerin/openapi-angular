import type { HttpMethod, PathsWithMethod } from 'openapi-typescript-helpers';

export type OpenapiPathsWithMethod<Paths extends {}, Method extends HttpMethod> = Extract<
  PathsWithMethod<Paths, Method>,
  string
>;
