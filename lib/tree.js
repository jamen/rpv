'use strict';

/* tree.js
 * Create trees that bind values to children on construction.
 * * */

const Rule = require('./rule'),
      Property = require('./property');

let tree = module.exports = function(items){
  if (!Array.isArray(items))
    throw new Error('a tree\'s root must be an array');

  tree.delegate(items);

  items.parent = items;
  items.items = items;
  items.circulated = true;

  return items;
};

tree.delegate = function(array){
  array.forEach((child, i) => {
    child.parent = array;
    child.index = i;

    if (child instanceof Rule || child instanceof Property)
      tree.delegate(child.items);
  });
};
