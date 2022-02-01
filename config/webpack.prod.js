const path = require("path");

const { merge } = require('webpack-merge');
const common = require('../webpack.common');
const utils = require("./webpack/utils");

module.exports = merge(common, {
  mode: 'production',
});
