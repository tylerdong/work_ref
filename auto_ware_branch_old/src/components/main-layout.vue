<template>
  <div class="wrapper">
    <main-header></main-header>
    <main-sidebar></main-sidebar>
    <div class="content-wrapper">
      <tab-submenu></tab-submenu>
      <keep-alive>
        <router-view ref="cmpt"></router-view>
      </keep-alive>
      <!--<content-home></content-home>-->
    </div>
    <main-footer></main-footer>
    <!--<main-control-sidebar></main-control-sidebar>-->
    <div class="control-sidebar-bg"></div>
  </div>
</template>
<style lang="scss" scoped="">
  .content-wrapper {
    padding-bottom: 20px;
    position: relative;
    z-index: initial;
    margin-left: 170px;
  }
</style>
<script>
  import { eventHub } from '../module/eventHub'

  export default {
    components: {
      'main-header': require('./main-header.vue'),
      'tab-submenu': require('common/tab-submenu.vue'),
      'main-sidebar': require('./main-sidebar.vue'),
      'main-footer': require('./main-footer.vue'),
      // 'main-control-sidebar': require('./main-control-sidebar.vue'),
      'content-home': require('./content/home.vue')
    },
    watch: {
      $route: function () {
        this.$nextTick(() => {
          eventHub.$emit('destroyComponent', this.$refs.cmpt, this.$route.name) // 当前组件实例传递给需要摧毁的地方
        })
      }
    }
  }
</script>
