import test from 'ava';
import { create } from '../lib';

test('"create" function', ({is, true: isTrue}) => {
  // Create object.
  let Test = create(function(a){
    this.a = a;
  }, {
    foo: function(a){ this.a = a; }
  });

  // Initialize object.
  let foo = new Test('baz');

  // Check construction value.
  is(foo.a, 'baz');

  // Change value
  foo.foo('qux'); // Haha, foofoo

  // Test new value
  is(foo.a, 'qux');

  // Construction without "new"
  // jshint newcap: false
  let bar = Test('qux');
  isTrue(bar instanceof Test);
});
