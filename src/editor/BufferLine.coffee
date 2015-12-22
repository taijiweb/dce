{Tag, extendAttrs} = dc

module.exports =
class BufferLine extends Tag
  constructor: (attrs) ->
    attrs = extendAttrs({
      className: "editor buffer-line"
    }, attrs)
    super('div', attrs)
