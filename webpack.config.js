var webpack = require("webpack");
var glob = require("glob");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var ManifestPlugin = require("webpack-manifest-plugin");
var PROD = process.env.NODE_ENV || "development";
var CleanWebpackPlugin = require("clean-webpack-plugin");
var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var entries = {
  index: [
    'babel-polyfill',
    './assets/src/index.js'
  ],
}

module.exports = {
  mode: 'development',
  entry: entries,
  output: {
    filename: "[name].[contenthash].js",
    path: `${__dirname}/public/assets`
  },
  resolve: {
    modules: [
      path.resolve('./assets/src'),
      'node_modules'
    ],
  },
  plugins: [
    new CleanWebpackPlugin([
      "public/assets"
    ], {
      verbose: false,
    }),
    new CopyWebpackPlugin(
      [{
        from: "./assets",
        to: ""
      }], {
        copyUnmodified: true,
        ignore: ["**/*.css", "**/*.js"]
      }
    ),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new ManifestPlugin({
      fileName: "manifest.json"
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: "babel-loader",
      exclude: /node_modules/
    },
    {
      test: /\.module\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: "css-loader",
          query: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        }
      ]
    },
    {
      test: /^(?!.*\.module\.css$).*\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: "css-loader",
        }
      ]
    },
    {
      test: /\.(png|jpg|gif)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      ]
    },
    {
      test: /\.svg$/,
      loader: 'svg-inline-loader'
    }
    ]
  }
};

if (PROD != "development") {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  );
}
