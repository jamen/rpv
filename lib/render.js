'use strict';

/* render.js
 * Render CSS from a tree.
 */

const Rule = require('./rule'),
      Property = require('./property'),
      Value = require('./value');

let render = module.exports = function(tree, opts){
  opts = (typeof opts === 'object') ? opts : {};

  if (tree instanceof Rule) return render.rule(tree, opts);
  if (tree instanceof Property) return render.property(tree, opts);
  if (tree instanceof Value) return render.value(tree, opts);

  let final = '';
  tree.forEach((rule, i) => {
    if (!opts.weak && !(rule instanceof Rule))
      throw new Error('a tree may only contain rules at the base');

    final += render(rule, opts) + (i !== rule.length-1 ? '; ' : '');
  });

  return final;
};

render.value = function(value, opts){
  // Numeric value
  if (value.has('numeric')) return value.val + (value.name || '');

  // Keyword value
  else if (value.has('keyword')) return value.val;

  // Function
  else if (value.has('function')) {
    let args = '';
    value.val.forEach((arg, i) => {
      if (typeof arg === 'number' || typeof arg === 'string') arg = new Value(arg);
      if (!opts.weak && !(arg instanceof Value) && !arg.has('function'))
        throw new Error('functions may only contain non-function values');

      args += render(arg, opts) + (i !== value.val.length-1 ? ', ' : '');
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
  prop.items.forEach((val, i) => {
    if (!opts.weak && !(val instanceof Value))
      throw new Error('properties may only contain Value objects');

    vals += render(val, opts) + (i !== prop.items.length-1 ? ' ' : '');
  });

  return prop.name + ':' + vals;
};

render.rule = function(rule, opts){
  // Regular @-rule
  if (rule.has('at-rule') && rule.has('non-conditional')) {
    let vals = '';
    rule.items.forEach((val, i) => {
      if (!opts.weak && !(val instanceof Value))
        throw new Error('non-conditional @-rules may only contain Values');

      vals += render(val, opts) + (i !== rule.items.length-1 ? ' ' : '');
    });

    return rule.name + ' ' + vals;
  }

  // Conditional @-rule
  else if (rule.has('at-rule') && rule.has('conditional')) {
    let sels = '';
    rule.items.forEach((sel, i) => {
      if (!opts.weak && !(sel instanceof Rule) && !sel.has('selector'))
        throw new Error('conditional @-rules may only contain selector Properties');

      sels += render(sel, opts) + (i !== rule.items.length-1 ? ' ' : '');
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
    rule.items.forEach((prop, i) => {
      if (!opts.weak && !(prop instanceof Property))
        throw new Error('selector Rules may only contain Properties');

      props += render(prop, opts) + (i !== rule.items.length-1 ? '; ' : '');
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
