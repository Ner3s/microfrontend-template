const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const { merge } = require('webpack-merge');
const common = require('../webpack.common');
const utils = require("./webpack/utils");
const deps = require('../package.json').dependencies;

const remotes = require('./webpack/mfe/remotes');
const exposes = require('./webpack/mfe/exposes');

module.exports = merge(common, {
  plugins: [
    new ModuleFederationPlugin({
      name: utils.appName,
      filename: 'remoteEntry.js',
      remotes,
      exposes,
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
  ]
});

