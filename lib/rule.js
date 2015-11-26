'use strict';

/* rule.js
 * Expresses CSS rules.
 */

const create = require('./create');

let Rule = create(function(name, condition, items){
  this.name = name;
  this.condition = null;
  this.items = null;

  // Regular @-rule
  if (name[0] === '@' && typeof items === 'undefined') {
    this.set('at-rule', 'non-conditional');
    this.items = condition;
  }

  // Conditional @-rule
  else if (name[0] === '@' && typeof items !== 'undefined') {
    this.set('at-rule', 'conditional');
    this.condition = condition;
    this.items = items;
  }

  // Selector
  else if (name[0] !== '@' && typeof items === 'undefined') {
    this.set('selector');
    this.items = condition;
  }

  // Unknown
  else {
    this.set('unknown');
  }
}, {

  add: function(){
    this.items.push(...arguments);
    return this;
  },

});

module.exports = exports = Rule;
