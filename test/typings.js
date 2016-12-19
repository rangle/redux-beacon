const tt = require('typescript-definition-tester');

describe('Typescript definitions', () => {
  it('Compiles against index.d.ts', (done) => {
    tt.compileDirectory(
      `${__dirname}/typescript`,
      fileName => fileName.match(/\.ts$/),
      () => done()
    );
  });
});
