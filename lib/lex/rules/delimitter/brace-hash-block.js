
/*
  this should be called under switch-case or char -> method map
  {. }: block
  { }: hash
  {, }: python style hash
 */
module.exports = function() {
  switch (this.text[this.cursor++]) {
    case '.':
      this.cursor++;
      return "{.";
    case ",":
      this.cursor++;
      return "{,";
    default:
      return "{";
  }
};
