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

render.value = function(value, opts){
  opts = opts || {};
  if (value.type === 'keyword') return value.keyword;
  else if (value.type === 'number') return value.val + value.unit;
  else if (value.type === 'function') {
    let args = '';
    value.args.forEach((arg, i) => {
      if (typeof arg === 'number') arg = new Value(arg);
      if (
        !opts.weak &&
        (!(arg instanceof Value) ||
        (arg.type !== 'number' &&
        arg.type !== 'keyword' &&
        arg.type === 'unknown'))
      ) throw new Error('function Values may only contain known non-function values as their arguments');

      args += arg.val + (value.args.length-1 !== i ? ', ' : '');
    });

    return value.name + '(' + args + ')';
  } else {
    if (!opts.weak)
      throw new Error('could not identify "'+value.val+'".');
    return value.val;
  }
};

render.property = function(property, opts){
  opts = opts || {};
  let values = [];
  property.items.forEach(function(item){
    if (!(item instanceof Value) && !opts.weak)
      throw new Error('Property objects may only contain Value objects.');

    values.push(render.value(item));
  });

  if (!(/^[a-z-]+$/.test(property.name)) && !opts.weak)
    throw new Error('property names may only be alpha and "-" characters.')

  return property.name + ': ' + values.join(' ') + ';';
};

render.rule = function(rule, opts){

};

let test = new Property('foo', [
  new Value(1, 'px'),
  new Value(2, 'em')
]);

console.log(render.property(test));
