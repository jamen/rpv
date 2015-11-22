'use strict';

/* build.js
 * Build CSS from a tree.
 */

const Rule = require('./rule'),
      Property = require('./property'),
      Value = require('./value');

module.exports = exports = render;

function render(tree, opts){
  opts = (typeof opts === 'object') ? opts : [];

  if (!Array.isArray(tree))
   throw new TypeError('tree must be an array.');

  if (!opts.weak || opts.strict) {
    tree.forEach((x) => {
      if (!(x instanceof Rule))
        throw new Error('tree may only contain Rules at the base');
    });
  }
}
