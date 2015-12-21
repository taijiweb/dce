# comment that begin with /* /** // /// /+ /++
# /* */ block comment
# /** */ block comment that should put in the target code
# // line comment
# /// line comment that should put in the target code
# /+ code block comment
# /++ code block comment that should put in the target code
# /? indent comment
# /?? indent comment that should put in the target code

# why all these characters are chosen?
# just because /?/ /*/ /+/ /?/ are all not regexp

# including the following spaces and empty lines


# space" ", tab\t, / and \r \n leading spaces and comments

module.exports = ->
  {text, cursor} = @

  c = text[cursor]
  if c != '/' then return

  switch c

    when '*'
      return @slashBlockComment()

    # // /// line comment
    # including the following empty lines
    when '/'
      return @slashLineComment()

    # /? /?? indent comment
    when '?'
      return @slashIndentComment()

    # /+ /++ code comment
    when '+'
      return @slashCodeComment()

    else
      # todo: look ahead and return some symbol