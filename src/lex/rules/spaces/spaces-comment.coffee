# spaces

# one or more whitespaces, line comment( // ..., and block comment (/**/

{SPACES} = require('../token-constant')

exports.spacesComment ->
  {text, cursor} = @

  # this should be checked by char -> method map, or switch/case
  #if (c=text[cursor])!=' ' and c!='\t' then return

  start = cursor

  while c=text[cursor]
    if c!=' ' and c!='\t'
      break
    else cursor++

  @cursor = cursor

  @setToken SPACES, text[start...cursor], start, lineno

exports.spaces.leadingString = " \t"

# "/" should be the leading character for this rule
# it's more reasonable to put it in comment relating code: /* // /+ /// /**
