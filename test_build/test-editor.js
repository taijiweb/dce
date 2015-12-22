var Editor, expect, idescribe, iit, ndescribe, nit, _ref;

_ref = require('tiiji-util/test-util'), expect = _ref.expect, iit = _ref.iit, idescribe = _ref.idescribe, nit = _ref.nit, ndescribe = _ref.ndescribe;

Editor = require("dce/lib/editor/Editor");

describe("dce/side", function() {
  return it('should make Editor', function() {
    var comp;
    comp = new Editor();
    expect(comp.tagName).to.equal('div');
    comp.mount();
    comp.update();
    return comp.unmount();
  });
});
