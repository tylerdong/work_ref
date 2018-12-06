<template>
  <el-dialog title="新增中心值" :visible.sync="dialogToggle" @close="close" class="edit-dialog-template-dialog" width="50%">
    <el-form :model="form" :rules="formRules" ref="form" label-width="6rem">
      <el-form-item label="名称" prop="attributeName">
        <el-input v-model="form.attributeName" auto-complete="off" placeholder='请输入字典选项'
                  class="edit-dialog-template-input" :disabled="dicNameDisabled"></el-input>
      </el-form-item>
      <el-form-item label="字典值" prop="attributeValue">
        <el-input v-model="form.attributeValue" auto-complete="off" placeholder='请输入字典选项'
                  class="edit-dialog-template-input"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleConfirm('form')" :loading="loading.confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script type="text/ecmascript-6">
  import * as api from 'src/api/index'
  import storage from 'storage'

  export default {
    data () {
      return {
        dialogToggle: false,
        dicNameDisabled: false,
        user: {},
        formRules: {
          attributeName: [
            {required: true, message: '请输入名称', trigger: 'change'},
            {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'change'}],
          attributeValue: [
            {required: true, message: '请输入名称', trigger: 'change'},
            {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'change'}]
        },
        loading: {
          confirm: false
        },
        form: {
          dictionaryId: '',
          attributeName: '',
          attributeValue: ''
        },
        formData: {}
      }
    },
    mounted () {
      this.user = storage.getUser()
    },
    computed: {},
    methods: {
      show (data) {
        console.log(data)
        this.formData = data
        this.dialogToggle = true
        this.$nextTick(() => {
          if (data.action === 'add') {
            this.$refs.form.resetFields()
            this.dictionaryId = data.dictionaryId
            this.dicNameDisabled = false
          } else {
            this.form.attributeName = data.attributeName
            this.form.attributeValue = data.attributeValue
            this.dictionaryId = data.dictionaryId
            this.dicNameDisabled = true
          }
        })
      },
      close () {
        this.dialogToggle = false
      },
      handleConfirm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading.confirm = true
            if (this.formData.action === 'add') {
              let params = {
                dictionaryId: this.dictionaryId,
                attributeName: this.form.attributeName,
                attributeValue: this.form.attributeValue,
                creator: this.user.userId,
                modifier: this.user.userId
              }
              api.physicalLaboratory.labCentralValueDictionaryController.createLabCentralValueDictionaryLine(params).then((response) => {
                let data = response.data
                if (data.success) {
                  this.close()
                  this.$emit('initData', this.dictionaryId)
                } else {
                  this.$message.error(data.errorMsg)
                }
              }).catch((e) => {
                console.log(e)
              }).finally(() => {
                this.loading.confirm = false
              })
            } else {
              let params = {
                id: this.formData.id,
                attributeValue: this.form.attributeValue,
                creator: this.user.userId,
                modifier: this.user.userId
              }
              api.physicalLaboratory.labCentralValueDictionaryController.updateLabCentralValueDictionaryLine(params).then((response) => {
                let data = response.data
                if (data.success) {
                  this.close()
                  this.$emit('initData', this.dictionaryId)
                } else {
                  this.$message.error(data.errorMsg)
                }
              }).catch((e) => {
                console.log(e)
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
<style>
</style>
