import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowShadow:false
  },
  mutations: {
    chanIsShowShadow(state, payload){
      state.isShowShadow = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
