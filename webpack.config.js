var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
  entry: './client/js/entry.js',
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    pathinfo: (process.env.NODE_ENV !== 'production'),
    publicPath: '/static/'
  },
  plugins: [
    new CopyWebpackPlugin([{ from: 'node_modules/blockly/media', to: 'blockly' }]),
  ],
  module: {
    rules: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
    ]
  },
};
