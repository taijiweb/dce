var Gutter, Tag, extendAttrs,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tag = dc.Tag, extendAttrs = dc.extendAttrs;

module.exports = Gutter = (function(_super) {
  __extends(Gutter, _super);

  function Gutter(attrs) {
    attrs = extendAttrs({
      className: "editor gutter"
    }, attrs);
    Gutter.__super__.constructor.call(this, 'div', attrs);
  }

  return Gutter;

})(Tag);
