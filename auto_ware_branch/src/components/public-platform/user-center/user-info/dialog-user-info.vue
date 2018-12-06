<template>
  <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="50%">
    <el-form ref="changePwd" :model="changePwd" label-width="120px" :rules="rules">
      <el-form-item label="原密码" prop="oldPassword" required>
        <el-input v-model="changePwd.oldPassword.value"
                  :placeholder="changePwd.oldPassword.placeholder"
                  type="password">
        </el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword" required>
        <el-input v-model="changePwd.newPassword.value"
                  :placeholder="changePwd.newPassword.placeholder"
                  type="password">
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="comfirmPassword" required>
        <el-input v-model="changePwd.comfirmPassword.value"
                  :placeholder="changePwd.comfirmPassword.placeholder"
                  type="password">
        </el-input>
      </el-form-item>
      <el-form-item class="text-control">
        <span class="errortip">{{errorMsg}}</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="changepwd('changePwd')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import * as api from 'src/api'
  import storage from '../../../../module/storage'
  export default {
    props: {
      userId: ''
    },
    data () {
      return {
        errorMsg: '',
        userInfo: '',
        dialogFormVisible: false,
        changePwd: {
          oldPassword: {
            value: '',
            placeholder: '请输入原密码'
          },
          newPassword: {
            value: '',
            placeholder: '请输入新密码'
          },
          comfirmPassword: {
            value: '',
            placeholder: '请再次确认密码'
          }
        },
        rules: {
          oldPassword: [
            {
              trigger: 'blur',
              validator: (rule, item, callback) => {
                if (!item.value) {
                  callback(new Error('原密码不能为空'))
                } else {
                  let params = {
                    password: item.value,
                    userId: this.userId
                  }
                  api.userCenter.normalOldPassword(params).then(response => {
                    const data = response.data
                    if (data.messageType === 1) {
                      callback()
                      return true
                    }
                    if (data.messageType === 2) {
                      return callback(new Error(response.data.meta.message))
                    }
                    if (data.messageType === 0) {
                      console.error(response)
                      return false
                    }
                  }).catch(error => {
                    console.log(error)
                  })
                }
              }
            }
          ],
          newPassword: [
            {
              trigger: 'blur,change',
              validator: (rule, item, callback) => {
                if (!item.value) {
                  return callback(new Error('密码不能为空'))
                } else if (item.value.length < 8 || item.value.length > 16) {
                  return callback(new Error('密码的长度不能小于8位且不大于16位'))
                } else {
                  callback()
                }
              }
            }
          ],
          comfirmPassword: [
            {
              trigger: 'blur,change',
              validator: (rule, item, callback) => {
                if (!item.value) {
                  return callback(new Error('请确认密码'))
                } else if (item.value !== this.changePwd.newPassword.value) {
                  return callback(new Error('两次输入的密码不一致'))
                } else {
                  callback()
                }
              }
            }
          ]
        }
      }
    },
    mounted () {
      this.userInfo = storage.getUser()
    },
    methods: {
      changepwd (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const userType = this.userInfo.userType
            let params = {
              userId: this.userId,
              password: this.changePwd.newPassword.value,
              oldPassword: this.changePwd.oldPassword.value
            }
            if (userType) {
              api.userManagerCenter.updatePasswordByManageUserId(params).then(response => {
                const data = response.data
                if (data.messageType === 1) {
                  this.$message({
                    type: 'success',
                    message: data.message
                  })
                  this.changePwd.oldPassword.value = ''
                  this.changePwd.newPassword.value = ''
                  this.changePwd.comfirmPassword.value = ''
                  this.dialogFormVisible = false
                  this.$refs[formName].resetFields()
                  return true
                }
              }).catch(error => {
                console.log(error)
              })
            } else {
              api.userCenter.normalUpdatePassword(params).then(response => {
                const data = response.data
                if (data.messageType === 1) {
                  this.$message({
                    type: 'success',
                    message: data.message
                  })
                  this.changePwd.oldPassword.value = ''
                  this.changePwd.newPassword.value = ''
                  this.changePwd.comfirmPassword.value = ''
                  this.dialogFormVisible = false
                  this.$refs[formName].resetFields()
                  return true
                }
              }).catch(error => {
                console.log(error)
              })
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
