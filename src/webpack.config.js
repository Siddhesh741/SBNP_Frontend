// webpack.config.js

const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "util": require.resolve("util/"),
      "crypto": require.resolve("crypto-browserify"),
      "url": require.resolve("url/")
    }
  }
};
