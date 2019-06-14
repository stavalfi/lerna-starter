const path = require('path')
const _flatMap = require('lodash/flatMap')
const glob = require('glob')

const { isWebApp, packageDirectoryName, filesExt, testFilesExt } = require('./constants')

const currentPackageRootPath = path.resolve(__dirname, '..', '..')
const packagesPath = path.resolve(currentPackageRootPath, '..')
const configFolderPath = path.resolve(currentPackageRootPath, '.config')

const packageJsonFolderPath = path.resolve(packagesPath, packageDirectoryName)
const libTsconfigFilePath = path.resolve(configFolderPath, 'lib-tsconfig.json')
const linterTsconfigPath = path.resolve(packageJsonFolderPath, 'tsconfig.json')
const mainNodeModulesPath = path.resolve(packageJsonFolderPath, '..', '..', 'node_modules')
const srcPath = path.resolve(packageJsonFolderPath, 'src')
const appEntryFilePaths = [path.resolve(srcPath, isWebApp ? 'index.tsx' : 'index.ts')]
const distPath = path.join(packageJsonFolderPath, 'dist')
const babelRcPath = path.join(configFolderPath, 'babel.config.js')
const jestFolderPath = path.join(configFolderPath, 'jest')
const jestTransformerFilePath = path.join(jestFolderPath, 'jestPreprocess.js')
const jestConfigFilePath = path.join(jestFolderPath, 'jest.config.js')
const testPolyfillsFilePath = path.join(jestFolderPath, 'polyfills.js')
const eslintRcPath = path.join(configFolderPath, '.eslintrc.js')
const eslintIgnorePath = path.join(packageJsonFolderPath, '.eslintignore')
const nodeModulesPath = path.resolve(packageJsonFolderPath, 'node_modules')
const mainTestsFolderPath = path.resolve(packageJsonFolderPath, 'test')
const indexHtmlPath = path.resolve(configFolderPath, 'webpack', 'index.html')
const webpackFolderPath = path.resolve(configFolderPath, 'webpack')
const webpackConfigPath = path.resolve(webpackFolderPath, 'webpack.config.js')
const testPolyfillFilePath = path.resolve(mainTestsFolderPath, 'utils', 'import-polyfills.ts')

const resolveModulesPathsArray = [srcPath, mainTestsFolderPath, nodeModulesPath, mainNodeModulesPath]
const allTestsFolders = [srcPath, mainTestsFolderPath]
const allTestFilesPathsArray = _flatMap(allTestsFolders, testFolderPath =>
  glob.sync(`${testFolderPath}/**/*.${testFilesExt}.ts`, {}),
)

module.exports = {
  allTestFilesPathsArray,
  testPolyfillsFilePath,
  jestConfigFilePath,
  packagesPath,
  packageJsonFolderPath,
  libTsconfigFilePath,
  srcPath,
  babelRcPath,
  jestTransformerFilePath,
  nodeModulesPath,
  linterTsconfigPath,
  mainNodeModulesPath,
  eslintRcPath,
  eslintIgnorePath,
  distPath,
  appEntryFilePaths,
  resolveModulesPathsArray,
  mainTestsFolderPath,
  indexHtmlPath,
  webpackFolderPath,
  webpackConfigPath,
  allTestsFolders,
  testPolyfillFilePath,
}
