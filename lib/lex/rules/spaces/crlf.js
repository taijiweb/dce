module.exports(function() {
  var cursor, text;
  text = this.text, cursor = this.cursor;
  if (text[cursor] === '\r') {
    this.cursor += 2;
    this.lineno++;
    this.setToken('\r\n', '\r\n', cursor, this.lineno);
  } else {
    this.cursor++;
    this.lineno++;
    this.setToken('\n', '\n', cursor, this.lineno);
  }
  return '\n';
});
