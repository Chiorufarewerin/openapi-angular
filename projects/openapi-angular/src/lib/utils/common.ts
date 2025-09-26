export function removeTrailingSlash(url: string): string {
  if (url.endsWith('/')) {
    return url.substring(0, url.length - 1);
  }
  return url;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
