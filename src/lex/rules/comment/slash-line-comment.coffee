info = lineInfo[lineno]
indent = info.lead

if cursor != info.start+indent then return

start = cursor
line1 = lineno

# skip the empty lines
while ++lineno and lineno<=maxLine and lineInfo[lineno].empty
  continue

info = lineInfo[lineno]
cursor = info.start + info.lead
lastPos =  lineInfo[lineno].start-1
if text[lastPos]=='\n' then lastPos--
if text[lastPos]=='\r' then lastPos--

return @setToken SPACES, text[start...lastPos+1], start, line1, line
