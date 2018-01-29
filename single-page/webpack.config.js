const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const vueLoaderConfig = {
    loaders: {
        scss:
            [
                'vue-style-loader',
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ],
        sass:
            [
                'vue-style-loader',
                'css-loader',
                'postcss-loader',
                'sass-loader?indentedSyntax'
            ],
        css:
            [
                'vue-style-loader',
                'css-loader',
                'postcss-loader',
                'sass-loader?indentedSyntax'
            ]
    }
};
// 如果用dev-server.js，entry 里要多加上 'webpack-hot-middleware/client'，此举是与 server 创建连接。
/*
         webpack-dev-server环境下，path、publicPath、--content-base 区别与联系
         path：指定编译目录而已（/build/js/），不能用于html中的js引用。
         publicPath：虚拟目录，自动指向path编译目录（/assets/ => /build/js/）。html中引用js文件时，必须引用此虚拟路径（但实际上引用的是内存中的文件，既不是/build/js/也不是/assets/）。
         --content-base：必须指向应用根目录（即index.html所在目录），与上面两个配置项毫无关联。
         ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
        发布至生产环境：
         1.webpack进行编译（当然是编译到/build/js/）
         2.把编译目录（/build/js/）下的文件，全部复制到/assets/目录下（注意：不是去修改index.html中引用bundle.js的路径）
     */
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
        vendor: ['babel-polyfill', './src/lib/autosize.js'],
        app: ['./src/main.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: '/',
        chunkFilename: 'js/chunk/[name].js'  // 配合 vue-router 做代码分割  按需加载使用
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],//不需要手动添加的文件扩展名
        alias: {
            'TEST': path.resolve(__dirname, './src/js/test.js') //别名  方便后续引入
        }
    },
    devtool: 'cheap-module-eval-source-map',//original source (lines only)
    devServer: {
        historyApiFallback: true,//对于单页面程序，浏览器的brower histroy可以设置成html5 history api或者hash，而设置为html5 api的，如果刷新浏览器会出现404 not found，原因是它通过这个路径（比如： /activities/api/ques/2）来访问后台，所以会出现404，而把historyApiFallback设置为true那么所有的路径都执行index.html。
        hot: true,
        contentBase: './', // 必须指向应用根目录（即index.html所在目录），与上面两个配置项毫无关联。
        compress: true,
        host: 'localhost',
        port: '3005',
        open: true,
        publicPath: '/',
        // proxy: {},
        // quiet: true, // necessary for FriendlyErrorsPlugin
        stats: {
            colors: true
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            //js 文件  使用babel-loader 目的是 支持es6 语法
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            //图片配置
            /*
               *  limit=10000 ： 10kb
               *  图片大小小于10kb 采用内联的形式，否则输出图片
               * */
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'images/[name].[hash:7].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'single',//用于生成的HTML文件的标题
            template: 'index.html',//模板的路径。支持加载器，例如 html!./index.html。
            filename: 'index.html',//用于生成的HTML文件的名称，默认是index.html。你可以在这里指定子目录（例如:assets/admin.html）
        }),
        new webpack.optimize.CommonsChunkPlugin({ //防止如果入口 chunks 之间包含重复的模块(prevent duplication)
            name: "common",// 指定公共 bundle 的名称。
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),// 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误。

    ]
};