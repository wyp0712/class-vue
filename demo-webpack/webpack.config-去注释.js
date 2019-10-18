const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  entry: path.join(__dirname, 'src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'boundle.[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i, // i 取消大小写敏感
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/images/'
            }
          }
        ]
      },
      {
        test: /\.(ttf|woff|woff2|eot|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/font/'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'img:data-src']
          }
        }
      },
    ]
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   jQuery: 'jQuery'
    // }),
    new HtmlWebpackPlugin({
      template: path.join('src', 'index.html'),
      filename: 'webpack.html',
      minify: {
        minimize: true, // 是否打包为最小值，
        removeAttributeQuotes: true, // 去除引号
        removeComments: true, // 去除注释
        collapseWhitespace: true, // 去除空格，
        minifyCSS: true, // 压缩html内的样式
        minifyJS: true, // 压缩html内的js
        removeEmptyElements: true, // 清理内容为空的元素
      },
      hash: true, // 引入产出资源时候，加上hash避免缓存
    }),
    new MiniCssExtractPlugin({
      filename: "./assets/css/[name].css"                     // 提取出来的css文件路径以及命名
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g, // 用于匹配需要优化或者压缩的资源名。默认值是 /.css$/g
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }]
      },
      canPrint: true
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8000,
    host: 'localhost',
    open: true,
  }
}

module.exports = config