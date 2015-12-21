###

this should become the init or initLexer rule of the rules for the t language parser

     rules =
       {
          init: require 'path/to/init/indent-no-tab'
       }
     text = "some t language code"
     tParser = new Parser({text}, rules)

###

searchHeadTab = require '../../../rewrite/search-head-tab'
processLineHead = require '../../../rewrite/process-line-head'

module.exports = ->
  {text} = @

  if !text then return

  if (line = searchHeadTab(text))
    @error("line: #{line+1}: unexpected tab(#{"\t"}) character", false) #defaultMerssageHead = false

  @cursor = 0
  @lineno = 1
  [newText, lineInfo] = processLineHead(text)
  @originalText = text
  @text = newText
  @lineInfo = lineInfo
  @maxLine = lineInfo.length
  @