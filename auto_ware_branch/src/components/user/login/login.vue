<template>
  <div>
    <el-dialog custom-class="hy-login-dialog" size="tiny" title="用户登录" :visible.sync="dialogVisible">
      <div class="login-form">
        <div class="form-item">
          <img class="logo" src="./form_user.png" alt="">
          <input @input="testNamePassword" v-model="loginForm.username" placeholder="请输入帐号">
        </div>
        <div class="form-item">
          <img class="logo" src="./form_password.png" alt="">
          <input @input="testNamePassword" v-model="loginForm.password" type="password" placeholder="请输入密码"
                 @keyup.enter="handleConfirm">
        </div>
        <!--<div class="form-item form-item-code">-->
        <!--<img class="logo" src="./form_code.png" alt="">-->
        <!--<input @change="testNamePassword" v-model="loginForm.authCode" placeholder="请输入验证码">-->
        <!--<img class="code-img" :src="codeImg" alt="" @click="handleGetCode">-->
        <!--</div>-->
        <div class="tc">
          <el-radio class="radio" v-model="type" label="user">普通用户</el-radio>
          <el-radio class="radio" v-model="type" label="manager">管理员</el-radio>
        </div>
        <el-button class="formBtn" type="primary" :loading="loading.login"
                   @click="handleConfirm">登录
        </el-button>
        <div class="error-message">{{errorMessage}}</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import * as names from '../../../router/names'
  import * as api from 'src/api'
  import storage from '../../../module/storage'
  import { initMenu } from 'src/module/menu'
  const EMPTY_MESSAGE = '用户名和密码不能为空'
  //  const VERIFY_MESSAGE = '验证码不能为空'
  export default {
    data () {
      return {
        loading: {
          login: false
        },
        dialogVisible: false,
        loginForm: {
          username: '',
          password: '',
          authCode: ''
        },
        type: 'user',
        codeId: '',
        codeImg: '',
        errorMessage: '',
        loadingBtn: false
      }
    },
    mounted () {
      //  this.handleGetCode()
    },
    methods: {
      show () {
        this.dialogVisible = true
      },
      testNamePassword () {
        if (this.loginForm.username === '' || this.loginForm.password === '') {
          this.errorMessage = EMPTY_MESSAGE
          return false
        }
        this.errorMessage = ''
        return true
      },
      handleConfirm () {
        this.testNamePassword()
        if (this.testNamePassword()) {
          if (this.type === 'user') {
            this.loading.login = true
            api.userCenter.login({
              account: this.loginForm.username,
              password: this.loginForm.password
              // ,
              //  verCode: this.loginForm.authCode,
              // verCodeId: this.codeId
            }).then(response => {
              let data = response.data
              if (data.messageType === 1) {
                if (!data.data.moduleList) {
                  data.data.moduleList = []
                }
                storage.setUser(data.data)
                initMenu()
                this.$router.push({name: names.USERCENTER_WELCOME})
              } else {
                //  this.handleGetCode()
              }
            }).finally(() => {
              this.loading.login = false
            })
          } else {
            this.loading.login = true
            api.userManagerCenter.managerUserLogin({
              account: this.loginForm.username,
              password: this.loginForm.password
              // ,
              // verCode: this.loginForm.authCode,
              // verCodeId: this.codeId
            }).then(response => {
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
      },

      handleGetCode () {
        api.userCenter.getVerCode({}).then(response => {
          this.codeImg = 'data:image/png;base64,' + response.data.data.verCodeVo.verCodeImage
          this.codeId = response.data.data.verCodeVo.verCodeId
        }).finally(() => {
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
  .login-form {
    width: 300px;
    margin: 0 auto;
    .form-item {
      height: 40px;
      border: 1px solid #c9d1d6;
      margin-bottom: 15px;
      .logo {
        border-right: 1px solid #c9d1d6;
        padding: 0 .5rem;
        vertical-align: middle;
      }
      input {
        width: 250px;
        vertical-align: middle;
        line-height: 38px;
        padding: 0;
        padding-left: 10px;
        outline: none;
        border: none;
      }

    }
    .form-item-code {
      position: relative;
      width: 180px;

      input {
        width: 130px;
      }

      .code-img {
        position: absolute;
        top: -1px;
        right: -122px;
        width: 120px;
        height: 40px;
      }
    }
    .formBtn {
      display: block;
      color: #fff;
      border: none;
      text-align: center;
      width: 100%;
      cursor: pointer;
    }
    .error-message {
      margin-top: 15px;
      color: red;
      text-align: center;
    }
  }
</style>
