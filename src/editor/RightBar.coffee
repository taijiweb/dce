{Tag, extendAttrs} = dc

module.exports =
class RightBar extends Tag
  constructor: (attrs, children) ->
    attrs = extendAttrs({
      className: "editor right-bar"
    }, attrs)
    super('div', attrs, children)