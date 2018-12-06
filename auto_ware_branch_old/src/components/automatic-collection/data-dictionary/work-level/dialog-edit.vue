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
        <el-form-item label="描述" prop="describe">
          <el-input type="textarea" v-model="form.describe"></el-input>
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
  //  import storage from 'storage'
  export default {
    props: ['typeData'],
    components: {
      jkDialog: require('common/dialog-side.vue')
    },
    data () {
      return {
        dialogVisible: false,
        form: {
          name: '',
          code: '',
          describe: ''
        },
        nowListItem: '',
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
            { min: 1, max: 18, message: '长度在 1 到 18 个字符', trigger: 'change blur' }
          ],
          describe: [
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
        this.nowListItem = listItem.row
        this.form.name = listItem.row.name
        this.form.code = listItem.row.code
        this.form.describe = listItem.row.describe
        this.dialogVisible = true
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading.submit = true
            let params = {
              name: this.form.name,
              code: this.form.code,
              describe: this.form.describe,
              id: this.nowListItem.id
            }
            api.automatic.dictionary.updatePosition(params).then((response) => {
              const data = response.data
              if (data.messageType === 1) {
                console.log(1111)
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
