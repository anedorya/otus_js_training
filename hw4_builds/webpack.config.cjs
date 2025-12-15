const path = require('path');
const HtmlWeppackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',  
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader', 
        options: {
          presets: ['@babel/preset-env']
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',        
      },
    ],
  },
  plugins: [
    new HtmlWeppackPlugin({ 
        template: './src/index.html',
        title: 'Текущее время в Санкт-Петербурге', filename: 'index.html' }),
  ],

  devServer: {
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
    static: path.resolve(__dirname, 'dist'),
    compress: true,
  },

}
