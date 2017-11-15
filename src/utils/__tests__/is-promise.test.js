import isPromise from '../is-promise';

[
  ['hello', false],
  [{ event: 'something' }, false],
  [{}, false],
  [{ then: 'something happened' }, false],
  [Promise.resolve({}), true],
  [new Promise(resolve => resolve()), true],
].forEach(([value, expectedResult], index) => {
  test(`Scenario #${index}`, () => {
    expect(isPromise(value)).toBe(expectedResult);
  });
});
