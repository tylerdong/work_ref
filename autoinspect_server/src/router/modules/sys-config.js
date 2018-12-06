const sysConfig = [
  // {
  //   path: '/server-setting',
  //   name: 'sys-setting',
  //   meta: {title: '系统配置', icon: 'list', premission: [0]},
  //   component (resolve) {
  //     require(['../../components/sys-setting/server.vue'], resolve)
  //   }
  // },
  {
    path: '/line-manage',
    name: 'line-manage',
    meta: {title: '线别管理', icon: 'wrench', premission: [0]},
    component (resolve) {
      require(['../../components/sys-setting/line-manage/index.vue'], resolve)
    }
  },
  {
    path: '/user',
    name: 'user',
    meta: {title: '用户管理', icon: 'user', premission: [0]},
    component (resolve) {
      require(['../../components/sys-setting/user/index.vue'], resolve)
    }
  }
]
export default sysConfig
