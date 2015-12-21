var SPACES;

SPACES = require('../token-constant').SPACES;

exports.spacesComment(function() {
  var c, cursor, start, text;
  text = this.text, cursor = this.cursor;
  start = cursor;
  while (c = text[cursor]) {
    if (c !== ' ' && c !== '\t') {
      break;
    } else {
      cursor++;
    }
  }
  this.cursor = cursor;
  return this.setToken(SPACES, text.slice(start, cursor), start, lineno);
});

exports.spaces.leadingString = " \t";
