'use strict';

/* rule.js
 * Expresses CSS rules.
 */

const create = require('./create');

let Rule = create(function(names, list1, list2){
  this.names = names;
  if (typeof names === 'string') this.names = [names];

  if (this.names.length > 1 || arguments.length === 2) {
    this.type = 'selector';
    this.selectors = this.names || [];
    this.items = list1 || [];
  } else if (this.names.length === 1 && this.names[0][0] === '@') {
    this.type = 'at-rule';
    if (arguments.length === 3) {
      this.type += ' expressive';
      this.name = this.names[0];
      this.expression = list1 || [];
      this.items = list2 || [];
    } else if (arguments.length === 2) this.input = list1;
  } else {
    this.type = 'unknown';
    this.items = [].concat(...(Array.prototype.slice.call(arguments, 1))) || [];
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
