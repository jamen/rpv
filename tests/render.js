// jshint ignore: start
jest.autoMockOff();

const lib = require('../lib'),
      Value = lib.Value,
      Property = lib.Property,
      Rule = lib.Rule,
      render = lib.render;

describe('build function', () => {

  it('renders Values', () => {
    expect(
      render.value(Value(2, 'px'))
    ).toBe('2px');

    expect(
      render.value(Value('none'))
    ).toBe('none');

    expect(
      render.value(Value('rgb', [
        Value(0),
        Value(1),
        Value(2)
      ]))
    ).toBe('rgb(0, 1, 2)')

  });

});
