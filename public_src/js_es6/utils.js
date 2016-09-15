import { curry, flow, map, toPairs, fromPairs } from 'lodash/fp';

// Returns int that is min <= val <= max
export function constrain(val, min, max) {
  const diff = max - min + 1; // plus one so that val is <=max and not <max
  const v = val - min;
  return min + (diff + (v % diff)) % diff;
}

export function toSelector(className) {
  return `.${className}`;
}

/**
 * Forms a URL parameters string from an object
 * Ignores undefined properties
 * @method encodeData
 * @param  {object} data
 * @return {String}
 */
export function encodeData(data) {
  return Object.keys(data)
    .filter(key => data[key] !== undefined)
    .map(key => [key, data[key]].map(encodeURIComponent).join('='))
    .join('&');
}

export function request(url, params, options) {
  const defaultOptions = {
    credentials: 'same-origin',
  };

  const reqUrl = `${url}?${encodeData(params)}`;
  const reqOptions = Object.assign({}, defaultOptions, options);
  return fetch(reqUrl, reqOptions);
}

/**
 * interruptibleRequest
 * @return {Function} makeRequest - Just like `request` but if another request
 *                                happens before the first one is finished,
 *                                the first one will not be processed.
 */
export function interruptibleRequest() {
  let lastLoadTime;

  // anotherRequestHappenedSince :: Date -> Boolean
  const anotherRequestHappenedSince = loadTime => lastLoadTime > loadTime;

  return function makeRequest(...args) {
    // We will use loadTime to see if we should process our response when
    // it arrives or whether another request was made.
    const loadTime = new Date();
    lastLoadTime = loadTime;
    return request(...args)
    .then(r => {
      return anotherRequestHappenedSince(loadTime)
        ? Promise.reject('Request cancelled by new request')
        : Promise.resolve(r);
    });
  };
}

 // Creates a new object with properties of the old one
// ovewritten by properties of the new object.
// No new properties of the new Object are added.
// overshadow Object -> Object -> Object
export function overshadow(oldObj, newObj) {
  return Object.keys(oldObj)
    .reduce((result, key) => {
      // We want to use values from newObj even if the value is set to undefined,
      // but not use it if it is not set at all. That's why we use hasOwnProperty.
      result[key] = newObj.hasOwnProperty(key) ? newObj[key] : oldObj[key]; // eslint-disable-line no-param-reassign, max-len
      return result;
    }, {});
}

// Applies a function to all values of an object and Returns
// a new object with same keys
// The function takes the property key and value as parameters.
// mapObj :: Function -> Object -> Object
export const mapObj = curry((f, o) => {
  return flow(
    toPairs,
    map(([key, value]) => [key, f(key, value)]),
    fromPairs
  )(o);
});

export const getUrlParameters = () => {
  const query = location.search.substr(1);
  const result = {};
  query.split('&').forEach(rawPart => {
    if (!rawPart) { return; }
    const part = rawPart.split('+').join(' '); // replace every + with space, regexp-free version
    const eq = part.indexOf('=');
    const encodedKey = eq > -1 ? part.substr(0, eq) : part;
    const val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : '';
    const from = encodedKey.indexOf('[');
    if (from === -1) {
      result[decodeURIComponent(encodedKey)] = val;
    } else {
      const to = encodedKey.indexOf(']');
      const index = decodeURIComponent(encodedKey.substring(from + 1, to));
      const key = decodeURIComponent(encodedKey.substring(0, from));
      if (!result[key]) {
        result[key] = [];
      }
      if (!index) {
        result[key].push(val);
      } else {
        result[key][index] = val;
      }
    }
  });
  return result;
};
