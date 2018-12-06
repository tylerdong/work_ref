<!--组件名-->
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
      'jkNav': require('../../../common/nav.vue'),
      'realTime': require('./real-time.vue'),
      'history': require('./history.vue')
    },
    data () {
      return {
        component: 'realTime',
        activeName: '实时',
        tabs: [
          {id: 1, name: '实时', component: 'realTime'},
          {id: 2, name: '历史', component: 'history'}
        ],
        labelInfo: {
          id: 1,
          name: '实时',
          component: 'realTime'
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
