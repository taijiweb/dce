###
  LexerError

  ParserError is a subclass of LexerError

###

RulerError = require('../ruler-error')

exports.LexerError = class LexerError extends RulerError

  defaultMessageHead: ->
    {ruler} = @

    rulerName =  (ruler.rulerName and ruler.rulerName + ": ") or ""

    if ruler.column? or ruler.getColumn?
      column =
        if ruler.column?
          ruler.column
        else ruler.getColumn()
      rulerName + "#{ruler.lineno+1}:#{column}: "

    else if ruler.lineno?
      rulerName + "line #{ruler.lineno+1}: "

    else return rulerName

  defaultMessage: ->
    {ruler} = @
    ruler.text and ruler.cursor? and ruler.text[ruler.cursor...ruler.cursor+20] or "some error happens."
