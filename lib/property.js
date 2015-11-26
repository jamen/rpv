'use strict';

/* property.js
 * Object to represent CSS properties.
 */

const create = require('./create');

let Property = create(function(name, items, inject){
  if (typeof inject !== 'undefined') this.tags.push(...inject);
  this.name = name;
  this.items = Array.isArray(items) ? items : [];
}, {

  add: function(){
    this.items.push(...arguments);
    return this;
  },

});

module.exports = exports = Property;
