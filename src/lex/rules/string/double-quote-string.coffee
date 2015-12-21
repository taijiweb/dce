###
  double quote string
  or interpolate string

  """ ... """
  " ... "
  s""" ... """
  s" ... "

  "
  { something  }: this is not be interpolated
  a.b.c: this is not be interpolated
  \n \r: this will be escaped
  "

  will be escape

###

{UNDENT_TOO_MUCH_IN_STRING} = require './single-quote-string'

{INTERPOLATE_STRING, INTERPOLATE_STRING_ITEM, STRING} = require '../../token-constant'

{repeat} = require '../../../utils'

# this method is based on lex/init/indent-no-space

exports.doubleQuoteString = ->

  {text, cursor, lineno} = @

  if text[cursor+1]=='"'

    if text[cursor+2]=='"'
      quote = '"""'
      start = cursor
      cursor += 3

    else
      @cursor += 2
      @setToken STRING, '""', cursor, lineno

  else
    start = cursor
    cursor++
    quote = '"'

  {lineInfo, spacesInfo} = @

  line1 = lineno

  indent = lineInfo[lineno].lead

  pieces = []

  str = '"'

  i = 0
  while c = text[cursor]

    if i++>1000 then break

    switch c

      when '"'

        str += '"'

        if quote==c
          @cursor = cursor + 1

        else if text[cursor+1..cursor+2] == '""'
          @cursor = cursor + 3

        else
          cursor++

          continue

        @lineno = lineno

        pieces.push str
        pieces_length = pieces.length

        if pieces_length>1

          if pieces.every((item) -> item[0]=='"')
            value = pieces.forEach((item) -> item[1...item.length]).join('')
            return @setToken STRING, value, start, line1

          else
            pieces.unshift 'string!'
            return @setToken INTERPOLATE_STRING, pieces, start, line1

        else if pieces_length == 1
          piece = pieces[0]
          if piece[0]=='"'
            return @setToken STRING, piece, start, line1
          else
            return @setToken INTERPOLATE_STRING_ITEM, piece, start, line1

        else return @setToken STRING, '""', start, line1

      when "\\"

        if (c2 = text[cursor+1]) == '\n'
          # concatenate line
          # skip itself and the following \n immediately, they should NOT in the result string
          lineno++
          myLineInfo = lineInfo[lineno]
          lead = myLineInfo.lead
          if lead < indent
            @lexError UNDENT_TOO_MUCH_IN_STRING
          str += text[cursor+2...cursor+2+lead]
          cursor += 2 + lead

        else if c2 == '\r'
          # concatenate line
          # skip itself and the following \n immediately, they should NOT in the result string
          lineno++
          cursor += 3
          myLineInfo = lineInfo[lineno]
          lead = myLineInfo.lead
          if lead < indent
            @lexError UNDENT_TOO_MUCH_IN_STRING
          str += text[cursor+3...cursor + 3 + lead]
          cursor += 3 + lead

        else
          cursor++
          str += '\\'

      when '\n'
        lineno++
        myLineInfo = lineInfo[lineno]
        lead = myLineInfo.lead
        if lead < indent
          @lexError UNDENT_TOO_MUCH_IN_STRING
        str += text[cursor...cursor + 1 + lead]
        cursor += 1 + lead

      when '\r'
        lineno++
        myLineInfo = lineInfo[lineno]
        lead = myLineInfo.lead
        if lead < indent
          @lexError UNDENT_TOO_MUCH_IN_STRING
        str += text[cursor...cursor + 2 + lead]
        cursor += 2 + lead

      when '$'

        cursor++

        if text[cursor]==':'
          cursor++
          addLeadingText = true
        else
          addLeadingText = false

        literalStart = cursor

        @cursor = cursor
        expr = @interpolateExpression()
        cursor = @cursor

        if expr

          # @getOperatorExpression should not change @cursor
          expr = @getOperatorExpression expr

          if addLeadingText
            cursor++
            pieces.push text[literalStart...cursor]

          pieces.push expr

        else pieces.push '"$"'

      when '(', '{', '['

        if expr = @delimiterExpression('inStrExp')

          # @getOperatorExpression should not change @cursor
          pieces.push @getOperatorExpression(expr)

          if c=='(' then pieces.push '")"'

          else if c=='[' then  pieces.push '"]"'

          else if c=='{' then  pieces.push '"}"'

        else pieces.push '"'+c+'"'

      else
        cursor++
        str += c

  @lexError 'expect '+quote+', unexpected end of input in string'

exports.doubleQuoteString.leadingString = '"'