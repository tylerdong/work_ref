<!--顶部tab二级导航-->
<template>
  <ul class="submenu-list" v-show="submenu.length > 0">
    <li v-for="(item, index) in submenu" @click="clickFn(item)" v-permission-type="item.permission" :key="item.permission"
        class="tc" :class="{ cur: index === current }">
      {{item.name}}
    </li>
  </ul>
</template>
<script>
  import { eventHub } from '../../module/eventHub'
  import menu from '../../module/menu'

  export default {
    data () {
      return {
        submenu: [],
        menu: menu,
        current: 0
      }
    },
    created () {
    },
    mounted () {
      /* 二级菜单 */
      eventHub.$on('activeSubmenu', (item) => {
        this.submenu = []
        this.current = 0
        for (let i of menu) {
          for (let j of i.children) {
            for (let k of j.children) {
              if (k.id === item.id) {
                this.submenu = k.children
                if (item.twoMenuIndex !== undefined) {
                  this.current = item.twoMenuIndex
                }
                return false
              }
            }
            // if (j.id === item.id) {
            //   this.submenu = j.children
            //   if (item.twoMenuIndex !== undefined) {
            //     this.current = item.twoMenuIndex
            //   }
            //   return false
            // }
          }
        }
      })
    },
    activated () {
    },
    methods: {
      clickFn (item) {
        this.current = this.submenu.indexOf(item)
        eventHub.$emit('twoMenuIndex', {index: this.current})
        this.$router.push({name: item.path})
      }
    }
  }
</script>
<style lang="scss" scoped>
  // 主题样式变量
  @import "./../../../element-variables";
  .submenu-list {
    height: 44px;
    line-height: 44px;
    padding: 0 20px 2px 20px;
    box-shadow: 0px 1px 3px 0px #cbd2d9;
    background: #fff;
    white-space: nowrap;
    li {
      display: inline-block;
      height: 44px;
      font-size: 16px;
      margin: 0 20px;
      cursor: pointer;
      color: #8492a6;
      &.cur {
        color: $--color-primary;
        border-bottom: 3px solid $--color-primary;
      }
    }
  }
</style>
