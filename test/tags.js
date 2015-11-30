import test from 'ava';
import { create } from '../lib';


test('"create" tagging system', ({true: isTrue}) => {
  let Test = create(() => {}, {}),
      foo = new Test();

  // Set tag
  foo.set('foo-bar');

  // Check tag
  isTrue(foo.has('foo-bar'));
});
