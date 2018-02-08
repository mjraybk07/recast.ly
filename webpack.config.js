const path = require('path');

module.exports = {
  context: __dirname,
  entry: './src/index.jsx',
  devtool: 'cheap-eval-source-map',
  output: {
    filename: 'bundle.js'
  },
  resolve: {  
    extensions: ['.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query:
          {
            presets:['react']
          }
      }
    ]
  }
};