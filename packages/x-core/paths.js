const path = require('path')

const rootPath = path.resolve(__dirname)

module.exports = {
  rootPath,
  srcPath: path.resolve(rootPath, 'src'),
  componentsPath: path.resolve(rootPath, 'src', 'components'),
  nodeModulesPath: path.resolve(rootPath, 'node_modules'),
  mainNodeModulesPath: path.resolve(rootPath, '..', '..', 'node_modules'),
  eslintRcPath: path.join(rootPath, '.eslintrc'),
  distPath: path.join(rootPath, 'dist'),
  appEntryFilePath: path.resolve(rootPath, 'src', 'index.ts'),
}
