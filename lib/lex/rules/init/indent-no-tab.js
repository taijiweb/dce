
/*

this should become the init or initLexer rule of the rules for the t language parser

     rules =
       {
          init: require('path/to/init/indent-no-tab')
       }
     text = "some t language code"
     tParser = new Parser({text}, rules)
 */
var processLineHead, searchHeadTab;

searchHeadTab = require('../../../rewrite/search-head-tab');

processLineHead = require('../../../rewrite/process-line-head');

module.exports = function() {
  var line, lineInfo, newText, text, _ref;
  text = this.text;
  if (!text) {
    return;
  }
  if ((line = searchHeadTab(text))) {
    this.error("line: " + (line + 1) + ": unexpected tab(" + "\t" + ") character", false);
  }
  this.cursor = 0;
  this.lineno = 1;
  _ref = processLineHead(text), newText = _ref[0], lineInfo = _ref[1];
  this.originalText = text;
  this.text = newText;
  this.lineInfo = lineInfo;
  this.maxLine = lineInfo.length;
  return this;
};
