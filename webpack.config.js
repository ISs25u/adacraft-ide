module.exports = {
  entry: "./client/js/entry.js",
  output: {
    path: __dirname,
    filename: "./static/js/bundle.js",
    pathinfo: (process.env.NODE_ENV !== 'production'),
  },
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
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
