'use strict';

/* value.js
 * Expresses CSS values.
 */

const create = require('./create');

let Value = create(function(value, unit){
  this.name = null;
  this.val = null;

  // Numeric
  if (typeof value === 'number') {
    this.set('numeric');
    this.val = value;
    if (typeof unit === 'string') this.name = unit;
  }

  // Keyword
  else if (typeof value === 'string' && !Array.isArray(unit)) {
    this.set('keyword');
    this.val = value;
  }

  // Function
  else if (typeof value === 'string' && Array.isArray(unit)) {
    this.set('function');
    this.name = value;
    this.val = unit;
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
      this.unit === other.unit
    ) return new Value(this.operation(other, callback), this.unit);
    else
      throw new TypeError('both values must be numbers and have the same unit');
  },

  plus: function(other){
    if (!(other instanceof Value)) other = new Value(...arguments);
    return this.math(other, (x, y) => x.val + y.val);
  },

  minus: function(other){
    if (!(other instanceof Value)) other = new Value(...arguments);
    return this.math(other, (x, y) => x.val - y.val);
  },

  times: function(other){
    if (!(other instanceof Value)) other = new Value(...arguments);
    return this.math(other, (x, y) => x.val * y.val);
  },

  divide: function(other){
    if (!(other instanceof Value)) other = new Value(...arguments);
    return this.math(other, (x, y) => x.val / y.val);
  },

  equals: function(other){
    if (!(other instanceof Value)) other = new Value(...arguments);
    if (this.has('numeric') && other.has('numeric') &&
        this.unit !== other.unit) return false;

    return (
      this.falsey[this.val] ? false : this.val
    ) === (
      this.falsey[other.val] ? false : other.val
    );
  },

  falsey: {'none':true, 'false':true, '0':true, '':true}

});

module.exports = exports = Value;
