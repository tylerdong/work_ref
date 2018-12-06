const sysConfig = [
  {
    path: '/sys-setting',
    name: 'sys-setting',
    meta: {title: '系统配置', icon: 'list', premission: 'innerSearch'},
    component (resolve) {
      require(['../../components/sys-setting/client.vue'], resolve)
    }
  }
]
export default sysConfig
