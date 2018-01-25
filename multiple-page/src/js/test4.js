if (module.hot)
    module.hot.accept()
require('../css/test4.scss')
console.log('test4........')

/*
// 在dev-server.js文件中用chokidar添加对指定文件的监控，比如webpack.config.js
// dev-server.js
const chokidar = require('chokidar');
chokidar.watch(path.resolve(process.cwd(), 'webpack.dev.conf.js')).on('change', function () {
    process.send('restart'); //向父进程传递消息信号
})

// 创建本地node server主入口文件，用于创建dev-server.js对应的子进程。
// dev-server-main.js
var cp = require('child_process');
function start(){
    const p = cp.fork(__dirname + '/dev-server.js');
    p.on('message', function(data){
        if(data === 'restart'){
            p.kill('SIGINT');
            start();
        }
    })
}
if(!process.send){
    start();
}

//最后用node dev-server-main.js开启服务*/
