<template>
  <dialog-side width="40%" title="修改" :visible.sync="dialogFormVisible">
    <el-form :model="newInfo" :rules="rules" ref="newInfo">
      <el-form-item label="调度计划" prop="cron">
        <el-input v-model="newInfo.cron" placeholder="请输入调度字符串" class="input-item-28"></el-input>
      </el-form-item>
      <el-form-item label="是否开启" prop="valid_flag">
        <el-switch v-model="newInfo.valid_flag" active-color="#13ce66" inactive-color="#ff4949" active-value="Y" inactive-value="N"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading.submit" type="primary" @click="sureBtn('newInfo')">确 定</el-button>
      </el-form-item>
    </el-form>
  </dialog-side>
</template>

<script>
  import * as api from '../../../../api/index'
  import storage from 'storage'
  import dateFns from 'date-fns'
  export default {
    components: {
      'dialog-side': require('../../../common/dialog-side.vue')
    },
    props: ['workShopList', 'type', 'productList'],
    mounted () {
      this.userInfo = storage.getUser()
    },
    data () {
      return {
        loading: {
          submit: false
        },
        userInfo: {},
        title: '',
        dialogFormVisible: false,
        newInfo: {
          cron: '',
          scheduleCode: '',
          scheduleDescribe: '',
          valid_flag: ''
        },
        rules: {
          cron: [
            { required: true, message: '请填写调度字符串', trigger: 'blur change' },
            {
              trigger: 'blur change',
              validator (rule, value, callback) {
                if (value) {
                  api.automatic.other.isValidCrontabExpression({cron: value}).then(response => {
                    const data = response.data
                    if (data.messageType === 1) {
                      if (data.data) {
                        callback()
                      } else {
                        callback(new Error('调度字符串不符合规则'))
                      }
                    } else {
                      callback(new Error(data.message))
                    }
                  })
                } else {
                  callback(new Error('请填写调度字符串'))
                }
              }
            }
          ]
        }
      }
    },
    methods: {
      toggle (data) {
        this.dialogFormVisible = true
        this.newInfo.cron = data.cron
        this.newInfo.scheduleCode = data.scheduleCode
        this.newInfo.scheduleDescribe = data.scheduleDescribe
        this.newInfo.valid_flag = data.valid_flag
      },
      sureBtn () {
        this.$refs.newInfo.validate(valid => {
          if (valid) {
            this.loading.submit = true
            let params = {
              cron: this.newInfo.cron,
              flag: this.newInfo.valid_flag,
              scheduleCode: this.newInfo.scheduleCode,
              modifier: this.userInfo.userId,
              modifyTime: dateFns.format(new Date(), 'YYYY-MM-DD HH:mm ss')
            }
            api.automatic.statement.updateScheduleConfig(params).then((response) => {
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
