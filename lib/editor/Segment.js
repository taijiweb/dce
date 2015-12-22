var Segment, Tag, extendAttrs,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tag = dc.Tag, extendAttrs = dc.extendAttrs;

module.exports = Segment = (function(_super) {
  __extends(Segment, _super);

  function Segment(attrs) {
    attrs = extendAttrs({
      className: "editor segment"
    }, attrs);
    Segment.__super__.constructor.call(this, 'span', attrs);
  }

  return Segment;

})(Tag);
