var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
  entry: "./client/js/entry.js",
  output: {
    path: path.join(__dirname, 'static'),
    filename: "js/bundle.js",
    pathinfo: (process.env.NODE_ENV !== 'production'),
  },
  plugins: [
    new CopyWebpackPlugin([{ from: 'node_modules/blockly/media', to: 'blockly' }]),
  ],
  module: {
    rules: [
      { test: /\.css$/, loader: "style-loader!css-loader" },

      // Fix the mess in droplet-editor
      { test: /quadtree\.js$/, loader: "exports-loader?QUAD" },
      { test: /\.coffee$/, loader: "coffee-loader" },
      { test: [/droplet-editor\/src\/languages\/.*\.coffee$/, /\/sax\//],
        exclude: /droplet-editor\/src\/languages\/javascript.coffee$/,
        enforce: 'post',
        loader: "null-loader" },
    ]
  },
};
