/*
 * @Author: dongweiliang@gmail.com
 * @Date: 2019-02-13 10:14:20
 * @LastEditors: dongweiliang@gmail.com
 * @LastEditTime: 2019-02-22 14:25:52
 * @Description: file content
 */
// import {
//   login,
//   logout,
//   getUserInfo
// } from '@/api/user'
import {
  setToken,
  getToken
} from '@/libs/util'

import {routerArr, sourceDataMenu} from '@/config/option'
import {Type} from '@/libs/tools'

const resourceActions = []
sourceDataMenu.forEach(m => {
  let [key, value] = Object.entries(m)[0]
  value.forEach(v => {
    if (Type.isString(v)) {
      resourceActions.push(`sourceData:${key}:${v}`)
    } else {
      let [subKey, subValue] = Object.entries(v)[0]
      subValue.forEach(v => {
        resourceActions.push(`sourceData:${key}:${subKey}:${v}`)
      })
    }
  })
})
// console.log(resourceActions)
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
        // logout(state.token).then(() => {
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
        // }).catch(err => {
        //   reject(err)
        // })
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
          access: ['super_admin'],
          avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png',
          user_id: '14138',
          user_name: 'iview_admin',
          resources: [
            'information:addInformation:index:create',
            'information:informationAudit:index:edit',
            'information:informationAudit:index:downShelves',
            'information:informationAudit:index:remove',
            'information:informationAudit:index:audit',
            'information:quickInformation:index:create',
            'information:quickInformation:index:edit',
            'information:quickInformation:index:downShelves',
            'information:quickInformation:index:remove',
            /* ---------------------源数据管理---------------------- */
            ...resourceActions,
            'dictionary:areaManager:createTopCate',
            'dictionary:areaManager:createSubCate',
            'dictionary:areaManager:edit',
            'dictionary:areaManager:del',
            'dictionary:categoryManager:createTopCate',
            'dictionary:categoryManager:createSubCate',
            'dictionary:categoryManager:edit',
            'dictionary:categoryManager:del',
            'dictionary:productManager:create',
            'dictionary:productManager:edit',
            'dictionary:productManager:del',
            'dictionary:factoryManager:group:create',
            'dictionary:factoryManager:group:edit',
            'dictionary:factoryManager:factory:create',
            'dictionary:factoryManager:factory:edit',
            'dictionary:marketWeight:edit',
            /* -----------------------长视频------------------------- */
            'trainingManage.longVideo.main.add',
            'trainingManage.longVideo.main.edit',
            'trainingManage.longVideo.main.view',
            'trainingManage.longVideo.main.viewSub',
            'trainingManage.longVideo.sub.add',
            'trainingManage.longVideo.sub.edit',
            'trainingManage.longVideo.sub.view'
          ],
          menus: [
            {
              path: '/dictionary',
              name: 'dictionary',
              code: 'dictionary',
              meta: {icon: 'md-cube', title: '基础字典管理'},
              component: 'components/main',
              children: [
                {
                  path: 'areaManager',
                  name: 'areaManager',
                  code: 'areaManager',
                  meta: {icon: 'md-globe', title: '销售区域'},
                  component: 'view/area-manager/'
                },
                {
                  path: 'categoryManager',
                  name: 'categoryManager',
                  code: 'categoryManager',
                  meta: {icon: 'md-barcode', title: '品名管理'},
                  component: 'view/category-manager/'
                },
                {
                  path: 'productManager',
                  name: 'productManager',
                  code: 'productManager',
                  meta: {icon: 'ios-paper-plane', title: '产品管理'},
                  component: 'view/product-manager/'
                },
                {
                  path: 'factoryManager',
                  name: 'factoryManager',
                  code: 'factoryManager',
                  meta: {icon: 'ios-ribbon', title: '生产厂家'},
                  component: 'view/factory-manager/'
                },
                {
                  path: 'marketWeight',
                  name: 'marketWeight',
                  code: 'marketWeight',
                  meta: {icon: 'ios-pie', title: '市场权重配置'},
                  component: 'view/market-weight/'
                }
              ]
            },
            // 资讯管理
            {
              path: '/information',
              name: 'information',
              meta: {icon: 'ios-paper', title: '资讯管理'},
              component: 'components/main',
              children: [
                {
                  path: 'addInformation',
                  name: 'addInformation',
                  meta: {icon: 'md-musical-notes', title: '新增资讯', notCache: true},
                  component: 'components/parent-view',
                  children: [
                    {
                      path: 'audit/:id?',
                      name: 'audit',
                      meta: {icon: 'md-link', title: '新增资讯:编辑', notCache: true, hideInMenu: true},
                      component: 'view/information-manager/addInformation/audit'
                    },
                    {
                      path: 'index',
                      name: 'index',
                      meta: {icon: 'md-link', title: '新增资讯', notCache: true},
                      component: 'view/information-manager/addInformation/'
                    }
                  ]
                },
                {
                  path: 'informationAudit',
                  name: 'informationAudit',
                  meta: {icon: 'md-musical-notes', title: '资讯审核'},
                  component: 'components/parent-view',
                  children: [
                    {
                      path: 'index',
                      name: 'informationAudit:index',
                      meta: {icon: 'md-musical-notes', title: '资讯审核'},
                      component: 'view/information-manager/informationAudit/'
                    },
                    {
                      path: 'audit/:id?',
                      name: 'informationAudit:audit',
                      meta: {icon: 'md-musical-notes', title: '资讯审核:审核', hideInMenu: true},
                      component: 'view/information-manager/informationAudit/audit'
                    },
                    {
                      path: 'edit/:id?',
                      name: 'informationAudit:edit',
                      meta: {icon: 'md-musical-notes', title: '资讯审核:编辑', hideInMenu: true},
                      component: 'view/information-manager/informationAudit/edit'
                    }
                  ]
                },
                {
                  path: 'quickInformation',
                  name: 'quickInformation',
                  meta: {icon: 'md-musical-notes', title: '快讯管理', notCache: true},
                  component: 'components/parent-view',
                  children: [
                    {
                      path: 'index',
                      name: 'quickInformation:index',
                      meta: {icon: 'md-musical-notes', title: '快讯管理'},
                      component: 'view/information-manager/quickInformation/'
                    },
                    {
                      path: 'create',
                      name: 'quickInformation:create',
                      meta: {icon: 'md-musical-notes', title: '快讯管理:新增', hideInMenu: true, notCache: true},
                      component: 'view/information-manager/quickInformation/form'
                    },
                    {
                      path: 'edit/:id',
                      name: 'quickInformation:edit',
                      meta: {icon: 'md-musical-notes', title: '快讯管理:编辑', hideInMenu: true, notCache: true},
                      component: 'view/information-manager/quickInformation/form'
                    }
                  ]
                },
                {
                  path: 'informationDetail/:id?',
                  name: 'informationDetail',
                  meta: {icon: 'md-musical-notes', title: '资讯详情', hideInMenu: true, notCache: true},
                  component: 'view/information-manager/informationDetail'
                }
              ]
            },
            {
              path: '/source-data',
              name: 'sourceData',
              meta: { icon: 'md-menu', title: '源数据管理' },
              component: 'components/main',
              children: routerArr.map((v, i) => {
                return {
                  path: v.path,
                  name: v.name,
                  meta: { icon: 'md-link', title: v.name },
                  component: 'components/parent-view',
                  children: [
                    {
                      path: 'data',
                      name: `${v.path}:data`,
                      meta: { icon: 'md-link', title: '数据获取' },
                      component: 'view/source-data/manage/data/',
                      props: { code: v.code }
                    },
                    {
                      path: 'analysis',
                      name: `${v.path}:analysis`,
                      meta: { icon: 'md-link', title: '数据分析审核' },
                      component: 'view/source-data/manage/analysis/',
                      props: { code: v.code }
                    },
                    {
                      path: 'current',
                      name: `${v.path}:current`,
                      meta: { icon: 'md-link', title: '现势数据' },
                      component: 'view/source-data/manage/current/',
                      props: { code: v.code }
                    }
                  ]
                }
              })
            },
            {
              path: '/shortVideo',
              name: 'shortVideo',
              code: 'shortVideo',
              meta: {icon: 'md-cube', title: '短视频管理'},
              component: 'components/main',
              children: [
                {
                  path: 'videoAudit',
                  name: 'videoAudit',
                  code: 'videoAudit',
                  meta: {icon: 'ios-film', title: '短视频审核'},
                  component: 'view/short-video/'
                }
              ]
            },
            {
              path: '/training',
              name: 'training',
              code: 'training',
              meta: {icon: 'md-attach', title: '培训模块管理'},
              component: 'components/main',
              children: [
                {
                  path: 'recruitment/audit',
                  name: 'training:recruitment:audit',
                  code: 'training:recruitment:audit',
                  meta: {icon: 'ios-body', title: '招聘信息审核'},
                  component: 'view/training/recruitment/audit'
                },
                {
                  path: 'longVideo/create',
                  name: 'training:longVideo:create',
                  code: 'training:longVideo:create',
                  meta: {icon: 'ios-body', title: '添加长视频'},
                  component: 'view/training/longVideo/create'
                },
                {
                  path: 'longVideo/audit',
                  name: 'training:longVideo:audit',
                  code: 'training:longVideo:audit',
                  meta: {icon: 'ios-body', title: '审核长视频'},
                  component: 'view/training/longVideo/audit'
                }
              ]
            }
          ]
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
