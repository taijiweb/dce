{Tag, extendAttrs} = dc

module.exports =
class EditArea extends Tag
  constructor: (attrs) ->
    attrs = extendAttrs({
      className: "edit-area"
    }, attrs)
    super('div', attrs)