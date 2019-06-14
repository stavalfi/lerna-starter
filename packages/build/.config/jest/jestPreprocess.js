const { paths } = require('../utils')

const { babelRcPath } = paths
const babelConfig = require(babelRcPath)

module.exports = require('babel-jest').createTransformer(babelConfig)
