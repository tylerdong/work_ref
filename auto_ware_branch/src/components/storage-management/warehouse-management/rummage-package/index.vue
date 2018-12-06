<!--翻包-->
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
      'record': require('./record.vue'),
      'voucher': require('./voucher.vue')
    },
    data () {
      return {
        component: 'record',
        activeName: '翻包记录',
        tabs: [
          {id: 1, name: '翻包记录', component: 'record'},
          {id: 2, name: '翻包凭证', component: 'voucher'}
        ],
        labelInfo: {
          id: 1,
          name: '翻包记录',
          component: 'record'
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
