'use strict';

/* render.js
 * Render CSS from a tree.
 */

const Rule = require('./rule'),
      Property = require('./property'),
      Value = require('./value');

module.exports = render;

function render(tree, opts){
  opts = (typeof opts === 'object') ? opts : {indent: true, level:0};

  if (tree instanceof Rule) return render.rule(tree, opts);
  if (tree instanceof Property) return render.property(tree, opts);
  if (tree instanceof Value) return render.value(tree, opts);
}
