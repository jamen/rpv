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
  tree.forEach(function(child, i){
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

let test = search([
  Rule('@media', [
    Property('max-width', Value(500, 'px')),
    'and',
    Property('min-width', Value(100, 'px'))
  ], [
    Rule('.selector', [
      Property('width', Value(100, 'px')),
      Property('height', Value(100, 'px')),
    ])
  ])
], Property);

test.forEach(function(child){
  console.log(child.parent);
})
