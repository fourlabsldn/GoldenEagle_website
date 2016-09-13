const { flow } = require('lodash/fp');

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

module.exports = function formatCurrency(rawNumber) {
  return flow(
    Number,
    shrink,
    String
  )(rawNumber);
};
