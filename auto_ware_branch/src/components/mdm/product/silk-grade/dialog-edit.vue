<template>
  <jk-dialog :title="dialog.title" :visible.sync="dialog.visible">
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
        dialog: { title: '新增', visible: false },
        userInfo: {},
        form: {
          name: '',
          code: '',
          num: '',
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
      show (data) {
        this.dialog.visible = true
        this.$refs.ruleForm.resetFields()
        this.dialog.title = data ? '修改' : '新增'
        if (data) {
          this.listItemId = data.graId
          this.form.name = data.graName
          this.form.code = data.graCode
          this.form.num = data.graExceptionNum
          this.form.descripe = data.graDescripe
        }
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
              employeeId: this.userInfo.userId
            }
            this.loading.submit = true
            if (this.dialog.title === '新增') {
              this.$confirm('新增之后无法删除，是否确认新增?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                beforeClose: (action, instance, done) => {
                  if (action === 'confirm') {
                    instance.confirmButtonLoading = true
                    api.mdm.addSilkGrade(params).then((response) => {
                      const data = response.data
                      if (data.messageType === 1) {
                        this.dialog.visible = false
                        this.$emit('submitSuccess')
                      } else {
                        this.$message({type: 'error', message: data.message})
                      }
                    }).finally(() => {
                      instance.confirmButtonLoading = false
                      done()
                      this.loading.submit = false
                    })
                  } else {
                    instance.confirmButtonLoading = false
                    done()
                  }
                }
              })
            } else {
              params = Object.assign(params, {silkGradeId: this.listItemId})
              api.mdm.updateSilkGrade(params).then((response) => {
                const data = response.data
                if (data.messageType === 1) {
                  this.dialog.visible = false
                  this.$emit('submitSuccess')
                } else {
                  this.$message({type: 'error', message: data.message})
                }
              }).finally(() => {
                this.loading.submit = false
              })
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
