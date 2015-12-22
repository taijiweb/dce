var LineNumber, Tag, extendAttrs,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tag = dc.Tag, extendAttrs = dc.extendAttrs;

module.exports = LineNumber = (function(_super) {
  __extends(LineNumber, _super);

  function LineNumber(attrs) {
    attrs = extendAttrs({
      className: "editor line-number"
    }, attrs);
    LineNumber.__super__.constructor.call(this, 'span', attrs);
  }

  return LineNumber;

})(Tag);
