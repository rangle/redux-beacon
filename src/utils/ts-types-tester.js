import path from 'path';
import { check } from 'typings-tester';

function tsTypesTester(tsFiles) {
  describe('Typescript type definitions', () => {
    it('compiles successfully', () => {
      const tsConfigFile = path.join(__dirname, 'tsconfig.json');
      check(tsFiles, tsConfigFile);
    });
  });
}

export default tsTypesTester;
