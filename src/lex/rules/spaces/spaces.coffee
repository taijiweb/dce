# spaces

# one or more whitespaces, ie. space or tab.<br/>

{SPACES} = require('../../token-constant')

module.exports = ->
  {text, cursor} = @

  # this should be checked by char -> method map, or switch/case
  #if (c=text[cursor])!=' ' and c!='\t' then return

  start = cursor

  cursor++

  while c=text[cursor] and (c==' ' or c=='\t')
    cursor++

  @cursor = cursor

  @setToken SPACES, text[start...cursor], start, @lineno

module.exports.leadingString = " \t"