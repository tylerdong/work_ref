// The Vue build version to letoad with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import './assets/css/normalize.css'
import './assets/css/site.scss'
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/vendor/admin-lte/adminlte'
import ElementUI from 'element-ui'
import '../theme/index.css'
import './assets/css/element-ui-style-cover.scss'
import './assets/css/theme.scss'
import './module/xhook'
import './module/filters'
import './module/permission'
import './module/mixins'
// Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

/* 用户模拟 */
// import storage from './module/storage.js'
// storage.setUser({
//   type: 'S',
//   token: 'token123456',
//   account: 'zhanghao12345',
//   name: '测试用户',
//   userId: '999'
// })
