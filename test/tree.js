import test from 'ava';
import { tree, Rule, Property, Value } from '../lib';

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
  doc = tree(doc);

  // Test that tree is circulated
  isTrue(doc.circulated);

  // Test parent link
  same(doc[0].items[0], prop);
});
