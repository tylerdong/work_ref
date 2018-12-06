<template>
  <dialog-side width="40%" title="修改" :visible.sync="dialogFormVisible">
    <el-form :model="newInfo" :rules="rules" ref="newInfo">
      <el-form-item label="请求频率" prop="request">
        <el-input-number v-model="newInfo.request" placeholder="请输入调度字符串":min="1" :max="9999999"
                         class="input-item-18" ></el-input-number>
      </el-form-item>
      <el-form-item v-if="newInfo.refresh && newInfo.refresh > 0" label="刷新频率" prop="refresh">
        <el-input-number v-model="newInfo.refresh" placeholder="请输入调度字符串" :min="1" :max="9999999"
                         class="input-item-18"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading.submit" type="primary" @click="btnSubmit()">确 定</el-button>
      </el-form-item>
    </el-form>
  </dialog-side>
</template>
<script>
  import * as api from './../../../../api'
  import storage from 'storage'
  import dateFns from 'date-fns'
  export default {
    components: {
      'dialog-side': require('common/dialog-side.vue')
    },
    props: ['workShopList', 'type', 'productList'],
    mounted () {
      this.userInfo = storage.getUser()
    },
    data () {
      return {
        userInfo: {},
        loading: {
          submit: false
        },
        title: '',
        dialogFormVisible: false,
        newInfo: {
          request: '',
          refresh: '',
          taskId: ''
        },
        rules: {
          request: [{ required: true, message: '请填写请求频率', trigger: 'blur change' }],
          refresh: [{ required: true, message: '请填写刷新频率', trigger: 'blur change' }]
        }
      }
    },
    methods: {
      toggle (data) {
        this.dialogFormVisible = true
        this.newInfo.request = data.requestInterval
        this.newInfo.refresh = data.refreshInterval
        this.newInfo.taskId = data.taskId
      },
      btnSubmit () {
        this.$refs.newInfo.validate(valid => {
          if (valid) {
            this.loading.submit = true
            let params = {
              taskId: this.newInfo.taskId,
              refresh: this.newInfo.refresh,
              request: this.newInfo.request,
              modifier: this.userInfo.userId,
              modifyTime: dateFns.format(new Date(), 'YYYY-MM-DD HH:mm ss')
            }
            api.automatic.statement.updateBoardConfig(params).then((response) => {
              const data = response.data
              if (data.messageType === 1) {
                this.dialogFormVisible = false
                this.$emit('confirmSuccess')
              }
            }).catch((e) => {
              console.log(e)
            }).finally(() => {
              this.loading.submit = false
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
