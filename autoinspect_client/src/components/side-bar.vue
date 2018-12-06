<template>
  <div>
    <el-menu :default-active="defaultIndex" class="el-menu-vertical-demo" :collapse="isCollapse" mode="vertical"
             background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <el-menu-item v-for="(item, index) in menu" :key="index" :index="index.toString()" @click="menuClick(item)">
        <icon :name="item.meta.icon" class="icon" scale="1.05"></icon>
        <span slot="title" class="icon-location">{{item.meta.title}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultIndex: '0'
    }
  },
  mounted () {
  },
  methods: {
    menuClick (menu) {
      this.$router.push({ name: menu.name })
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function (to, from) {
        let rootPath = this.$router.options.routes[0].children.filter(item => { return item.path.lastIndexOf('/') === 0 })
        let pathName = to.name
        let index = rootPath.findIndex(item => { return item.name === pathName })
        this.defaultIndex = index.toString()
      }
    }
  },
  computed: {
    isCollapse: function () {
      return !this.$store.state.layout.sidebar.expand
    },
    menu: function () {
      let result = []
      let appname = this.$store.state.sysConfig.appname
      let rootPath = this.$router.options.routes[0].children.filter(item => { return item.path.lastIndexOf('/') === 0 })
      if (!appname) {
        result = result.concat(rootPath.find(item => { return item.name === 'sys-setting' }))
      } else {
        result = result.concat(rootPath.filter(item => { return item.meta.premission === appname }))
      }
      return result
    }
  }
}
</script>

<style scoped>
  .el-menu-vertical-demo {
    height: 100%;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
  }
  .el-menu-item > * {
  }
  .el-menu-item {
    float: left;
    height: 56px;
    line-height: 56px;
    width: 100%;
  }
  .icon-location {
    width: 3rem;
    text-align: left;
    display: inline-block;
  }
</style>
