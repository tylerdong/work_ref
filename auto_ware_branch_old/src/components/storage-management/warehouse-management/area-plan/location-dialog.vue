<template>
  <el-dialog title="禁用/启用库位" :visible.sync="visible" width="30%">
    <el-input v-model="reason" placeholder="请输入禁用原因"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="loading.submit" @click="comfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import * as api from 'src/api'
  export default {
    data () {
      return {
        visible: false,
        reason: '',
        banData: [],
        loading: { submit: false }
      }
    },
    methods: {
      open (data) {
        this.banData = data
        this.reason = ''
        this.visible = true
      },
      comfirm () {
        this.loading.submit = true
        let params = {
          status: 'BAN',
          banData: this.banData,
          remark: this.reason
        }
        api.storage.warehouseManagement.switchStorageStatus(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.visible = false
            this.$emit('submit-success')
          }
        }).finally(() => {
          this.loading.submit = false
        })
      }
    }
  }
</script>
