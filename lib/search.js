'use strict';

/* search.js
 * A function to search and iterate trees.
 */

const Rule = require('./rule'),
      Property = require('./property'),
      Value = require('./value');

module.exports = search;

function search(tree, query, ancestor) {
  if (!Array.isArray(tree))
    throw new Error('Three must be an array.');

  let result = [];
  tree.forEach(function(child){
    if (child instanceof query) {
      child.parent = tree;
      if (typeof ancestor !== 'undefined') child.ancestor = ancestor;
      result.push(child);
    }

    if (child instanceof Rule || child instanceof Property)
      result.push(...search(child.items, query, ancestor || tree));
  });

  return result;
}
