const home = r => require.ensure([], () => r(require('./pages/home.vue')))
const a = r => require.ensure([], () => r(require('./pages/a.vue')))
const b = r => require.ensure([], () => r(require('./pages/b.vue')))
const cc = r => require.ensure([], () => r(require('./pages/c.vue')))


const routers = [
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/a',
    name: 'a',
    component: a
  },
  {
    path: '/b',
    name: 'b',
    component: b
  },
  {
    path: '/c',
    name: 'c',
    component: cc
    // ,
    // meta: {
    //   keepAlive: true
    // }
  },
  {
    path: '/', redirect: '/home'
  }
];
export default routers;