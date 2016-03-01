###

  short single quote string

  this kind of string will not be interpolated

  ' ... '

  ' short single quote string can only in one line '

  ' it will be not interpolated, but will be escaped, if any escape characters in it'

  no interpolated for this kind of escape string

###

{STRING} = require('../../token-constant')

exports.shortSingleQuoteString = (char) ->
  {text, cursor} = @

  while (c=text[cursor++])
    if c=='\n'
      @lexError('unexpected new line in string')
    if c=='\\'
      # todo: escape character
    else if c==char
      @cursor = cursor
      return @setToken STRING, @getOrginalText(start, cursor, @lineno), start, @lineno

    @lexError "unexpected end of the input in string"