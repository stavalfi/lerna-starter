const path = require('path')

const packageDirectoryName = process.env.FOLDER

const currentPackageRootPath = path.resolve(__dirname, '..')
const configFolderPath = path.resolve(currentPackageRootPath, '.config')

module.exports = ({ packageJsonFolderPath }) => {
  console.log('packageJsonFolderPath: ', packageJsonFolderPath)
  const fixedPackageJsonFolderPath = packageJsonFolderPath.endsWith('lerna-starter')
    ? path.resolve(packageJsonFolderPath, 'packages', packageDirectoryName)
    : packageJsonFolderPath
  const rootPath = fixedPackageJsonFolderPath
  const webpackConfigPath = path.resolve(configFolderPath, 'webpack', 'webpack.config.js')
  const prodTsconfigPath = path.resolve(rootPath, 'prod-tsconfig.json')
  const linterTsconfigPath = path.resolve(fixedPackageJsonFolderPath, 'tsconfig.json')
  const mainNodeModulesPath = path.resolve(rootPath, '..', '..', 'node_modules')
  const srcPath = path.resolve(rootPath, 'src')
  const appEntryFilePath = path.resolve(srcPath, 'index.tsx')
  const distPath = path.join(rootPath, 'dist')
  const babelRcPath = path.join(configFolderPath, '.babelrc.js')
  const eslintRcPath = path.join(configFolderPath, '.eslintrc.js')
  const eslintIgnorePath = path.join(rootPath, '.eslintignore')
  const nodeModulesPath = path.resolve(rootPath, 'node_modules')
  const testsPath = path.resolve(rootPath, 'test')
  const indexHtmlPath = path.resolve(configFolderPath, 'webpack', 'index.html')

  const resolveModulesPathsArray = [srcPath, nodeModulesPath, mainNodeModulesPath]
  const resolveModulesPathsTestArray = [testsPath, srcPath, nodeModulesPath, mainNodeModulesPath]

  return {
    packageJsonFolderPath: fixedPackageJsonFolderPath,
    rootPath,
    webpackConfigPath,
    prodTsconfigPath,
    linterTsconfigPath,
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
    indexHtmlPath,
  }
}
