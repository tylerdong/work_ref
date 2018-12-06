<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" custom-class="my-dialog">
    <el-form :model="dialogData" :rules="rules" ref="dialogData" :label-width="formLabelWidth">
      <el-form-item label="批号" prop="libraryPlanBatchno">
        <el-input  v-model="dialogData.libraryPlanBatchno" placeholder="请输入批号"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="libraryPlanNum">
        <el-input v-model="dialogData.libraryPlanNum" placeholder="请输入数量"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="sureBtn('dialogData')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      dialogData: {
        type: Object
      },
      type: {
        type: String
      }
    },
    data () {
      return {
        title: '新增',
        dialogFormVisible: false,
        rules: {
          account: [
            { required: true, message: '帐号不能为空', trigger: 'blur' },
            { min: 6, max: 11, message: '帐号只能为6-11位数字', trigger: 'blur change' }
          ],
          useName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            { min: 1, max: 9, message: '用户名长度为1-9位', trigger: 'blur change' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 8, max: 16, message: '密码长度为8-16位', trigger: 'blur change' }
          ]
        },
        formLabelWidth: '120px',
        value: ''
      }
    },
    methods: {
      sureBtn (dialogData) {
        this.$refs[dialogData].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false
            if (this.type === 'add') {
              this.$emit('add')
            } else if (this.type === 'modify') {
              this.$emit('modify')
            }
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
