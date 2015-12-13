const webpack = require('webpack');
const path = require('path');

const LiveReloadPlugin = require('webpack-livereload-plugin');

const PATHS = {
  dist: path.resolve(__dirname, 'dist'),
  src: path.resolve(__dirname, 'src'),
};

const isWatching = process.argv[2] === '-w';
const plugins = [];
var devtool;

if (isWatching) {
  devtool = 'source-map';
  plugins.push(new LiveReloadPlugin());
} else {
  devtool = 'eval';
  plugins.push(new webpack.optimize.OccurenceOrderPlugin());
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {
      warnings: false,
    },
  }));
}

module.exports = {
  entry: ['./src/main.jsx'],
  output: {
    path: PATHS.dist,
    filename: 'main.js',
  },
  resolve: {
    root: __dirname,
    modulesDirectories: [
      './src',
      'node_modules',
      'common', // common for itself and children in any depth
    ],
    extensions: ['', '.js', '.json', '.jsx'],
  },
  noInfo: true,
  devtool: devtool,
  parser: "babel-eslint",
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-0', 'react'],
        plugins: ['transform-decorators-legacy'],
      },
    }, {
      test: /\.json$/,
      loaders: ["json"],
    }, {
      test: /\.css$/,
      loaders: ["style", "css"],
    }, {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"],
    }],
  },
  plugins: plugins,
  sassLoader: {
    includePaths: [
      PATHS.src,
      path.resolve(PATHS.src, 'app', 'common'),
      path.resolve(__dirname, 'node_modules', 'compass-mixins', 'lib'),
    ],
  },
};
