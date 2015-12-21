var hasOwnProperty;

hasOwnProperty = Object.hasOwnProperty;

module.exports = function(item) {
  return hasOwnProperty.call(this.keywordMap, item);
};
