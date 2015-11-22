'use strict';

/* property.js
 * Object to represent CSS properties.
 */

const create = require('./create');

let Property = create(function(name, values){
  this.name = name;
  this.items = [];
  if (arguments.length <= 2) this.items = values;
  else this.items = Array.prototype.slice.call(arguments, 1);
  if (!Array.isArray(values)) this.items = [values];
}, {

  add: function(){
    this.items.push(...arguments);
    return this;
  },

  remove: function(loc){
    this.items.splice(loc, 1);
    return this;
  },

  set: function(loc, value){
    this.items[loc] = value;
    return this;
  },

});

module.exports = exports = Property;
