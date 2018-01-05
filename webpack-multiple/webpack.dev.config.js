const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const method = require('./methods.config.js')

let vendor = ['babel-polyfill',"./src/lib/autosize.js","./src/lib/fastclick.js"];
let entryFiles = {},htmlPlugin = [];
//add entryFiles
method.read('./src/js','.js',(name,pathObj)=>{
   entryFiles[name] = vendor.concat([`./src/js/${pathObj.base}`]);
   // entryFiles[name] = [`./src/js/${pathObj.base}`];
})

// Object.assign(entryFiles,{
//   'vendor' : vendor
// })

//add htmlPlugin
method.read('./src/html','.html',(name,pathObj)=>{
  htmlPlugin.push(method.htmlPlugin(`${pathObj.base}`,`./src/html/${pathObj.base}`,['vendor',name]));
})


module.exports = {
  entry: entryFiles,
  output: {
    path: path.resolve(__dirname, './www'),
    publicPath: '',
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      //css 文件 使用的loader use : 从右向左以此 使用 . 最后使用style-loader  在页面添加 style 标签 
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader','postcss-loader']
        })
      },
      //scss 文件 使用的loader  
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader','postcss-loader', 'sass-loader']
        })
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
     new ExtractTextPlugin("css/[name].css"),
     // new CopyWebpackPlugin([
     //        {from: __dirname+'/ver', to: ''}
     //    ]),
     new CleanWebpackPlugin(['./www']), //清除生成编译后的文件。  相当于rm www
     new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', // 将公共模块提取，生成名为`common`的chunk
            // chunks: ['vendor'] //提取哪些模块共有的部分
            minChunks: 2 // 提取至少n个模块共有的部分
          }),
     new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery"
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