<!--出入库记录-->
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
      'un-in-record': require('./un-in-record.vue'),
      'in-record': require('./in-record.vue'),
      'out-record': require('./out-record.vue'),
      'return-record': require('./return-record.vue')
    },
    data () {
      return {
        component: 'un-in-record',
        activeName: '待入库记录',
        tabs: [
          {id: 1, name: '待入库记录', component: 'un-in-record'},
          {id: 2, name: '入库记录', component: 'in-record'},
          {id: 3, name: '出库记录', component: 'out-record'},
          {id: 4, name: '退货记录', component: 'return-record'}
        ],
        labelInfo: {
          id: 1,
          name: '待入库记录',
          component: 'un-in-record'
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
