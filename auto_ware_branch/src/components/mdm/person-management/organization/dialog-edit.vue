<template>
  <jk-dialog :title="dialog.title" :visible.sync="dialog.visible">
    <div ref="formDom">
      <el-form :model="form" :rules="formRules" ref="ruleForm" label-width="100px">
        <el-form-item label="等级" prop="orgLevel">
          <el-input v-model="form.orgLevel"></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="orgCode">
          <el-input v-model="form.orgCode"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="orgName">
          <el-input v-model="form.orgName"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="orgDescribe">
          <el-input v-model="form.orgDescribe"></el-input>
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
          orgLevel: '',
          orgCode: '',
          orgName: '',
          orgDescribe: ''
        },
        listItemId: '',
        loading: {
          submit: false
        },
        formRules: {
          orgLevel: [
            { required: true, message: '请输入等级', trigger: 'change blur' }
          ],
          orgCode: [
            { required: true, message: '请输入编码', trigger: 'change blur' }
          ],
          orgName: [
            { required: true, message: '请输入名称', trigger: 'change blur' }
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
          this.listItemId = data.orgId
          this.form.orgName = data.orgName
          this.form.orgCode = data.orgCode
          this.form.orgLevel = data.orgLevel
          this.form.orgDescribe = data.orgDescribe
        }
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading.submit = true
            let params = {
              orgLevel: this.form.orgLevel,
              orgCode: this.form.orgCode,
              orgName: this.form.orgName,
              orgDescribe: this.form.orgDescribe,
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
                    api.mdm.addOrganization(params).then((response) => {
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
              params = Object.assign(params, {orgId: this.listItemId})
              api.mdm.updateOrganization(params).then((response) => {
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
