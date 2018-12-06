<template>
  <div>
    <div class="icon-expand">
      <div v-bind:style="iStyle" @click="taggleSidebar" class="viewlist"><icon name="align-justify" class="icon" style="color: rgb(95, 94, 94);" scale="1.1"></icon></div>
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item v-for="(crumb, index) in breadcrumb" :key="index" :to="{name: crumb.name}">{{ crumb.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="menu" v-if="user">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">{{user.userId}}<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="signOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import storage from '../module/storage'
export default {
  data () {
    return {
      iStyle: {
        transform: 'rotate(0deg)'
      },
      breadcrumb: [],
      user: undefined
    }
  },
  mounted () {
    this.user = storage.getUser(true)
  },
  watch: {
    $route () {
      let {options, currentRoute} = this.$router
      let routes = options.routes[0].children
      let current = currentRoute
      this.breadcrumb = []
      this.getBreadcrumb(current, routes, 0)
    }
  },
  methods: {
    taggleSidebar () {
      this.$store.dispatch('toggleSideBar')
      this.iStyle.transform = this.$store.state.layout.sidebar.expand ? 'rotate(0deg)' : 'rotate(90deg)'
    },
    getBreadcrumb (current, routes, n) {
      let nextIndex = current.path.indexOf('/', 1 + n)
      if (nextIndex > -1) {
        let routeIndex = routes.findIndex(route => { return route.path === current.path.substr(0, nextIndex) })
        this.breadcrumb.push({ name: routes[routeIndex].name, title: routes[routeIndex].meta.title })
        this.getBreadcrumb(current, routes, n + nextIndex)
      } else {
        this.breadcrumb.push({ name: current.name, title: current.meta.title })
      }
    },
    handleCommand (val) {
      if (val === 'signOut') {
        storage.removeUser(true)
        this.$router.push({name: 'login'})
      }
    }
  }
}
</script>

<style scoped>
  .icon-expand {
    line-height: 50px;
    width: 100%;
    height: 50px;
  }

  .viewlist {
    font-size: 30px;
    font-weight: 500;
    position: relative;
    cursor: pointer;
    transform-origin: 50% 50%;
    -webkit-transition: transform .28s;
    transition: transform .28s;
    height: 50px;
    line-height: 50px;
    margin-left: 10px;
    display: inline-block;
    float: left;
    clear: both;
  }
  .breadcrumb {
    display: inline-block;
    float: left;
    margin-left: 1%;
    height: 50px;
    line-height: 50px;
  }
  .menu {
    display: inline-block;
    float: right;
    margin-right: 10px;
  }
</style>
