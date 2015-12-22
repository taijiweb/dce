var Caret, Tag, extendAttrs,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tag = dc.Tag, extendAttrs = dc.extendAttrs;

module.exports = Caret = (function(_super) {
  __extends(Caret, _super);

  function Caret() {
    var caretAttr, handle, toggleVisibility, visible;
    visible = true;
    caretAttr = {
      className: 'editor caret',
      style: {
        display: "inline-block",
        backgroundColor: 'blue',
        margin: "2px 3px 0",
        height: '20px',
        width: '2px',
        visibility: function() {
          if (visible) {
            return 'visible';
          } else {
            return 'hidden';
          }
        }
      }
    };
    toggleVisibility = function() {
      visible = !visible;
      return this.update();
    };
    Caret.__super__.constructor.call(this, 'span', caretAttr);
    handle = null;
    this.on('beforeAttach', function() {
      return handle = setInterval(toggleVisibility, 500);
    });
    this.on('afterDetach', function() {
      return clearInterval(handle);
    });
    this;
  }

  return Caret;

})(Tag);
