const { paths, constants } = require('../utils')

const {
  resolveModulesPathsArray,
  mainTestsFolderPath,
  testPolyfillsFilePath,
  srcPath,
  linterTsconfigPath,
  babelRcPath,
} = paths

const { isCI } = constants

module.exports = {
  ...(isCI && { maxConcurrency: 1 }),
  projects: [
    {
      displayName: 'lint',
      runner: 'jest-runner-eslint',
      testRegex: [`./*.spec.js$`, `./*.spec.ts$`],
      roots: [mainTestsFolderPath, srcPath],
    },
    {
      displayName: 'test',
      preset: 'ts-jest/presets/js-with-ts',
      testEnvironment: 'node',
      modulePaths: resolveModulesPathsArray,
      testRegex: [`./*.spec.js$`, `./*.spec.ts$`],
      roots: [mainTestsFolderPath, srcPath],
      testPathIgnorePatterns: [`coverage`, 'node_modules'],
      setupFiles: [testPolyfillsFilePath],
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
      collectCoverageFrom: [`${srcPath}/*.{ts,tsx,js,jsx,json}`],
      globals: {
        'ts-jest': {
          tsConfig: linterTsconfigPath,
          babelConfig: require(babelRcPath),
        },
      },
    },
  ],
}
