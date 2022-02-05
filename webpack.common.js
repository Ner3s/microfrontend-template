const webpack = require("webpack");
const { ProvidePlugin } = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const path = require("path");
const dotenv = require("dotenv");
const utils = require("./config/webpack/utils");
const env = dotenv.config({ path: utils.envTarget }).parsed;

module.exports = {
  entry: path.join(__dirname, "src"),

  output: {
    publicPath: `http://localhost:${utils.port}/`,
    path: path.resolve(__dirname, "build"),
    filename:
      utils.nodeEnv === "production"
        ? "static/js/[name].[contenthash:8].js"
        : "static/js/bundle.js",
    chunkFilename:
      utils.nodeEnv === "production"
        ? "static/js/[name].[contenthash:8].chunk.js"
        : "static/js/[name].chunk.js",
    assetModuleFilename: "static/media/[name].[hash][ext]",
    clean: true,
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },

  devServer: {
    port: utils.port,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
    },
    compress: true,
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          keep_classnames: utils.isProduction,
          keep_fnames: utils.isProduction,
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },

  mode: "development",
  stats: utils.isDevelopment ? "errors-warnings" : true,
  devtool: utils.devTool,

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
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: path.resolve(__dirname, "src"),
        loader: "babel-loader",
        options: {
          presets: [[require.resolve("@babel/preset-react")]],
          plugins: [
            utils.isDevelopment && require.resolve("react-refresh/babel"),
          ].filter(Boolean),
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /favicon\.ico$/,
        type: "asset/resource",
        generator: {
          filename: "[name][ext]",
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: path.join(__dirname, "public", "index.html"),
          title: utils.appName,
          favicon: path.resolve("public", "favicon.ico"),
        },
        utils.isEnvProduction
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : undefined
      )
    ),

    new webpack.DefinePlugin({
      "process.env": JSON.stringify(env),
    }),

    new ProvidePlugin({
      React: "react",
    }),

    utils.isDevelopment && new ForkTsCheckerWebpackPlugin(),
    utils.isDevelopment && new webpack.HotModuleReplacementPlugin(),
    utils.isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
};
