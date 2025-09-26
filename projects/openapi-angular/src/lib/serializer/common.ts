import { isRecord } from '../utils/common';

export function serializeObjectParam(
  name: string,
  value: unknown,
  options: {
    style: 'simple' | 'label' | 'matrix' | 'form' | 'deepObject';
    explode: boolean;
    allowReserved?: boolean;
  },
): string {
  if (!isRecord(value)) {
    return '';
  }
  const values = [];
  const joiner = getParamJoiner(true, options.style);

  // explode: false
  if (options.style !== 'deepObject' && options.explode === false) {
    for (const k in value) {
      values.push(
        k,
        options.allowReserved === true ? value[k] : encodeURIComponent(value[k] as any),
      );
    }
    const final = values.join(','); // note: values are always joined by comma in explode: false (but joiner can prefix)
    switch (options.style) {
      case 'form': {
        return `${name}=${final}`;
      }
      case 'label': {
        return `.${final}`;
      }
      case 'matrix': {
        return `;${name}=${final}`;
      }
      default: {
        return final;
      }
    }
  }

  // explode: true
  for (const k in value) {
    const finalName = options.style === 'deepObject' ? `${name}[${k}]` : k;
    values.push(serializePrimitiveParam(finalName, value[k], options));
  }
  const final = values.join(joiner);
  return options.style === 'label' || options.style === 'matrix' ? `${joiner}${final}` : final;
}

export function serializeArrayParam(
  name: string,
  value: unknown[],
  options: {
    style: 'simple' | 'label' | 'matrix' | 'form' | 'spaceDelimited' | 'pipeDelimited';
    explode: boolean;
    allowReserved?: boolean;
  },
): string {
  if (!Array.isArray(value)) {
    return '';
  }

  const joiner = getParamJoiner(options.explode, options.style);

  // explode: false
  if (options.explode === false) {
    const final = (
      options.allowReserved === true ? value : value.map((v) => encodeURIComponent(v as any))
    ).join(joiner);
    switch (options.style) {
      case 'simple': {
        return final;
      }
      case 'label': {
        return `.${final}`;
      }
      case 'matrix': {
        return `;${name}=${final}`;
      }
      // case "spaceDelimited":
      // case "pipeDelimited":
      default: {
        return `${name}=${final}`;
      }
    }
  }

  // explode: true
  const values = [];
  for (const v of value) {
    if (options.style === 'simple' || options.style === 'label') {
      values.push(options.allowReserved === true ? v : encodeURIComponent(v as any));
    } else {
      values.push(serializePrimitiveParam(name, v, options));
    }
  }
  return options.style === 'label' || options.style === 'matrix'
    ? `${joiner}${values.join(joiner)}`
    : values.join(joiner);
}

export function serializePrimitiveParam(
  name: string,
  value: unknown,
  options?: { allowReserved?: boolean },
): string {
  if (value === undefined || value === null) {
    return '';
  }
  if (typeof value === 'object') {
    throw new Error(
      'Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.',
    );
  }
  return `${name}=${options?.allowReserved === true ? value : encodeURIComponent(value as any)}`;
}

export function getParamJoiner(explode: boolean, style: string): string {
  if (explode === false) {
    switch (style) {
      case 'form':
        return ',';
      case 'spaceDelimited':
        return '%20';
      case 'pipeDelimited':
        return '|';
      default:
        return ',';
    }
  }

  switch (style) {
    case 'simple':
      return ',';
    case 'label':
      return '.';
    case 'matrix':
      return ';';
    default:
      return '&';
  }
}
