<!--调拨出库-->
<template>
  <div>
    <jk-nav class="l-jk-nav" :items="tabs" :activeName="activeName" @select="select"></jk-nav>
    <section class="hy-lab__data-section">
      <components :is="component" :label-info="labelInfo" :type-data="tabs"></components>
    </section>
  </div>
</template>
<script>
  export default {
    components: {
      'jkNav': require('src/components/common/nav.vue'),
      'monthly-rep': require('./monthly-rep.vue'),
      'daily-rep': require('./daily-rep'),
      'sales-statistics': require('./sales-statistics.vue'),
      'repack-rep': require('./repack-rep.vue'),
      'retrospect-rep': require('./retrospect-rep.vue'),
      'inventory-warning': require('./inventory-warning.vue')
    },
    data () {
      return {
        component: 'retrospect-rep',
        activeName: '追溯表',
        tabs: [
          // {id: 1, name: '出入库销售统计', component: 'sales-statistics'},
          // {id: 2, name: '翻包统计表', component: 'repack-rep'},
          {id: 3, name: '追溯表', component: 'retrospect-rep'},
          // {id: 4, name: '库存预警表', component: 'inventory-warning'},
          {id: 5, name: '产量月报表', component: 'monthly-rep'},
          {id: 6, name: '产量日报表', component: 'daily-rep'}
        ],
        labelInfo: {
          id: 3,
          name: '追溯表',
          component: 'retrospect-rep'
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

<style>
  .l-jk-nav a {
    width: 110px !important;
  }
</style>
