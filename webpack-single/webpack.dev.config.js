const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
/*
  chunk就是模块。chunkhash也就是根据模块内容计算出的hash值。
  hash 是项目整体 每次编译  任何地方改变  都会改变的。 修改一处  处处相同. 
  chunkhash 是  对应每个文件的内容 改变， 才会改变。 修改一处  只变一处。
    （css 除外   webpack将style视为js的一部分 计算chunkhash 的时候 会把css 和 js 当成一个文件。 所以修改js  ， css和js的 chunkhash 都会改变  ）
      (webpack 1.0 的时候， chunkhash 修改js or 修改 css  都会改变 需要引入（webpack-md5-hash 解决这个问题）， 2.0 修改了 chunkhash的计算方式， 只有修改js 才会都改变。 修改css 不会 ）
  contenthash   代表的是文本文件内容的hash值

  loaders : 资源  img css url-loader  style-loader 和 css-hot-loader
  plugins : ExtractTextPlugin CopyWebpackPlugin  HtmlWebpackPlugin CleanWebpackPlugin
  resolve :  extensions  alias
 */


module.exports = {
  entry: {
    vendor : ['babel-polyfill','./src/lib/autosize.js'],
    main : ['./src/main.js']
  },
  output: {
    path: path.resolve(__dirname, './www'), //输出目录
    publicPath: '', //静态资源的 路径  用于设置cnd等信息
    filename: 'js/[name].js', //用于缓存
    chunkFilename : 'js/chunk/[name].js'
  },
  module: {
    rules: [
      //vue 使用的loader
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss : 
                // [
                // 'vue-style-loader',
                // 'css-loader',
                // 'postcss-loader',
                // 'sass-loader'
                // ],
                ExtractTextPlugin.extract({
                  use: ['css-loader','postcss-loader','sass-loader'],
                  fallback: 'vue-style-loader'
                }),
            sass :
                // [
                // 'vue-style-loader',
                // 'css-loader',
                // 'postcss-loader',
                // 'sass-loader?indentedSyntax'
                // ],
                ExtractTextPlugin.extract({
                  use: ['css-loader','postcss-loader','sass-loader?indentedSyntax'],
                  fallback: 'vue-style-loader'
                }),
            //可以这里配置css 也可以配置 下面的  extractCSS: true
            css : 
                // [
                // 'vue-style-loader',
                // 'css-loader',
                // 'postcss-loader'
                // ]
                 ExtractTextPlugin.extract({
                  use: 'css-loader',
                  fallback: 'vue-style-loader'
                })
          },
          extractCSS: true
          // other vue-loader options go here
        }
      },
      //css 文件 使用的loader use : 从右向左以此 使用 . 最后使用style-loader  在页面添加 style 标签 
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
        // ExtractTextPlugin.extract({
        //   fallback: "style-loader",
        //   use: ['css-loader','postcss-loader']
        // })
      },
      //scss 文件 使用的loader  
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
        // ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: ['css-loader','postcss-loader', 'sass-loader']
        // })
      },
      //js 文件  使用babel-loader 目的是 支持es6 语法
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      //图片 loader 
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        query: {
                /*
                *  limit=10000 ： 10kb
                *  图片大小小于10kb 采用内联的形式，否则输出图片
                * */
                limit: 10000,
                name: 'images/[name]-[hash:8].[ext]'
        }
      },
      {
        test: /(ver|\.json)$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins : [
     new ExtractTextPlugin("css/main.css"), //css hash   和  chunkhash (相同的chunkhash js 和css 视为一部分) (contenthash 内容改变才会改变)
     new CopyWebpackPlugin([
            {from: __dirname+'/ver', to: ''}
        ]),
     new webpack.DefinePlugin({   //方便配置全局变量  一般用于url 配置
        URL: JSON.stringify('http://www.wangfanwifi.com')
     }),
     new CleanWebpackPlugin(['./www']), //清除生成编译后的文件。  相当于rm www
     //不需要手动去维护  需要的js 和 css .这个工作交给 插件来完成
     new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            minify: {
                minimize: true,
                removeComments: true,
                collapseWhitespace: true
            },
            inject: "body",
            hash: true,
            chunks: ["vendor","main"]   //html 需要引入的js
      })
  ],
  resolve: {
    extensions: ['*', '.js', '.vue'],  //不需要手动添加的文件扩展名
    alias: {
      'TEST': path.resolve(__dirname,'./src/js/test.js') //别名  方便后续引入
    }
  },
  performance: {
    hints: false
  }
}