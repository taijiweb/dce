# \r?\n, don't eat spaces.

module.exports ->
  {text, cursor} = @

  if text[cursor]=='\r'
    @cursor += 2
    @lineno++
    @setToken '\r\n', '\r\n', cursor, @lineno

  else
    @cursor++
    @lineno++
    @setToken '\n', '\n', cursor, @lineno

  '\n'
