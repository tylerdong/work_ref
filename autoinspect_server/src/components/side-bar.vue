<template>
  <div>
    <el-menu default-active="0" class="el-menu-vertical-demo" :collapse="isCollapse" mode="vertical"
             background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <el-menu-item v-for="(item, index) in menu" :key="index" :index="index.toString()" @click="menuClick(item)">
        <icon :name="item.meta.icon" class="icon" scale="1.05"></icon>
        <span slot="title" class="icon-location">{{item.meta.title}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import storage from '../module/storage'
export default {
  data () {
    return {
      user: {}
    }
  },
  mounted () {
  },
  methods: {
    menuClick (menu) {
      this.$router.push({ name: menu.name })
    }
  },
  computed: {
    isCollapse: function () {
      return !this.$store.state.layout.sidebar.expand
    },
    menu: function () {
      let user = storage.getUser(true)
      let result = []
      let rootPath = this.$router.options.routes[0].children.filter(item => { return item.path.lastIndexOf('/') === 0 })
      for (let i = 0; i < rootPath.length; i++) {
        if (rootPath[i].meta.premission) {
          if (rootPath[i].meta.premission.includes(parseInt(user.userType))) {
            result.push(rootPath[i])
          }
        }
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
