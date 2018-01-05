const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')


module.exports = {
  entry: {
    vendor : ['babel-polyfill','./src/lib/autosize.js'],
    main : ['./src/main.js']
  },
  output: {
    path: path.resolve(__dirname, './www'), //输出目录
    publicPath: '', //静态资源的 路径  用于设置dns等信息
    filename: 'js/[name]-[chunkhash].js',  //hash 和 chunkhash 的区别   hash 相当于每次编译  任何地方有改动（项目整体） 即变hash  chunkhash 模块文件的内容计算所得的hash值 只有该模块 改变  才会改变
    chunkFilename : 'js/chunk/[name]-[chunkhash].js'  // 配合 vue-router 做代码分割  按需加载使用
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss : 
              ExtractTextPlugin.extract({
                use: ['css-loader','postcss-loader','sass-loader'],
                fallback: 'vue-style-loader'
              }),
            sass : 
              ExtractTextPlugin.extract({
                use: ['css-loader','postcss-loader','sass-loader?indentedSyntax'],
                fallback: 'vue-style-loader'
              })
            //可以这里配置css 也可以配置 下面的  extractCSS: true
            // css : 
            //   ExtractTextPlugin.extract({
            //     use: 'css-loader',
            //     fallback: 'vue-style-loader'
            //   })
          },
          extractCSS: true
          // other vue-loader options go here
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader','postcss-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader','postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        query: {
                /*
                *  limit=10000 ： 10kb
                *  图片大小小于10kb 采用内联的形式，否则输出图片
                * */
                limit: 10000,
                name: 'images/[name]-[hash:8].[ext]' // 也用到了hash  这个hash有点区别，每一个资源本身有自己的hash
        }
      }
    ]
  },
  plugins : [
     new ExtractTextPlugin("css/[name]-[contenthash].css"), //css hash   和  chunkhash 、contenthash
     new CopyWebpackPlugin([
            {from: __dirname+'/ver', to: ''}
        ]),
     new CleanWebpackPlugin(['./www']),
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
            chunks: ["vendor","main"]
        }),
     //代码压缩
       new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false
        }
      }),
       new webpack.LoaderOptionsPlugin({
        minimize: true
      })
  ],
  resolve: {
    extensions: ['*', '.js', '.vue'],  //不需要手动添加的文件扩展名
    alias: {
      'TEST': './src/js/test.js' //别名  方便后续引入
    }
  },
  performance: {
    hints: false
  }
}
