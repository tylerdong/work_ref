<template>
  <el-dialog
    title="用户登录"
    custom-class="dialog-login"
    :visible.sync="dialog.visible">
    <div class="form">
      <div class="form-group">
        <div class="form-icon">
          <img src="../../assets/images/form_user.png" alt="">
        </div>
        <input type="text" v-model="form.username" class="form-input" placeholder="请输入帐号">
      </div>
      <div class="form-group">
        <div class="form-icon">
          <img src="../../assets/images/form_password.png" alt="">
        </div>
        <input type="text" v-model="form.password" class="form-input" placeholder="请输入密码">
      </div>

      <div class="form-group">
        <div class="form-icon">
          <img src="../../assets/images/form_code.png" alt="">
        </div>
        <input type="text" v-model="form.code" class="form-input-code" placeholder="请输入验证码">
        <img src="../../assets/images/avatar.jpg" alt="验证码" class="form-img" title="点击重新获取验证码">
      </div>

      <el-button type="primary" class="form-button" :loading="loading.login" @click="handleLogin">登录</el-button>

      <el-collapse-transition>
        <div class="form-group" v-show="form.errorToggle">
          {{form.errorTip}}
        </div>
      </el-collapse-transition>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    data () {
      return {
        dialog: {
          visible: true
        },
        form: {
          username: '',
          password: '',
          code: '',
          errorTip: '',
          errorToggle: false
        },
        loading: {
          login: false
        }
      }
    },
    methods: {
      /* 登录 */
      handleLogin () {
        /* 错误提示 */
        this.form.errorTip = 'aaa'
        this.form.errorToggle = !this.form.errorToggle
      }
    }
  }
</script>
<style lang="scss">
  .dialog-login {
    width: 500px;
    height: 360px;
    /* form内容 */
    .form {
      text-align: center;
      .form-group:first-child {
        margin-top: 0;
      }
      .form-group:last-child {
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        color: red;
      }
      .form-group {
        margin: auto;
        width: 290px;
        height: 40px;
        margin-top: 15px;
        border: 1px solid #c6c6c6;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .form-icon {
          flex: 0 0 30px;
          line-height: 20px;
          height: 20px;
          border-right: 1px solid #c6c6c6;
        }
        .form-input {
          flex: 1 1 100%;
          padding: 0 10px;
          border: none;
          border-radius: none;
          outline: none;
        }
        .form-input-code {
          flex: 0 0 120px;
          border: none;
          padding: 0 10px;
          border-radius: none;
          outline: none;
        }
        .form-img {
          flex: 1 1 100%;
          height: 100%;
          cursor: pointer;
        }

      }
      .form-button {
        margin: auto;
        width: 290px;
        height: 40px;
        margin-top: 15px;
        border: none;
      }
    }
  }
</style>
