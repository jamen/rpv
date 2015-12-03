'use strict';

/* search.js
 * A function to search and iterate trees.
 */

const setup = require('./tree'),
      Rule = require('./rule'),
      Property = require('./property');

let search = module.exports = function(tree, tags){
  if (typeof tree.circulated === 'undefined') tree = setup(tree);

  let matched = [];
  tags.forEach(tag => {
    tree.forEach(item => {
      if (item.has(tag))
        matched.push(item);

      if (typeof item.items !== 'undefined')
        matched.push(...search(item.items, tags));
    });
  });

  return matched;
};
