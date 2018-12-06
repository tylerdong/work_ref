import Vue from 'vue'
import * as api from '../api/index'
Vue.mixin({
  data () {
    return {
      pubKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCUk6bdtPYlsai4GnMzwPhTijZgISjxV0HWQd167eexfgntgPlXXGFrmE6peH7lPC944S7YtZY9Wk8UR2GDn1koB2pklyGclVhaOJEiQYHSUCyNR5ztii+Mbjsxg88jYN+u2nSECKpsl9Fk5hXL/i6fyVB3z0ZSxxbJ3m8cekUMLwIDAQAB'
    }
  },
  computed: {
    deployed () {
      let app = window.global.app.find(item => {
        return item.current === true
      })
      let company = window.global.company.find(item => {
        return item.current === true
      })
      return {app, company}
    }
  },
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
    getLineConfig () {
      api.defect.getServer({}).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          let data = response.data.data
          this.$store.dispatch('setAppname', data.appname)
          this.$store.dispatch('setAppentrance', data.appentrance)
          this.$store.dispatch('setClassesnum', data.classesnum)
          if (data === '') {
            this.$router.push({name: 'sys-setting'})
          } else {
            this.$router.push({name: data.appentrance})
          }
        } else {
          this.$message({type: 'error', message: data.meta.message})
        }
      }).catch(e => {
        this.$message({type: 'error', message: e.message})
      }).finally(() => {
      })
    }
  }
})
