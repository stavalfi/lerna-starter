const stringToBoolean = require('boolean')

const isWebApp = stringToBoolean(process.env.WEBAPP || process.env['WEBAPP'])
const isCI = stringToBoolean(process.env.CI || process.env['CI'])
const packageDirectoryName = process.env.FOLDER || process.env['FOLDER']

module.exports = {
  isWebApp,
  packageDirectoryName,
  isCI,
  devServerPort: 8002,
  devServerHost: 'localhost',
  devServerHttpProtocol: true,
}
