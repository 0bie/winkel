const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  output: {
    filename: 'scripts/[name].[chunkhash:8].js'
  },
  devtool: 'source-map',
  optimization: {
    nodeEnv: 'production',
    usedExports: true,
    occurrenceOrder: true,
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
    new ManifestPlugin(),
    new MomentLocalesPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html|css)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
