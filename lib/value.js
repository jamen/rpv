'use strict';

/* value.js
 * Expresses CSS values.
 */

const create = require('./create');

let Value = create(function(data, value){
  if (typeof data === 'string' && Array.isArray(value)) {
    this.type = 'function';
    this.function = this.name = data;
    this.args = this.val = value;
  } else if (typeof data === 'number') {
    this.type = 'number';
    this.unit = this.name = value || null;
    this.val = data;
  } else if (typeof data === 'string' && /^[A-z]+$/.test(data)) {
    this.type = 'keyword';
    this.val = this.keyword = this.name = data;
  } else {
    this.type = 'unknown';
    this.val = value;
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
