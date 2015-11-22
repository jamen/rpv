// jshint ignore: start
'use strict';
jest.autoMockOff();

describe('Property object', function(){
  const Property = require('../lib/property'),
        Value = require('../lib/value');

  let foo = new Property('x-test', [
    new Value(0),
    new Value(1, 'px')
  ]);

  it('holds values', () => {
    expect(
      foo.items[0]
    ).toEqual(new Value(0));
  });

  it('adds values', () => {
    foo.add(new Value(1, 'em'));
    expect(
      foo.items[2]
    ).toEqual(new Value(1, 'em'))
  });

  it('removes values', () => {
    foo.remove(0);
    expect(
      foo.items[0]
    ).toEqual(new Value(1, 'px'));
  });

  it('sets values', () => {
    foo.set(1, new Value(1, 'px'));
    expect(
      foo.items[1]
    ).toEqual(new Value(1, 'px'));
  });
});
