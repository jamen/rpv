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

    // Make sure args only contains non-function Value objects.
    if (this.val.length) this.val.forEach((x) => {
      if (!(x instanceof Value) && x.type !== '')
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
    this.keyword = this.name = data;
    this.val = null;
  }
}
