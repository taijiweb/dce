var SPACES;

SPACES = require('../../token-constant').SPACES;

module.exports = function() {
  var c, cursor, start, text;
  text = this.text, cursor = this.cursor;
  start = cursor;
  cursor++;
  while (c = text[cursor] && (c === ' ' || c === '\t')) {
    cursor++;
  }
  this.cursor = cursor;
  return this.setToken(SPACES, text.slice(start, cursor), start, this.lineno);
};

module.exports.leadingString = " \t";
