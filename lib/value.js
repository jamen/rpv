'use strict';

/* value.js
 * Expresses CSS values.
 */

const create = require('./create');

let Value = create(function(value, unit){
  this.set('value');

  this.name = null;

  // Numeric
  if (typeof value === 'number') {
    this.set('numeric');
    this.children.push(value);
    if (typeof unit === 'string') this.name = unit;
  }

  // Keyword
  else if (typeof value === 'string' && !Array.isArray(unit)) {
    this.set('keyword');
    this.children.push(value);
  }

  // Function
  else if (typeof value === 'string' && Array.isArray(unit)) {
    this.set('function');
    this.name = value;
    this.children.push(unit);
  }

  // Unknown
  else this.set('unknown');
}, {

  operation: function(other, callback){
    return callback(this, other);
  },

  math: function(other, callback){
    if (
      other.has('numeric') &&
      this.has('numeric') &&
      this.name === other.name
    ) return new Value(this.operation(other, callback), this.name);
    else
      throw new TypeError('both values must be numbers and have the same unit');
  },

  plus: function(other){
    if (!(other instanceof Value)) other = new Value(...arguments);
    return this.math(other, (x, y) => x.children[0] + y.children[0]);
  },

  minus: function(other){
    if (!(other instanceof Value)) other = new Value(...arguments);
    return this.math(other, (x, y) => x.children[0] - y.children[0]);
  },

  times: function(other){
    if (!(other instanceof Value)) other = new Value(...arguments);
    return this.math(other, (x, y) => x.children[0] * y.children[0]);
  },

  divide: function(other){
    if (!(other instanceof Value)) other = new Value(...arguments);
    return this.math(other, (x, y) => x.children[0] / y.children[0]);
  },

  equals: function(other){
    if (!(other instanceof Value)) other = new Value(...arguments);
    if (this.has('numeric') && other.has('numeric') &&
        this.unit !== other.unit) return false;

    return (
      this.falsey[this.children[0]] ? false : this.children[0]
    ) === (
      this.falsey[other.children[0]] ? false : other.children[0]
    );
  },

  falsey: {'none':true, 'false':true, '0':true, '':true}

});

module.exports = exports = Value;
