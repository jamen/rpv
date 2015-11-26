'use strict';

/* search.js
 * A function to search and iterate trees.
 */

const Rule = require('./rule'),
      Property = require('./property');

let search = module.exports = function(tree, tags, loop){
  if (typeof tree.circulated === 'undefined')
    throw new Error('You must setup your tree with rpv.tree() first.');

  let matched = [];
  tags.forEach(tag => {
    tree.forEach(item => {
      if (item.has(tag)) {
        loop(item);
        matched.push(item);
      }

      if (item instanceof Rule || item instanceof Property)
        matched.push(...search(item.items, tags, loop));
    });
  });

  return matched;
};
