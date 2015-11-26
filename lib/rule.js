'use strict';

/* rule.js
 * Expresses CSS rules.
 */

const create = require('./create');

let Rule = create(function(name, list1, list2){
  this.name = name;
  if (this.name[0] !== '@') {
    this.tags.push('selector');
    this.selector = this.name || [];
    this.items = list1 || [];
  } else if (this.name[0] === '@') {
    this.tags.push('at-rule');
    if (arguments.length === 3) {
      this.tags.push('expressive');
      this.name = this.name[0];
      this.expression = list1 || [];
      this.items = list2 || [];
    } else if (arguments.length === 2) this.input = list1;
  } else {
    this.type = 'unknown';
    this.items = [...(Array.prototype.slice.call(arguments, 1))];
  }
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

module.exports = exports = Rule;
