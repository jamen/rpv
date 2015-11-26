'use strict';

/* tree.js
 * Create trees that bind special values on construction.
 * * */

const create = require('./create');

let Tree = create(function(){
  this.tags.push('tree');
}, {});

module.exports = Tree;
