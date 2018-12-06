
// import sysConfig from './sys-config'
const innerSearch = [
  {
    path: '/manual-review',
    name: 'inner-search-manual-review',
    meta: {title: '人工外观复检', icon: 'user-check', premission: 'innerSearch'},
    component (resolve) {
      require(['../../components/inner-search/manual-review/index.vue'], resolve)
    }
  },
  {
    path: '/inner-search',
    name: 'inner-search',
    meta: {title: '历史查询', icon: 'search', premission: 'innerSearch'},
    component (resolve) {
      require(['../../components/inner-search/search/index.vue'], resolve)
    }
  },
  {
    path: '/inner-search/detail',
    name: 'inner-search-detail',
    meta: {title: '详情'},
    component (resolve) {
      require(['../../components/inner-search/search/detail.vue'], resolve)
    }
  },
  {
    path: '/inner-search/download-preview',
    name: 'inner-search-download-preview',
    meta: {title: '数据下载'},
    component (resolve) {
      require(['../../components/inner-search/search/download-preview.vue'], resolve)
    }
  },
  {
    path: '/tobe-color',
    name: 'tobe-color',
    meta: {title: '批次维护', icon: 'cog', premission: 'innerSearch'},
    component (resolve) {
      require(['../../components/inner-search/tube-color/index.vue'], resolve)
    }
  },
  {
    path: '/wechat-message',
    name: 'wechat-message',
    meta: {title: '微信日志', icon: 'comment', premission: 'innerSearch'},
    component (resolve) {
      require(['../../components/inner-search/wechat-message/index.vue'], resolve)
    }
  },
  {
    path: '/camera',
    name: 'camera',
    meta: {title: '相机设置', icon: 'camera', premission: 'innerSearch'},
    component (resolve) {
      require(['../../components/inner-search/camera/index.vue'], resolve)
    }
  }
]
export default innerSearch
