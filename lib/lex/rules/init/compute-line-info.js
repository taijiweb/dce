
/*

this should become the init or initLexer rule of the rules for the t language parser

     rules =
       {
          init: require 'path/to/init/indent-no-tab'
       }
     text = "some t language code"
     tParser = new Parser({text}, rules)
 */
var computeLineInfo, searchHeadTab;

searchHeadTab = require('../../../rewrite/search-head-tab');

computeLineInfo = require('../../../rewrite/compute-line-info');

module.exports = function(cursor, lineno) {
  var line, text;
  if (cursor == null) {
    cursor = 0;
  }
  if (lineno == null) {
    lineno = 0;
  }
  text = this.text;
  if (!text) {
    return;
  }
  if ((line = searchHeadTab(text))) {
    this.error("line: " + (line + 1) + ": unexpected tab(" + "\t" + ") character", false);
  }
  this.lineInfo = computeLineInfo(text);
  this.cursor = cursor;
  this.lineno = lineno;
  this.maxLine = this.lineInfo.length;
  return this;
};
