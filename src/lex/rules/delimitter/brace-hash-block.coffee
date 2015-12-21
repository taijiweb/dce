###
  this should be called under switch-case or char -> method map
  {. }: block
  { }: hash
  {, }: python style hash

###

module.exports = ->
  switch @text[@cursor++]
    when '.' then @cursor++; "{."
    when "," then @cursor++; "{,"
    else "{"