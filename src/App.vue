<template>
  <div id="app">
    <router-view />
    <AppTabBar v-if="$route.meta.isShowTabbar"/>
  </div>
</template>

<script>
import AppTabBar from "@/components/AppTabBar"
export default {
    components:{
      AppTabBar
    }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #efefef;
  min-height: 100%;
  font-size: 0.14rem;
}
html,
body {
  height: 100%;
}
//   rem 相对单位    相对于根标签html
html {
  font-size: 100px!important;
}

p{
  // 字体大小16px??
  font-size: 0.16rem;      //  ???rem = 16     ??? = 16/rem = 16/100 = 0.16;
}

</style>
