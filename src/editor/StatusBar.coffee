{Tag, extendAttrs} = dc

module.exports =
class StatusBar extends Tag
  constructor: (attrs) ->
    attrs = extendAttrs({
      className: "editor status-bar "
    }, attrs)
    super('div', attrs)
