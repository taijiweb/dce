var RightBar, Tag, extendAttrs,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tag = dc.Tag, extendAttrs = dc.extendAttrs;

module.exports = RightBar = (function(_super) {
  __extends(RightBar, _super);

  function RightBar(attrs, children) {
    attrs = extendAttrs({
      className: "editor right-bar"
    }, attrs);
    RightBar.__super__.constructor.call(this, 'div', attrs, children);
  }

  return RightBar;

})(Tag);
