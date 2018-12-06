<template>
  <div>
    <main-breadcrumb nameId="0105"></main-breadcrumb>
    <jk-nav :items="tabs" :activeName="activeName" @select="select"></jk-nav>
    <section class="hy-lab__data-section">
      <components :is="component" :label-info="labelInfo" :type-data="tabs"></components>
    </section>
  </div>
</template>

<script>
//  import * as api from '../../../api'
  export default {
    components: {
      'main-breadcrumb': require('../../common/breadcrumb.vue'),
      'jkNav': require('../../common/nav.vue'),
      'receive': require('./receive.vue'),
      'deliver': require('./deliver.vue')
    },
    data () {
      return {
        component: 'receive',
        activeName: '我接收的',
        tabs: [
          {name: '我接收的', component: 'receive'},
          {name: '我发布的', component: 'deliver'}
        ],
        labelInfo: ''
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
//        let params = {}
//        api.laboratory.materialManagement.getMaterialTypeList(params).then(response => {
//          if (response.data.messageType === 1) {
//            console.log(response)
//            return true
//          }
//          if (response.data.messageType === 2) {
//            this.$message.error(response.data.message)
//            return true
//          }
//        }).catch(e => {
//          console.error(e)
//        }).finally(() => {
//          this.loading = false
//        })
      },
      select (item) {
        this.activeName = item.name
        this.component = item.component
        this.labelInfo = item
      }
    }
  }
</script>

<style scoped lang="scss">
</style>

