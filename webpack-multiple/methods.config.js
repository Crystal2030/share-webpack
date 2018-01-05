const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
function read(dir,type,cb){
    let files = fs.readdirSync(dir);
    for (let i = 0; i < files.length; i++) {
        let filePath = path.resolve(dir,files[i]);
        let stat = fs.lstatSync(filePath);
        if(stat.isDirectory()){
            read(filePath,type,cb);
        }else{
            let pathObj = path.parse(filePath);
            if (pathObj.ext === type) {
                let name = pathObj.name;
                cb && cb(name,pathObj,filePath);
            }
        }
    }
}
function htmlPlugin(filename,tempname,chunk){
    return new HtmlWebpackPlugin({
        filename: filename,
        template: tempname,
        hash: true,
        inject: 'body',
        chunks: chunk
        // minify: { //压缩HTML文件    
        //     removeComments: false, //移除HTML中的注释
        //     collapseWhitespace: false //删除空白符与换行符
        // }
    });
}
module.exports = {
    read,
    htmlPlugin
}