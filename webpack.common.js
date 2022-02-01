const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const utils = require('./config/webpack/utils');

module.exports = {
  entry: path.join(__dirname, "src", "index.tsx"),

  output: {
    publicPath: `http://localhost:${utils.port}/`,
    path: path.resolve(__dirname, "build"),
    filename: utils.nodeEnv === 'production'
        ? 'static/js/[name].[contenthash:8].js'
        : 'static/js/bundle.js',
    chunkFilename: utils.nodeEnv === 'production'
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : 'static/js/[name].chunk.js',
    assetModuleFilename: 'static/media/[name].[hash][ext]',
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    alias: {
      '~': path.resolve(__dirname, './src'),
    }
  },

  mode: "development",

  devServer: {
    port: utils.port,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: path.resolve(__dirname, "src"),
        loader: "babel-loader",
        options: {
          presets: [[require.resolve("@babel/preset-react")]],
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
};
