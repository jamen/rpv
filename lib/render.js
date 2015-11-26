'use strict';

/* render.js
 * Render CSS from a tree.
 */

const Rule = require('./rule'),
      Property = require('./property'),
      Value = require('./value');

let render = module.exports = function(tree, opts){
  opts = (typeof opts === 'object') ? opts : {};

  if (tree instanceof Rule) return render.rule(tree, opts);
  if (tree instanceof Property) return render.property(tree, opts);
  if (tree instanceof Value) return render.value(tree, opts);
};

render.value = function(value, opts){
  if (!opts.weak && !(value instanceof Value))
    throw new Error('value must be a Value object');

  // Numeric value
  if (value.has('numeric')) return this.val + this.name;

  // Keyword value
  else if (value.has('keyword')) return this.val;

  // Function
  else if (value.has('function')) {
    let args = '';
    this.val.forEach(arg => {
      if (typeof arg === 'number') arg = new Value(arg);
      if (!opts.weak && !(arg instanceof Value) && !arg.has('function'))
        throw new Error('functions may only contain non-function values');

      args += (arg.value + (arg.has('numeric') ? arg.name : ''));
    });

    return this.name + '(' + args + ')';
  }

  // Unknown
  else {
    if (!opts.weak)
      throw new Error('encountered unknown value when rendering.');
    else
      return '';
  }
};
