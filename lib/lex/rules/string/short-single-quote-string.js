
/*

  short single quote string

  this kind of string will not be interpolated

  ' ... '

  ' short single quote string can only in one line '

  ' it will be not interpolated, but will be escaped, if any escape characters in it'

  no interpolated for this kind of escape string
 */
var STRING;

STRING = require('../../token-constant').STRING;

exports.shortSingleQuoteString = function(char) {
  var c, cursor, text;
  text = this.text, cursor = this.cursor;
  while ((c = text[cursor++])) {
    if (c === '\n') {
      this.lexError('unexpected new line in string');
    }
    if (c === '\\') {

    } else if (c === char) {
      this.cursor = cursor;
      return this.setToken(STRING, this.getOrginalText(start, cursor, this.lineno), start, this.lineno);
    }
    this.lexError("unexpected end of the input in string");
  }
};
