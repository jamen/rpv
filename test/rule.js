import test from 'ava';
import { render, Rule, Property, Value } from '../lib';

test('"Rule" object', ({is, true: isTrue}) => {
  let
  selrule = new Rule('.foo', [
    new Property('margin', [
      new Value(10, 'px'),
      new Value(2, 'em')
    ])
  ]),

  corule = new Rule('@media', [
    new Property('max-width', [ new Value(600, 'px') ]),
    'and',
    new Property('min-width', [ new Value(200, 'px') ])
  ], [
    selrule
  ]),

  nocorule = new Rule('@import', [ new Value('url', [ 'http://example.com/foo.css' ]) ]);

  // Test tags
  selrule.set('foo-bar');
  isTrue(selrule.has('foo-bar'));


  // Render of selrule
  is(render(selrule), '.foo {margin:10px 2em}');

  // Render of corule
  is(render(corule), '@media (max-width:600px) and (min-width:200px) {.foo {margin:10px 2em}}');

  // Render of nocorule
  is(render(nocorule), '@import url(http://example.com/foo.css)');


});
