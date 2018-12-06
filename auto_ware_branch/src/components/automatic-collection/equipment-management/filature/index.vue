<!-- 丝车管理 -->
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
      'silkCar': require('./silk-car.vue'),
      'spec': require('./spec.vue')
    },
    data () {
      return {
        component: 'silkCar',
        activeName: '丝车',
        tabs: [
          {id: 1, name: '丝车', component: 'silkCar'},
          {id: 2, name: '规格', component: 'spec'}
        ],
        labelInfo: {
          id: 1,
          name: '丝车',
          component: 'silkCar'
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
