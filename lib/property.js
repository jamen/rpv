'use strict';

/* property.js
 * Object to represent CSS properties.
 */

const create = require('./create');

let Property = create(function(name, items, inject){
  this.tags = Array.isArray(inject) ? inject : [];
  this.name = name;
  this.items = Array.isArray(items) ? items : [];
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
