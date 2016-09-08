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
      result[key] = newObj[key] === undefined ? oldObj[key] : newObj[key]; // eslint-disable-line no-param-reassign, max-len
      return result;
    }, {});
}
