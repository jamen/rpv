'use strict';

/* render.js
 * Render CSS from a tree.
 */

const Rule = require('./rule'),
      Property = require('./property'),
      Value = require('./value'),
      Tree = require('./tree');

let render = module.exports = function(tree, opts){
  opts = (typeof opts === 'object') ? opts : {};

  if (tree instanceof Tree) return render.tree(tree, opts);
  else if (tree instanceof Rule) return render.rule(tree, opts);
  else if (tree instanceof Property) return render.property(tree, opts);
  else if (tree instanceof Value) return render.value(tree, opts);
  else
    throw new Error('You can only render Trees, Rules, Properties, and Values');
};

render.tree = function(tree, opts){
  let final = '';
  tree.children.forEach((rule, i) => {
    if (!opts.weak && !(rule instanceof Rule))
      throw new Error('a tree may only contain rules at the base');

    final += render(rule, opts) + (i !== tree.length-1 ? '; ' : '');
  });

  return final;
};

render.value = function(value, opts){
  // Numeric value
  if (value.has('numeric')) return value.children[0] + (value.name || '');

  // Keyword value
  else if (value.has('keyword')) return value.children[0];

  // Function
  else if (value.has('function')) {
    let args = '';
    value.children[0].forEach((arg, i) => {
      if (typeof arg === 'number' || typeof arg === 'string') arg = new Value(arg);
      if (!opts.weak && !(arg instanceof Value) && !arg.has('function'))
        throw new Error('functions may only contain non-function values');

      args += render(arg, opts) + (i !== value.children[0].length-1 ? ', ' : '');
    });

    return value.name + '(' + args + ')';
  }

  // Unknown
  else {
    if (!opts.weak)
      throw new Error('encountered unknown value when rendering.');
    else
      return '';
  }
};

render.property = function(prop, opts){
  let vals = '';
  prop.children.forEach((val, i) => {
    if (!opts.weak && !(val instanceof Value))
      throw new Error('properties may only contain Value objects');

    vals += render(val, opts) + (i !== prop.children.length-1 ? ' ' : '');
  });

  return prop.name + ':' + vals;
};

render.rule = function(rule, opts){
  // Regular @-rule
  if (rule.has('at-rule') && rule.has('non-conditional')) {
    let vals = '';
    rule.children.forEach((val, i) => {
      if (!opts.weak && !(val instanceof Value))
        throw new Error('non-conditional @-rules may only contain Values');

      vals += render(val, opts) + (i !== rule.children.length-1 ? ' ' : '');
    });

    return rule.name + ' ' + vals;
  }

  // Conditional @-rule
  else if (rule.has('at-rule') && rule.has('conditional')) {
    let sels = '';
    rule.children.forEach((sel, i) => {
      if (!opts.weak && !(sel instanceof Rule) && !sel.has('selector'))
        throw new Error('conditional @-rules may only contain selector Properties');

      sels += render(sel, opts) + (i !== rule.children.length-1 ? ' ' : '');
    });

    let cond = '';
    if (rule.has('conditional')) {
      rule.condition.forEach((prop, i) => {
        if (typeof prop === 'string') prop = new Value(prop);
        if (!opts.weak && !(prop instanceof Property || prop instanceof Value))
          throw new Error('a conditional at-rule may only contain properties and values');

        cond += prop instanceof Property ? '(' + render(prop, opts) + ')' : render(prop, opts);
        cond += (i !== rule.condition.length-1 ? ' ' : '');
      });
    }

    return rule.name + ' ' + cond + ' {' + sels + '}';
  }

  // Selector
  else if (rule.has('selector')) {
    let props = '';
    rule.children.forEach((prop, i) => {
      if (!opts.weak && !(prop instanceof Property))
        throw new Error('selector Rules may only contain Properties');

      props += render(prop, opts) + (i !== rule.children.length-1 ? '; ' : '');
    });

    return rule.name + ' {' + props + '}';
  }

  // Unknown
  else {
    if (!opts.weak)
      throw new Error('encountered unknown value when rendering.');
    else
      return '';
  }
};
