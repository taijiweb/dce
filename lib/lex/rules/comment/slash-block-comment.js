var newline;

newline = require('../../util').newline;

module.exports = function() {
  var cursor, cursor1, indent, info, lineno, maxLine, text;
  text = this.text, cursor = this.cursor, lineno = this.lineno, maxLine = this.maxLine;
  cursor += 2;
  indent = lineInfo[lineno].lead;
  while (1) {
    if (!text[cursor]) {
      this.lexError('meet unexpected end of input in block comment');
    }
    if (text.slice(cursor, cursor + 2) === '*/') {
      cursor += 2;
      return [cursor, lineno];
    } else if (cursor1 = newline(text, cursor)) {
      cursor = cursor1;
      lineno++;
      while (lineno < maxLine && lineInfo[lineno].empty) {
        lineno++;
      }
      info = lineInfo[lineno];
      if (info.lead < indent) {
        this.lexError('the lines in block comment should not indent less than its begin line');
      }
      cursor = info.start + info.lead;
    } else {
      cursor++;
    }
  }
};
