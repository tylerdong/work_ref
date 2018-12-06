const search = [
  {
    path: '/search',
    name: 'search',
    meta: { title: '查询', icon: 'search', premission: [0, 1] },
    component (resolve) {
      require(['../../components/server/search/index.vue'], resolve)
    }
  },
  {
    path: '/search/detail',
    name: 'search-detail',
    meta: { title: '详情' },
    component (resolve) {
      require(['../../components/server/search/detail.vue'], resolve)
    }
  },
  {
    path: '/search/download-preview',
    name: 'search-download-preview',
    meta: {title: '数据下载'},
    component (resolve) {
      require(['../../components/server/search/download-preview.vue'], resolve)
    }
  },
  {
    path: '/log-search',
    name: 'log-search',
    meta: { title: '日志查询', icon: 'file', premission: [0, 1] },
    component (resolve) {
      require(['../../components/server/log-search/index.vue'], resolve)
    }
  },
  {
    path: '/line-inspect',
    name: 'line-inspect',
    meta: { title: '线别监控', icon: 'file-video', premission: [0, 1] },
    component (resolve) {
      require(['../../components/server/line-inspect/index.vue'], resolve)
    }
  }
]
export default search
