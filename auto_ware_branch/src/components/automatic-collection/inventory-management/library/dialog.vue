<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" custom-class="my-dialog" width="50%">
    <el-form :model="dialogData" :rules="rules" ref="dialogData" :label-width="formLabelWidth">
      <el-form-item label="名称" prop="libraryName">
        <el-input  v-model="dialogData.libraryName" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="libraryScapacity">
        <el-input v-model="dialogData.libraryScapacity" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="现有库存" prop="libraryExistInventory">
        <el-input v-model="dialogData.libraryExistInventory" placeholder="请输入现有库存"></el-input>
      </el-form-item>
      <el-form-item label="库房id" prop="libraryStorageId">
        <el-input v-model="dialogData.libraryStorageId" placeholder="请输入库房id"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="libraryRemark">
        <el-input v-model="dialogData.libraryRemark" placeholder="请输入备注" type="textarea"></el-input>
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
