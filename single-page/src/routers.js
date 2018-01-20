/**
 * webpack 1中
 * require.ensure 现在依赖于原生的 Promise。如果在不支持 Promise 的环境里使用 require.ensure，你需要添加 polyfill。
 */
// const home = r => require.ensure([], () => r(require('./pages/home.vue')))
// const first = r => require.ensure([], () => r(require('./pages/first.vue')))
// const second = r => require.ensure([], () => r(require('./pages/second.vue')))

// ES2015 模块加载规范定义了 import() 方法，可以在运行时(runtime)动态地加载 ES2015 模块。webpack 将 import() 作为分割点(split-point)并将所要请求的模块(requested module)放置到一个单独的 chunk 中。import() 接收模块名作为参数，并返回一个 Promise。

import home from './pages/home';
import first from './pages/first';
import second from './pages/second';

const routers = [
    {
        path: '/home',
        name: 'home',
        component: home,
    },
    {
        path: '/first',
        name: 'first',
        component: first
    },
    {
        path: '/second',
        name: 'second',
        component: second
    },
    {
        path: '/', redirect: '/home'
    }
];
export default routers;