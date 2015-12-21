@lineCommentBlock = memo ->
  start = cursor
  if comment=parser.lineComment()
    if comment.indent
      if comment.value[...3]=='///' then result = parser.blockWithoutIndentHead(); result.unshift ['directLineComment!', comment.value]; result
      else parser.blockWithoutIndentHead()
    else
      if text[start...start+3]=='///'
        [extend(['directLineComment!', comment.value], {start:start, stop:cursor, line: lineno})]
      else [extend(['lineComment!', comment.value], {start:start, stop:cursor, line: lineno})]

@codeCommentBlockComment = memo ->
  if text[cursor]!='/' then return
  if cursor!=lineInfo[lineno].start+lineInfo[lineno].lead then return
  if (c=text[cursor+1])=='.' or c=='/' or c=='*' then return
  start = cursor; line1 = lineno; cursor++
  code = parser.lineBlock()
  extend [['codeBlockComment!', code]], {start:start, stop:cursor, line1: line1, line: lineno}
