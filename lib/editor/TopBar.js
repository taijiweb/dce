var Tag, TopBar, extendAttrs,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tag = dc.Tag, extendAttrs = dc.extendAttrs;

module.exports = TopBar = (function(_super) {
  __extends(TopBar, _super);

  function TopBar(attrs, children) {
    attrs = extendAttrs({
      className: "editor top-bar"
    }, attrs);
    TopBar.__super__.constructor.call(this, 'div', attrs, children);
  }

  return TopBar;

})(Tag);
