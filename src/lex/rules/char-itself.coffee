###
  this should be called under switch-case or char -> method map
  { ] ( ) ] }
###

module.exports = ->
  start = @cursor
  c = @text[start]
  @cursor++
  @setToken c, c, start, @cursor
