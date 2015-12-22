{Tag, extendAttrs} = dc

module.exports =
class EditLine extends Tag
  constructor: (attrs, segments) ->
    attrs = extendAttrs({
      className: "edit-line"
    }, attrs)
    super('p', attrs, segments)