'use strict';

/* property.js
 * Object to represent CSS properties.
 */

const create = require('./create');

let Property = create(function(name, items){
  this.set('property');

  this.name = name;
  this.children = Array.isArray(items) ? items : [items];
}, {

  add: function(){
    this.children.push(...arguments);
    return this;
  },

});

module.exports = exports = Property;
