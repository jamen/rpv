'use strict';

/* value.js
 * Expresses CSS values.
 */

const create = require('./create');

let Value = create(function(value, unit, inject){
  if (typeof inject !== 'undefined') this.set(...inject);
  this.unit = unit || null;
  this.val = value || null;

  // Set tags
  if (typeof value !== 'undefined') {
    this.set('numeric');
    if (typeof unit === 'string') this.set('unit');
    else this.set('no-unit');
  }
  else if (typeof value === 'string') this.set('keyword');
  else this.set('unknown');
}, {

  operation: function(otherValue, callback){
    return callback(this, otherValue);
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
