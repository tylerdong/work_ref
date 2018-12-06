<template>
  <jk-dialog title="修改" :visible.sync="dialogVisible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.descripe"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading.submit" type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </jk-dialog>
</template>

<script>
  import * as api from 'src/api'
  import storage from 'storage'
  export default {
    props: ['typeData'],
    components: {
      jkDialog: require('common/dialog-side.vue')
    },
    data () {
      return {
        dialogVisible: false,
        userInfo: {},
        form: {
          name: '',
          code: '',
          descripe: ''
        },
        listItemId: '',
        loading: {
          submit: false
        },
        formRules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'change blur' },
            { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'change' }
          ],
          code: [
            { required: true, message: '请输入编码', trigger: 'change blur' },
            { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'change' }
          ],
          descripe: [
            { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'change' }
          ]
        }
      }
    },
    mounted () {
      this.userInfo = storage.getUser()
    },
    methods: {
      show (listItem) {
        this.$refs.ruleForm.resetFields()
        if (listItem) {
          this.listItemId = listItem.row.typId
          this.form.name = listItem.row.typName
          this.form.code = listItem.row.typCode
          this.form.descripe = listItem.row.typDescripe
          this.dialogVisible = true
        }
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading.submit = true
            let params = {
              productTypeDescripe: this.form.descripe,
              productTypeName: this.form.name,
              productTypeId: this.listItemId,
              code: this.form.code,
              employeeId: this.userInfo.userId
            }
            api.mdm.updateProductType(params).then((response) => {
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
