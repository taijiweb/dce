{extendAttrs} = dc

Gutter = require('./Gutter')

module.exports =
class LineNumberGutter extends Gutter
  constructor: (attrs) ->
    attrs = extendAttrs({
      className: "editor gutter line-number"
    }, attrs)
    super('div', attrs)