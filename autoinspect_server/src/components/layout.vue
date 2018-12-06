<template>
  <div class="app-wrapper">
    <side-bar :class="sidebarContainer"></side-bar>
    <div :class="mainContainer">
      <nav-bar></nav-bar>
      <div style="width: 100%">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    'layout-header': require('./header').default,
    'side-bar': require('./side-bar').default,
    'nav-bar': require('./nav-bar').default
  },
  mounted () {
    this.$router.push({path: '/search'})
  },
  computed: {
    sidebarContainer: function () {
      return {
        'sidebar-container': true,
        'sidebar-reduced': !this.$store.state.layout.sidebar.expand
      }
    },
    mainContainer: function () {
      return {
        'main-container': true,
        'main-container-expend': !this.$store.state.layout.sidebar.expand
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped type="scss">
  /*侧边栏展开*/
  .sidebar-container {
    bottom: 0;
    font-size: 0;
    left: 0;
    overflow: hidden;
    position: fixed;
    width: 200px;
    top: 0;
    transition: width .28s;
    z-index: 1001;
    background: white;
  }
  .main-container-expend {
    margin-left: 66px !important;
  }
  /*侧边栏收缩*/
  .sidebar-reduced {
    width: 64px;
    min-height: 100%;
    background: #304156 !important;
  }
  .sidebar-reduced .el-menu {
    height: 100%;
  }
  .main-container {
    -webkit-transition: margin-left .28s;
    min-height: 100%;
    position: relative;
    transition: margin-left .28s;
    margin-left: 202px;
  }
  .app-wrapper {
    height: 100%;
    position: relative;
    width: 100%;
  }
  .app-wrapper:after {
    clear: both;
    content: '';
    display: block;
  }
</style>
