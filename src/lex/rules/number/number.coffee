# binary, hexidecimal, decimal, scientic float

{letterCharSet} = charset = require('../../char-set')

{NUMBER} = require('../../token-constant')

module.exports = (char) ->
  {text, cursor} = @

  start = cursor; base = 10; c = char

  if c=='0' and c2 = text[cursor+1]
    if c2=='b' or c2=='B' then base = 2; baseStart = cursor += 2; c = text[cursor]
    else if c2=='x' or c2=='X' then base = 16; baseStart = cursor += 2; c = text[cursor]
    else c = text[++cursor]; meetDigit = true

  if base==2
    while c
      if c=='0' or c=='1' then c = text[++cursor]
      else break
  else if base==16
    while c
      if  not('0'<=c<='9' or 'a'<=c<='f' or 'A'<=c<='F') then break
      else c = text[++cursor]

  if base==2
    if c=='.' or c=='e' or c=='E' then error 'binary number followed by ".eE"'
    else if '2'<=c<='9' then error 'binary number followed by 2-9'
  if base==16
    if c=='.' then error 'hexadecimal number followed by "."'
    else if letterCharSet[c] then error 'hexadecimal number followed by g-z or G-Z'
  if base!=10
    if cursor==baseStart
      @cursor = cursor--
      return @setToken NUMBER, 0, start
    else
      return @setToken NUMBER, parseInt(text[baseStart...cursor], base), start

  # base==10
  while c
    if '0'<=c<='9' then meetDigit = true; c = text[++cursor]
    else break
  # if not meetDigit then return symbol() # comment because in no matchToken solution
  if not meetDigit then return
  if c=='.'
    meetDigit = false
    c = text[++cursor]
    while c
      if c<'0' or '9'<c then break
      else meetDigit = true; c = text[++cursor]
  dotCursor = cursor-1
  if not meetDigit and c!='e' and c!='E'
    @cursor = dotCursor
    return @setToken NUMBER, parseInt(text[start...cursor]), start
  if c=='e' or c=='E'
    c = text[++cursor]
    if c=='+' or c=='-'
      c = text[++cursor]
      if not c or c<'0' or '9'<c
        @cursor = dotCursor;
        return @setToken NUMBER, parseInt(text[start...dotCursor]), start
      else
        while c
          c = text[++cursor]
          if  c<'0' or '9'<c then break
    else if not c or c<'0' or '9'<c
      @cursor = dotCursor;
      return @setToken NUMBER, parseInt(text[start...dotCursor]), start
    else
      while c
          if  c<'0' or '9'<c then break
          c = text[++cursor]
      @cursor = cursor
  @setToken NUMBER, parseFloat(text[start...cursor]), start

module.exports.leadingString = "0123456789"
