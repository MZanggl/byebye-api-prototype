module.exports = {
  entry: './frontend/main.js',
  output: {
    path: require('path').resolve(__dirname, 'public/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /actions/,
        use: {
          loader: './magicLoader',
          options: {
            name: "[name]",
            path: "[path]"
          }
        }
      }
    ]
  }
};