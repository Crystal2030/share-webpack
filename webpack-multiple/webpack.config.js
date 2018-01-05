const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const method = require('./methods.config.js')

let common = ['babel-polyfill',"./src/lib/autosize.js","./src/lib/fastclick.js"];
let entryFiles = {},htmlPlugin = [];
//add entryFiles
method.read('./src/js','.js',(name,pathObj)=>{
   entryFiles[name] = common.concat([`./src/js/${pathObj.base}`]);
   // entryFiles[name] = [`./src/js/${pathObj.base}`];
})

// Object.assign(entryFiles,{
//   "common" : common
// })

//add htmlPlugin
method.read('./src/html','.html',(name,pathObj)=>{
  htmlPlugin.push(method.htmlPlugin(`${pathObj.base}`,`./src/html/${pathObj.base}`,['common',name]));
})


module.exports = {
  entry: entryFiles,
  output: {
    path: path.resolve(__dirname, './www'), //输出目录
    publicPath: '', //静态资源的 路径  用于设置dns等信息
    filename: 'js/[name]-[chunkhash].js'  //hash 和 chunkhash 的区别   hash 相当于每次编译  任何地方有改动（项目整体） 即变hash  chunkhash 模块文件的内容计算所得的hash值 只有该模块 改变  才会改变
  },
  module: {
    rules: [
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
     // new CopyWebpackPlugin([
     //        {from: __dirname+'/ver', to: ''}
     //    ]),
     new CleanWebpackPlugin(['./www']),
     new webpack.optimize.CommonsChunkPlugin({
            name: 'common', // 将公共模块提取，生成名为`common`的chunk
            // chunks: [], //提取哪些模块共有的部分
            minChunks: 2 // 提取至少n个模块共有的部分
          }),
     new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery"
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
  ].concat(htmlPlugin),
  resolve: {
    extensions: ['*', '.js','.scss'],  //不需要手动添加的文件扩展名
    alias: {
      'utils': path.resolve(__dirname,'./src/lib/utils.js') //别名  方便后续引入
    }
  },
  performance: {
    hints: false
  }
}