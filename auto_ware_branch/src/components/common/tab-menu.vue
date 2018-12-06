<!--顶部tab导航-->
<template>
  <div>
    <ul class="navbar-lists" ref="refNavbar">
      <template v-for="(item,index) in menuItem">
        <li :class="{ active: index === current || menuItem.length === 1 }"
            v-permission-user-type="item.permissionUserType"
            v-permission-type="item.permission">
          <b @click="clickFn(item)">{{item.name}}</b>
          <span class="navitem-close" @click="delFn(item)"><i class="el-icon-close"></i></span>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
  import { eventHub } from '../../module/eventHub'
  import * as names from '../../router/names.js'

  export default {
    data () {
      return {
        current: 0,
        component: null,
        menuItem: []
      }
    },
    beforeMount () {
      eventHub.$on('destroyComponent', (component, path) => {
        for (let item of this.menuItem) {
          for (let child of item.children) {
            if (path === child.path) {
              if (!item.cmpts) {
                item.cmpts = new Set()
              }
              item.cmpts.add(component)
            }
          }
        }
      })
    },
    created () {
      /* 推出登录时重置顶部导航栏 */
      eventHub.$on('resetMenus', () => {
        this.menuItem.splice(0, this.menuItem.length)
        this.menuItem.push({
          name: '',
          path: names.USERCENTER_WELCOME,
          children: []
        })
      })

      /* 添加顶部导航栏 */
      eventHub.$on('addMenuTabItem', (item) => {
        /* 顶部导航 重复处理 */
        let repeatIndex = 0
        let repeatResult = this.menuItem.some((val, index) => {
          repeatIndex = index
          // return val.name === item.name
          return val.id === item.id
        })

        /* 重复判断 */
        if (repeatResult) {
          this.current = repeatIndex
          this.$router.push({name: item.path})
          eventHub.$emit('activeSubmenu', item)
          return
        }
        /* 个数判断 */
        if (this.menuItem.length >= 9) {
          this.$message.info('标签最多存在9个')
//        } else if ((this.menuItem.length + 1) * 127 > this.$refs.refNavbar.offsetWidth) {
//          this.$message.info('标签数量过多，请先关闭一个标签')
        } else {
          this.menuItem.push(JSON.parse(JSON.stringify(item)))
          this.current = ++repeatIndex
          this.$router.push({name: item.path})
          eventHub.$emit('activeSubmenu', item)
        }
      })

      /* 二级目录记录 */
      eventHub.$on('twoMenuIndex', data => {
        if (Array.isArray(this.menuItem) && this.menuItem[this.current]) {
          this.menuItem[this.current].twoMenuIndex = data.index
        }
      })
    },
    methods: {
      /* 顶部导航切换 */
      clickFn (item) {
        this.current = this.menuItem.indexOf(item)
        if (item.twoMenuIndex) {
          this.$router.push({name: item.children[item.twoMenuIndex].path})
        } else {
          this.$router.push({name: item.path})
        }
        eventHub.$emit('activeSubmenu', item)
      },

      /* 顶部导航删除 */
      delFn (item) {
        /* 销毁组件 */
        this.$nextTick(() => {
          if (item.cmpts) {
            item.cmpts.forEach((cmpt) => {
              cmpt.$destroy()
            })
          }
        })
        let indexPlace = this.menuItem.indexOf(item)
        /* 删除非高亮标签 */
        if (this.current !== indexPlace && this.current > indexPlace) {
          this.menuItem.splice(indexPlace, 1)
          this.current--
          return
        }

        if (this.current !== indexPlace && this.current < indexPlace) {
          this.menuItem.splice(indexPlace, 1)
          return
        }

        /* 删除高亮标签 */

        /* 1.高亮标签不是最后一个 */
        if (this.current === indexPlace && indexPlace !== (this.menuItem.length - 1)) {
          this.menuItem.splice(indexPlace, 1)
          this.current = indexPlace
          this.$router.push({name: this.menuItem[this.current].path})
          eventHub.$emit('activeSubmenu', this.menuItem[this.current])
          return
        }

        /* 2.高亮标签是最后一个 */
        if (this.current === indexPlace && indexPlace === (this.menuItem.length - 1)) {
          if (this.menuItem.length === 1) {
            this.$message.info('最后一个标签，无法删除')
          } else {
            this.menuItem.pop()
            this.current = --indexPlace
            this.$router.push({name: this.menuItem[this.current].path})
            eventHub.$emit('activeSubmenu', this.menuItem[this.current])
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  // 主题样式
  @import "./../../../element-variables";
  .navbar-lists {
    padding-top: 13px;
    white-space: nowrap;
    overflow: auto;
    position: relative;
    &::-webkit-scrollbar {
      height: 8px;
    }
    &::-webkit-scrollbar-track { /* 滚动条的滑轨背景颜色 */
      background-color: #eff1f4;
    }
    &::-webkit-scrollbar-thumb { /* 滑块颜色 */
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
      background-color: #F5F5F5;
      height: 20px;
      top: 10px;
    }
    li {
      font-size: 14px;
      height: 36px;
      line-height: 36px;
      background: $--color-primary;
      border-radius: 3px 3px 0 0;
      border: 1px solid rgba(25, 25, 112, 0.3);
      border-bottom: none;
      margin-right: 5px;
      text-align: center;
      position: relative;
      cursor: pointer;
      display: inline-block;
      box-sizing: content-box;
      &:last-child {
        margin-right: 0px;
      }
      b {
        font-weight: normal;
        width: 120px;
        padding: 0 25px 0 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
        color: #fff;
        border-radius: 4px 4px 0 0;
      }
      &.active {
        &:hover {
          background: #fff;
        }
        background: #fff;
        b {
          color: $--color-primary;
        }
        .navitem-close i {
          color: $--color-primary;
        }
      }
      &:hover {
        background: $--color-primary;
        color: #fff;
      }
      .navitem-close {
        position: absolute;
        cursor: pointer;
        top: 0;
        right: 10px;
        transform: scale(0.7);
        transition: all .5s ease;
        &:hover {
          transform: rotate(180deg) scale(1);
        }
        i {
          font-size: 12px;
          color: #fff;
        }
      }
    }
  }
</style>
