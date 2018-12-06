<template>
  <div>
    <el-form :model="loginForm" ref="ruleForm" :rules="rules">

      <el-form-item class="login-form-item login-form-margin-bottom login-item-bg" prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入账号" class="login-input">
          <i slot="prefix" class="el-input__icon fas fa-user icon-login-page"></i>
          <!--<img class="logo" src="./../../../assets/images/form_user.png" alt="">-->
        </el-input>
      </el-form-item>

      <el-form-item class="login-form-item login-form-margin-bottom" prop="password">
        <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" class="login-input">
          <i slot="prefix" class="el-input__icon fas fa-lock icon-login-page"></i>
          <!--<img class="logo" src="./../../../assets/images/form_password.png" alt="">-->
        </el-input>
      </el-form-item>

      <el-form-item class="login-form-item login-form-margin-bottom">
        <el-radio-group v-model="loginForm.authCode">
          <el-radio label="user">普通用户</el-radio>
          <el-radio label="manager">管理员</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item class="login-form-item login-item" style="margin-bottom: 0;">
        <el-button type="primary" class="login-but button-bg" :loading="loading.login" @click="handleConfirm('ruleForm')">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import * as names from '../../../router/names'
  import * as api from 'src/api'
  import storage from '../../../module/storage'
  import {initMenu} from 'src/module/menu'
  export default {
    data () {
      return {
        loading: {login: false},
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        dialogVisible: false,
        loginForm: {
          username: '',
          password: '',
          authCode: 'user'
        }
      }
    },
    mounted () {
    },
    methods: {
      handleConfirm (formName) {
        console.log(this.loginForm)
        this.$refs[formName].validate(valid => {
          if (valid) {
            const param = {
              account: this.loginForm.username,
              password: this.loginForm.password
            }
            if (this.loginForm.authCode === 'user') {
              this.loading.login = true
              api.userCenter.login(param).then(response => {
                let data = response.data
                if (data.messageType === 1) {
                  if (!data.data.moduleList) {
                    data.data.moduleList = []
                  }
                  storage.setUser(data.data)
                  initMenu()
                  this.$router.push({name: names.USERCENTER_WELCOME})
                }
              }).finally(() => {
                this.loading.login = false
              })
            } else {
              this.loading.login = true
              api.userManagerCenter.managerUserLogin(param).then(response => {
                let data = response.data
                if (data.messageType === 1) {
                  storage.setUser(data.data)
                  this.$router.push({name: names.USERCENTER_WELCOME})
                }
              }).finally(() => {
                this.loading.login = false
              })
            }
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  .hy-login-dialog {
    width: 400px;
  }
</style>
<style lang="scss" scoped>
  .input-item {
    width: 23rem;
    text-align: center;
  }
  .login-item {
    text-align: center;
  }
  .login-but {
    width: 15rem;
    font-size: 1.5rem;
    text-align: center;
    vertical-align: middle;
    background-color: #48B6EA;
  }
  .login-input {
  }
  .login-form-item {
    text-align: center;

  }
  .login-form-margin-bottom {
    margin-bottom: 3rem !important;
  }
  .icon-login-page {
    color: #FFFFFF;
    display: inline-block;
  }
  .el-input__icon {
    left: 0;
  }
  .el-input__inner {
    padding-left: 30px !important;
    display: inline-block;
  }
  .button-bg {
    background:rgba(72,182,234,1);
  }
</style>
