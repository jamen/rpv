import test from 'ava';
import { Value } from '../lib';

test('"Value" object', ({same, true: isTrue}) => {
  let numeric = new Value(0, 'px');
  let keyword = new Value('none');

  // Test numeric operation
  same(numeric.plus(5, 'px'), new Value(5, 'px'));

  // Test numeric operation on falsey keyword
  isTrue(numeric.equals(keyword));

  // Test tagging
  numeric.set('foo-bar');
  isTrue(numeric.has('foo-bar'));
});
