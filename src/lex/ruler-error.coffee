TError = require './t-error'

module.exports = class RulerError extends TError
  constructor: (@ruler, @rulerMessage, @useDefaultMessageHead=true) ->
    super(@toString())

  toString: ->
    if @useDefaultMessageHead
      (@defaultMessageHead and @defaultMessageHead() or "") + (@rulerMessage or @defaultMessage and @defaultMessage() or "")
    else @rulerMessage or @defaultMessage and @defaultMessage() or ""
