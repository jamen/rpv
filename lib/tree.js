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

  items.circulated = true;

  return items;
};

tree.delegate = function(array){
  array.forEach(child => {
    child.parent = array;
    if (child instanceof Rule || child instanceof Property)
      tree.delegate(child.items);
  });
};
