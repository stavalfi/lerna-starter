const path = require('path')

const currentPackageRootPath = path.resolve(__dirname, '..')
const configFolderPath = path.resolve(currentPackageRootPath, '.config')

module.exports = ({ packageJsonFolderPath }) => {
  const rootPath = packageJsonFolderPath
  const webpackConfigPath = path.resolve(configFolderPath, 'webpack', 'webpack.config.js')
  const prodTsconfigPath = path.resolve(rootPath, 'prod-tsconfig.json')
  const mainNodeModulesPath = path.resolve(rootPath, '..', '..', 'node_modules')
  const srcPath = path.resolve(rootPath, 'src')
  const appEntryFilePath = path.resolve(srcPath, 'index.ts')
  const distPath = path.join(rootPath, 'dist')
  const babelRcPath = path.join(configFolderPath, '.babelrc.js')
  const eslintRcPath = path.join(configFolderPath, '.eslintrc.js')
  const eslintIgnorePath = path.join(rootPath, '.eslintignore')
  const nodeModulesPath = path.resolve(rootPath, 'node_modules')
  const testsPath = path.resolve(rootPath, 'test')

  const resolveModulesPathsArray = [srcPath, nodeModulesPath, mainNodeModulesPath]
  const resolveModulesPathsTestArray = [testsPath, srcPath, nodeModulesPath, mainNodeModulesPath]

  return {
    rootPath,
    webpackConfigPath,
    prodTsconfigPath,
    srcPath,
    babelRcPath,
    nodeModulesPath,
    mainNodeModulesPath,
    eslintRcPath,
    eslintIgnorePath,
    distPath,
    appEntryFilePath,
    resolveModulesPathsArray,
    resolveModulesPathsTestArray,
    testsPath,
  }
}
