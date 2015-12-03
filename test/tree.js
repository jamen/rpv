import test from 'ava';
import { Tree, Rule, Property, Value } from '../lib';

test('"tree" function', ({same, true: isTrue}) => {
  // Create uncirculated tree
  let prop = new Property('margin', [
    new Value(10, 'px'),
    new Value(2, 'em')
  ]),

  doc = [
    new Rule('.foo', [
      prop
    ]),

    new Rule('.bar', [
      new Property('margin', [
        new Value(5, 'px'),
        new Value(1, 'em')
      ])
    ])
  ];

  // Circulate tree
  doc = new Tree(doc);

  // Test parent link
  same(doc.children[0].children[0], prop);
});
