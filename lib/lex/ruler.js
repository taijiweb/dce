
/*
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
 */
var Ruler, RulerError, hasOwn;

hasOwn = Object.hasOwnProperty;

RulerError = require('./ruler-error');

module.exports = Ruler = (function() {
  function Ruler(rules, data) {
    this.rules = {};
    this.updateRules(rules);
    this.updateData(data);
    this.init();
    this;
  }

  Ruler.prototype.extendRules = function(rules) {
    var cache, key, method, myRules;
    cache = {};
    myRules = this.rules;
    hasOwn = Object.hasOwnProperty.bind(this);
    for (key in rules) {
      method = rules[key];
      hasOwn(key) && (cache[key] = this[key]);
      if (typeof method === 'function') {
        method = method.bind(this);
      }
      this[key] = method;
      myRules[key] = method;
    }
    return cache;
  };

  Ruler.prototype.extendData = function(rules) {
    var cache, key, value;
    cache = {};
    hasOwn = Object.hasOwnProperty.bind(this);
    for (key in rules) {
      value = rules[key];
      hasOwn(key) && (cache[key] = this[key]);
      this[key] = value;
    }
    return cache;
  };

  Ruler.prototype.updateRules = function(rules) {
    var key, method, myRules;
    myRules = this.rules;
    for (key in rules) {
      method = rules[key];
      if (typeof method === 'function') {
        method = method.bind(this);
      }
      this[key] = method;
      myRules[key] = method;
    }
    return this;
  };

  Ruler.prototype.updateData = function(data) {
    var key, value;
    for (key in data) {
      value = data[key];
      this[key] = value;
    }
    return this;
  };

  Ruler.prototype.restoreConfig = function(cache, config) {
    var key;
    if (config == null) {
      config = {};
    }
    hasOwn = Object.hasOwnProperty.bind(cache);
    for (key in config) {
      if (hasOwn(key)) {
        this[key] = cache[key];
      } else {
        delete this[key];
      }
    }
  };

  Ruler.prototype.init = function() {
    return this;
  };

  Ruler.prototype.clone = function(rules, data) {
    var processor;
    processor = new this.constructor();
    data && processor.updata(data);
    rules && processor.updateRules(rules);
    return processor;
  };

  Ruler.prototype.error = function(message) {
    throw new RulerError(message);
  };

  return Ruler;

})();
