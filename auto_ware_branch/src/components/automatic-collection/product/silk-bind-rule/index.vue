<!--丝车绑定-->
<template>
  <div>
    <jk-nav :items="tabs" :activeName="activeName" @select="select"></jk-nav>
    <section class="hy-lab__data-section">
      <components :is="component" :label-info="labelInfo" :type-data="tabs" :shopList="option.shopList"
      :silkcarSpecList="option.silkcarSpecList" :doffTypes="option.doffTypes"></components>
    </section>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import {doffTypes} from 'value-label'
  export default {
    components: {
      'jkNav': require('../../../common/nav.vue'),
      'drop': require('./drop.vue'),
      'carpool': require('./carpool.vue')
    },
    data () {
      return {
        component: 'drop',
        activeName: '落筒',
        tabs: [
          {id: 1, name: '落筒', component: 'drop'},
          {id: 2, name: '拼车', component: 'carpool'}
        ],
        labelInfo: {
          id: 1,
          name: '落筒',
          component: 'drop'
        },
        option: {
          shopList: [],
          silkcarSpecList: [],
          doffTypes: []
        }
      }
    },
    mounted () {
      this.option.doffTypes = doffTypes
      this.getShopList()
      this.getSilkcarSpecNoPage()
    },
    methods: {
      select (item) {
        this.activeName = item.name
        this.component = item.component
        this.labelInfo = item
      },
      /* 获取所有车间信息 */
      getShopList () {
        this.option.shopList = []
        api.automatic.dictionary.getAllWorkshopList({}).then(response => {
          const data = response.data
          for (let item of data.data) {
            this.option.shopList.push({id: item.id, name: item.name})
          }
        })
      },
      // 获取丝车规格
      getSilkcarSpecNoPage () {
        api.automatic.device.getSilkcarSpecNoPage({desc: ''}).then((response) => {
          const data = response.data
          if (data.messageType === 1 && data.data.length > 0) {
            this.option.silkcarSpecList = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {})
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>

