<!--染判-->
<template>
  <div>
    <!--<jk-breadcrumb nameId="020503"></jk-breadcrumb>-->
    <jk-nav :items="tabs" :activeName="activeName" @select="tabSelect"></jk-nav>
    <section class="hy-lab__data-section">
      <keep-alive>
        <components :is="activeComponent"></components>
      </keep-alive>
    </section>
  </div>
</template>
<script>
  export default {
    components: {
      // 'jk-breadcrumb': require('common/breadcrumb.vue'),
      'jk-nav': require('common/nav.vue'),
      'wait': require('./wait.vue'),
      'finished': require('./finished.vue')
    },
    data () {
      return {
        tabs: [
          {name: '待染判', component: 'wait'},
          {name: '已染判', component: 'finished'}
        ],
        activeName: '待染判',
        activeComponent: 'wait'
      }
    },
    mounted () {
    },
    methods: {
      tabSelect (item) {
        console.log(item)
        this.activeName = item.name
        this.activeComponent = item.component
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
