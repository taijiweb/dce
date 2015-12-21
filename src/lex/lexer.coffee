###
  Lexer

  Parser is a subclass of Lexer

###

Ruler = require "./ruler"

{LexerError} = require "./lexer-error"

module.exports = class Lexer extends Ruler

  rulerName: "lexer"

  constructor: (rules, data) ->
    super(rules, data)

    @updateLexRules @lexRules

    @

  setText:(text, cursor=0, lineno=0) ->
    @text = text
    @initLexer(cursor, lineno)
    @

  initLexer: (cursor=0, lineno=0) ->
    @cursor = cursor
    @lineno = lineno
    @

  updateLexRules: (lexRules) ->
    if !lexRules then return

    for key, method of lexRules
      # key is a character or ""

      if !method
        @lexError('expect a function as lex rule, but undefined got')

      else if typeof method != 'function'
        @lexError('expect a function as lex rule')

      if key.length == 1 or key.length == 0
        @[key] = method.bind(@)

      else if typeof method.leadingString != 'string'
        @lexError('no leading characters is given for the lex rule')

      else
        leadingString = method.leadingString
        method = method.bind(@)
        method.leadingString = leadingString
        for char in leadingString
          @[char] = method.bind(@)

    return

  getToken: ->
    text = @text
    length = text.length
    cursor = @cursor

    if cursor < length
      char = text[cursor]
      rule = @[char]
      if rule
        rule(char)
      else
        # @[''] is the default lex rule
        if rule = @['']
          rule(char)
        else @lexError()

    return

  setToken: (token, value, start, lineno) ->
    @token = token
    @tokenValue = value
    @tokenStart = start
    @lineno = lineno
    token

  lexError: (message, defaultMessageHead) ->
    throw new LexerError(@, message, defaultMessageHead)