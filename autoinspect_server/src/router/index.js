import Vue from 'vue'
import Router from 'vue-router'
import search from './modules/search'
import sysConfig from './modules/sys-config'
import storage from '../module/storage'
Vue.use(Router)

let chiRoutes = []
chiRoutes.push(...search)
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
    },
    {
      path: '/login',
      name: 'login',
      component (resolve) {
        require(['../components/server/login.vue'], resolve)
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  let user = storage.getUser(true)
  if (to.name === 'login') {
    next()
  } else {
    if (user && user.userName) {
      next()
    } else {
      next({path: '/login'})
    }
  }
})
export default router
