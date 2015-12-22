{Tag, extendAttrs} = dc

module.exports =
class LeftBar extends Tag
  constructor: (attrs, gutters) ->
    attrs = extendAttrs({
      className: "editor left-bar"
    }, attrs)
    super('div', attrs, gutters)