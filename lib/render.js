'use strict';

/* render.js
 * Render CSS from a tree.
 */

const Rule = require('./rule'),
      Property = require('./property'),
      Value = require('./value'),
      loop = Array.prototype.forEach;

module.exports = exports = render;

function render(tree, opts){
  opts = (typeof opts === 'object') ? opts : {indent: true, level:0};

  if (tree instanceof Rule) return render.rule(tree, opts);
  if (tree instanceof Property) return render.property(tree, opts);
  if (tree instanceof Value) return render.value(tree, opts);

  if (!Array.isArray(tree))
   throw new TypeError('tree must be an array.');

  let doc = [];
  tree.forEach((x) => {
    if (!(x instanceof Rule) && !opts.weak)
      throw new Error('a tree\'s root may only contain Rule objects');

    doc.push(render(x, opts));
  });


  return doc.join('');
}

render.value = function(value, opts){
  if (value.type === 'keyword') return value.keyword;
  else if (value.type === 'number') return value.val + value.unit;
  else if (value.type === 'function') {
    let args = '';
    value.args.forEach((arg, i) => {
      if (typeof arg === 'number') arg = new Value(arg);
      if (
        !opts.weak &&
        (!(arg instanceof Value) ||
        (arg.type !== 'number' &&
        arg.type !== 'keyword' &&
        arg.type === 'unknown'))
      ) throw new Error('function Values may only contain known non-function values as their arguments');

      args += arg.val + (value.args.length-1 !== i ? ', ' : '');
    });

    return value.name + '(' + args + ')';
  } else {
    if (!opts.weak)
      throw new Error('could not identify "'+value.val+'".');
    return value.val;
  }
};

render.property = function(property, opts){
  let values = [];
  loop.call(property.items, function(item){
    if (!(item instanceof Value) && !opts.weak)
      throw new Error('Property objects may only contain Value objects.');

    values.push(render(item, opts));
  });

  if (!(/^[a-z-]+$/.test(property.name)) && !opts.weak)
    throw new Error('property names may only be alpha and "-" characters.');

  return property.name + ':' + values.join(' ');
};

render.rule = function(rule, opts){
  if (rule.type === 'selector') {
    let selector = rule.selector;

    let block = '{' + (opts.indent ? '\n' : '');
    opts.level++;
    loop.call(rule.items, (prop, i) => {
      if (!(prop instanceof Property) && !opts.weak)
        throw new Error('selector rules may only contain properties');

      block += render(prop, opts) + (i !== rule.items.length-1 ? ';' : '');
    });
    opts.level--;
    block += '}';

    return selector + ' ' + block;
  }

  else if (rule.type === 'at-rule expressive') {
    let expression = [];
    loop.call(rule.expression, (item) => {
      if (typeof item === 'string') item = new Value(item);
      if (item instanceof Property) {
        expression.push('('+render(item, opts)+')');
      }
      else if (item instanceof Value && item.type === 'keyword') {
        expression.push(render(item, opts));
      }
      else
        if (!opts.weak)
          throw new Error('at-rule expressions may only contain keywords and properties');
    });

    let block = [];
    opts.level++;
    loop.call(rule.items, (item) => {
      if ((!(item instanceof Rule) || item.type !== 'selector') && !opts.weak)
        throw new Error('expressive at-rules may only contain selector rules');

      block.push(render(item, opts));
    });
    opts.level--;

    return rule.name +
    ' ' + expression.join(' ') +
    ' {' +
      block.join('') +
      '\n' +
    '}';
  }

  else if (rule.type === 'at-rule') {
    return rule.name + ' ' + rule.input.join(', ');
  }
};
