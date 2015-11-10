module.exports = {
  entry: ['./src/main.jsx'],
  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
  },
  resolve: {
    root: __dirname,
    modulesDirectories: [
      '.',
      './src',
    ]
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    }]
  },
  sassLoader: {
    includePaths: [__dirname + '/src']
  }
};
