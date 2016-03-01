###
  Ruler: rule processor

  the base class for all the object based on rules, e.g.

    lexer: char -> method

    parser: construct -> method
      where constructs are terminals and non terminals

    normalizer: node-type -> method

    transformer: node-type -> method

    compiler: node-type -> method

    optimizer: node-type -> method

    textizer: node-type -> method

     ...
###

hasOwn = Object.hasOwnProperty

RulerError = require('./ruler-error')

module.exports = class Ruler

  constructor: (rules, data) ->
    @rules = {}
    @updateRules(rules)

    @updateData(data)

    @init()

    @

  extendRules: (rules) ->
    cache = {}
    myRules = @rules

    hasOwn = Object.hasOwnProperty.bind(@)

    for key, method of rules
      hasOwn(key) and cache[key] = @[key]
      if typeof method == 'function'
        method = method.bind(@)
      @[key] = method
      myRules[key] = method

    cache

  extendData: (rules) ->
    cache = {}

    hasOwn = Object.hasOwnProperty.bind(@)

    for key, value of rules
      hasOwn(key) and cache[key] = @[key]
      @[key] = value

    cache

  # the same as Parser.extendRules, but do not cache the old rules
  updateRules: (rules) ->

    myRules = @rules

    for key, method of rules
      if typeof method == 'function'
        method = method.bind(@)
      @[key] = method
      myRules[key] = method

    @

  # the same as Parser.extendData, but do not cache the old data
  updateData: (data) ->

    for key, value of data
      @[key] = value

    @

  # config can be data, rules or the unification of both
  restoreConfig: (cache, config={}) ->

    hasOwn = Object.hasOwnProperty.bind(cache)

    for key of config
      if hasOwn(key)
        @[key] = cache[key]
      else
        delete @[key]

    return

  init: -> @

  clone: (rules, data) ->
    processor = new @constructor()
    data and processor.updata(data)
    rules and processor.updateRules(rules)
    processor

  error: (message) ->
    throw new RulerError(message)
