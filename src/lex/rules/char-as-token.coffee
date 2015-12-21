###
  getToken returns the character as the current token directly
  It means use no lexer, zero-lexer
###

module.exports = ->
  text = @text
  length = text.length

  if @cursor < length
    text[@cursor++]