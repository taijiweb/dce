
/*
  identifier or keyword
  depend: @isKeyword, @isConjunction
 */
var IDENTIFIER, KEYWORD, charset, _ref;

_ref = require('../../token-constant'), IDENTIFIER = _ref.IDENTIFIER, KEYWORD = _ref.KEYWORD;

charset = require('../../char-set');

module.exports = function() {
  var cursor, result, text, token;
  text = this.text, cursor = this.cursor;
  result = this.consumeIdentifier();
  if (!result) {
    return;
  }
  token = text.slice(cursor, this.cursor);
  if (this.isKeyword(token) || this.isConjunction(token)) {
    return this.token = KEYWORD;
  } else {
    return IDENTIFIER;
  }
};

module.exports.leadingString = charset.firstIdentifierChars;
