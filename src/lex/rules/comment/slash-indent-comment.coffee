if cursor!=lineInfo[lineno].start+(indent=lineInfo[lineno].lead) then return
if text[cursor..cursor+1]!='/.' then return
start = cursor; line1 = lineno; lineno++
while lineno<=maxLine
  if lineInfo[lineno].empty then lineno++
  else if lineInfo[lineno].lead>indent then lineno++
  else break
if lineno>maxLine then cursor = text.length
else cursor = lineInfo[lineno].start+lineInfo[lineno].lead
{ type: BLOCK_COMMENT, value: text.slice(start, cursor), start:start, stop:cursor, line1: line1, line: lineno}
