'use strict';

/* render.js
 * Render CSS from a tree.
 */

const Rule = require('./rule'),
      Property = require('./property'),
      Value = require('./value');

module.exports = exports = render;

function render(tree, opts){
  opts = (typeof opts === 'object') ? opts : [];

  if (!Array.isArray(tree))
   throw new TypeError('tree must be an array.');

  if (!opts.weak) {
    tree.forEach((x) => {
      if (!(x instanceof Rule))
        throw new Error('a tree\'s root may only contain Rule objects');
    });
  }

  // TODO: render tree
}

render.rule = function(rule, opts){

};

render.property = function(property, opts){

};

render.value = function(value, opts){
  if (value.type === 'keyword') return value.keyword;
  else if (value.type === 'number') return value.val + value.unit;
  else if (value.type === 'function') {
    if (!opts.weak) {
      value.args.forEach((arg) => {
        if (!(arg instanceof Value) || arg.type !== 'number' || arg.type !== 'keyword' || arg.type === 'unknown')
          throw new Error('function Values may only contain known non-function values as their arguments');
      });
    }

    return value.name + '(' + value.args.join(', ') + ')';
  } else return '';
};
