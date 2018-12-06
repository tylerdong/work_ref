<template>
  <dialog-side width="380px" :title="dialog.title" :visible.sync="dialog.visible">
    <el-form :model="form" :rules="rules" ref="form" :label-width="formLabelWidth">
      <el-form-item label="异常原因" prop="reaName">
        <el-input v-model="form.reaName" placeholder="请输入异常原因"></el-input>
      </el-form-item>
      <el-form-item label="异常原因类别" prop="reaReasontypeId">
        <el-select v-model="form.reaReasontypeId" placeholder="请选择异常原因类别" class="input-item-18">
          <el-option v-for="item in downGradeList" :label="item.typName" :value="item.typId"
                     :key="item.reaId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="编号" prop="reaCode">
        <el-input v-model="form.reaCode" placeholder="请输入编号"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.reaDescripe" placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading.confirm" @click="sureBtn('form')">确 定</el-button>
      </el-form-item>
    </el-form>
  </dialog-side>
</template>

<script>
  import * as api from '../../../../api/index'
  import storage from 'storage'
  export default {
    components: { 'dialog-side': require('../../../common/dialog-side.vue') },
    props: ['downGradeList'],
    mounted () {
      this.userInfo = storage.getUser()
    },
    data () {
      return {
        dialog: {title: '新增', visible: false},
        userInfo: {},
        form: {
          reaId: '',
          reaName: '',
          reaCode: '',
          reaReasontypeId: '',
          reaDescripe: ''
        },
        rules: {
          reaName: [{ required: true, message: '请填写异常原因', trigger: 'blur' }],
          reaCode: [{ required: true, message: '请填写编号', trigger: 'blur' }],
          reaReasontypeId: [{ required: true, message: '请选择异常原因类别', trigger: 'blur' }]
        },
        loading: { confirm: false },
        formLabelWidth: '120px'
      }
    },
    methods: {
      toggle (data) {
        this.dialog.visible = true
        this.dialog.title = data ? '修改' : '新增'
        this.$refs.form.resetFields()
        if (data) {
          this.form.reaId = data.reaId
          this.form.reaName = data.reaName
          this.form.reaCode = data.reaCode
          this.form.reaReasontypeId = data.reaReasontypeId
          this.form.downGradeReasonTypeName = data.downGradeReasonTypeName
          this.form.reaDescripe = data.reaDescripe
        }
      },
      sureBtn (form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            this.loading.confirm = false
            let params = {
              downGradeReasonName: this.form.reaName,
              downGradeReasonNumber: this.form.reaCode,
              downGradeReasonTypeId: this.form.reaReasontypeId,
              downGradeReasonDescripe: this.form.reaDescripe,
              employeeId: this.userInfo.userId
            }
            if (this.dialog.title === '新增') {
              api.mdm.addDownGradeReason(params).then(response => {
                if (response.data.messageType === 1) {
                  this.$emit('callback')
                  this.dialog.visible = false
                } else {
                  this.$message.error(response.data.message)
                }
              }).catch(e => {
                console.error(e)
              }).finally(() => {
                this.loading.confirm = false
              })
            } else {
              params = Object.assign(params, {downGradeReasonId: this.form.reaId})
              api.mdm.updateDownGradeReason(params).then(response => {
                if (response.data.messageType === 1) {
                  this.$emit('callback')
                  this.dialog.visible = false
                } else {
                  this.$message.error(response.data.message)
                }
              }).catch(e => {
                console.error(e)
              }).finally(() => {
                this.loading.confirm = false
              })
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-checkbox-group{
    border: 1px solid rgb(191, 204, 217);
    padding: 10px;
    border: 1px solid #bfccd9;
    border-radius: 5px;
    height: 250px;
    overflow: auto;
    .el-checkbox{
      display: block;
      margin-left: 15px;
      font-weight: normal;
    }
  }
</style>
