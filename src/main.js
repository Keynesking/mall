// 全局
// 样式初始化reset-css
import "reset-css"
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "@/vantui"

Vue.filter("RMBformat", val=>{
  return "￥" + Number(val).toFixed(2) + "元"
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
