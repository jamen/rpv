'use strict';

/* value.js
 * Expresses CSS values.
 */

const create = require('./create');

let Value = create(function(data, value){
  if (typeof data === 'string' && Array.isArray(value)) {
    this.type = 'function';
    this.function = this.name = data;
    this.val = value;
  } else if (typeof data === 'number') {
    this.type = 'number';
    this.unit = this.name = value || null;
    this.val = data;
  } else {
    this.type = 'keyword';
    this.val = this.keyword = this.name = data;
  }
}, {

  operation: function(otherValue, callback){
    return callback(this, otherValue);
  },

  math: function(otherValue, callback){
    if (
      otherValue.type === 'number' &&
      this.type === 'number' &&
      this.unit === otherValue.unit
    ) return new Value(this.operation(otherValue, callback), this.unit);
    else
      throw new TypeError('both values must be numbers and have the same unit');
  },

  plus: function(other){
    return this.math(other, (x, y) => x.val + y.val);
  },

  minus: function(other){
    return this.math(other, (x, y) => x.val - y.val);
  },

  times: function(other){
    return this.math(other, (x, y) => x.val * y.val);
  },

  divide: function(other){
    return this.math(other, (x, y) => x.val / y.val);
  },

  equals: function(other){
    if (this.type === 'number' && other.type === 'number' &&
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
