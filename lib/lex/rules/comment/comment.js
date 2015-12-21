this.lineCommentBlock = memo(function() {
  var comment, result, start;
  start = cursor;
  if (comment = parser.lineComment()) {
    if (comment.indent) {
      if (comment.value.slice(0, 3) === '///') {
        result = parser.blockWithoutIndentHead();
        result.unshift(['directLineComment!', comment.value]);
        return result;
      } else {
        return parser.blockWithoutIndentHead();
      }
    } else {
      if (text.slice(start, start + 3) === '///') {
        return [
          extend(['directLineComment!', comment.value], {
            start: start,
            stop: cursor,
            line: lineno
          })
        ];
      } else {
        return [
          extend(['lineComment!', comment.value], {
            start: start,
            stop: cursor,
            line: lineno
          })
        ];
      }
    }
  }
});

this.codeCommentBlockComment = memo(function() {
  var c, code, line1, start;
  if (text[cursor] !== '/') {
    return;
  }
  if (cursor !== lineInfo[lineno].start + lineInfo[lineno].lead) {
    return;
  }
  if ((c = text[cursor + 1]) === '.' || c === '/' || c === '*') {
    return;
  }
  start = cursor;
  line1 = lineno;
  cursor++;
  code = parser.lineBlock();
  return extend([['codeBlockComment!', code]], {
    start: start,
    stop: cursor,
    line1: line1,
    line: lineno
  });
});
