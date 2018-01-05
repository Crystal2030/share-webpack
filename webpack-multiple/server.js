const webpack = require("webpack");
const opn = require("opn");
const webpackBase = require("./webpack.dev.config.js");
const express = require('express')

let webpackConfig = Object.assign(webpackBase, {
  devtool: "cheap-module-eval-source-map"
});

const port = 4042;

//entry
Object.getOwnPropertyNames((webpackBase.entry || {})).map(function (name) {
     webpackConfig.entry[name] = []
    .concat("webpack-hot-middleware/client?reload=true")
    .concat(webpackBase.entry[name])
});

// add vue css-hot-loader
// let rules  = webpackBase.module.rules
// for(let i =0; i< rules.length; i++ ){
//     if(/(css)|(scss)/.test(rules[i].test)){
//         rules[i].use = ['css-hot-loader'].concat(rules[i].use);
//     }
// }

webpackConfig.plugins = (webpackBase.plugins || []).concat(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
);


var app = express()

var compiler = webpack(webpackConfig);


var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackBase.output.publicPath,
    // noInfo: true,
    hot: true,
    // quiet : true,
    stats: {
        colors: true,
        chunks: false
    }
});

var hotMiddleware = require('webpack-hot-middleware')(compiler)


compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})



app.use(require('connect-history-api-fallback')());
app.use(devMiddleware);
app.use(hotMiddleware);

app.use(express.static(__dirname))

module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    var url = 'http://localhost:' + port+'/test1.html';
    console.log('Listening at ' + url + '\n')
    opn(url);
});