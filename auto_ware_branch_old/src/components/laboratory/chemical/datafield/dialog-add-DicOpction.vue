<!--新增字典-->
<template>
  <el-dialog title="新增字典选项" :visible.sync="dialogToggle" width="30%" @close="close"
             class="edit-dialog-template-dialog">
    <el-form :model="form" :rules="formRules" ref="form" label-width="10rem">
      <el-form-item label="模板名称" prop="name">
        <el-input v-model="form.name" auto-complete="off" placeholder='请输入字典选项'
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
      show (id) {
        this.form.id = id
        this.dialogToggle = true
      },
      close () {
        this.dialogToggle = false
      },
      handleConfirm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              parentId: this.form.id,
              name: this.form.name,
              creator: this.user.userId,
              modifier: this.user.userId
            }
            api.chemicalLaboratory.labSelectStaticMap.createLabSelectStaticMapDo(params).then((response) => {
              let data = response.data
              if (data.success) {
                this.close()
                this.$emit('initOpcData')
              } else {
                this.$message.error(data.errorMsg)
              }
            }).catch((e) => {
              console.log(e)
            }).finally(() => {})
          }
        })
      }
    }
  }
</script>
<style>
</style>
