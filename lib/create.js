'use strict';

/* create.js
 * Create new tree components through SPV lib.
 */

module.exports = exports = create;

function create(constructor, prototype){
  let NewComponent = function(){
    if (!new.target) return new NewComponent(...arguments);
    constructor.apply(this, arguments);
  }

  NewComponent.prototype = prototype;
  return NewComponent;
}
