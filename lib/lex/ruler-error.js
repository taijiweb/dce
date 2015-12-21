var RulerError, TError,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

TError = require('./t-error');

module.exports = RulerError = (function(_super) {
  __extends(RulerError, _super);

  function RulerError(ruler, rulerMessage, useDefaultMessageHead) {
    this.ruler = ruler;
    this.rulerMessage = rulerMessage;
    this.useDefaultMessageHead = useDefaultMessageHead != null ? useDefaultMessageHead : true;
    RulerError.__super__.constructor.call(this, this.toString());
  }

  RulerError.prototype.toString = function() {
    if (this.useDefaultMessageHead) {
      return (this.defaultMessageHead && this.defaultMessageHead() || "") + (this.rulerMessage || this.defaultMessage && this.defaultMessage() || "");
    } else {
      return this.rulerMessage || this.defaultMessage && this.defaultMessage() || "";
    }
  };

  return RulerError;

})(TError);
