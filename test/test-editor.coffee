{expect, iit,idescribe, nit, ndescribe}  = require('tiiji-util/test-util')

Editor = require("dce/lib/editor/Editor")

describe "dce/side", ->
  it 'should make Editor', ->
    comp = new Editor()
    expect(comp.tagName).to.equal('div')
    comp.mount()
    comp.update()
    comp.unmount()