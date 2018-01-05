<template>
  <div class="amui-one">
    <p>
      前端这几年发展迅速，各种MVC MVVM 框架 层数不穷。目前比较流行的 Vue React Angular。前端项目越来越繁重，前端开发和部署优化问题相继而来，这就推动着前端工程化出现。
    </p>
    <p>为什么需要工程化，具体怎么来做。 下面会介绍。</p>
    <div class='text'>
      <img src="http://upload-images.jianshu.io/upload_images/712523-fe95cf7518625ddd.jpg?imageMogr2/auto-orient/strip%7CimageView2/2" width="100%">
      <p>
         👆图是最原始的 结构，index.html 引入a.css. 本地预览 不用编译 确认ok 上传服务器。  超级简单有木有...
      </p>
      <img src="http://upload-images.jianshu.io/upload_images/712523-f0c8cfcf8a0a4631.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" width="100%">
      <p>
          直接访问，查看网络请求。 200！ 成功。简单的页面 这样很ok 没有问题。
      </p>
      <p>
        但是访问量比较大的页面，每次访问都要重新请求, 这样性能和带宽堪忧啊。我们希望的肯定是👇这样。
      </p>
      <img src='http://upload-images.jianshu.io/upload_images/712523-a105c87e134cc518.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240' width="100%">
      <p>
        利用304，让浏览器使用本地缓存，看着是不是很完美。 no! 304协商缓存，这货还是要和服务器通信一次，我们优化 就要彻底，所以这个请求必须消除。 
      </p>
      <img src='http://upload-images.jianshu.io/upload_images/712523-e6b5c8ec7fbb40c6.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240' width="100%">
      <p>
        强制浏览器使用本地缓存（cache-control/expires），不要和服务器通信。 ok 解决了。 但是，既然都使用浏览器缓存了， 哪缓存怎么更新呢？
      </p>
      <p>
        相信有人会想到这个办法：<span class="c">修改页面引入资源的路径，这样浏览器会放弃缓存，加载最新资源</span>
      </p>
      <img src='http://upload-images.jianshu.io/upload_images/712523-cb41d9a98ab061a3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240' width="100%">
      <p>这样 每次修改后，上线添加版本号，资源就自动更新了。 问题解决了吗？  解决了。  最终方案吗？  不！</p>
      <img src="http://upload-images.jianshu.io/upload_images/712523-e9469d74c2862b76.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" width="100%">
      <p>如果所有链接都加版本号，我们只修改a.css 我们想要的是   只有a 重新加载，其它2个用缓存呢？</p>
      <p>这样细想， 那只有文件内容对比咯。内容改变 才会改变相对应的url。什么东西与文件内容相关呢？我们会很自然的联想到利用
        <span class="c">
           数据摘要要算法      
        </span>
        对文件求摘要信息，摘要信息与文件内容一一对应，就有了一种可以精确到单个文件粒度的缓存控制依据了,这样url就改成带摘要信息了:
      </p>
      <img src="http://upload-images.jianshu.io/upload_images/712523-6cad1d2a17f79765.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" width="100%">
      <p>这样问题就解决了。 这么复杂的操作，每次都要人为手动来操作，麻烦吗？ 麻烦。 那么有没有什么 快捷方式呢。 前端项目构建工具 </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'a',
  data () {
    return {
      msg: '浅谈 大前端',
      name : '姜驰'
    }
  }
}
</script>

<style lang="scss">
  @import '../scss/a.scss'
</style>
