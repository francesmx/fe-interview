import type { Config } from '@jest/types';
import '@testing-library/jest-dom';
const { defaults } = require('jest-config');

const config: Config.InitialOptions = {
  verbose: true,
};
export default config;

module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  setupFilesAfterEnv: ['<rootDir>/src/setUpTests.ts'],
};
