
/*

  To help parsing, the text is rewritten as below:
  * all leading spaces and tail spaces of the line are removed
  * \r\n is replaced with \n
  * some chars is inserted after \n to represent the indent information
  * inline spaces (" ", \t) is replaced a single space(" ")
  * new inline, leading spaces, tailing spaces is saved in lexer.lineInfo( an array )
  * spaces is saved in lexer.spacesInfo ( an hash map { cursor: spacestring} )
 */
module.exports = {
  INDENT_CHAR: "\u0001",
  UNDENT_CHAR: "\u0002",
  HALF_UNDENT_CHAR: "\u0003",
  END_CHAR: "\u0004",
  NEW_LINE_CHAR: "\n",
  SPACE: ' '
};
