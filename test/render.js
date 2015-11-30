import test from 'ava';
import { render, Rule, Property, Value } from '../lib';

test('"render" function', ({is}) => {

  // Init objects to render
  const
  numval = new Value(10, 'px'),
  keyval = new Value('prefix'),
  funval = new Value('url', [new Value('XML-namespace-URL')]),
  prop = new Property('margin', [
    new Value(2, 'em'),
    numval
  ]),
  selrule = new Rule('.test', [
    new Property('border', [
      new Value('1px'),
      new Value('solid'),
      new Value('rgba', [1, 2, 3, 0.5])
    ]),
    prop
  ]),
  nocoatrule = new Rule('@namespace', [
    keyval,
    funval
  ]),
  coatrule = new Rule('@media', [
    new Property('max-width', [ new Value(600, 'px') ]),
    'and',
    new Property('min-width', [ new Value(200, 'px') ])
  ], [
    selrule
  ]);

  // Render numval
  is(render(numval), '10px');

  // Render keyval
  is(render(keyval), 'prefix');

  // render funval
  is(render(funval), 'url(XML-namespace-URL)');

  // Render prop
  is(render(prop), 'margin:2em 10px');

  // Render selrule
  is(render(selrule), '.test {border:1px solid rgba(1, 2, 3, 0.5); margin:2em 10px}');

  // Render nocoatrule
  is(render(nocoatrule), '@namespace prefix url(XML-namespace-URL)');

  // Render coatrule
  is(render(coatrule), '@media (max-width:600px) and (min-width:200px) {.test {border:1px solid rgba(1, 2, 3, 0.5); margin:2em 10px}}');

});
