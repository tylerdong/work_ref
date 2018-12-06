<template>
  <div>
    <el-dialog :title="dlgTitle" width="30%" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="ruleForm" :model="form">
        <el-form-item prop="name" label="组织名称" label-width="120px">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="submitLoading" @click="submitForm('ruleForm')">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    props: {
      dlgTitle: {
        type: String,
        default: ''
      },
      nowNode: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        dialogFormVisible: false,
        form: {
          name: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入项目名称', trigger: 'blur'},
            {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'change'}
          ]
        },
        submitLoading: false
      }
    },
    created () {
    },
    methods: {
      open () {
        if (this.dlgTitle === '新建') {
          this.form.name = ''
        } else {
          this.form.name = this.nowNode.data.name
        }
        this.dialogFormVisible = true
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.dlgTitle === '新建') {
              let params = {
                fatherId: this.nowNode.data.id,
                name: this.form.name
              }
              this.submitLoading = true
              api.systemOrganization.addOrganization(params).then(response => {
                if (response.data.messageType === 1) {
                  let store = this.nowNode.store
                  let data = this.nowNode.data
                  store.append({id: response.data.data.id, name: this.form.name, children: []}, data)
                } else {
                  this.$message.error(response.data.message)
                }
              }).catch(e => {
                console.log(e)
              }).finally(() => {
                this.dialogFormVisible = false
                this.submitLoading = false
              })
            }
            if (this.dlgTitle === '重命名') {
              let params = {
                orgId: this.nowNode.data.id,
                name: this.form.name
              }
              this.submitLoading = true
              api.systemOrganization.updateOrganization(params).then(response => {
                if (response.data.messageType === 1) {
                  this.nowNode.data.name = this.form.name
                } else {
                  this.$message.error(response.data.message)
                }
              }).catch(e => {
                console.log(e)
              }).finally(() => {
                this.dialogFormVisible = false
                this.submitLoading = false
              })
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
