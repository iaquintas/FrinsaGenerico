module.exports = {
  entry: [
    './src/tarjetaDetalle.js'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /(\.css$)/,  
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  devServer: {
    contentBase: './build'
  }
};