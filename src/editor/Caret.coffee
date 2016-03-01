{Tag, extendAttrs} = dc

module.exports = 
class Caret extends Tag
  constructor: ->

    me = this

    visible = true

    caretAttr =
      className: 'editor caret'
      style:
        display:"inline-block"
        backgroundColor:'blue'
        margin:"2px 3px 0"
        height:'20px'
        width: '2px'

        visibility: ->
          if visible
            'visible'
          else
            'hidden'

    toggleVisibility = ->
      visible = !visible
      me.update()


    handle = null

    this.on 'willAttach', ->
      handle = setInterval toggleVisibility, 500

    this.on 'didDetach', ->
      clearInterval handle

    super('span', caretAttr)
