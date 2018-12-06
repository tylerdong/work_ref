<template>
  <div class="login-container-cover" :style="coverStyle">
    <div class="login-box-process">
      <el-form ref="form" :model="user" :rules="rules" label-width="120px">
        <el-form-item label="用户名" prop="userName" class="input-item26">
          <el-input v-model="user.userName" placeholder="请输入用户名" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="密码"  prop="passWord"  class="input-item26">
          <el-input v-model="user.passWord" type="password" placeholder="请输入密码" auto-complete="on"></el-input>
        </el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import storage from '../../module/storage'
// import { Base64 } from 'js-base64'
import * as api from '../../api'
import { JSEncrypt } from 'jsencrypt'
export default {
  data () {
    return {
      coverStyle: {
        width: `${document.documentElement.clientWidth}px`,
        height: `${document.documentElement.clientHeight}px`
      },
      user: { userName: '', passWord: '' },
      rules: {
        userName: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
        passWord: [{ required: true, message: '请填写密码', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    this.setHotKey()
  },
  beforeDestroy () {
    document.onkeydown = undefined
  },
  methods: {
    login () {
      this.$refs.form.validate(valid => {
        if (valid) {
          let encryptor = new JSEncrypt()
          encryptor.setPublicKey(this.pubKey)
          let param = {
            userId: this.user.userName,
            passWord: encryptor.encrypt(this.user.passWord)
          }
          api.defect.login(param).then(response => {
            let data = response.data
            console.log(data)
            if (data.meta.code === 100000) {
              storage.setUser(data.data, true)
              this.$router.push({name: 'search'})
            } else {
              this.$message({type: 'error', message: data.meta.message})
            }
          })
        }
      })
    },
    setHotKey () {
      document.onkeydown = (e) => {
        if (e.keyCode === 13) {
          this.login()
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:rgba(108, 135, 166, 0.7);
  $cursor:#fff;
  .login-container-cover {
    background-image: url("./../../assets/img/huizhilian-bj.jpg");
    background-size:100% 100%;
    -moz-background-size:100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .login-box-process {
      margin: auto auto;
      padding-top: 4.5rem;
      padding-bottom: 2.7rem;
      width: 40%;
      background-color: $bg;
      color: #FFFFFF;
      border-radius: 5px;
    }
    .el-input {
      background-color: $bg;
      input {
        background: $bg;
        color: #FFFFFF;
        -webkit-appearance: none;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item__label {
      color: #eee;
    }
    .el-form-item.is-error {
      border: none !important;
    }
  }
</style>
