'use strict';

/* property.js
 * Object to represent CSS properties.
 */

module.exports = exports = Property;

function Property(name, values){
  if (typeof name === 'string') this.name = name;
  else
    throw new TypeError('name of proprety must be a string');

  if (Array.isArray(values)) this.values = values;
  else this.values = [values];
}
