<!--异常处理-->
<template>
  <div>
    <jk-nav :items="tabs" :activeName="activeName" @select="select"></jk-nav>
    <section class="hy-lab__data-section">
      <components :is="component" :label-info="labelInfo" :type-data="tabs"></components>
    </section>
  </div>
</template>
<script>
  export default {
    components: {
      'jkNav': require('src/components/common/nav.vue'),
      'in-exception': require('./in-exception.vue'),
      'pickup-exception': require('./pickup-exception.vue'),
      'post-exception': require('./post-exception.vue')
    },
    data () {
      return {
        component: 'in-exception',
        activeName: '待入库SAP',
        tabs: [
          {id: 1, name: '待入库SAP', component: 'in-exception'},
          {id: 2, name: '拣配异常', component: 'pickup-exception'},
          {id: 3, name: '过账异常', component: 'post-exception'}
        ],
        labelInfo: {
          id: 1,
          name: '待入库SAP',
          component: 'in-exception'
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
