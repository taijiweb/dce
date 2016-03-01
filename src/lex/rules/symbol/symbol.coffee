extend = require('extend')

# \ keyword and key symbol escape char
symbolStopChars = extend charset(' \t\v\n\r()[]{},;:\'\".@\\'), identifierCharSet

exports.symbol = ->
  {text, cursor} = @

  start = cursor; first = text[cursor]

  if first=='.' or first=='@' or first==':'
    cursor++
    while (c=text[cursor])
      if c!=first then break
      else cursor++

  if cursor!=start then return {value: text.slice(start, cursor), start:start, stop:cursor, line: lineno}

  while c=text[cursor]
    if @symbolStopChars[c] then break
    if c=='/' and ((c2=text[cursor+1])=='/' or c2=='*') then break
    if c=='\\' and ((c2=text[cursor+1])=='\n'  or c2=='\r') then break
    cursor++

  if cursor==start then return

  if (c=text[cursor])==')' or c==']' or c=='}'
    back = cursor-1
    while charset[back] then back--
    cursor = back+1
  if cursor==start then return
  if cursor!=start then return {value: text.slice(start, cursor), start:start, stop:cursor, line: lineno}

@escapeSymbol = escapeSymbol = ->
  start = cursor; line1 = lineno
  if text[cursor]!='\\' then return
  cursor++; sym = parser.symbol()
  if not sym then return rollback(start, line1)
  else sym.start = start; sym.escape = true; return sym

@escapeStringSymbol = ->
  if text[cursor]!="\\" or (quote=text[cursor+1])!='"' and quote!="'" then return
  cursor += 2; symbolStart = cursor
  while 1
    if not (c=text[cursor]) then error 'unexpected end of input while parsing escaped string symbol'
    else if c=='\n' or c=='\r' then error 'unexpected new line in escaped string symbol'
    else if c==' ' or c=='\t' then error 'spaces and tabs are not permitted in escaped string symbol'
    else if c=='"'
      if c==quote then cursor++; break
      else error 'unexpected " in escaped string symbol'
    else if c=="'"
      if c==quote then cursor++; break
      else error "unexpected ' in escaped string symbol"
    cursor++
  return {type: SYMBOL, escape: true, value: text[symbolStart...cursor-1], start:symbolStart-2, stop:cursor, line: lineno}
