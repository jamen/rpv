import test from 'ava';
import { search, Tree, Rule, Property, Value } from '../lib';

test('"search" function', ({same}) => {
  // Create uncirculated tree
  let prop = new Property('margin', [
    new Value(10, 'px'),
    new Value(2, 'em')
  ]),

  doc = new Tree([
    new Rule('.foo', [
      prop
    ]),

    new Rule('.bar', [
      new Property('margin', [
        new Value(5, 'px'),
        new Value(1, 'em')
      ])
    ])
  ]);

  // Set a tag to search
  prop.set('foo-bar');

  // Search tag
  let [result] = search(doc, [ 'foo-bar' ]);

  // See if it selected the right one.
  same(result, prop);
});
