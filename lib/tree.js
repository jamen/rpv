'use strict';

/* tree.js
 * Create trees that bind values to children on construction.
 * * */

const create = require('./create');

let Tree = create(function(children){
  this.set('tree');

  if (!Array.isArray(children))
    throw new Error('a tree\'s root must be an array');

  this.children = children;
  Tree.delegate(this, this.children);
}, {});

Tree.delegate = function(parent, children){
  parent = parent;

  children.forEach(child => {
    child.parent = parent;

    if (!child.has('value'))
      Tree.delegate(children, child.children);
  });
};

module.exports = Tree;
