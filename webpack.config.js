var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {adacraft: './client/js/e_adacraft.js',
          schematic: './client/js/e_schematic.js'},
  output: {
    path: path.join(__dirname, 'static'),
    filename: '[name].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{ from: 'node_modules/blockly/media', to: 'blockly' }]),
  ],
  optimization: {
    minimize: false
  }
};

