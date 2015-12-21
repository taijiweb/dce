{span} = dc


module.exports = 
class Caret
  constructor: ->
    visible = true
    caretAttr =
      style:
        display:"inline-block"
        backgroundColor:'blue'
        margin:"2px 3px 0"
        height:'20px'
        width: '2px'
        visibility: -> if visible then 'visible' else 'hidden'
    toggleVisibility = -> visible = !visible; this.update()
    handle = null
    this.on 'beforeAttach', -> handle = setInterval toggleVisibility, 500
    this.on 'afterDetach', -> clearInterval handle
    super('span', caretAttr)
