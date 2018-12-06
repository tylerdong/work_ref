import Vue from 'vue'
import Router from 'vue-router'
import innerSearch from './modules/inner-search'
import sysConfig from './modules/sys-config'
Vue.use(Router)

let chiRoutes = []
chiRoutes.push(...innerSearch)
chiRoutes.push(...sysConfig)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component (resolve) {
        require(['../components/layout.vue'], resolve)
      },
      children: chiRoutes
    }
  ]
})
export default router
