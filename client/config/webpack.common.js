const webpack = require('webpack');
const commonPaths = require('./common-paths');
const {cssLoader, postcssLoader, scssLoader} = require('./postcss.config')();
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
  // target: 'node',
  context: commonPaths.contextPath,
  entry: {
    main: [
      './scripts/index',
      './styles/index'
    ]
  },
  output: {
    path: commonPaths.outputPath
  },
  resolve: {
    alias: {
      utils: commonPaths.utilsPath,
      styles: commonPaths.stylesPath
    },
    extensions: ['.js', '.css', '.scss']
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          cssLoader,
          postcssLoader,
          scssLoader
        ]
      },
      {
        test: /\.(jpe?g|\.png|gif|\.svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {limit: 10000, outputPath: commonPaths.outputPath}
          },
          {
            loader: 'image-webpack-loader',
            options: {bypassOnDebug: true}
          }
        ]
      },
      {
        test: /\.svg$/,
        use: 'raw-loader'
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', {
            calc: false,
            zindex: false
          }]
        }
      })
    ]
  },
  plugins: [
    new Dotenv({
      systemvars: true
    }),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      title: 'Winkel [POC] -- Commerce Management Tool',
      template: './index.html',
      inlineSource: 'runtime.+\\.js'
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[chunkhash:8].css',
      chunkFilename: 'styles/[id].css'
    })
  ]
};
