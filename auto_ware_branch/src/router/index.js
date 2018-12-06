import Vue from 'vue'
import Router from 'vue-router'
import * as names from './names.js'
import storage from 'storage'

import {labModule} from './module/lab'
import {autoModule} from './module/auto'
import {warehouseModule} from './module/warehouse'
import {publicModule} from './module/public'
import {mdmModule} from './module/mdm_data'
import {warningModule} from './module/warning'
/* 懒加载路由 */
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: names.HOME,
      meta: {
        exceptAuth: true
      },
      component (resolve) {
        require(['../components/index/index.vue'], resolve)
      }
    },
    /* 用户中心 */
    {
      path: '/userCenter',
      name: 'userCenter',
      component (resolve) {
        require(['../components/main-layout.vue'], resolve)
      },
      children: [
        /* 用户中心 -- 欢迎页 */
        {
          path: 'welcome',
          name: names.USERCENTER_WELCOME,
          component (resolve) {
            require(['../components/welcome.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/public',
      name: 'public',
      component (resolve) {
        require(['../components/main-layout.vue'], resolve)
      },
      children: publicModule
    },
    {
      path: '/mdm',
      name: 'mdm',
      component (resolve) {
        require(['../components/main-layout.vue'], resolve)
      },
      children: mdmModule
    },
    {
      path: '/automatic',
      name: 'automatic',
      component (resolve) {
        require(['../components/main-layout.vue'], resolve)
      },
      children: autoModule
    },
    {
      path: '/analysis',
      name: 'analysis',
      component (resolve) {
        require(['../components/main-layout.vue'], resolve)
      },
      children: warningModule
    },
    {
      path: '/storage',
      name: 'storage',
      component (resolve) {
        require(['../components/main-layout.vue'], resolve)
      },
      children: warehouseModule
    },
    {
      path: '/lab',
      name: 'lab',
      component (resolve) {
        require(['../components/main-layout.vue'], resolve)
      },
      children: labModule
    }
  ]
})
router.beforeEach((to, from, next) => {
  /* 刷新重定向至欢迎页面 */
  if (from.name === null && to.name !== names.USERCENTER_WELCOME && to.name !== names.HOME) {
    next({path: '/userCenter/welcome'})
  } else {
    next()
  }

  if (to.meta && to.meta.exceptAuth) {
    next()
  } else {
    const user = storage.getUser()
    if (user) {
      next()
    } else {
      next({path: '/'})
    }
  }
})

export default router
