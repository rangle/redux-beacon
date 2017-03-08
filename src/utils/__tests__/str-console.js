const { makeStrConsole } = require('../str-console');

let strConsole;

beforeEach(() => {
  strConsole = makeStrConsole();
});

describe('logging a single message', () => {
  it('produces the correct output', () => {
    strConsole.log('hello');
    const output = strConsole.getOutput();
    expect(output).toEqual('hello');
  });
});

describe('logging multiple messages', () => {
  it('produces the correct output', () => {
    strConsole.log('hello', 'world');
    const output = strConsole.getOutput();
    expect(output).toEqual('hello world');
  });
});

describe('multiple logs', () => {
  it('produces the correct output', () => {
    strConsole.log('hello');
    strConsole.log('world');
    const output = strConsole.getOutput();
    expect(output).toEqual('hello\nworld');
  });
});

describe('multiple logs and multiple messages', () => {
  it('produces the correct output', () => {
    strConsole.log('hello');
    strConsole.log('world', 'what', 'is', 'up');
    const output = strConsole.getOutput();
    expect(output).toEqual('hello\nworld what is up');
  });
});

describe('logging an object', () => {
  it('produces the correct output', () => {
    strConsole.log({ hello: 'world' });
    const output = strConsole.getOutput();
    expect(output).toEqual('{"hello":"world"}');
  });
});

describe('calling group', () => {
  it('produces the correct output', () => {
    strConsole.group('some group title');
    const output = strConsole.getOutput();
    expect(output).toEqual('some group title');
  });
});

describe('calling group followed by multiple logs and a groupEnd', () => {
  it('produces the correct output', () => {
    strConsole.log('before group');
    strConsole.group('title');
    strConsole.log('hello');
    strConsole.log('world');
    strConsole.groupEnd();
    strConsole.log('after group');
    const output = strConsole.getOutput();
    expect(output).toEqual(
      'before group\ntitle\n  hello\n  world\nafter group'
    );
  });
});
