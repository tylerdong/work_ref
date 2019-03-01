import Vue from 'vue'
import {eventHub} from '../eventHub'
import config from '@/config'
import store from '@/store'
Vue.mixin({
  data () {
    return {
      statusColor: [
        {key: '0', name: '未知', color: '#FFA2D3'},
        {key: '1', name: '草稿', color: 'green'},
        {key: '2', name: '待编辑', color: 'geekblue'},
        {key: '3', name: '待审核', color: 'blue'},
        {key: '4', name: '一审完成', color: 'green'},
        {key: '5', name: '二审完成', color: '#19be6b'},
        {key: '6', name: '审核失败', color: 'error'},
        {key: '7', name: '废弃', color: 'red'},
        {key: '8', name: '下架', color: 'magenta'}
      ]
    }
  },
  methods: {
    /**
     * 关闭当前tab页面
     */
    closeCurrent () {
      let current = {
        meta: this.$route.meta,
        name: this.$route.name,
        params: this.$route.params,
        query: this.$route.query
      }
      let res = []
      this.$store.state.app.tagNavList.forEach(item => {
        if (item.name !== current.name) {
          res.push({meta: item.meta, name: item.name, params: item.params, query: item.query})
        }
      })
      eventHub.$emit('closeCurrentTab', res, undefined, current)
    },
    /**
     * tab已存在再次打开tab，并传入数据；否则新开tab
     * @param name 路由名字
     * @param data 传入数据对象
     */
    goToTab (name, data) {
      let item = this.$store.state.app.tagNavList.find(item => item.name === name)
      if (item) {
        if (data) {
          item.params.id = data.id
        }
        eventHub.$emit('goToTab', item)
      } else {
        if (data) {
          this.$router.push({name: name, params: {id: data.id}})
        } else {
          this.$router.push({name: name})
        }
      }
    },
    /**
     * 深拷贝一个对象
     * @param source 源
     * @returns 拷贝后的对象
     */
    deepClone (source) {
      if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'shallowClone')
      }
      const targetObj = source.constructor === Array ? [] : {}
      for (const keys in source) {
        if (source.hasOwnProperty(keys)) {
          if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = source[keys].constructor === Array ? [] : {}
            targetObj[keys] = this.deepClone(source[keys])
          } else {
            targetObj[keys] = source[keys]
          }
        }
      }
      return targetObj
    },
    getCurrentBaseUrl () {
      let baseUrl = config.baseUrl.pro
      switch (process.env.NODE_ENV) {
        case 'development':
          baseUrl = config.baseUrl.dev
          break
        case 'devtest':
          baseUrl = config.baseUrl.devtest
          break
        default:
          baseUrl = config.baseUrl.pro
          break
      }
      return baseUrl
    },
    /**
     * 判断是否有权限
     * @param value
     */
    hasPromission (value) {
      let result = false
      if (value) {
        result = store.state && store.state.user && store.state.user.resources && store.state.user.resources.includes(value)
      }
      return result
    }
  }
})
