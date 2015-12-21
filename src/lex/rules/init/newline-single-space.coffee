###

this should become the init or initLexer rule of the rules for the t language parser

     rules =
       {
          init: require 'path/to/init/newline-single-space'
       }
     text = "some t language code"
     lexer = new Lexer({text}, rules)

###

searchHeadTab = require '../../../rewrite/search-head-tab'
processNewlineSpaces = require '../../../rewrite/process-newline-spaces'

module.exports = ->
  {text} = @

  if !text then return

  if (line = searchHeadTab(text))
    @error("line: #{line+1}: unexpected tab(#{"\t"}) character", false) #defaultMerssageHead = false

  @cursor = 0
  @lineno = 1
  [newText, lineInfo, spacesInfo] = processNewlineSpaces(text)
  @originalText = text
  @text = newText
  @lineInfo = lineInfo
  @spacesInfo = spacesInfo
  @maxLine = lineInfo.length
  @