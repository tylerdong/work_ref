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
      'job-setting': require('./job-setting'),
      'factory-info': require('./factory-info')
    },
    data () {
      return {
        component: 'job-setting',
        activeName: '工种设置',
        tabs: [
          {id: 1, name: '工种设置', component: 'job-setting'},
          {id: 2, name: '工厂配置', component: 'factory-info'}
        ],
        labelInfo: {
          id: 1,
          name: '工种设置',
          component: 'job-setting'
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
