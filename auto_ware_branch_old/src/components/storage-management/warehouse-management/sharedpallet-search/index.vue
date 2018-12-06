<!--组件名-->
<template>
  <div>
    <jk-nav :items="tabs" :activeName="activeName" @select="select"></jk-nav>
    <section class="hy-lab__data-section">
      <components :is="component" :label-info="labelInfo" :type-data="tabs" :palletCodes="palletCodes"
                  :batcheItems="batcheItems" :levels="levels" :palletStatus="palletStatus" :palletHistory="palletHistory">
      </components>
    </section>
  </div>
</template>
<script>
  import * as api from 'api/index'
  import {palletStatus} from './../../value-label'
  export default {
    components: {
      'jkNav': require('../../../common/nav.vue'),
      'realTime': require('./real-time.vue'),
      'history': require('./history.vue'),
      'outbound': require('./outbound-query')
    },
    data () {
      return {
        component: 'realTime',
        activeName: '实时',
        tabs: [
          {id: 1, name: '实时', component: 'realTime'},
          {id: 2, name: '历史', component: 'history'},
          {id: 3, name: '出库追溯', component: 'outbound'}
        ],
        labelInfo: {
          id: 1,
          name: '实时',
          component: 'realTime'
        },
        batcheItems: [],
        levels: [],
        palletCodes: [],
        palletStatus: palletStatus,
        palletHistory: []
      }
    },
    mounted () {
      this.getAllBatchList()
      this.getAllLevel()
      this.getPalletCodes()
      this.getPalletHistoryTypes()
    },
    methods: {
      select (item) {
        this.activeName = item.name
        this.component = item.component
        this.labelInfo = item
      },
      getAllBatchList () {
        api.storage.warehouseManagement.getAllBatch({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.batcheItems = data.data.map(item => {
              return {value: item.batchNo}
            })
          } else {
            this.$message({type: 'error', message: data.message})
            this.batcheItems = []
          }
        }).catch(e => {
          console.error(e)
        })
      },
      getAllLevel () {
        api.storage.warehouseManagement.getAllLevel({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.levels = data.data
          } else {
            this.$message({type: 'error', message: data.message})
            this.levels = []
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      getPalletCodes () {
        api.storage.warehouseManagement.getPalletCodes({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.palletCodes = data.data.map(item => {
              return {value: item}
            })
          } else {
            this.$message({type: 'error', message: data.message})
            this.palletCodes = []
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      getPalletHistoryTypes () {
        api.storage.warehouseManagement.getPalletTypes({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.palletHistory = data.data
          } else {
            this.$message({type: 'error', message: data.message})
            this.palletHistory = []
          }
        }).catch((e) => {
          console.log(e)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
