<template>
  <jk-dialog title="新增" :visible.sync="dialogVisible" width="500px">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="降等原因" prop="downGradeReasonId">
          <el-tag type="primary" v-if="form.downGradeReasonId">
            {{form.downGradeReasonName}}
          </el-tag>
          <el-button type="primary" @click="btnDownReason">选择</el-button>
        </el-form-item>
        <el-form-item label="降等划分" prop="levelId">
          <el-select v-model="form.levelId" placeholder="请选择">
            <el-option
              v-for="item in levelList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>

    <dialog-down-reason ref="refDownReason" @callback="callbackDownReason"></dialog-down-reason>
  </jk-dialog>
</template>

<script>
  import * as api from 'src/api'
//  import storage from 'storage'
  export default {
    props: ['levelList', 'positionList'],
    components: {
      'jkDialog': require('common/dialog-side.vue'),
      'dialog-down-reason': require('./dialog-down-reason.vue')
    },
    data () {
      return {
        dialogVisible: false,
        form: {
          downGradeReasonName: '',
          downGradeReasonId: '',
          levelId: '',
          positionId: '',
          remark: ''
        },
        formRules: {
          downGradeReasonId: [
            { required: true, message: '请选择降等原因', trigger: 'change blur' }
          ],
          levelId: [
            { required: true, message: '请选择降等划分', trigger: 'change blur' }
          ],
          positionId: [
            { required: true, message: '请选择职位', trigger: 'change blur' }
          ],
          remark: [
            { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'change blur' }
          ]
        }
      }
    },
    mounted () {
    },
    methods: {
      show () {
        this.$refs.ruleForm.resetFields()
        this.dialogVisible = true
      },
      btnDownReason () {
        this.$refs.refDownReason.show(this.form.downGradeReasonId)
      },
      callbackDownReason (item) {
        this.form.downGradeReasonName = item.name
        this.form.downGradeReasonId = item.id
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('新增之后无法删除，是否确认新增?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                  instance.confirmButtonLoading = true
                  let params = {
                    downGradeReasonId: this.form.downGradeReasonId,
                    levelId: this.form.levelId,
                    positionId: this.form.positionId,
                    remark: this.form.remark
                  }
                  api.automatic.productInfo.addExceptionInfo(params).then((response) => {
                    const data = response.data
                    if (data.messageType === 1) {
                      this.dialogVisible = false
                      this.$emit('submitSuccess')
                    }
                  }).finally(() => {
                    instance.confirmButtonLoading = false
                    done()
                  })
                } else {
                  instance.confirmButtonLoading = false
                  done()
                }
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
