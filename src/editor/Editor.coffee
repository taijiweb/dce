{Tag, list, div, extendAttrs} = dc

TopBar = require('./TopBar')
LeftBar = require('./LeftBar')
RightBar = require('./RightBar')

EditArea = require('./EditArea')

StatusBar = require('./StatusBar')

Caret = require('./Caret')

module.exports =
class Editor extends Tag
  constructor: (attrs, @text, @language, options = {}) ->
    attrs = extendAttrs({
      className: "editor"
    }, attrs)
    @options = options

    @topBar = new TopBar()

    @midAttrs = {}
    @leftBar = new LeftBar()
    @editArea = new EditArea()
    @RightBar = new RightBar()
    @midArea = div(@midAttrs, [
      @leftBar,
      @editArea,
      @rightBar
    ])

    @statusBar = new StatusBar()

    caretAttrs = {}
    @caret = new Caret(caretAttrs)
    @caretList = list(@caret)

    super('div', attrs, [
      @topBar
      @midArea
      @statusBar
      @caretList
    ])