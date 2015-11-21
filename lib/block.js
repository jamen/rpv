'use strict';

/* block.js
 * Expresses CSS blocks.
 */

module.exports = exports = Block;

function Block(selectors, items){
  if (Array.isArray(selectors)) this.selectors = selectors;
  else this.selectors = [selectors];

  if (Array.isArray(items)) this.items = items;
  else this.items = [items];
}
