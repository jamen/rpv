'use strict';

/* create.js
 * Create new tree components through RPV lib.
 */

let create = module.exports = function(constructor, prototype){
  let Component = function(){
    // jshint ignore: start
    if (!new.target) return new Component(...arguments);
    // jshint ignore: end

    this.tags = [];
    this.children = [];
    constructor.apply(this, arguments);
  };

  Component.prototype = prototype;

  Component.prototype.has = function(item){
    return !!~this.tags.indexOf(item);
  };

  Component.prototype.set = function(){
    this.tags.push(...arguments);
    return this;
  };

  Component.prototype.unset = function(items){
    items = Array.isArray(items) ? items : [items];
    this.tags = this.tags.filter(x => items.indexOf(x) !== -1);
    return this;
  };

  Component.prototype.replace = function(item){
    if (!this.parent)
      throw new Error('No ref (see "No ref" on the RPV Wiki)');

    this.set('_REMOVE');
    for (let i = 0; i < this.parent.children.length; i++) {
      if (this.parent.children[i].has('_REMOVE')) {
        if (typeof item !== 'undefined') this.parent.children.splice(i, 1, item);
        else this.parent.children.splice(i, 1);
        break;
      }
    }
  };

  return Component;
};
