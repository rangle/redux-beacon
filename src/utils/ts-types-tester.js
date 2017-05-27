const path = require('path');
const { check } = require('typings-tester');

function tsTypesTester(tsFiles) {
  describe('Typescript type definitions', () => {
    it('compiles successfully', () => {
      const tsConfigFile = path.join(__dirname, 'tsconfig.json');
      check(tsFiles, tsConfigFile);
    });
  });
}

module.exports = { tsTypesTester };
