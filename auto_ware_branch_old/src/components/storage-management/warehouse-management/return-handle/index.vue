<!--退货原因-->
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
      'waiting': require('./waiting.vue'),
      'finished': require('./finished.vue')
    },
    data () {
      return {
        component: 'waiting',
        activeName: '待处理',
        tabs: [
          {id: 1, name: '待处理', component: 'waiting'},
          {id: 2, name: '已处理', component: 'finished'}
        ],
        labelInfo: {
          id: 1,
          name: '待处理',
          component: 'waiting'
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
