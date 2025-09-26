import { HttpClient, HttpContext } from '@angular/common/http';
import { openapiClient } from '../client/openapi-client';
import { paths } from './common';

const client = openapiClient<paths>();

const a = client.get('/error-404');
const b = client.get('/path-params/{string}');
const c = client.get('/path-params/{string}', { params: { path: { string: 'test' } } });
const d = client.get('/path-params/{string}', { params: { path: { string: 123 } } });
const e = client.get('/header-params', { params: { header: { 'x-required-header': 'test' } } });

const httpClient = new HttpClient(0 as unknown as any);

httpClient.get('', {
  headers: {},
  context: new HttpContext(),
});

httpClient.request('GET', '');
