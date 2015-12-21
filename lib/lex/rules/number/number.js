var NUMBER, charset, letterCharSet;

letterCharSet = (charset = require('../../char-set')).letterCharSet;

NUMBER = require('../../token-constant').NUMBER;

module.exports = function(char) {
  var base, baseStart, c, c2, cursor, dotCursor, meetDigit, start, text;
  text = this.text, cursor = this.cursor;
  start = cursor;
  base = 10;
  c = char;
  if (c === '0' && (c2 = text[cursor + 1])) {
    if (c2 === 'b' || c2 === 'B') {
      base = 2;
      baseStart = cursor += 2;
      c = text[cursor];
    } else if (c2 === 'x' || c2 === 'X') {
      base = 16;
      baseStart = cursor += 2;
      c = text[cursor];
    } else {
      c = text[++cursor];
      meetDigit = true;
    }
  }
  if (base === 2) {
    while (c) {
      if (c === '0' || c === '1') {
        c = text[++cursor];
      } else {
        break;
      }
    }
  } else if (base === 16) {
    while (c) {
      if (!(('0' <= c && c <= '9') || ('a' <= c && c <= 'f') || ('A' <= c && c <= 'F'))) {
        break;
      } else {
        c = text[++cursor];
      }
    }
  }
  if (base === 2) {
    if (c === '.' || c === 'e' || c === 'E') {
      error('binary number followed by ".eE"');
    } else if (('2' <= c && c <= '9')) {
      error('binary number followed by 2-9');
    }
  }
  if (base === 16) {
    if (c === '.') {
      error('hexadecimal number followed by "."');
    } else if (letterCharSet[c]) {
      error('hexadecimal number followed by g-z or G-Z');
    }
  }
  if (base !== 10) {
    if (cursor === baseStart) {
      this.cursor = cursor--;
      return this.setToken(NUMBER, 0, start);
    } else {
      return this.setToken(NUMBER, parseInt(text.slice(baseStart, cursor), base), start);
    }
  }
  while (c) {
    if (('0' <= c && c <= '9')) {
      meetDigit = true;
      c = text[++cursor];
    } else {
      break;
    }
  }
  if (!meetDigit) {
    return;
  }
  if (c === '.') {
    meetDigit = false;
    c = text[++cursor];
    while (c) {
      if (c < '0' || '9' < c) {
        break;
      } else {
        meetDigit = true;
        c = text[++cursor];
      }
    }
  }
  dotCursor = cursor - 1;
  if (!meetDigit && c !== 'e' && c !== 'E') {
    this.cursor = dotCursor;
    return this.setToken(NUMBER, parseInt(text.slice(start, cursor)), start);
  }
  if (c === 'e' || c === 'E') {
    c = text[++cursor];
    if (c === '+' || c === '-') {
      c = text[++cursor];
      if (!c || c < '0' || '9' < c) {
        this.cursor = dotCursor;
        return this.setToken(NUMBER, parseInt(text.slice(start, dotCursor)), start);
      } else {
        while (c) {
          c = text[++cursor];
          if (c < '0' || '9' < c) {
            break;
          }
        }
      }
    } else if (!c || c < '0' || '9' < c) {
      this.cursor = dotCursor;
      return this.setToken(NUMBER, parseInt(text.slice(start, dotCursor)), start);
    } else {
      while (c) {
        if (c < '0' || '9' < c) {
          break;
        }
        c = text[++cursor];
      }
      this.cursor = cursor;
    }
  }
  return this.setToken(NUMBER, parseFloat(text.slice(start, cursor)), start);
};

module.exports.leadingString = "0123456789";
