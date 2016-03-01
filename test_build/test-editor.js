var Editor, ddescribe, expect, idescribe, iit, ndescribe, nit, _ref;

_ref = require('bdd-test-helper'), expect = _ref.expect, iit = _ref.iit, idescribe = _ref.idescribe, nit = _ref.nit, ndescribe = _ref.ndescribe, ddescribe = _ref.ddescribe;

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
