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
      render(Value(2, 'px'))
    ).toBe('2px');

    expect(
      render(Value('none'))
    ).toBe('none');

    expect(
      render(Value('rgb', [
        Value(0),
        Value(1),
        Value(2)
      ]))
    ).toBe('rgb(0, 1, 2)')

    // Shorthand function
    expect(
      render(Value('rgba', [1, 2, 3, 0.4]))
    ).toBe('rgba(1, 2, 3, 0.4)')
  });


  it('renders Properties', () => {

  });

  it('renders Rules', () => {

  });

});
