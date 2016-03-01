
/*

this should become the init or initLexer rule of the rules for the t language parser

     rules =
       {
          init: require('path/to/init/newline-single-space')
       }
     text = "some t language code"
     lexer = new Lexer({text}, rules)
 */
var processNewlineSpaces, searchHeadTab;

searchHeadTab = require('../../../rewrite/search-head-tab');

processNewlineSpaces = require('../../../rewrite/process-newline-spaces');

module.exports = function() {
  var line, lineInfo, newText, spacesInfo, text, _ref;
  text = this.text;
  if (!text) {
    return;
  }
  if ((line = searchHeadTab(text))) {
    this.error("line: " + (line + 1) + ": unexpected tab(" + "\t" + ") character", false);
  }
  this.cursor = 0;
  this.lineno = 1;
  _ref = processNewlineSpaces(text), newText = _ref[0], lineInfo = _ref[1], spacesInfo = _ref[2];
  this.originalText = text;
  this.text = newText;
  this.lineInfo = lineInfo;
  this.spacesInfo = spacesInfo;
  this.maxLine = lineInfo.length;
  return this;
};
