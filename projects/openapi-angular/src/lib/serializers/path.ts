import { serializeArrayParam, serializeObjectParam, serializePrimitiveParam } from './common';

const PATH_PARAM_RE = /\{[^{}]+\}/g;

type Style = 'simple' | 'label' | 'matrix';
export function defaultPathSerializer(
  pathname: string,
  pathParams: Record<string, unknown>,
): string {
  let nextURL = pathname;
  for (const match of pathname.match(PATH_PARAM_RE) ?? []) {
    let name = match.substring(1, match.length - 1);
    let explode = false;
    let style: Style = 'simple';
    if (name.endsWith('*')) {
      explode = true;
      name = name.substring(0, name.length - 1);
    }
    if (name.startsWith('.')) {
      style = 'label';
      name = name.substring(1);
    } else if (name.startsWith(';')) {
      style = 'matrix';
      name = name.substring(1);
    }
    if (!pathParams || pathParams[name] === undefined || pathParams[name] === null) {
      continue;
    }
    const value = pathParams[name];
    if (Array.isArray(value)) {
      nextURL = nextURL.replace(match, serializeArrayParam(name, value, { style, explode }));
      continue;
    }
    if (typeof value === 'object') {
      nextURL = nextURL.replace(match, serializeObjectParam(name, value, { style, explode }));
      continue;
    }
    if (style === 'matrix') {
      nextURL = nextURL.replace(match, `;${serializePrimitiveParam(name, value)}`);
      continue;
    }
    nextURL = nextURL.replace(
      match,
      style === 'label' ? `.${encodeURIComponent(value as any)}` : encodeURIComponent(value as any),
    );
  }
  return nextURL;
}
