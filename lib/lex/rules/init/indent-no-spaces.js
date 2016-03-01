
/*
this should become the init rule of the rules for the t language parser

     rules =
       {
          init: require('path/to/init/indent-no-tab')
       }
     text = "some t language code"
     tParser = new Parser({text}, rules)
 */
var processLineHead, searchHeadTab, _ref;

_ref = require('../../../rewrite/process-line-head'), searchHeadTab = _ref.searchHeadTab, processLineHead = _ref.processLineHead;

module.exports = function() {
  var line, lineInfo, newText, text, _ref1;
  text = this.text;
  if (!text) {
    return;
  }
  if ((line = searchHeadTab(text))) {
    this.error("line: " + (line + 1) + ": unexpected tab(" + "\t" + ") character", false);
  }
  this.cursor = 0;
  this.lineno = 1;
  _ref1 = processLineHead(text), newText = _ref1[0], lineInfo = _ref1[1];
  this.originalText = text;
  this.text = newText;
  this.lineInfo = lineInfo;
  this.maxLine = lineInfo.length;
  return this;
};
