###
  t language identifier

  t language identifier is javascript with a optional tailing "?" or "!"

###


{IDENTIFIER} = require '../../token-constant'

{jsIdentifierCharSet} = charset = require('../../char-set')

module.exports =   ->
  {text, cursor} = @

  # this should be checked by char -> method map or switch/case beforehand
  #if not firstCharSet[text[cursor]] then return

  start = cursor
  cursor++

  while (c = text[cursor]) and jsIdentifierCharSet[c]
    cursor++

  # 1. avoid gotcha: x!=1, x!==1, x?=1, x?==1
  # 2. intuitively, !!, !!!, ??, ??? should be put together
  if c=='!' and (c=text[cursor+1]) != "!" and c!='='
    cursor++
  else if c=='?' and (c=text[cursor+1]) != "?" and c!='='
    cursor++

  @cursor = cursor

  @setToken IDENTIFIER, text[start...cursor], start

module.exports.leadingString = charset.firstIdentifierChars