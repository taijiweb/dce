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

module.exports = spacesSlashComments = ->

  {text, cursor} = @

  c = text[cursor]
  if c != '/' and c != ' ' and c != '\t'
    return

  {lineInfo, maxLine} = @

  start = cursor
  indent = lineInfo.lead

  while 1
    switch c
      when '/'

        @cursor = cursor
        @lineno = lineno

        if cursor1 = @slashComment()
          cursor = cursor1
          lineno = @lineno

        else break

      when ' ', '\t'
        @cursor = cursor
        # do not pass the lineno, because spaces do not change lineno, always in one line
        # @lineno = lineno
        cursor = @spaces()

      when '\r'
        cursor += 2
        lineno++
        info = lineInfo[lineno]
        if info.lead < indent
          break
        else
          cursor += info.lead

      when '\n'
        cursor++
        lineno++
        info = lineInfo[lineno]
        cursor += info.lead
        if !info.empty and info.lead != indent
          `goto exitLoop`

      else
        `goto exitLoop`

  `exitLoop: `

  @setToken SPACE_COMMENT, text[start...cursor], start, line1