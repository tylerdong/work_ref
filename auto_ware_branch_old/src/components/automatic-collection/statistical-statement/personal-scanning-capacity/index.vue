<!-- 统计报表 -- 作业统计 -->
<template>
  <div>
    <!--<breadcrumb name-id="020901"></breadcrumb>-->
    <nav-simple :nav-list="nav.list" :select-nav-id="nav.selectNavId" @callback-select-nav="selectNav"></nav-simple>
    <component :is="nav.selectComponent" class="component"></component>
  </div>
</template>
<script>
  export default {
    components: {
      // 'breadcrumb': require('../../../common/breadcrumb.vue'),
      'nav-simple': require('../../../common/nav-simple.vue'),
      'day-statistics': require('./day-statistics.vue'),
      'month-statistics': require('./month-statistics.vue')
    },
    data () {
      return {
        nav: {
          list: [
            {id: '01', name: '按天统计', component: 'day-statistics'},
            {id: '02', name: '按月统计', component: 'month-statistics'}
          ],
          selectNavId: '01',
          selectComponent: 'day-statistics'
        }
      }
    },
    methods: {
      selectNav (nav) {
        this.nav.selectNavId = nav.id
        this.nav.selectComponent = nav.component
      }
    }
  }
</script>
<style lang="scss" scoped>
  .component {
    background: #fff;
    border: 1px solid #dee4ec;
    margin: 0 10px;
    padding: 10px;
    border-radius: 0 5px 5px 5px;
    position: relative;
    top: -1px;
  }
</style>
