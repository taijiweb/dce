
/*
  double quote string
  or interpolate string

  """ ... """
  " ... "
  s""" ... """
  s" ... "

  "
  { something  }: this is not be interpolated
  a.b.c: this is not be interpolated
  \n \r: this will be escaped
  "

  will be escape
 */
var INTERPOLATE_STRING, INTERPOLATE_STRING_ITEM, STRING, UNDENT_TOO_MUCH_IN_STRING, repeat, _ref;

UNDENT_TOO_MUCH_IN_STRING = require('./single-quote-string').UNDENT_TOO_MUCH_IN_STRING;

_ref = require('../../token-constant'), INTERPOLATE_STRING = _ref.INTERPOLATE_STRING, INTERPOLATE_STRING_ITEM = _ref.INTERPOLATE_STRING_ITEM, STRING = _ref.STRING;

repeat = require('../../../utils').repeat;

exports.doubleQuoteString = function() {
  var addLeadingText, c, c2, cursor, expr, i, indent, lead, line1, lineInfo, lineno, literalStart, myLineInfo, piece, pieces, pieces_length, quote, spacesInfo, start, str, text, value;
  text = this.text, cursor = this.cursor, lineno = this.lineno;
  if (text[cursor + 1] === '"') {
    if (text[cursor + 2] === '"') {
      quote = '"""';
      start = cursor;
      cursor += 3;
    } else {
      this.cursor += 2;
      this.setToken(STRING, '""', cursor, lineno);
    }
  } else {
    start = cursor;
    cursor++;
    quote = '"';
  }
  lineInfo = this.lineInfo, spacesInfo = this.spacesInfo;
  line1 = lineno;
  indent = lineInfo[lineno].lead;
  pieces = [];
  str = '"';
  i = 0;
  while (c = text[cursor]) {
    if (i++ > 1000) {
      break;
    }
    switch (c) {
      case '"':
        str += '"';
        if (quote === c) {
          this.cursor = cursor + 1;
        } else if (text.slice(cursor + 1, +(cursor + 2) + 1 || 9e9) === '""') {
          this.cursor = cursor + 3;
        } else {
          cursor++;
          continue;
        }
        this.lineno = lineno;
        pieces.push(str);
        pieces_length = pieces.length;
        if (pieces_length > 1) {
          if (pieces.every(function(item) {
            return item[0] === '"';
          })) {
            value = pieces.forEach(function(item) {
              return item.slice(1, item.length);
            }).join('');
            return this.setToken(STRING, value, start, line1);
          } else {
            pieces.unshift('string!');
            return this.setToken(INTERPOLATE_STRING, pieces, start, line1);
          }
        } else if (pieces_length === 1) {
          piece = pieces[0];
          if (piece[0] === '"') {
            return this.setToken(STRING, piece, start, line1);
          } else {
            return this.setToken(INTERPOLATE_STRING_ITEM, piece, start, line1);
          }
        } else {
          return this.setToken(STRING, '""', start, line1);
        }
        break;
      case "\\":
        if ((c2 = text[cursor + 1]) === '\n') {
          lineno++;
          myLineInfo = lineInfo[lineno];
          lead = myLineInfo.lead;
          if (lead < indent) {
            this.lexError(UNDENT_TOO_MUCH_IN_STRING);
          }
          str += text.slice(cursor + 2, cursor + 2 + lead);
          cursor += 2 + lead;
        } else if (c2 === '\r') {
          lineno++;
          cursor += 3;
          myLineInfo = lineInfo[lineno];
          lead = myLineInfo.lead;
          if (lead < indent) {
            this.lexError(UNDENT_TOO_MUCH_IN_STRING);
          }
          str += text.slice(cursor + 3, cursor + 3 + lead);
          cursor += 3 + lead;
        } else {
          cursor++;
          str += '\\';
        }
        break;
      case '\n':
        lineno++;
        myLineInfo = lineInfo[lineno];
        lead = myLineInfo.lead;
        if (lead < indent) {
          this.lexError(UNDENT_TOO_MUCH_IN_STRING);
        }
        str += text.slice(cursor, cursor + 1 + lead);
        cursor += 1 + lead;
        break;
      case '\r':
        lineno++;
        myLineInfo = lineInfo[lineno];
        lead = myLineInfo.lead;
        if (lead < indent) {
          this.lexError(UNDENT_TOO_MUCH_IN_STRING);
        }
        str += text.slice(cursor, cursor + 2 + lead);
        cursor += 2 + lead;
        break;
      case '$':
        cursor++;
        if (text[cursor] === ':') {
          cursor++;
          addLeadingText = true;
        } else {
          addLeadingText = false;
        }
        literalStart = cursor;
        this.cursor = cursor;
        expr = this.interpolateExpression();
        cursor = this.cursor;
        if (expr) {
          expr = this.getOperatorExpression(expr);
          if (addLeadingText) {
            cursor++;
            pieces.push(text.slice(literalStart, cursor));
          }
          pieces.push(expr);
        } else {
          pieces.push('"$"');
        }
        break;
      case '(':
      case '{':
      case '[':
        if (expr = this.delimiterExpression('inStrExp')) {
          pieces.push(this.getOperatorExpression(expr));
          if (c === '(') {
            pieces.push('")"');
          } else if (c === '[') {
            pieces.push('"]"');
          } else if (c === '{') {
            pieces.push('"}"');
          }
        } else {
          pieces.push('"' + c + '"');
        }
        break;
      default:
        cursor++;
        str += c;
    }
  }
  return this.lexError('expect ' + quote + ', unexpected end of input in string');
};

exports.doubleQuoteString.leadingString = '"';
