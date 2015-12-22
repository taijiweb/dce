var EditLine, Tag, extendAttrs,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tag = dc.Tag, extendAttrs = dc.extendAttrs;

module.exports = EditLine = (function(_super) {
  __extends(EditLine, _super);

  function EditLine(attrs, segments) {
    attrs = extendAttrs({
      className: "edit-line"
    }, attrs);
    EditLine.__super__.constructor.call(this, 'p', attrs, segments);
  }

  return EditLine;

})(Tag);
