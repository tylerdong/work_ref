<!--调拨出库-->
<template>
  <div>
    <jk-nav :items="tabs" :activeName="activeName" @select="select"></jk-nav>
    <section class="hy-lab__data-section">
      <keep-alive>
        <components :is="component" :label-info="labelInfo" :type-data="tabs"></components>
      </keep-alive>
    </section>
  </div>
</template>
<script>
  export default {
    components: {
      'jkNav': require('src/components/common/nav.vue'),
      'sale-allot': require('./sale-allot.vue'),
      'return-allot': require('./return-allot.vue'),
      'exception-allot': require('./exception-allot.vue'),
      'silk-car-delivery': require('./silk-car-delivery')
    },
    data () {
      return {
        component: 'sale-allot',
        activeName: '销售调拨单',
        tabs: [
          {id: 1, name: '销售调拨单', component: 'sale-allot'},
          {id: 2, name: '退货调拨单', component: 'return-allot'},
          {id: 3, name: '异常调拨单', component: 'exception-allot'},
          {id: 4, name: '丝车发运', component: 'silk-car-delivery'}
        ],
        labelInfo: {
          id: 1,
          name: '销售调拨单',
          component: 'sale-allot'
        }
      }
    },
    mounted () {
    },
    methods: {
      select (item) {
        this.activeName = item.name
        this.component = item.component
        this.labelInfo = item
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
