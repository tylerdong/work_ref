<!--新增字典-->
<template>
  <el-dialog title="新增样品批号" :visible.sync="dialogToggle" @close="close" class="edit-dialog-template-dialog" width="30%">
    <el-form :model="form" :rules="formRules" ref="form" label-width="10rem">
      <el-form-item label="批号名称" prop="batchNumber">
        <el-input v-model="form.batchNumber" auto-complete="off" placeholder='请输入样品名称'
                  class="edit-dialog-template-input"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleConfirm('form')" :loading="loading">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script type="text/ecmascript-6">
  import * as api from 'src/api/index'
  import storage from 'storage'

  export default {
    created () {
    },
    data () {
      return {
        dialogToggle: false,
        user: {},
        formRules: {
          batchNumber: [
            {required: true, message: '请输入名称', trigger: 'change'},
            {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'change'}]
        },
        loading: false,
        form: {
          sampleId: '',
          id: '',
          name: ''
        }
      }
    },
    mounted () {
      this.user = storage.getUser()
    },
    computed: {},
    methods: {
      show (data) {
        console.log(data)
        this.form.sampleId = data.sampleId
        if (data.batchNumber) {
          this.form.batchNumber = data.batchNumber
          this.form.id = data.id
        } else {
          this.form.batchNumber = ''
          this.form.id = ''
        }
        this.dialogToggle = true
      },
      close () {
        this.dialogToggle = false
      },
      handleConfirm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            let params = {
              sampleId: this.form.sampleId,
              batchNumber: this.form.batchNumber,
              creator: this.user.userId,
              modifier: this.user.userId
            }
            if (this.form.id) {
              Object.assign(params, {id: this.form.id})
              api.physicalLaboratory.labCentralValueDictionaryController.updateLabCentralValueDictionary(params).then((response) => {
                let data = response.data
                if (data.success) {
                  this.close()
                  this.$emit('initData', this.form.sampleId)
                } else {
                  this.$message.error(data.errorMsg)
                }
              }).catch((e) => {
                console.log(e)
              }).finally(() => {
                this.loading = false
              })
            } else {
              api.physicalLaboratory.labCentralValueDictionaryController.createLabCentralValueDictionary(params).then((response) => {
                let data = response.data
                if (data.success) {
                  this.close()
                  this.$emit('initData', this.form.sampleId)
                } else {
                  this.$message.error(data.errorMsg)
                }
              }).catch((e) => {
                console.log(e)
              }).finally(() => {
                this.loading = false
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

