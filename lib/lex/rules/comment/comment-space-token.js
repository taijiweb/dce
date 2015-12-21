var spacesSlashComments;

module.exports = spacesSlashComments = function() {
  var c, cursor, cursor1, indent, info, lineInfo, lineno, maxLine, start, text;
  text = this.text, cursor = this.cursor;
  c = text[cursor];
  if (c !== '/' && c !== ' ' && c !== '\t') {
    return;
  }
  lineInfo = this.lineInfo, maxLine = this.maxLine;
  start = cursor;
  indent = lineInfo.lead;
  while (1) {
    switch (c) {
      case '/':
        this.cursor = cursor;
        this.lineno = lineno;
        if (cursor1 = this.slashComment()) {
          cursor = cursor1;
          lineno = this.lineno;
        } else {
          break;
        }
        break;
      case ' ':
      case '\t':
        this.cursor = cursor;
        cursor = this.spaces();
        break;
      case '\r':
        cursor += 2;
        lineno++;
        info = lineInfo[lineno];
        if (info.lead < indent) {
          break;
        } else {
          cursor += info.lead;
        }
        break;
      case '\n':
        cursor++;
        lineno++;
        info = lineInfo[lineno];
        cursor += info.lead;
        if (!info.empty && info.lead !== indent) {
          goto exitLoop;
        }
        break;
      default:
        goto exitLoop;
    }
  }
  exitLoop: ;
  return this.setToken(SPACE_COMMENT, text.slice(start, cursor), start, line1);
};
