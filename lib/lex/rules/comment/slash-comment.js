module.exports = function() {
  var c, cursor, text;
  text = this.text, cursor = this.cursor;
  c = text[cursor];
  if (c !== '/') {
    return;
  }
  switch (c) {
    case '*':
      return this.slashBlockComment();
    case '/':
      return this.slashLineComment();
    case '?':
      return this.slashIndentComment();
    case '+':
      return this.slashCodeComment();
  }
};
