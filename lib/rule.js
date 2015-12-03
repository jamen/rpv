'use strict';

/* rule.js
 * Expresses CSS rules.
 */

const create = require('./create');

let Rule = create(function(name, condition, items){
  this.set('rule');

  this.name = name;
  this.condition = null;
  this.children = null;

  // Regular @-rule
  if (name[0] === '@' && typeof items === 'undefined') {
    this.set('at-rule', 'non-conditional');
    this.children = Array.isArray(condition) ? condition : [condition];
  }

  // Conditional @-rule
  else if (name[0] === '@' && typeof items !== 'undefined') {
    this.set('at-rule', 'conditional');
    this.condition = condition;
    this.children = items;
  }

  // Selector
  else if (name[0] !== '@' && typeof items === 'undefined') {
    this.set('selector');
    this.children = condition;
  }

  // Unknown
  else {
    this.set('unknown');
  }
}, {

  add: function(){
    this.children.push(...arguments);
    return this;
  },

});

module.exports = exports = Rule;
