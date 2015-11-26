'use strict';

/* create.js
 * Create new tree components through SPV lib.
 */

module.exports = create;

function create(constructor, prototype){
  let NewComponent = function(){
    if (!new.target) return new NewComponent(...arguments);
    constructor.apply(this, arguments);
  }

  NewComponent.prototype = prototype;

  NewComponent.prototype.is = function(item){
    let test = this.tags.indexOf(item);
    return test !== -1 ? true : null;
  };

  return NewComponent;
}
