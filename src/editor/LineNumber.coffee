{Tag, extendAttrs} = dc

module.exports =
class LineNumber extends Tag
  constructor: (attrs) ->
    attrs = extendAttrs({
      className: "editor line-number"
    }, attrs)
    super('span', attrs)