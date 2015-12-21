var escapeSymbol, extend, symbolStopChars;

extend = require('extend');

symbolStopChars = extend(charset(' \t\v\n\r()[]{},;:\'\".@\\'), identifierCharSet);

exports.symbol = function() {
  var back, c, c2, cursor, first, start, text;
  text = this.text, cursor = this.cursor;
  start = cursor;
  first = text[cursor];
  if (first === '.' || first === '@' || first === ':') {
    cursor++;
    while ((c = text[cursor])) {
      if (c !== first) {
        break;
      } else {
        cursor++;
      }
    }
  }
  if (cursor !== start) {
    return {
      value: text.slice(start, cursor),
      start: start,
      stop: cursor,
      line: lineno
    };
  }
  while (c = text[cursor]) {
    if (this.symbolStopChars[c]) {
      break;
    }
    if (c === '/' && ((c2 = text[cursor + 1]) === '/' || c2 === '*')) {
      break;
    }
    if (c === '\\' && ((c2 = text[cursor + 1]) === '\n' || c2 === '\r')) {
      break;
    }
    cursor++;
  }
  if (cursor === start) {
    return;
  }
  if ((c = text[cursor]) === ')' || c === ']' || c === '}') {
    back = cursor - 1;
    while (charset[back]) {
      back--;
    }
    cursor = back + 1;
  }
  if (cursor === start) {
    return;
  }
  if (cursor !== start) {
    return {
      value: text.slice(start, cursor),
      start: start,
      stop: cursor,
      line: lineno
    };
  }
};

this.escapeSymbol = escapeSymbol = function() {
  var line1, start, sym;
  start = cursor;
  line1 = lineno;
  if (text[cursor] !== '\\') {
    return;
  }
  cursor++;
  sym = parser.symbol();
  if (!sym) {
    return rollback(start, line1);
  } else {
    sym.start = start;
    sym.escape = true;
    return sym;
  }
};

this.escapeStringSymbol = function() {
  var c, quote, symbolStart;
  if (text[cursor] !== "\\" || (quote = text[cursor + 1]) !== '"' && quote !== "'") {
    return;
  }
  cursor += 2;
  symbolStart = cursor;
  while (1) {
    if (!(c = text[cursor])) {
      error('unexpected end of input while parsing escaped string symbol');
    } else if (c === '\n' || c === '\r') {
      error('unexpected new line in escaped string symbol');
    } else if (c === ' ' || c === '\t') {
      error('spaces and tabs are not permitted in escaped string symbol');
    } else if (c === '"') {
      if (c === quote) {
        cursor++;
        break;
      } else {
        error('unexpected " in escaped string symbol');
      }
    } else if (c === "'") {
      if (c === quote) {
        cursor++;
        break;
      } else {
        error("unexpected ' in escaped string symbol");
      }
    }
    cursor++;
  }
  return {
    type: SYMBOL,
    escape: true,
    value: text.slice(symbolStart, cursor - 1),
    start: symbolStart - 2,
    stop: cursor,
    line: lineno
  };
};
