const path = require("path")
const express = require("express")
const webpack = require("webpack")
const opn = require("opn")
//http://blog.csdn.net/xiaoxiao520c/article/details/77771217

const webpackConfig = require('./webpack.config');

const port = 3005;
const app = express();

//如果用dev-server.js，entry 里要多加上 'webpack-hot-middleware/client'，此举是与 server 创建连接。
Object.getOwnPropertyNames((webpackConfig.entry || {})).map(function(name){
    webpackConfig.entry[name] = []
        .concat("webpack-hot-middleware/client?reload=true")
        .concat(webpackConfig.entry[name])
});
console.log('-----', JSON.stringify(webpackConfig.entry))

const compiler = webpack(webpackConfig);
//complier = webpack(webpackConfig)会创建一个用来传给webpack-middle-ware的对象，同时我们还可以给他webpack-middle-ware传一些option,比较重要的是这个publicPath, 这个是必传的参数，通常是和你的webpack.config.js里的publicPath是一致的，然后通过
let devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    // noInfo: true,
    inline: true,
    hot: true,
    // quiet : true,,//启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    stats: {
        colors: true,
        chunks: false
    }
});

let hotMiddleware = require('webpack-hot-middleware')(compiler);
//在项目中，我们使用html-webpack-plugin来生成webpack spa页面。由于该插件不支持HMR，为了支持html的HMR，我们需要利用webpack-hot-middleware提供对外接口来实现。
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
});

app.use(require('connect-history-api-fallback')());
app.use(devMiddleware);
app.use(hotMiddleware);

app.use(express.static(__dirname));

module.exports = app.listen(port, (err) => {
    if(err) {
        console.log(err)
        return
    }
    let url = "http://localhost:" + port + '/test1.html';
    console.log('Listening at ' + url + '\n')
    opn(url);
})



