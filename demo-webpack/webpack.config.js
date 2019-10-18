const path = require('path')
const webpack = require('webpack')
// 生成一个HTML文件，根据指定的index.html模板生成对应的html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 分离css单独打包 webpack 4;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 清除之前打包的旧文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 引入数据
const canrouselData = require('./src/mock/canrousel.json')

console.log(process.env.NODE_ENV, 'process.env.NODE_ENV')
const config = {
  /**
   * @param [entry] 入口文件路径配置 
  */
  mode: 'development', // production
  entry: path.join(__dirname, 'src/main.js'),
  /**
   * @param [output] 出口文件路径配置 
   * @param [filename] 别名
  */
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'boundle.[hash].js'
  },
  /**
   * @param [rules]规则Array，每一个规则就是一个对象{}
   * @param [test]:用于标识应该被对应的loader进行转换的某个或者某些文件
   * @param [use]:表示进行转换时候，应该使用哪个loader
   */
  module: {
    rules: [
      /**
       * @loader 当前loader作用： [引入css]
       * @node_moudle 需要下载的包：[style-loader,css-loader]
       * @param [style-loader] 将JS字符串生成为style节点
       * @param [css-loader] 将CSS转化成 CommonJS 模块
       */
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader']
      // },
      /**
      * @loader [引入scss] 有个这个就不需要上一个loader去单独转义css了
      * @node_moudle [sass-loader,node-sass]
      * @param [sass-loader] :将scss转css
      * @param [css-loader] :将css转化为CommonJs模块
      * @param [style-loader] :将js字符串生产为style节点 
      * @param [MiniCssExtractPlugin] 用于生产环境
      **/
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      /**
       * @param [处理图片]
       * @node_module [file-loader]
       * [context]:配置自定义文件的上下文，默认为 webpack.config.js
       * [name]:为你的文件配置自定义文件名模板(默认值[hash].[ext])
       * [path]:资源相对于 context的路径
       * [ext]:资源扩展名
       * [hash]:内容的哈希值
       * [publicPath]:为你的文件配置自定义 public 发布目录
       * [outputPath]:为你的文件配置自定义 output 输出目录
       */
      {
        test: /\.(png|jpe?g|gif)$/i, // i 取消大小写敏感
        // use: 'file-loader'
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/images/'
              // name: '[path][name].[ext]',
            }
          }
        ]
      },
      /**
       * @param [处理字体图标]
       * @node_module [file-loader]
       * @fun [在main.js中引入iconfont.css,在index.html中使用字体图标]
       * 
       */
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
      /**
       * @param [es6代码转换]
       * @node_module [babel-loader]
       * @node_module [@babel/core]
       * @node_module [@babel/preset-env]
       * @param [exclude:表示不在指定目录查找相关文件]
       **/
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     "presets": ["@babel/preset-env"]
        //   }
        // }
      },

      /**
       * @param [处理dom中的图片<img>]
       * @node_module [html-loader]
       */
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
  // 添加别名
  // resolve: {
  // alias: {
  // $也可以将尾随添加到给定对象的键中以表示完全匹配：
  //   xyz$: path.resolve(__dirname, 'path/to/file.js')
  // }
  // },
  plugins: [
    // new webpack.ProvidePlugin({
    //   jQuery: 'jQuery'
    // }),
    /** 
     * @param [HtmlWebpackPlugin会自动为你生成一个HTML文件，根据指定的index.html模板生成对应的html文件]
     * 根据src下的index.html自动在打包后的目录下生成html文件，相关引用关系和文件路径都会按照正确的配置被添加进 生成的html里
    */
    new HtmlWebpackPlugin({
      template: path.join('src', 'index.html'),
      // filename: 'webpack.html',
      // minify: {
      //   minimize: true, // 是否打包为最小值，
      //   removeAttributeQuotes: true, // 去除引号
      //   removeComments: true, // 去除注释
      //   collapseWhitespace: true, // 去除空格，
      //   minifyCSS: true, // 压缩html内的样式
      //   minifyJS: true, // 压缩html内的js
      //   removeEmptyElements: true, // 清理内容为空的元素
      // },
      // hash: true, // 引入产出资源时候，加上hash避免缓存
    }),
    new MiniCssExtractPlugin({
      filename: "./assets/css/[name].css" // 提取出来的css文件路径以及命名
    }),
    new OptimizeCSSAssetsPlugin({
      // assetNameRegExp: /\.css$/g, // 用于匹配需要优化或者压缩的资源名。默认值是 /.css$/g
      // cssProcessor: require('cssnano'),
      // cssProcessorPluginOptions: {
      //   preset: ['default', { discardComments: { removeAll: true } }]
      // },
      // canPrint: true
    }),
    // new CleanWebpackPlugin()
  ],
  /**
   * @param [服务模块]
   * @node_module [webpack-dev-server]
   */
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8000,
    host: 'localhost',
    open: true,
    before: function(app, server) {
      // 轮播图接口
      app.get('/getCanrouselist', (req, res) => {
        res.json(canrouselData)
      })
    }
  }
}

module.exports = config