const fs = require('fs')
const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin")

function read(dir, ext, cb){
    let files = fs.readdirSync(dir);
    console.log(files);
    for(let i=0; i< files.length; i++){
        let filePath = path.resolve(dir, files[i]); //D:\study\share_webpack\multiple-page\src\js\test1.js
        /**
         * fs.lstatSync(filePath) =》
            Stats {
                dev: 436669802,
                    mode: 33206,
                    nlink: 1,
                    uid: 0,
                    gid: 0,
                    rdev: 0,
                    blksize: undefined,
                    ino: 844424930430365,
                    size: 62,
                    blocks: undefined,
                    atimeMs: 1516866221630.7026,
                    mtimeMs: 1512037134000,
                    ctimeMs: 1516866221639.7026,
                    birthtimeMs: 1516866221630.7026,
                    atime: 2018-01-25T07:43:41.631Z,
                    mtime: 2017-11-30T10:18:54.000Z,
                    ctime: 2018-01-25T07:43:41.640Z,
                    birthtime: 2018-01-25T07:43:41.631Z
                    }
         */
        let stat = fs.lstatSync(filePath);
        if(stat.isDirectory()){
            read(filePath, ext, cb);
        } else {
            /**
             * {
                  root: 'D:\\',
                  dir: 'D:\\study\\share_webpack\\multiple-page\\src\\js',
                  base: 'test1.js',
                  ext: '.js',
                  name: 'test1'
                }
             */
            let pathObj = path.parse(filePath);
            if(pathObj.ext == ext) {
                let name = pathObj.name;
                let base = pathObj.base;
                cb && cb(name, base, filePath); // name: "test1",base: "test1.js", filePath: //D:\study\share_webpack\multiple-page\src\js\test1.js
            }
        }
    }
}


function htmlPlugin(filename, tplname, chunk){
    return new HtmlWebpackPlugin({
        filename: filename,//用于生成的HTML文件的名称，默认是index.html。你可以在这里指定子目录（例如:assets/admin.html）,
        template: tplname,//模板的路径。支持加载器，例如 html!./index.html。
        chunks: chunk,
    })
}
/*
let htmlPlugins = [];

read('./src/html','.html',(name,base)=>{
    htmlPlugins.push(htmlPlugin(base,`./src/html/${base}`,['common',name]));
});*/


module.exports = {
    read,
    htmlPlugin
}





