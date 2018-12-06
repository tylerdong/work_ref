<template>
  <li class="dropdown user user-menu">
    <a class="dropdown-toggle" data-toggle="dropdown" ref="refUserMenu" @click="show">
      <img src="./../../assets/images/form_user-1.png" class="user-image" alt="User Image">
      <span class="hidden-xs">{{userName}}</span>
      <i class="user-caret-icon" :class="{'el-icon-caret-bottom': userMenuActive,'el-icon-caret-right': !userMenuActive}"></i>
      <i class="lineY"></i>
    </a>
    <ul class="dropdown-menu userMenuBox tc" :class="{'active': userMenuActive}">
      <!-- User image -->
      <li @click="btnModifyPwd"><a>修改密码</a></li>
      <li @click="btnSignout"><a>退出登录</a></li>
    </ul>
    <dialog-modify-pwd ref="dialogModifyPwd"></dialog-modify-pwd>
  </li>
</template>

<script>
  import { eventHub } from '../../module/eventHub'
  export default {
    components: {
      'dialog-modify-pwd': require('./dialog-modify-pwd.vue')
    },
    props: ['userName'],
    mounted () {
      $('body').click((event) => {
        if ((event.target.parentNode !== this.$refs.refUserMenu && event.target !== this.$refs.refUserMenu)) {
          this.userMenuActive = false
        }
      })
    },
    data () {
      return {
        userMenuActive: false
      }
    },
    methods: {
      show () {
        this.userMenuActive = true
      },
      btnSignout () {
        this.$confirm('确定退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.sessionStorage.clear()
          this.$router.replace('/')
          eventHub.$emit('resetMenus')
          this.$message({
            type: 'success',
            message: '退出登录成功'
          })
        })
      },
      btnModifyPwd () {
        this.$refs.dialogModifyPwd.show()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "./../../../element-variables";
  .user-caret-icon{
    transform: scale(0.7);
  }
  .lineY{
    border-right: 1px solid #55c5e1;
    position: absolute;
    right: 0px;
    width: 1px;
    height: 24px;
    top: 14px;
  }
  .user.user-menu{
    .userMenuBox{
      width: 130px;
      min-width: 130px;
    &.active{display: block}
    li{
    a{
      line-height: 40px;
      height: 40px;
      padding: 0;
      border-bottom: 1px solid #eee;
    &:hover{
       background: $--color-primary-light-1;
       color: #fff;
     }
    }
    }
    }
  }
</style>
