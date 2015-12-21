var hasOwnProperty;

hasOwnProperty = Object.hasOwnProperty;

module.exports = function(item) {
  return hasOwnProperty.call(this.conjunctionMap, item);
};
