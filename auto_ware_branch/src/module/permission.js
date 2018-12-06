import Vue from 'vue'
import storage from './storage'
Vue.directive('permission-type', {
  inserted: function (el, binding) {
    try {
      const user = storage.getUser()
      if (user.type === 'A') {
        /* 普通用户登录 */
        if (user.moduleList) {
          if (binding.value === undefined) {
            return
          }
          let result = user.moduleList.some(item => {
            return item.code === binding.value
          })
          if (!result) {
            $(el).remove()
          }
        } else {
          $(el).remove()
        }
      }
    } catch (ex) {
      console.error(ex)
    }
  }
})

Vue.directive('permission-user-type', {
  inserted: function (el, binding) {
    try {
      const user = storage.getUser()
      let type = ''
      if (!user) {
        $(el).remove()
        return
      }
      if (user.type === 'A') {
        type = '100'
      } else if (user.userType === 'S') {
        type = '001'
      } else {
        type = '010'
      }
      if (!binding.value) {
        return
      }
      if ((parseInt(binding.value, 2) & parseInt(type, 2)) !== parseInt(type, 2)) {
        $(el).remove()
      }
    } catch (ex) {
      console.error(ex)
    }
  }
})

Vue.directive('permission-children-exist', {
  inserted: function (el, binding) {
    try {
      const user = storage.getUser()
      if (user.type === 'A') {
        // 判断菜单下所有子菜单都有配置权限，否则不显示菜单
        if (binding.value.children.length === 0) {
          $(el).remove()
          return
        }
        /* 判断菜单下子菜单都有配置权限，这里没有判断tab菜单是否有配置权限，配置子菜单的时候必须配一个tab菜单，否则没有意义 */
        if (binding.value.children.every(child => {
          return user.moduleList.findIndex(item => { return item.code === child.permission }) === -1
        })) {
          $(el).remove()
          return
        }
      }
    } catch (e) {
      console.error(e)
    }
  }
})
