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
 * @method encodeData
 * @param  {object} data
 * @return {String}
 */
export function encodeData(data) {
  return Object.keys(data)
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
