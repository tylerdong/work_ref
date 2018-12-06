<!--计量打印-->
<template>
  <div>
    <!--<main-breadcrumb nameId="020504"></main-breadcrumb>-->
    <jk-nav :items="tabs" :activeName="activeName" @select="select"></jk-nav>
    <section class="hy-lab__data-section">
      <components :is="component" :label-info="labelInfo" :type-data="tabs"></components>
    </section>
  </div>
</template>
<script>
  export default {
    components: {
      // 'main-breadcrumb': require('../../../common/breadcrumb.vue'),
      'jkNav': require('../../../common/nav.vue'),
      'print': require('./print.vue'),
      'printed': require('./printed.vue')
    },
    data () {
      return {
        component: 'print',
        activeName: '待打印',
        tabs: [
          {id: 1, name: '待打印', component: 'print'},
          {id: 2, name: '已打印', component: 'printed'}
        ],
        labelInfo: {
          id: 1,
          name: '待打印',
          component: 'print'
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
