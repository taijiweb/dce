{Tag, extendAttrs} = dc

module.exports =
class Gutter extends Tag
  constructor: (attrs) ->
    attrs = extendAttrs({
      className: "editor gutter"
    }, attrs)
    super('div', attrs)