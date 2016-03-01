###

  short single quote string

  this kind of string will not be interpolated

  ' ... '

  ' short single quote string can only in one line '

  ' it will be not interpolated, but will be escaped, if any escape characters in it'

  no interpolated for this kind of escape string

###

{STRING} = require('../../token-constant')

# do not escape
# do not interpolate
exports.shortRawString = (char) ->
  {text, cursor} = @

  while (c=text[cursor++])
    if c=='\n'
      @lexError('unexpected new line in string')
    else if c==char
      @cursor = cursor
      return @setToken STRING, text[start...cursor], start, @lineno

    @lexError "unexpected end of the input in string"

exports.shortEscapeString = (char) ->
  {text, cursor} = @

  while (c=text[cursor++])
    if c=='\n'
      @lexError('unexpected new line in string')
    if c=='\\'
      # todo: escape character
    else if c=='"'
      str += '\\"'
    else if c==char
      @cursor = cursor
      return @setToken STRING, str, start, @lineno

    @lexError "unexpected end of the input in string"

# just a placeholder for the idea
# the code need to be modified and tested
exports.shortEscapeInterpolateString = (char) ->
  {text, cursor} = @

  while (c=text[cursor++])
    if c=='\n'
      @lexError('unexpected new line in string')
    if c=='\\'
      # todo: escape character
    else if c=='"'
      str += '\\"'
    else if c==char
      @cursor = cursor
      return @setToken STRING, str, start, @lineno

    @lexError "unexpected end of the input in string"

# just a placeholder for the idea
# the code need to be modified and tested
exports.shortRawInterpolateString = (char) ->
  {text, cursor} = @

  while (c=text[cursor++])
    if c=='\n'
      @lexError('unexpected new line in string')
    if c=='\\'
      # todo: escape character
    else if c=='"'
      str += '\\"'
    else if c==char
      @cursor = cursor
      return @setToken STRING, str, start, @lineno

    @lexError "unexpected end of the input in string"