{Tag, extendAttrs} = dc

###
  smallest component in the editor
  conatains a piece of text, text can be empty string
###
module.exports =
class Slice extends Tag
  constructor: (attrs, text) ->
    attrs = extendAttrs({
      className: "editor slice"
    }, attrs)
    super('span', attrs, text)