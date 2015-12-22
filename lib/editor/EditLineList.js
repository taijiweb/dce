var EditLineList, Tag,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tag = dc.Tag;

module.exports = EditLineList = (function(_super) {
  __extends(EditLineList, _super);

  function EditLineList(children) {
    var attrs;
    attrs = extendAttrs({
      className: "status-bar"
    }, attrs);
    EditLineList.__super__.constructor.call(this, children);
  }

  return EditLineList;

})(Tag);
