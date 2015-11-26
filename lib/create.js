'use strict';

/* create.js
 * Create new tree components through RPV lib.
 */

module.exports = create;

function create(constructor, prototype){
  let Component = function(){
    // jshint ignore: start
    if (!new.target) return new NewComponent(...arguments);
    // jshint ignore: end

    this.tags = [];
    constructor.apply(this, arguments);
  };

  Component.prototype = prototype;

  Component.prototype.is = function(item){
    let test = this.tags.indexOf(item);
    return test !== -1 ? true : null;
  };

  Component.prototype.set = function(){
    this.tags.push(...arguments);
    return this;
  };

  return Component;
}
