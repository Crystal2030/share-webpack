<template>
  <div class="amui-two">
    <p>说到构建工具，我往往会在前面加「自动化」三个字，因为构建工具就是
      <span>用来让我们不再做机械重复的事情，解放我们的双手的</span>。
    </p>
    <img src="http://img.blog.csdn.net/20160629120335463?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" width="100%">
    <div class="text">
      <p>比如说 常规的js css 压缩合并， 添加版本号等。 还有js es6 语法， 有些浏览器不兼容，可以使用构建工具 编译成js。</p>
      <p>构建工具常用的有 gulp,webapck, fis,Grunt 等。</p>
      <p>该如何选择构建工具呢？</p>
      <p>说2个用过的吧。 gulp 和webpack 。gulp 是工具， webpack 是模块化方案。</p>
      <img src="http://img.blog.csdn.net/20160629120359221?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" width="100%">
      <p>gulp是工具链、构建工具，可以配合各种插件做js压缩，css压缩，less, sass编译 自动刷新页面 替代手工实现自动化工作。  主要是 分为多个task 工作流执行。</p>
      <img src="http://img.blog.csdn.net/20160629120502503?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" width="100%">
      <p>webpack 是文件打包工具，可以把项目的各种js文、css文件等打包合并成一个或多个文件，主要用于
        <span class="c">模块化方案（模块打包工具），预编译模块的方案</span>
      </p>
      <p>
      Webpack的工作方式是：把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件，使用<span class="c">  loaders  </span>处理它们，最后打包为一个（或多个）浏览器可识别的JavaScript文件。
      </p>
      <p>具体项目该怎么选择， 要看实际情况了。</p>
      <p>如果是老项目优化， 可以使用gulp 拆分成多个task 来执行不同的优化， css js 压缩合并了， 添加缓存版本号了。 这种 使用gulp 可能会更加方便，快捷。 当然 webpack 也可以， 只不过需要改动的地方多一些。 </p>
      <p>如果是新项目的话， 不用想  当然是 webpack 咯！ 目前 前端最火的 模块化工具。 webpack 主打的就是<span class="c">整体解决、大而全</span>  </p>
      <p>
        现在很多人 都爱比较 gulp 和webpack 到底谁好?  这个问题。我认为 其实 只需要充分了解各种工具、方案，选择合适的和自己需要的。没有绝对的好。优点换了场景也会变成缺点。
      </p>
      <p>这里就不过多去详细介绍这几种 构建工具。  大家有兴趣的可以去官网 看一下。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'second',
  data () {
    return {
      msg: '浅谈 大前端',
      name : '刘云'
    }
  }
}
</script>

<style lang="scss">
  @import '../scss/second'
</style>
