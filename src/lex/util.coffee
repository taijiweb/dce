module.newline = (text, cursor) ->
  # do not increment the lineno here
  # the caller should do it

  if (c=text[cursor]) == '\r'
    cursor+2

  else if c=='\n'
    cursor+1

  # not matched
  else return