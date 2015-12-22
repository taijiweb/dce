{Tag, extendAttrs} = dc

module.exports = 
class Caret extends Tag
  constructor: ->

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
      this.update()

    super('span', caretAttr)

    handle = null

    this.on 'beforeAttach', ->
      handle = setInterval toggleVisibility, 500

    this.on 'afterDetach', ->
      clearInterval handle

    this
