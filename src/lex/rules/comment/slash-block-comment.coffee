# /* */ /** */ block comment

{newline} = require '../../util'

module.exports = ->
  {text, cursor, lineno, maxLine} = @
  cursor +=2

  indent = lineInfo[lineno].lead

  while 1
    if not text[cursor]
      @lexError 'meet unexpected end of input in block comment'

    if text[cursor...cursor+2]=='*/'
      cursor += 2
      return [cursor, lineno]

    else if cursor1 = newline(text, cursor)
      cursor = cursor1
      lineno++

      # skip empty lines
      while lineno < maxLine and lineInfo[lineno].empty
        lineno++

      info = lineInfo[lineno]
      if info.lead<indent
        @lexError 'the lines in block comment should not indent less than its begin line'
      cursor = info.start + info.lead

    # skipt all other characters
    else cursor++
