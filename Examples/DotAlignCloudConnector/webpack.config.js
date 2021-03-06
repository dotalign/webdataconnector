const path = require('path');

module.exports = {
  entry: {
    oauth_flow: './src/tableau/oauth_flow.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
};