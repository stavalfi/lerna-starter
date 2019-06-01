const { eslintRcPath } = require('./paths')

module.exports = {
  linters: {
    '*.{js,jsx,ts,tsx,json,d.ts}': [`eslint --config ${eslintRcPath} --fix`, 'git add'],
    '*': [`prettier --write`, 'git add'],
  },
}
