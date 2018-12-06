import Vue from 'vue'
import Vuex from 'vuex'
import layout from './modules/layout'
import sysConfig from './modules/sysConfig'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    layout,
    sysConfig
  },
  getters
})
export default store
