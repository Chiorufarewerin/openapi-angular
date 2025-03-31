import { HttpClient } from "@angular/common/http";
import { inject, InjectionToken } from "@angular/core";

const PROXY_METHODS = Symbol("PROXY_METHODS");

/**
 * @type {InjectionToken<import("./index.js").OpenapiOptions>}
 */
const DEFAULT_OPENAPI_OPTIONS = {
  baseUrl: "",
  querySerializer: createQuerySerializer(),
};

/**
 * @type {InjectionToken<Partial<import("./index.js").OpenapiOptions>>}
 */
const OPENAPI_OPTIONS = new InjectionToken("OPENAPI_PROVIDED_OPTIONS", { providedIn: "root", factory: () => ({}) });

/**
 * @type {InjectionToken<import("./index.js").OpenapiOptions>}
 */
const OPTIONS = new InjectionToken("OPENAPI_OPTIONS", {
  providedIn: "root",
  factory: () => ({
    ...DEFAULT_OPENAPI_OPTIONS,
    ...inject(OPENAPI_OPTIONS),
  }),
});

/**
 * Provide openapi default values
 * @type {import("./index.js").provideOpenapiOptions}
 */
export function provideOpenapiOptions(options) {
  return [
    {
      provide: OPENAPI_OPTIONS,
      useValue: options,
    },
  ];
}

/**
 * Create an openapi http client proxy to original HttpClient
 * @type {import("./index.js").injectOpenapiClient}
 */
export function injectOpenapiClient(_options) {
  const globalOptions = {
    ...inject(OPTIONS),
    ...(_options || {}),
  };
  globalOptions.baseUrl = removeTrailingSlash(globalOptions.baseUrl);
  const http = inject(HttpClient);

  const baseRequestHandler = (path, options) => {
    const baseUrl = options?.baseUrl ? removeTrailingSlash(options.baseUrl) : globalOptions.baseUrl;
    const querySerializer = options?.querySerializer || globalOptions.querySerializer;
    const params = options?.params;
    const url = createFinalURL(path, { baseUrl, params, querySerializer });

    if (options?.params?.header) {
      options.headers = options.params.header;
    }

    if (!options) {
      return [url];
    }

    const { baseUrl: _1, params: _2, querySerializer: _3, ...retOptions } = options;

    return [url, retOptions];
  };

  const handler = {
    [PROXY_METHODS]: {},
    get: (target, prop) => {
      if (prop === "request") {
        const cacheKey = "request";
        if (!Object.hasOwn(handler[PROXY_METHODS], cacheKey)) {
          handler[PROXY_METHODS][cacheKey] = (...args) => {
            if (args.length === 1) {
              return target[prop].apply(target, args);
            }

            const [method, path, options] = args;
            const [url, newOptions] = baseRequestHandler(path, options);

            return target[prop].call(target, method, url, newOptions);
          };
        }
        return handler[PROXY_METHODS][cacheKey];
      }
      if (prop === "delete" || prop === "get" || prop === "head" || prop === "options") {
        const cacheKey = "deletegetheadoptions";
        if (!Object.hasOwn(handler[PROXY_METHODS], cacheKey)) {
          handler[PROXY_METHODS][cacheKey] = (...args) => {
            const [path, options] = args;
            const [url, newOptions] = baseRequestHandler(path, options);

            return target[prop].call(target, url, newOptions);
          };
        }
        return handler[PROXY_METHODS][cacheKey];
      }
      if (prop === "patch" || prop === "post" || prop === "put") {
        const cacheKey = "patchpostput";
        if (!Object.hasOwn(handler[PROXY_METHODS], cacheKey)) {
          handler[PROXY_METHODS][cacheKey] = (...args) => {
            const [path, body, options] = args;
            const [url, newOptions] = baseRequestHandler(path, options);

            return target[prop].call(target, url, body, newOptions);
          };
        }
        return handler[PROXY_METHODS][cacheKey];
      }
      throw Error(`${prop} for OpenapiClient isn't supported`);
    },
  };

  return new Proxy(http, handler);
}

// utils

/**
 * Serialize primitive param values
 * @type {import("./index.js").serializePrimitiveParam}
 */
export function serializePrimitiveParam(name, value, options) {
  if (value === undefined || value === null) {
    return "";
  }
  if (typeof value === "object") {
    throw new Error(
      "Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.",
    );
  }
  return `${name}=${options?.allowReserved === true ? value : encodeURIComponent(value)}`;
}

/**
 * Serialize object param (shallow only)
 * @type {import("./index.js").serializeObjectParam}
 */
export function serializeObjectParam(name, value, options) {
  if (!value || typeof value !== "object") {
    return "";
  }
  const values = [];
  const joiner =
    {
      simple: ",",
      label: ".",
      matrix: ";",
    }[options.style] || "&";

  // explode: false
  if (options.style !== "deepObject" && options.explode === false) {
    for (const k in value) {
      values.push(k, options.allowReserved === true ? value[k] : encodeURIComponent(value[k]));
    }
    const final = values.join(","); // note: values are always joined by comma in explode: false (but joiner can prefix)
    switch (options.style) {
      case "form": {
        return `${name}=${final}`;
      }
      case "label": {
        return `.${final}`;
      }
      case "matrix": {
        return `;${name}=${final}`;
      }
      default: {
        return final;
      }
    }
  }

  // explode: true
  for (const k in value) {
    const finalName = options.style === "deepObject" ? `${name}[${k}]` : k;
    values.push(serializePrimitiveParam(finalName, value[k], options));
  }
  const final = values.join(joiner);
  return options.style === "label" || options.style === "matrix" ? `${joiner}${final}` : final;
}

/**
 * Serialize array param (shallow only)
 * @type {import("./index.js").serializeArrayParam}
 */
export function serializeArrayParam(name, value, options) {
  if (!Array.isArray(value)) {
    return "";
  }

  // explode: false
  if (options.explode === false) {
    const joiner = { form: ",", spaceDelimited: "%20", pipeDelimited: "|" }[options.style] || ","; // note: for arrays, joiners vary wildly based on style + explode behavior
    const final = (options.allowReserved === true ? value : value.map((v) => encodeURIComponent(v))).join(joiner);
    switch (options.style) {
      case "simple": {
        return final;
      }
      case "label": {
        return `.${final}`;
      }
      case "matrix": {
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
  const joiner = { simple: ",", label: ".", matrix: ";" }[options.style] || "&";
  const values = [];
  for (const v of value) {
    if (options.style === "simple" || options.style === "label") {
      values.push(options.allowReserved === true ? v : encodeURIComponent(v));
    } else {
      values.push(serializePrimitiveParam(name, v, options));
    }
  }
  return options.style === "label" || options.style === "matrix"
    ? `${joiner}${values.join(joiner)}`
    : values.join(joiner);
}

/**
 * Serialize query params to string
 * @type {import("./index.js").createQuerySerializer}
 */
export function createQuerySerializer(options) {
  return function querySerializer(queryParams) {
    const search = [];
    if (queryParams && typeof queryParams === "object") {
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
              style: "form",
              explode: true,
              ...options?.array,
              allowReserved: options?.allowReserved || false,
            }),
          );
          continue;
        }
        if (typeof value === "object") {
          search.push(
            serializeObjectParam(name, value, {
              style: "deepObject",
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
    return search.join("&");
  };
}

/**
 * Handle different OpenAPI 3.x serialization styles
 * @type {import("./index.js").defaultPathSerializer}
 * @see https://swagger.io/docs/specification/serialization/#path
 */
export function defaultPathSerializer(pathname, pathParams) {
  let nextURL = pathname;
  for (const match of pathname.match(PATH_PARAM_RE) ?? []) {
    let name = match.substring(1, match.length - 1);
    let explode = false;
    let style = "simple";
    if (name.endsWith("*")) {
      explode = true;
      name = name.substring(0, name.length - 1);
    }
    if (name.startsWith(".")) {
      style = "label";
      name = name.substring(1);
    } else if (name.startsWith(";")) {
      style = "matrix";
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
    if (typeof value === "object") {
      nextURL = nextURL.replace(match, serializeObjectParam(name, value, { style, explode }));
      continue;
    }
    if (style === "matrix") {
      nextURL = nextURL.replace(match, `;${serializePrimitiveParam(name, value)}`);
      continue;
    }
    nextURL = nextURL.replace(match, style === "label" ? `.${encodeURIComponent(value)}` : encodeURIComponent(value));
  }
  return nextURL;
}

/**
 * Construct URL string from baseUrl and handle path and query params
 * @type {import("./index.js").createFinalURL}
 */
export function createFinalURL(pathname, options) {
  let finalURL = `${options.baseUrl}${pathname}`;
  if (options.params?.path) {
    finalURL = defaultPathSerializer(finalURL, options.params.path);
  }
  let search = options.querySerializer(options.params?.query ?? {});
  if (search.startsWith("?")) {
    search = search.substring(1);
  }
  if (search) {
    finalURL += `?${search}`;
  }
  return finalURL;
}

/**
 * Remove trailing slash from url
 * @type {import("./index.js").removeTrailingSlash}
 */
export function removeTrailingSlash(url) {
  if (url.endsWith("/")) {
    return url.substring(0, url.length - 1);
  }
  return url;
}
