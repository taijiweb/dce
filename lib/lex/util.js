module.newline = function(text, cursor) {
  var c;
  if ((c = text[cursor]) === '\r') {
    return cursor + 2;
  } else if (c === '\n') {
    return cursor + 1;
  } else {

  }
};
