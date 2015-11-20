'use strict';

/* value.js
 * Expresses CSS values.
 */

module.exports = exports = Value;

function Value(data, value){
  if (!(this instanceof Value)) return new Value();

  if (typeof data === 'string' && Array.isArray(value)) {

    this.type = 'function';
    // Data is a function.

    // Set object data.
    this.function = this.name = data;
    this.val = value;

    // Make sure args only contains Value objects.
    if (this.val.length) this.val.forEach((x) => {
      if (!(x instanceof Value))
        throw new TypeError('function arguments may only contain Value objects');
    });
  } else if (typeof data === 'number') {

    this.type = 'number';
    // Data is a number.

    // Set object data.
    this.unit = this.name = value || null;
    this.val = data;
  } else {

    this.type = 'keyword';
    // Data is a keyword.

    // Set object data.
    this.val = this.keyword = this.name = data;
  }
}

Value.prototype = {};

Value.prototype.operation = function(otherValue, callback){
  return callback(this, otherValue);
};

Value.prototype.math = function(otherValue, callback){
  if (
    otherValue.type === 'number' &&
    this.type === 'number' &&
    this.unit === otherValue.unit
  ) return new Value(this.operation(otherValue, callback), this.unit);
  else
    throw new TypeError('both values must be numbers and have the same unit');
};

Value.prototype.plus =
Value.prototype.add = function(other){
  return this.math(other, (x, y) => x.val + y.val);
};

Value.prototype.minus =
Value.prototype.subtract = function(other){
  return this.math(other, (x, y) => x.val - y.val);
};

Value.prototype.times =
Value.prototype.multiply = function(other){
  return this.math(other, (x, y) => x.val * y.val);
};

Value.prototype.divide = function(other){
  return this.math(other, (x, y) => x.val / y.val);
};

Value.prototype.equals =
Value.prototype.compare = function(other){
  if (this.type === 'number' && other.type === 'number' &&
      this.unit !== other.unit) return false;

  return (
    this.falsey[this.val] ? false : this.val
  ) === (
    this.falsey[other.val] ? false : other.val
  );
};

Value.prototype.falsey = {'none':true, 'false':true, '0':true, '':true};
