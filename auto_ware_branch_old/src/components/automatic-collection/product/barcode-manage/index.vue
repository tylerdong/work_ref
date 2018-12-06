<!--丝锭条码-->
<template>
  <div>
    <!--<jk-breadcrumb nameId="020502"></jk-breadcrumb>-->
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
      'printing': require('./printing.vue'),
      'record': require('./record.vue')
    },
    data () {
      return {
        tabs: [{name: '条码打印', component: 'printing'}, {name: '打印记录', component: 'record'}],
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
