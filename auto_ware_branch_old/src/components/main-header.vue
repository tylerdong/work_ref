<template>
  <header class="main-header">
    <!-- Logo -->
    <a style="background-color: #3b9dd8" href="" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><img src="../assets/images/min-logo.png" alt=""></span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><img src="../assets/images/logo.png" alt=""></span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav style="background-color: #3b9dd8;" class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <!--<a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">-->
        <!--<span class="sr-only">Toggle navigation</span>-->
      <!--</a>-->
      <tab-menu class="navbar-lists-wrapper"></tab-menu>
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!--Message: 发布通知-->
          <!--<template v-if="showNotice">-->
            <!--<li>-->
              <!--<a @click="btnDeliverMessage" title="发布通知">-->
                <!--<i class="fa fa-paper-plane"></i>-->
              <!--</a>-->
              <!--<dialog_deliver_message ref="refDialog"></dialog_deliver_message>-->
            <!--</li>-->
          <!--</template>-->
          <!--样品登记-->
          <!--<li>-->
            <!--<a>-->
              <!--<i class="fa fa-edit"></i>-->
            <!--</a>-->
          <!--</li>-->

          <!-- 未读消息查看 -->
          <!--<message_dropdown v-if="showNotice"></message_dropdown>-->

          <!--个人中心-->
          <dialog_user_center :userName="userName"></dialog_user_center>

          <!--<li><a>帮助</a></li>-->
          <!--<li><a>论坛</a></li>-->
          <!--<li><a>反馈</a></li>-->
          <!--<li><a>关于</a></li>-->
        </ul>
      </div>
    </nav>

  </header>
</template>
<style scoped lang="scss">
  .main-header{
    .logo{width: 170px;}
    .navbar{
      margin-left: 170px;
      display: flex;
      .navbar-lists-wrapper{
        flex: 1;
        font-size: 0;
      }
    }
  }
  .icon-wrapper {
    font-size: 0;
    span {
      display: inline-block;
      padding: 18px 8px;
      cursor: pointer;
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
      .fa {
        color: #fff;
        font-size: 14px;
      }
    }
  }

</style>
<script>
  import storage from '../module/storage'
  export default {
    components: {
      'dialog_user_center': require('./user/dialog-user-center.vue'),
      // 'dialog_deliver_message': require('./laboratory/notice/dialog-deliver.vue'),
      // 'message_dropdown': require('./laboratory/notice/message-dropdown.vue'),
      'tab-menu': require('./common/tab-menu.vue')
    },
    data () {
      return {
        userName: storage.getUser().name,
        showNotice: false
      }
    },
    mounted () {
      if (storage.getUser().moduleList) {
        for (let item of storage.getUser().moduleList) {
          if (item.code === '0204') { // 0204是实验室消息模块的编码
            this.showNotice = true
          }
        }
      }
    },
    methods: {
      btnDeliverMessage () {
        this.$refs.refDialog.show()
      }
    }
  }
</script>
