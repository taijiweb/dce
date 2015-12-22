var Gutter, LineNumberGutter, extendAttrs,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

extendAttrs = dc.extendAttrs;

Gutter = require('./Gutter');

module.exports = LineNumberGutter = (function(_super) {
  __extends(LineNumberGutter, _super);

  function LineNumberGutter(attrs) {
    attrs = extendAttrs({
      className: "editor gutter line-number"
    }, attrs);
    LineNumberGutter.__super__.constructor.call(this, 'div', attrs);
  }

  return LineNumberGutter;

})(Gutter);
