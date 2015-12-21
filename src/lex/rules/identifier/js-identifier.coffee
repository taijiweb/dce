# js style identifier, can have $, letter, digit, underline

{IDENTIFIER} = require '../../token-constant'

{jsIdentifierCharSet} = charset = require('../../char-set')

module.exports =  (char) ->
  {text, cursor} = @

  # this should be checked by char -> method map or switch/case beforehand
  # if not firstCharSet[text[cursor]] then return

  start = cursor
  cursor++

  while (c = text[cursor]) and jsIdentifierCharSet[c]
    cursor++

  @cursor = cursor

  @setToken IDENTIFIER, text[start...cursor], start

module.exports.leadingString = charset.firstIdentifierChars