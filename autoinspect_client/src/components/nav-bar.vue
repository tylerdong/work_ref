<template>
  <div class="icon-expand">
    <div v-bind:style="iStyle" @click="taggleSidebar" class="viewlist"><icon name="align-justify" class="icon" style="color: rgb(95, 94, 94);" scale="1.1"></icon></div>
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item v-for="(crumb, index) in breadcrumb" :key="index" :to="{name: crumb.name}">{{ crumb.title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="app-info">
      <span v-if="factory">{{factory}}</span>
      <span v-if="workshop">{{workshop}}</span>
      <span v-if="linename">{{linename}}</span>
      <span v-if="producttype">{{producttype}}</span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      iStyle: { transform: 'rotate(0deg)' },
      breadcrumb: [],
      appInfo: undefined
    }
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
  computed: {
    ...mapGetters(['factory', 'workshop', 'linename', 'producttype'])
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
  @-webkit-keyframes hue {
    from { -webkit-filter: hue-rotate(0deg); }
    to { -webkit-filter: hue-rotate(-360deg); }
  }
  .app-info {
    display: inline-block;
    float: right;
    margin-right: 10px;
    font-size: 14px;
  }
  .app-info span {
    height: 14px;
    line-height: 14px;
    font-weight: bold;
  }
  .app-info>span:not(:last-child) {
    display: inline-block;
    border-right: 1px solid #d1dbe5;
    padding-right: 4px;
  }
</style>
