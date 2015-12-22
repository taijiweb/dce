{Tag, extendAttrs} = dc

module.exports =
class TopBar extends Tag
  constructor: (attrs, children) ->
    attrs = extendAttrs({
      className: "editor top-bar"
    }, attrs)
    super('div', attrs, children)