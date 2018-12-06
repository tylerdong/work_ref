<template>
  <jk-dialog title="修改" :visible.sync="dialogVisible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="降等原因" prop="downGradeReasonId">
          <el-tag type="primary" v-if="form.downGradeReasonId">
            {{form.downGradeReasonName}}
          </el-tag>
          <el-button type="primary" size="small" @click="btnDownReason">选择</el-button>
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
          <el-button :loading="loading.submit" type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
          id: '',
          downGradeReasonName: '',
          downGradeReasonId: '',
          levelId: '',
          positionId: '',
          remark: ''
        },
        loading: {
          submit: false
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
      show (listItem) {
        this.$refs.ruleForm.resetFields()
        this.form.id = listItem.row.id
        this.form.downGradeReasonName = listItem.row.downGradeReasonName
        this.form.downGradeReasonId = listItem.row.downGradeReasonId
        this.form.levelId = listItem.row.levelId
        this.form.positionId = listItem.row.positionId
        this.form.remark = listItem.row.remark
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
            this.loading.submit = true
            let params = {
              id: this.form.id,
              downGradeReasonId: this.form.downGradeReasonId,
              levelId: this.form.levelId,
              positionId: this.form.positionId,
              remark: this.form.remark
            }
            api.automatic.productInfo.updateExceptionInfo(params).then((response) => {
              const data = response.data
              if (data.messageType === 1) {
                this.dialogVisible = false
                this.$emit('submitSuccess')
              }
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
