var cursor, indent, info, lastPos, line1, start;

info = lineInfo[lineno];

indent = info.lead;

if (cursor !== info.start + indent) {
  return;
}

start = cursor;

line1 = lineno;

while (++lineno && lineno <= maxLine && lineInfo[lineno].empty) {
  continue;
}

info = lineInfo[lineno];

cursor = info.start + info.lead;

lastPos = lineInfo[lineno].start - 1;

if (text[lastPos] === '\n') {
  lastPos--;
}

if (text[lastPos] === '\r') {
  lastPos--;
}

return this.setToken(SPACES, text.slice(start, lastPos + 1), start, line1, line);
