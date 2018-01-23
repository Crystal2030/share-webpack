const path = require('path')
const webpack = require('webpack')
// const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
// const CleanWebpackPlugin = require('clean-webpack-plugin')
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
module.exports = {
    entry: {
        vendor: ['babel-polyfill', './src/lib/autosize.js'],
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: '/'
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
                loader: 'vue-loader'
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
                            name: 'images/[name].[ext]'
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),

    ]
}