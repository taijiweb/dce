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
computeLineInfo = require '../../../rewrite/compute-line-info'

module.exports = (cursor=0, lineno=0)->
  {text} = @

  if !text then return

  if (line = searchHeadTab(text))
    @error("line: #{line+1}: unexpected tab(#{"\t"}) character", false) #defaultMerssageHead = false


  @lineInfo = computeLineInfo(text)
  @cursor = cursor
  @lineno = lineno
  @maxLine = @lineInfo.length
  @