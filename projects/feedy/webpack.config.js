const webpack = require('webpack');

module.exports = {
  entry: ['./src/main.jsx',],
  output: {
    path: __dirname + '/dist',
    filename: 'main.js',
  },
  resolve: {
    root: __dirname,
    modulesDirectories: [
      './src',
      'node_modules',
      'common', // common for itself and children in any depth
    ],
    extensions: ['', '.js', '.json', '.jsx', ],
  },
  noInfo: true,
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-0', 'react',],
      },
    }, {
      test: /\.scss$/,
      loaders: ["style", "css", "sass",],
    },],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
  ],
  sassLoader: {
    includePaths: [__dirname + '/src',],
  },
};
