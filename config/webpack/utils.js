const EnvTarget = {
  development: './.env.development',
  staging: './.env.staging',
  production: './.env'
}

require('dotenv').config({
  path: EnvTarget[process.env.NODE_ENV],
});

const utils = {
  port: process.env.PORT || 3000,
  appName: process.env.APPLICATION_NAME || 'react_app',
  nodeEnv: process.env.NODE_ENV || 'development',
};

module.exports = utils;