var Caret, EditArea, Editor, LeftBar, RightBar, StatusBar, Tag, TopBar, div, extendAttrs, list,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tag = dc.Tag, list = dc.list, div = dc.div, extendAttrs = dc.extendAttrs;

TopBar = require('./TopBar');

LeftBar = require('./LeftBar');

RightBar = require('./RightBar');

EditArea = require('./EditArea');

StatusBar = require('./StatusBar');

Caret = require('./Caret');

module.exports = Editor = (function(_super) {
  __extends(Editor, _super);

  function Editor(attrs, text, language, options) {
    var caretAttrs;
    this.text = text;
    this.language = language;
    if (options == null) {
      options = {};
    }
    attrs = extendAttrs({
      className: "editor"
    }, attrs);
    this.options = options;
    this.topBar = new TopBar();
    this.midAttrs = {};
    this.leftBar = new LeftBar();
    this.editArea = new EditArea();
    this.RightBar = new RightBar();
    this.midArea = div(this.midAttrs, [this.leftBar, this.editArea, this.rightBar]);
    this.statusBar = new StatusBar();
    caretAttrs = {};
    this.caret = new Caret(caretAttrs);
    this.caretList = list(this.caret);
    Editor.__super__.constructor.call(this, 'div', attrs, [this.topBar, this.midArea, this.statusBar, this.caretList]);
  }

  return Editor;

})(Tag);
