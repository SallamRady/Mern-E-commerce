const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  // ...existing configurations

  plugins: [
    // ...existing plugins

    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
