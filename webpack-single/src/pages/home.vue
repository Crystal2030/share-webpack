<template>
  <div class="amui-home">
    <h1>{{ msg }}</h1>
    <h3>{{ name }}</h3>
    <ul class='list'>
      <li>
        <router-link to='a'>为什么 前端需要构建工具111</router-link>
      </li>
      <li>
        <router-link to='b'>选择什么构建工具</router-link>
      </li>
      <li>
        <a>webpack 技巧 demo</a>
      </li>
    </ul>
    <p class="hb">
      <img src="../images/hb.png"  width="100%">
    </p>
    <p class="icon">
      <img src="../images/icon_movie.png" width="100%">
    </p>
  </div>
</template>

<script>
// require("TEST")
export default {
  name: 'home',
  data () {
    return {
      msg: '浅谈 大前端',
      name : '姜驰'
    }
  },
  mounted(){
    // alert("xxs")
  }
}
</script>

<style lang="scss">
  @import '../scss/home.scss';
</style>
