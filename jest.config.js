// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ['node_modules'],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },

  roots: ['<rootDir>'],

  modulePaths: ['<rootDir>', 'node_modules'],

  moduleDirectories: ['node_modules'],

  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1',
  },
};
