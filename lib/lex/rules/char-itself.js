
/*
  this should be called under switch-case or char -> method map
  { ] ( ) ] }
 */
module.exports = function() {
  var c, start;
  start = this.cursor;
  c = this.text[start];
  this.cursor++;
  return this.setToken(c, c, start, this.cursor);
};
