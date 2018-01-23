const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 如果用dev-server.js，entry 里要多加上 'webpack-hot-middleware/client'，此举是与 server 创建连接。
// app: ['webpack-hot-middleware/client','./src/main.js']
module.exports = {
    entry: {
        vendor: ['babel-polyfill','./src/lib/autosize.js'],
        main : './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),//输出目录
        // publicPath: '', //静态资源的 路径  用于设置cnd等信息
        filename: 'js/[name].js',
        // chunkFilename: "js/[id].js"
    },
    devServer: {
        contentBase: './dist',
        hot: true,
        historyApiFallback: true, //对于单页面程序，浏览器的brower histroy可以设置成html5 history api或者hash，而设置为html5 api的，如果刷新浏览器会出现404 not found，原因是它通过这个路径（比如： /activities/api/ques/2）来访问后台，所以会出现404，而把historyApiFallback设置为true那么所有的路径都执行index.html。
        stats: {
            colors: true
        }
    },
    devtool: 'inline-source-map',//如果将三个源文件（a.js, b.js 和 c.js）打包到一个 bundle（bundle.js）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会简单地指向到 bundle.js。为了追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码。如果一个错误来自于 b.js，source map 就会明确的告诉你
    resolve: {
        extensions: ['*', '.js', '.vue'],  //不需要手动添加的文件扩展名
        alias: {
            'TEST': path.resolve(__dirname,'./src/js/test.js') //别名  方便后续引入
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
                test: /\.css/,
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
            //图片配置
            /*
               *  limit=10000 ： 10kb
               *  图片大小小于10kb 采用内联的形式，否则输出图片
               * */
            {
                test: /\.(png|jpe?g|gif|svg)$/,
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
        new ExtractTextPlugin("css/[name]-[contenthash].css"), //css hash   和  chunkhash 、contenthash
        new HtmlWebpackPlugin({
            title: 'single',//用于生成的HTML文件的标题
            template: 'index.html',//模板的路径。支持加载器，例如 html!./index.html。
            filename: 'index.html',//用于生成的HTML文件的名称，默认是index.html。你可以在这里指定子目录（例如:assets/admin.html）
            minify: {
                minimize: true,
                removeComments: true,
                collapseWhitespace: true
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),
        new CleanWebpackPlugin(['dist']),//清除生成编译后的文件。  相当于rm -rf dist
        //代码压缩
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: { safe: true, map: { inline: false }}
        }),
    ]
};