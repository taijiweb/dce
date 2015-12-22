{Tag, extendAttrs} = dc

# a gourp of slices
#
module.exports =
class Segment extends Tag
  constructor: (attrs) ->
    attrs = extendAttrs({
      className: "editor segment"
    }, attrs)
    super('span', attrs)