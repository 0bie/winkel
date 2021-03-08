const webpack = require('webpack');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  output: {
    filename: 'scripts/[name].[chunkhash:8].js'
  },
  devtool: 'source-map',
  optimization: {
    nodeEnv: 'production',
    usedExports: true,
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          name: 'vendor',
          test: /react|date-fns|chart|moment|pattern-lib-react/,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new WebpackManifestPlugin(),
    new MomentLocalesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
