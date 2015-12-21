
/*
  LexerError

  ParserError is a subclass of LexerError
 */
var LexerError, RulerError,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

RulerError = require('../ruler-error');

exports.LexerError = LexerError = (function(_super) {
  __extends(LexerError, _super);

  function LexerError() {
    return LexerError.__super__.constructor.apply(this, arguments);
  }

  LexerError.prototype.defaultMessageHead = function() {
    var column, ruler, rulerName;
    ruler = this.ruler;
    rulerName = (ruler.rulerName && ruler.rulerName + ": ") || "";
    if ((ruler.column != null) || (ruler.getColumn != null)) {
      column = ruler.column != null ? ruler.column : ruler.getColumn();
      return rulerName + ("" + (ruler.lineno + 1) + ":" + column + ": ");
    } else if (ruler.lineno != null) {
      return rulerName + ("line " + (ruler.lineno + 1) + ": ");
    } else {
      return rulerName;
    }
  };

  LexerError.prototype.defaultMessage = function() {
    var ruler;
    ruler = this.ruler;
    return ruler.text && (ruler.cursor != null) && ruler.text.slice(ruler.cursor, ruler.cursor + 20) || "some error happens.";
  };

  return LexerError;

})(RulerError);
