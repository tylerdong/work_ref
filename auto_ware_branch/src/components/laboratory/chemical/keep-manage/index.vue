<!--留样管理-->
<template>
  <div>
    <!--<jk-breadcrumb></jk-breadcrumb>-->
    <jk-nav :items="tabs" :activeName="activeName" @select="tabSelect"></jk-nav>
    <section class="hy-lab__data-section">
      <components :is="activeComponent"></components>
    </section>
  </div>
</template>
<script>
  export default {
    components: {
      // 'jk-breadcrumb': require('common/breadcrumb.vue'),
      'jk-nav': require('common/nav.vue'),
      'wait': require('./wait.vue'),
      'already ': require('./already.vue')
    },
    data () {
      return {
        tabs: [
          {
            name: '待处理',
            component: 'wait'
          },
          {
            name: '已处理',
            component: 'already '
          }
        ],
        activeName: '',
        activeComponent: ''
      }
    },
    mounted () {
      this.activeName = this.tabs[0].name
      this.activeComponent = this.tabs[0].component
    },
    methods: {
      tabSelect (item) {
        this.activeName = item.name
        this.activeComponent = item.component
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
