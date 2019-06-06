module.exports = ({ isWebapp }) =>
  isWebapp
    ? {}
    : {
        lodash: 'lodash',
      }
