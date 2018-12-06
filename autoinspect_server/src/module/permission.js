import Vue from 'vue'
// import store from './../store'
Vue.directive('premission-menu', {
  inserted: function (el, binding) {
    try {
      let config = Vue.store.state.sysConfig()
      if (config && config.hasOwnProperty('appname')) {
        if (config.appname === binding.value) {
          return
        } else {
          el.style.display = 'none'
        }
      } else {
        if (binding.value === 'setting') {
          return
        } else {
          el.style.display = 'none'
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
})
