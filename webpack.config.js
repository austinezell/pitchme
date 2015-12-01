module.exports = {
  entry: "./src/js/main.jsx",
  output: {
    path: __dirname + '/public/dist/',
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules\/|bower_components\/)/,
      loader: 'babel?presets[]=es2015'
    }]
  }
};
