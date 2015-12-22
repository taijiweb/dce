var StatusBar, Tag, extendAttrs,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tag = dc.Tag, extendAttrs = dc.extendAttrs;

module.exports = StatusBar = (function(_super) {
  __extends(StatusBar, _super);

  function StatusBar(attrs) {
    attrs = extendAttrs({
      className: "editor status-bar "
    }, attrs);
    StatusBar.__super__.constructor.call(this, 'div', attrs);
  }

  return StatusBar;

})(Tag);
