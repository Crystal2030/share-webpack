const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const method = require('./methods.config')
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
let entryFiles = {};
let common = ['babel-polyfill',"./src/lib/autosize.js","./src/lib/fastclick.js"];
//add entryFiles
method.read('./src/js','.js',(name,base)=>{
    entryFiles[name] = common.concat(`./src/js/${base}`);
});

let htmlPlugins = [];
//add htmlPlugin
method.read('./src/html','.html',(name,base)=>{
    htmlPlugins.push(method.htmlPlugin(base,`./src/html/${base}`,['common',name]));
});

module.exports = {
    entry: entryFiles,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.scss'],//不需要手动添加的文件扩展名
        alias: {
            'utils': path.resolve(__dirname,'./src/lib/utils.js') //别名  方便后续引入
        }
    },
    devtool: 'cheap-module-eval-source-map',//original source (lines only)
    devServer: {
        historyApiFallback: true,//对于单页面程序，浏览器的brower histroy可以设置成html5 history api或者hash，而设置为html5 api的，如果刷新浏览器会出现404 not found，原因是它通过这个路径（比如： /activities/api/ques/2）来访问后台，所以会出现404，而把historyApiFallback设置为true那么所有的路径都执行index.html。
        hot: true,
        contentBase: "/", // 必须指向应用根目录（即index.html所在目录），与上面两个配置项毫无关联。
        openPage: "test1.html",
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
                test: /\.html$/,
                loader: 'html-loader'
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
        new webpack.optimize.CommonsChunkPlugin({ //防止如果入口 chunks 之间包含重复的模块(prevent duplication)
            name: "common",// 指定公共 bundle 的名称。
            minChunks: 2 // 提取至少n个模块共有的部分
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),

    ].concat(htmlPlugins)
}