<!--新增字典-->
<template>
  <el-dialog title="字典" :visible.sync="dialogToggle" @close="close"
             width="30%" class="edit-dialog-template-dialog">
    <el-form :model="form" :rules="formRules" ref="form" label-width="10rem">
      <el-form-item label="模板名称" prop="name">
        <el-input v-model="form.name" auto-complete="off" placeholder='请输入字典名称'
                  class="edit-dialog-template-input"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleConfirm('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script type="text/ecmascript-6">
  import * as api from 'src/api'
  import storage from 'storage'

  export default {
    created () {
    },
    data () {
      return {
        dialogToggle: false,
        user: {},
        formRules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'change'},
            {min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'change'}]
        },
        loading: false,
        form: {
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
        if (data) {
          this.form.name = data.name
          this.form.id = data.id
        } else {
          this.form.name = ''
          this.form.id = ''
        }
        this.dialogToggle = true
      },
      close () {
        this.dialogToggle = false
      },
      handleConfirm (formName) {
//        debugger
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              name: this.form.name,
              creator: this.user.userId,
              modifier: this.user.userId
            }
            if (this.form.id) {
              Object.assign(params, {id: this.form.id})
              api.chemicalLaboratory.labSelectStaticMap.updateLabSelectStaticMapDo(params).then((response) => {
                let data = response.data
                if (data.success) {
                  this.close()
                  this.$emit('initData')
                } else {
                  this.$message.error(data.errorMsg)
                }
              }).catch((e) => {
                console.log(e)
              }).finally(() => {})
            } else {
              api.chemicalLaboratory.labSelectStaticMap.createLabSelectStaticMapDo(params).then((response) => {
                let data = response.data
                if (data.success) {
                  this.close()
                  this.$emit('initData')
                } else {
                  this.$message.error(data.errorMsg)
                }
              }).catch((e) => {
                console.log(e)
              }).finally(() => {})
            }
          }
        })
      }
    }
  }
</script>
<style>
</style>
