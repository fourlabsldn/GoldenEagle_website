const { curry, flow, toPairs, map, fromPairs } = require('lodash/fp');

// Creates a new object with properties of the old one
// ovewritten by properties of the new object.
// No new properties of the new Object are added.
// overshadow Object -> Object -> Object
module.exports = {};

module.exports.overshadow = curry((oldObj, newObj) => {
  return Object.keys(oldObj)
  .reduce((result, key) => {
    result[key] = newObj[key] === undefined ? oldObj[key] : newObj[key]; // eslint-disable-line no-param-reassign, max-len
    return result;
  }, {});
});

module.exports.mapObj = curry((f, o) => {
  return flow(
    toPairs,
    map(([key, value]) => [key, f(key, value)]),
    fromPairs
  )(o);
});
