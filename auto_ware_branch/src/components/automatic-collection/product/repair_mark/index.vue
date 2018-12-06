<!-- 补打唛头 -->
<template>
  <div>
    <jk-nav :items="tabs" :activeName="activeName" @select="select"></jk-nav>
    <section class="hy-lab__data-section">
      <keep-alive>
        <components :is="component" :label-info="labelInfo" :type-data="tabs" :batchNos="options.batchNos"
                   :warehouseList="options.warehouseList" :levels="options.levels"></components>
      </keep-alive>
    </section>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    components: {
      'jkNav': require('src/components/common/nav.vue'),
      'add-repair-mark': require('./add_repair_mark.vue'),
      'in-repair-mark': require('./in_repair_mark.vue')
    },
    data () {
      return {
        component: 'add-repair-mark',
        activeName: '待打印',
        tabs: [
          {id: 1, name: '待打印', component: 'add-repair-mark'},
          {id: 2, name: '已打印', component: 'in-repair-mark'}
        ],
        labelInfo: {
          id: 1,
          name: '待打印',
          component: 'add-repair-mark'
        },
        options: {
          batchNos: [],
          warehouseList: [],
          levels: []
        }
      }
    },
    mounted () {
      // TODO
      this.getAllBatchNo()
      this.getAllWarehouseList()
      this.getGradeOptions()
    },
    methods: {
      select (item) {
        this.activeName = item.name
        this.component = item.component
        this.labelInfo = item
      },
      // 获取所有批号
      getAllBatchNo () {
        api.storage.warehouseManagement.getAllBatch({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.batchNos = data.data.map(item => {
              return { value: item.batchNo }
            })
          }
        })
      },
      // 获取所有仓库
      getAllWarehouseList () {
        api.storage.warehouseMaintain.getAllWarehouseList({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.warehouseList = data.data
          }
        })
      },
      // 获取所有等级
      getGradeOptions () {
        api.automatic.dictionary.getAllSilkGradeList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.levels = data.data
          }
        })
      }
    }
  }
</script>
<style lang="sass" scoped>
</style>
