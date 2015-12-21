###

  single quote string

  this kind of string will not be interpolated

  ''' ... '''
  ' ... '

  '
  { something  }: this is not be interpolated
  a.b.c: this is not be interpolated
  \r \n but this will be escaped

  '

  ''' this will not be escaped '''

  s'...'
  s'''...'''

  no interpolated for this kind of escape string

###

{STRING} = require '../../token-constant'
{repeat} = require '../../../utils'

# this method depends on rewriting the text by replaceing leading \r\n+spaces to a single '\n
# and save the newline, lead in lineInfo

# this method depends on rewriting the text by replaceing leading \r\n+spaces to a single '\n
# and save the newline, lead in lineInfo

exports.singleQuoteString = ->
  {text, cursor} = @

  if text[cursor+1]=="'"
    if text[cursor+2]=="'"
      quote = "'''"
      start = cursor
      cursor += 3
    else
      @cursor += 2
      @setToken STRING, "''", cursor, @lineno
  else
    start = cursor
    cursor++
    quote = "'"

  {lineno, lineInfo} = @

  line1 = lineno

  indent = lineInfo[lineno].lead

  str = ''

  i = 0

  while c = text[cursor]

    if i++>1000 then break

    switch c

      when "'"
        if quote == c
          @cursor++
          @lineno = lineno
          return @setToken STRING, '"' + str + '"', start, line1

        else if text[cursor+1..cursor+2] != "''"
          cursor++
          str += '"'

        else
            @cursor += 3
            @lineno = lineno
            return @setToken STRING, '"' + str + '"', start, line1

      when '"'
        # always escape " in the result string, because it will be wrapped in " ... "
        str += '\\"'
        cursor++

      when '\\'

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
          myLineInfo = lineInfo[lineno]
          lead = myLineInfo.lead
          if lead < indent
            @lexError UNDENT_TOO_MUCH_IN_STRING
          str += text[cursor+3...cursor + 3 + lead]
          cursor += 3 + lead

        else
          cursor++
          str += '\\\\'

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

      else
        cursor++
        str += c

  @lexError 'expect '+quote+', unexpected end of input in string'

exports.UNDENT_TOO_MUCH_IN_STRING = UNDENT_TOO_MUCH_IN_STRING = 'wrong indent. undent too much. all lines should not indent less than the first line of the string'

exports.singleQuoteString.leadingString = "'"
