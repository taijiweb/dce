{Tag} = dc

module.exports =
class EditLineList extends Tag
  constructor: (children) ->
    attrs = extendAttrs({
      className: "status-bar"
    }, attrs)
    super(children)
