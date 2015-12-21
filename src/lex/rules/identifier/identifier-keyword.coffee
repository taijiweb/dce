###
  identifier or keyword
  depend: @isKeyword, @isConjunction
###

{IDENTIFIER, KEYWORD} = require '../../token-constant'

charset = require('../../char-set')

module.exports = ->
  {text, cursor} = @

  result = @consumeIdentifier()

  if !result then return

  token = text[cursor...@cursor]

  if @isKeyword(token) or @isConjunction(token)
    @token = KEYWORD
  else IDENTIFIER

module.exports.leadingString = charset.firstIdentifierChars