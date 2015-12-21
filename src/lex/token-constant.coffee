###
  array is faster than object
  https://jsperf.com/performance-of-array-vs-object

  so maybe the parser should switch based on token constant, @someRuleName[token]()?

###

module.exports = {

  EOI: -1

  SPACES: 1

  NUMBER: 2
  STRING: 3
  INTERPOLATE_STRING: 7

  # if double quote string contains only one single item, and the item is not a string
  INTERPOLATE_STRING_ITEM: 8

  IDENTIFIER: 4
  KEYWORD: 5

  SYMBOL: 6

  REGEXP: 11

  INDENT: 15
  UNDENT: 16
  HALF_UNDENT: 17
  END_OF_INPUT: 18

  LINE_COMMENT: 20
  BLOCK_COMMENT: 21
  INDENT_COMMENT: 22
  NEWLINE: 33

  DOT: 31 # .
  COMMA: 32 # ,
  COLON: 33 #:
  COLON: 34 # ::
  SEMICOLON: 35 # ;
  LCURLY: 36 # {
  RCURLY: 37 # }
  LBRACKET: 38 # [
  RBRACKET: 39 # ]
  LPAREN: 40 # (
  RPAREN: 41 # )


  WAVE: 42 # ~
  BACK_QUOTE: 43 # `
  DOUBLE_QUOTE: 44 # "
  SINGLE_QUOTE: 45 # '
  GREATER: 46 # >

  AT: 47 # @
  AT_AT: 48 # @@

  SHARP: 49 # #

  IF: 100 # if
  ELSE: 101 # else
  THEN: 102 # then

  WHILE: 103
  DO: 104

  TRY: 105
  CATCH: 106
  FINALLY: 107

  VAR: 108

}