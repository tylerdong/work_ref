<template>
  <jk-dialog title="修改" :visible.sync="dialogVisible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="等级" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="异常次数" prop="num">
          <el-input v-model="form.num"></el-input>
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
          descripe: ''
        },
        listItemId: '',
        loading: {
          submit: false
        },
        formRules: {
          name: [
            { required: true, message: '请输入等级', trigger: 'change blur' },
            { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'change' }
          ],
          code: [
            { required: true, message: '请输入编码', trigger: 'change blur' },
            { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'change' }
          ],
          num: [
            { required: true, message: '请输入异常次数', trigger: 'change blur' },
            { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'change' }
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
        this.listItemId = listItem.row.id
        this.form.name = listItem.row.name
        this.form.code = listItem.row.code
        this.form.num = listItem.row.exceptionNum
        this.form.descripe = listItem.row.descripe
        this.dialogVisible = true
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading.submit = true
            let params = {
              silkGradeName: this.form.name,
              silkGradeCode: this.form.code,
              silkGradeExceptionNum: this.form.num,
              silkGradeDescripe: this.form.descripe,
              silkGradeId: this.listItemId,
              employeeId: this.userInfo.userId
            }
            api.automatic.dictionary.updateSilkGrade(params).then((response) => {
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
