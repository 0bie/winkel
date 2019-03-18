module.exports = {
  devtool: 'eval-source-map',
  output: {
    publicPath: '/',
    filename: 'scripts/[name].bundle.js'
  },
  devServer: {
    historyApiFallback: true
  }
};
