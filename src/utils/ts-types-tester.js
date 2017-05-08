const tt = require('typescript-definition-tester');

function tsTypesTester(dir) {
  describe('Typescript type definitions', () => {
    it('compiles successfully', (done) => {
      const isTSFile = fileName => fileName.match(/\.ts$/);
      tt.compileDirectory(dir, isTSFile, () => done());
    });
  });
}

module.exports = { tsTypesTester };
