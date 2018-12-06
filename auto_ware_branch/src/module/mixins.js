import Vue from 'vue'
Vue.mixin({
  methods: {
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
    sumCallBack (x, y) {
      return x + y
    }
  },
  computed: {
    componyConfig () {
      let config = window.global.companys.find(company => {
        return company.current === true
      })
      return config
    }
  }
})
