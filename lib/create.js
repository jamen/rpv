'use strict';

/* create.js
 * Create new tree components through SPV lib.
 */

module.exports = create;

function create(constructor, prototype){
  let NewComponent = function(){
    // jshint ignore: start
    if (!new.target) return new NewComponent(...arguments);
    // jshint ignore: end

    this.tags = [];
    constructor.apply(this, arguments);
  };

  NewComponent.prototype = prototype;

  NewComponent.prototype.is = function(item){
    let test = this.tags.indexOf(item);
    return test !== -1 ? true : null;
  };

  NewComponent.prototype.set = function(){
    this.tags.push(...arguments);
    return this;
  };

  return NewComponent;
}
