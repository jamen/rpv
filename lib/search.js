'use strict';

/* search.js
 * A function to search and iterate trees.
 */

const Tree = require('./tree');

let search = module.exports = function(tree, tags){
  if (!(tree instanceof Tree)) tree = new Tree(tree);

  let matched = [];
  tags.forEach(tag => {
    tree.children.forEach(item => {
      if (item.has(tag))
        matched.push(item);

      if (!item.has('value'))
        matched.push(...search(item.children, tags, true));
    });
  });

  return matched;
};
