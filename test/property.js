import test from 'ava';
import { render, Property, Value } from '../lib';

test('"Property" object', ({is, true: isTrue}) => {
  let prop = new Property('margin', [
    new Value(10, 'px'),
    new Value(1.5, 'em')
  ]);

  // Add tag
  prop.set('foo-bar');

  // Check tag
  isTrue(prop.has('foo-bar'));

  // Render output
  is(render(prop), 'margin:10px 1.5em');
});
