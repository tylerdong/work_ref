<template>
  <div>
    <!--<jk-breadcrumb nameId="030101"></jk-breadcrumb>-->
    <div class="hy-pub__main-wrapper">
      <div class="el-title">
        <el-button type="primary" @click="showDialog" icon="el-icon-edit" class="floatRight">修改密码</el-button>
      </div>
      <el-form ref="userInfo" :model="userInfo" label-width="120px" :rules="rules">
        <el-form-item label="移动电话" prop="mobile">
          <el-input
            v-model="userInfo.mobile" placeholder='请输入移动电话' type="number">
          </el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="userInfo.email" placeholder='请输入邮箱'
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input
            v-model="userInfo.address" placeholder='请输入地址'
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeInfo('userInfo')">保存修改</el-button>
        </el-form-item>
      </el-form>
    </div>
    <dialog-account-info ref="refDialog" :userId="userId"></dialog-account-info>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'storage'
  export default {
    components: {
      // 'jk-breadcrumb': require('common/breadcrumb.vue'),
      'dialog-account-info': require('./dialog-user-info.vue')
    },
    data () {
      return {
        userId: '',
        userInfo: {
          mobile: '',
          email: '',
          address: '',
          name: ''
        },
        rules: {
          mobile: [
            { message: '请输入移动电话', trigger: 'blur' },
            { min: 11, max: 11, message: '请输入正确的电话', trigger: 'blur change' }
          ],
          email: [
            { message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur change' }
          ],
          address: [
            { message: '请输入地址', trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      this.getDate()
    },
    methods: {
      showDialog () {
        this.$refs.refDialog.changePwd.oldPassword.value = ''
        this.$refs.refDialog.changePwd.newPassword.value = ''
        this.$refs.refDialog.changePwd.comfirmPassword.value = ''
        this.$refs.refDialog.dialogFormVisible = true
      },
      getDate () {
        this.userId = storage.getUser().userId
        let params = {
          userId: this.userId
        }
        api.userCenter.UserDetail(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.userInfo = data.data
            return true
          }
          if (data.messageType === 2) {
            this.$message.error(data.message)
            return false
          }
          if (data.messageType === 0) {
            console.error(response)
            return false
          }
        }).catch(error => {
          console.log(error)
        })
      },
      changeInfo (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              mobile: this.userInfo.mobile,
              email: this.userInfo.email,
              address: this.userInfo.address,
              name: this.userInfo.name,
              userId: this.userId
            }
            api.userCenter.normalUpdate(params).then(response => {
              const data = response.data
              if (data.messageType === 1) {
                this.$message({
                  type: 'success',
                  message: data.message
                })
                return true
              }
              if (data.messageType === 2) {
                this.$message.error(data.message)
                return false
              }
              if (data.messageType === 0) {
                console.error(response)
                return false
              }
            }).catch(error => {
              console.log(error)
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>
