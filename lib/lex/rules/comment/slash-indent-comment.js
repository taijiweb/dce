var cursor, indent, line1, start;

if (cursor !== lineInfo[lineno].start + (indent = lineInfo[lineno].lead)) {
  return;
}

if (text.slice(cursor, +(cursor + 1) + 1 || 9e9) !== '/.') {
  return;
}

start = cursor;

line1 = lineno;

lineno++;

while (lineno <= maxLine) {
  if (lineInfo[lineno].empty) {
    lineno++;
  } else if (lineInfo[lineno].lead > indent) {
    lineno++;
  } else {
    break;
  }
}

if (lineno > maxLine) {
  cursor = text.length;
} else {
  cursor = lineInfo[lineno].start + lineInfo[lineno].lead;
}

({
  type: BLOCK_COMMENT,
  value: text.slice(start, cursor),
  start: start,
  stop: cursor,
  line1: line1,
  line: lineno
});
