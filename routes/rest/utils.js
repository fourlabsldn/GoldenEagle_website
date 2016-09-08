const { curry } = require('lodash/fp');

// Creates a new object with properties of the old one
// ovewritten by properties of the new object.
// No new properties of the new Object are added.
// overshadow Object -> Object -> Object
module.exports = {};

module.exports.overshadow = curry((oldObj, newObj) => {
  return Object.keys(oldObj)
  .reduce((result, key) => {
    result[key] = newObj[key] || oldObj[key]; // eslint-disable-line no-param-reassign
    return result;
  }, {});
});
