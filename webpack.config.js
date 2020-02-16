const path = require('path');

module.exports = {
  entry: ['./src/app.js'],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs-module',
  },
  target: 'node',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules|app|dist/, loader: 'babel-loader' },
    ],
  },
};