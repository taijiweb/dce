
/*
  getToken returns the character as the current token directly
  It means use no lexer, zero-lexer
 */
module.exports = function() {
  var length, text;
  text = this.text;
  length = text.length;
  if (this.cursor < length) {
    return text[this.cursor++];
  }
};
