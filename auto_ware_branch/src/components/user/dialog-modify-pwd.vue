<template>
  <div>
    <el-dialog title="修改密码" :visible.sync="visible" :modal-append-to-body="false" width="50%" @close="close">
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-form-item label="旧密码" prop="oldPwd">
          <el-input v-model="form.oldPwd" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="form.newPwd" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPwd">
          <el-input v-model="form.confirmPwd" type="password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style scoped lang="scss">
</style>
<script>
  import * as api from 'src/api'
  import storage from '../../module/storage'
  export default {
    components: {},
    data () {
      const validatePwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.newPwd) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        visible: false,
        form: {
          oldPwd: '',
          newPwd: '',
          confirmPwd: ''
        },
        rules: {
          oldPwd: [
            {required: true, message: '原密码不能为空', trigger: 'blur change'}
          ],
          newPwd: [
            {required: true, message: '新密码不能为空', trigger: 'blur change'}
          ],
          confirmPwd: [
            {validator: validatePwd, trigger: 'blur change'}
          ]
        }
      }
    },
    mounted () {
      this.userInfo = storage.getUser()
    },
    methods: {
      show () {
        this.visible = true
      },
      close () {
        this.$refs.form.resetFields()
      },
      confirm () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            const userType = this.userInfo.userType
            let params = ''
            if (userType) {
              params = {
                userId: this.userInfo.manId,
                password: this.form.newPwd,
                oldPassword: this.form.oldPwd
              }
              api.userManagerCenter.updatePasswordByManageUserId(params).then(response => {
                const data = response.data
                if (data.messageType === 1) {
                  this.$message({
                    type: 'success',
                    message: data.message
                  })
                  this.form.oldPwd = ''
                  this.form.newPwd = ''
                  this.form.confirmPwd = ''
                  this.visible = false
                  this.$refs.form.resetFields()
                  this.$message('请重新登录')
                  this.$router.replace('/')
                  return true
                }
              }).catch(error => {
                console.log(error)
              })
            } else {
              params = {
                userId: this.userInfo.userId,
                password: this.form.newPwd,
                oldPassword: this.form.oldPwd
              }
              api.userCenter.normalUpdatePassword(params).then(response => {
                const data = response.data
                if (data.messageType === 1) {
                  this.$message({
                    type: 'success',
                    message: data.message
                  })
                  this.form.oldPwd = ''
                  this.form.newPwd = ''
                  this.form.confirmPwd = ''
                  this.visible = false
                  this.$refs.form.resetFields()
                  this.$message('请重新登录')
                  this.$router.replace('/')
                  return true
                }
              }).catch(error => {
                console.log(error)
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
