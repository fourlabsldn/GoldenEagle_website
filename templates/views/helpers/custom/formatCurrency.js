const { flow, curry } = require('lodash/fp');

const million = 1000000;
const thousand = 1000;
function shrink(num) {
  if (num > million) {
    return `${num / million}m`;
  }
  if (num > thousand) {
    return `${num / thousand}k`;
  }
  return num;
}

// TODO: make this function actually work
const convertTo = curry((currency, value) => {
  return `£${value}`;
});

module.exports = function formatCurrency(rawNumber) {
  return flow(
    Number,
    shrink,
    String,
    convertTo('GBP')
  )(rawNumber);
};
