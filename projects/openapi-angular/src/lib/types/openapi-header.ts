import { HttpHeaders } from '@angular/common/http';

export type OpenapiHeadersOptions =
  | Required<RequestInit>['headers']
  | Record<string, string | string[] | boolean | number | null | undefined>
  | HttpHeaders;
