<template>
  <footer class="main-footer">
    <div class="pull-right hidden-xs">
      <template v-if="facConfig && facConfig.factoryName">{{facConfig.factoryName}}</template>
      <b>Version</b> 0.0.1
    </div>
    <strong>版权所有：恒逸集团 ©2010-2017 Zhejiang Hengyi Group Co. Ltd.</strong> All rights
    reserved.
  </footer>
</template>
<style lang="scss" scoped>
  .main-footer{
    padding: 5px 15px;
    font-size: 12px;
    color: #999;
    margin-left: 170px;
  }
</style>
<script>
  import * as adminlte from '../../static/vendor/admin-lte/adminlte'
  import storage from '../module/storage'
  import * as api from '../api'
  export default {
    mounted () {
      this.$nextTick(() => {
        adminlte.init()
      })
      this.setFactoryConfig()
    },
    data () {
      return {
        facConfig: {}
      }
    },
    methods: {
      setFactoryConfig () {
        this.facConfig = storage.getFactoryConfig()
        if (!this.facConfig) {
          api.storage.warehouseMaintain.selectFactory({factoryName: window.global.companyName}).then((response) => {
            const data = response.data
            if (data.messageType === 1) {
              storage.setFactoryConfig(data.data)
              this.facConfig = data.data
            } else {
              this.$message({type: 'error', message: data.message})
            }
          })
        }
      }
    }
  }
</script>
