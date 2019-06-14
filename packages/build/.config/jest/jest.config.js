const { paths } = require('../utils')

const { resolveModulesPathsArray, mainTestsFolderPath, jestTransformerFilePath, testPolyfillsFilePath, srcPath } = paths
module.exports = {
  testEnvironment: 'node',
  modulePaths: resolveModulesPathsArray,
  testRegex: [`./*.spec.js$`, `./*.spec.ts$`],
  roots: [mainTestsFolderPath, srcPath],
  transform: { '^.+\\.js$': jestTransformerFilePath, '^.+\\.ts$': jestTransformerFilePath },
  testPathIgnorePatterns: [`coverage`, 'node_modules'],
  setupFiles: [testPolyfillsFilePath],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [`${srcPath}/*.{ts,tsx,js,jsx,json}`],
}
