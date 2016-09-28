module.exports = {
  entry: './public/js/chat.js',
  target: "web",
  output: {
    path: './bin',
    filename: 'app.bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      include: [
        "./public/js_es6"
      ],
      loader: 'babel-loader',
    }]
  }
}
