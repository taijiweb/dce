var Slice, Tag, extendAttrs,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tag = dc.Tag, extendAttrs = dc.extendAttrs;


/*
  smallest component in the editor
  conatains a piece of text, text can be empty string
 */

module.exports = Slice = (function(_super) {
  __extends(Slice, _super);

  function Slice(attrs, text) {
    attrs = extendAttrs({
      className: "editor slice"
    }, attrs);
    Slice.__super__.constructor.call(this, 'span', attrs, text);
  }

  return Slice;

})(Tag);
