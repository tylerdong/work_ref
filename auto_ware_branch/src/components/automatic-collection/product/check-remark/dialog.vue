<!--组件名-->
<template>
  <div>
    <jk-dialog
      title="备注录入"
      width="450px"
      :visible.sync="dialogVisible">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="降等原因" prop="downReason">
          <el-checkbox-group
            v-loading="loading.downReason"
            v-model="form.downReason">
            <el-checkbox v-for="item in downReasonOptions" :label="item.id"
                         :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading.submit" type="primary" @click="submit">确 定</el-button>
        </el-form-item>
      </el-form>
    </jk-dialog>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'src/module/storage'
  export default {
    components: {
      'jk-dialog': require('common/dialog-side.vue')
    },
    data () {
      return {
        workTypeDetail: null,
        form: {
          downReason: [],
          remark: ''
        },
        rules: {
          downReason: [
            { type: 'array', required: true, message: '请选择降等原因', trigger: 'blur' }
          ],
          remark: [
            {max: 64, message: '长度不能超过64个字符', trigger: 'change blur'}
          ]
        },
        downReasonOptions: [],
        nowItem: null,
        dialogVisible: false,
        loading: {
          downReason: false,
          submit: false
        }
      }
    },
    mounted () {
      this.getWorkTypeDetail()
    },
    methods: {
      getWorkTypeDetail () {
        let params = {
          workTypeId: storage.getUser().workTypeId
        }
        api.userCenter.getWorkTypeById(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.workTypeDetail = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.submit = false
        })
      },
      show (item) {
        this.getDownReasonOptions()
        this.$refs.form.resetFields()
        this.nowItem = item
        this.dialogVisible = true
      },
      getDownReasonOptions () {
        this.loading.downReason = true
        let params = {
          productProcessId: this.workTypeDetail.productionProcessId,
          workTypeId: storage.getUser().workTypeId
        }
        api.automatic.other.getDownGradeReasonList(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data)
            this.downReasonOptions = data.data
            this.form.downReason = [this.downReasonOptions[0].id]
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.downReason = false
        })
      },
      submit () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let downReasonString = this.form.downReason.join(',')
            this.loading.submit = true
            let params = {
              silkcarCode: this.nowItem.silkcarCode,
              productionProcessId: this.workTypeDetail.productionProcessId,
              employeeId: storage.getUser().employeeId,
              reasonId: downReasonString,
              remark: this.form.remark
            }
            api.automatic.productionProcess.silkCheckResult(params).then((response) => {
              const data = response.data
              if (data.messageType === 1) {
                console.log(data)
                this.dialogVisible = false
                this.$emit('submitSuccess')
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
<style lang="scss" scoped>
</style>
