const EnvTarget = {
  development: './.env.development',
  staging: './.env.staging',
  production: './.env'
}

require('dotenv').config({
  path: EnvTarget[process.env.NODE_ENV],
});

const devTool = {
  development: 'inline-source-map',
  staging: 'source-map',
  production: false
}

const utils = {
  port: process.env.PORT || 3000,
  appName: process.env.APPLICATION_NAME || 'react_app',
  nodeEnv: process.env.NODE_ENV || 'development',
  devTool: devTool[process.env.NODE_ENV] || false,
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

module.exports = utils;