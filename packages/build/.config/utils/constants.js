const envVariables = require('./env-variables')

const mainProjectDirName = 'lerna-starter'
const packagesDirName = 'packages'

const filesExt = ['ts', 'tsx', 'js', 'jsx']
const testFilesExt = 'spec'

module.exports = {
  mainProjectDirName,
  packagesDirName,
  devServerPort: 8002,
  devServerHost: 'localhost',
  devServerHttpProtocol: true,
  filesExt,
  testFilesExt,
  ...envVariables,
}
