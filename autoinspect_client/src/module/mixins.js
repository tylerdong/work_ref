import Vue from 'vue'
import * as api from '../api/index'
import store from './storage'

Vue.mixin({
  data () {
    return {}
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
      api.innerDefect.getLineConfig({}).then(response => {
        let data = response.data.data
        if (data === '') {
          this.$router.push({name: 'sys-setting'})
        } else {
          const config = data
          this.$store.dispatch('setAppname', config.appname)
          this.$store.dispatch('setAppentrance', config.appentrance)
          this.$store.dispatch('setClassesnum', config.classesnum)
          this.$store.dispatch('setFactory', config.factory)
          this.$store.dispatch('setWorkshop', config.workshop)
          this.$store.dispatch('setLinename', config.linename)
          this.$store.dispatch('setProductType', config.producttype)
          this.$store.dispatch('setClassPeriod', config.classPeroid)
          let paralletlLines = [
            {
              linecode: config.linecode,
              lineName: `${config.factory}${config.linename}`,
              ip: window.global.ajaxDefectInnerUrl
            }
          ]
          if (config.pcParallelLineConfigs.length > 0) {
            for (let i = 0; i < config.pcParallelLineConfigs.length; i++) {
              paralletlLines.push(
                {
                  linecode: config.pcParallelLineConfigs[i].parallelLineCode,
                  lineName: config.pcParallelLineConfigs[i].parallelLineName,
                  ip: config.pcParallelLineConfigs[i].parallelLineIp
                }
              )
            }
          }
          store.setParallelLineConfigs(paralletlLines, true)
          if (this.$router.currentRoute.name === 'tobe-color') {
            let {name, query} = this.$router.currentRoute
            this.$router.push({name, query})
          } else {
            if (config.id) {
              this.$router.push({name: config.appentrance})
            } else {
              this.$router.push({name: 'sys-setting'})
            }
          }
        }
      }).catch(e => {
        this.$message({type: 'error', message: e.message})
        this.$router.push({name: 'sys-setting'})
      })
    },
    plConfigs () {
      return store.getParallelLineConfigs(true)
    }
  }
})
