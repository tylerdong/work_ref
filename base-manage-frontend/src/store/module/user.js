/*
 * @Author: dongweiliang@gmail.com
 * @Date: 2019-02-11 17:49:25
 * @LastEditors: dongweiliang@gmail.com
 * @LastEditTime: 2019-02-13 10:00:40
 * @Description: file content
 */
import {
  login,
  logout,
  getUserInfo
} from '@/api/user'
import {
  setToken,
  getToken
} from '@/libs/util'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false,
    resources: []
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    setResources (state, resources) {
      state.resources = [...resources]
    }
  },
  actions: {
    // 登录
    handleLogin ({
      commit
    }, {
      userName,
      password
    }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        // login({
        //   userName,
        //   password
        // }).then(res => {
        //   const data = res.data
        //   commit('setToken', data.token)
        //   resolve()
        // }).catch(err => {
        //   reject(err)
        // })
        commit('setToken', 'xxx')
        resolve()
      })
    },
    // 退出登录
    handleLogOut ({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          resolve()
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        // try {
        //   getUserInfo(state.token).then(res => {
        //     const data = res.data
        //     commit('setAvator', data.avator)
        //     commit('setUserName', data.user_name)
        //     commit('setUserId', data.user_id)
        //     commit('setAccess', data.access)
        //     commit('setHasGetInfo', true)
        //     resolve(data)
        //   }).catch(err => {
        //     reject(err)
        //   })
        // } catch (error) {
        //   reject(error)
        // }
        let data = {
          'uid': 1,
          'username': 'hello',
          'avator': 'http://haonanxuan.oss-cn-hangzhou.aliyuncs.com/eggadmin/b0c81671759583d.jpg',
          'email': '1584492410@qq.com',
          'mobile': null,
          'menus': [{
            'id': 13,
            'title': '配置',
            'code': 'system',
            'parent_id': 0,
            'path': '/system',
            'icon': null,
            'component': 'components/main',
            'order': 0,
            'name': 'system',
            'meta': {
              'icon': null,
              'showAlways': false,
              'title': '配置'
            },
            'children': [{
              'id': 14,
              'title': '系统配置',
              'code': 'system:manageSystem',
              'parent_id': 13,
              'path': 'setting',
              'icon': null,
              'component': 'view/system/',
              'order': 0,
              'name': 'system:manageSystem',
              'meta': {
                'icon': null,
                'showAlways': false,
                'title': '系统配置'
              }
            }, {
              'id': 15,
              'title': '菜单配置',
              'code': 'system:menu',
              'parent_id': 13,
              'path': 'menu',
              'icon': null,
              'component': 'view/menu/',
              'order': 0,
              'name': 'system:menu',
              'meta': {
                'icon': null,
                'showAlways': false,
                'title': '菜单配置'
              }
            }, {
              'id': 16,
              'title': '角色配置',
              'code': 'system:roleManager',
              'parent_id': 13,
              'path': 'roleManager',
              'icon': null,
              'component': 'view/role/',
              'order': 0,
              'name': 'system:roleManager',
              'meta': {
                'icon': null,
                'showAlways': false,
                'title': '角色配置'
              }
            }, {
              'id': 17,
              'title': '用户配置',
              'code': 'system:user',
              'parent_id': 13,
              'path': 'user',
              'icon': null,
              'component': 'view/user/',
              'order': 0,
              'name': 'system:user',
              'meta': {
                'icon': null,
                'showAlways': false,
                'title': '用户配置'
              }
            },
            {
              path: '/tasks',
              name: 'tasks',
              'title': '用户配置',
              'code': 'tasks',
              meta: {
                icon: null,
                title: '任务管理',
                hideInMenu: false
              },
              'component': 'view/task/'
            },
            {
              'id': 18,
              'title': '日志管理',
              'code': 'system:log',
              'parent_id': 13,
              'path': 'log',
              'icon': null,
              'component': 'view/logs',
              'order': 0,
              'name': 'system:log',
              'meta': {
                'icon': null,
                'showAlways': false,
                'title': '日志管理'
              }
            }
            ]
          }],
          'resources': [
            'config:system:create',
            'config:system:edit',
            'config:system:del',
            'config:menu:createTop',
            'config:menu:createSon',
            'config:menu:delmenu',
            'config:menu:editmenu',
            'config:menu:createElement',
            'config:menu:editElement',
            'config:menu:delElement',
            'config:task:create',
            'config:task:start',
            'config:task:pause',
            'config:task:del',
            'config:task:edit',
            'config:task:executed',
            'config:role:add',
            'config:role:del',
            'config:role:edit',
            'config:role:allotMenu',
            'config:role:allotEle',
            'config:user:add',
            'config:user:del',
            'config:user:edit',
            'config:user:setRole',
            'config:user:editPass'
          ],
          'access': ['admin']
        }
        commit('setAvator', data.avator)
        commit('setUserName', data.user_name)
        commit('setUserId', data.user_id)
        commit('setAccess', data.access)
        commit('setResources', data.resources)
        commit('setHasGetInfo', true)
        resolve(data)
      })
    }
  }
}
