// jshint ignore: start
'use strict';
jest.autoMockOff();

const Value = require('../lib/value');

describe('Value object', () => {
  it('holds number values', () => {
    // getting value
    expect(
      (new Value(10, 'px')).val
    ).toBe(10);

    // getting type
    expect(
      new Value(10, 'px').type
    ).toBe('number');

    // getting name / unit.
    expect(
      new Value(10, 'px').unit
    ).toBe('px');

    expect(
      new Value(10).val
    ).toBe(10);
  });

  it('holds keyword values', () => {
    expect(
      new Value('none').val
    ).toBe('none');
  });

  it('holds function values', () => {
    expect(
      new Value('foo', [ new Value(1, 'px') ]).val
    ).toEqual([ new Value(1, 'px') ]);

    expect(
      new Value('foo', []).val
    ).toEqual([]);
  });
});
