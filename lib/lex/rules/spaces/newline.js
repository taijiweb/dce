module.exports(function() {
  this.cursor++;
  this.lineno++;
  return this.setToken('\n', '\n', this.cursor - 1, this.lineno);
});
