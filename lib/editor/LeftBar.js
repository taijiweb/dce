var LeftBar, Tag, extendAttrs,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tag = dc.Tag, extendAttrs = dc.extendAttrs;

module.exports = LeftBar = (function(_super) {
  __extends(LeftBar, _super);

  function LeftBar(attrs, gutters) {
    attrs = extendAttrs({
      className: "editor left-bar"
    }, attrs);
    LeftBar.__super__.constructor.call(this, 'div', attrs, gutters);
  }

  return LeftBar;

})(Tag);
