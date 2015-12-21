
/*
  Lexer

  Parser is a subclass of Lexer
 */
var Lexer, LexerError, Ruler,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Ruler = require("./ruler");

LexerError = require("./lexer-error").LexerError;

module.exports = Lexer = (function(_super) {
  __extends(Lexer, _super);

  Lexer.prototype.rulerName = "lexer";

  function Lexer(rules, data) {
    Lexer.__super__.constructor.call(this, rules, data);
    this.updateLexRules(this.lexRules);
    this;
  }

  Lexer.prototype.setText = function(text, cursor, lineno) {
    if (cursor == null) {
      cursor = 0;
    }
    if (lineno == null) {
      lineno = 0;
    }
    this.text = text;
    this.initLexer(cursor, lineno);
    return this;
  };

  Lexer.prototype.initLexer = function(cursor, lineno) {
    if (cursor == null) {
      cursor = 0;
    }
    if (lineno == null) {
      lineno = 0;
    }
    this.cursor = cursor;
    this.lineno = lineno;
    return this;
  };

  Lexer.prototype.updateLexRules = function(lexRules) {
    var char, key, leadingString, method, _i, _len;
    if (!lexRules) {
      return;
    }
    for (key in lexRules) {
      method = lexRules[key];
      if (!method) {
        this.lexError('expect a function as lex rule, but undefined got');
      } else if (typeof method !== 'function') {
        this.lexError('expect a function as lex rule');
      }
      if (key.length === 1 || key.length === 0) {
        this[key] = method.bind(this);
      } else if (typeof method.leadingString !== 'string') {
        this.lexError('no leading characters is given for the lex rule');
      } else {
        leadingString = method.leadingString;
        method = method.bind(this);
        method.leadingString = leadingString;
        for (_i = 0, _len = leadingString.length; _i < _len; _i++) {
          char = leadingString[_i];
          this[char] = method.bind(this);
        }
      }
    }
  };

  Lexer.prototype.getToken = function() {
    var char, cursor, length, rule, text;
    text = this.text;
    length = text.length;
    cursor = this.cursor;
    if (cursor < length) {
      char = text[cursor];
      rule = this[char];
      if (rule) {
        rule(char);
      } else {
        if (rule = this['']) {
          rule(char);
        } else {
          this.lexError();
        }
      }
    }
  };

  Lexer.prototype.setToken = function(token, value, start, lineno) {
    this.token = token;
    this.tokenValue = value;
    this.tokenStart = start;
    this.lineno = lineno;
    return token;
  };

  Lexer.prototype.lexError = function(message, defaultMessageHead) {
    throw new LexerError(this, message, defaultMessageHead);
  };

  return Lexer;

})(Ruler);
