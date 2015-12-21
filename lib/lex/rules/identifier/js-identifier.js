var IDENTIFIER, charset, jsIdentifierCharSet;

IDENTIFIER = require('../../token-constant').IDENTIFIER;

jsIdentifierCharSet = (charset = require('../../char-set')).jsIdentifierCharSet;

module.exports = function(char) {
  var c, cursor, start, text;
  text = this.text, cursor = this.cursor;
  start = cursor;
  cursor++;
  while ((c = text[cursor]) && jsIdentifierCharSet[c]) {
    cursor++;
  }
  this.cursor = cursor;
  return this.setToken(IDENTIFIER, text.slice(start, cursor), start);
};

module.exports.leadingString = charset.firstIdentifierChars;
