'use strict';

/* selector.js
 * Expresses CSS properties.
 */

module.exports = exports = Selector;

function Selector(elements, items){
  if (Array.isArray(elements)) this.elements = elements;
  else this.elements = [elements];

  if (Array.isArray(items)) this.items = items;
  else this.items = [items];
}
