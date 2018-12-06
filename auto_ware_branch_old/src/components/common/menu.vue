<template>
  <ul class="sidebar-menu">
    <li v-for="(item,index) in menu" v-permission-children-exist="item"
        v-permission-user-type="item.permissionUserType" :key="index">
      <a @click="menuClick(item)" :class="{currentSelected: activeName === item.name}">
        <i :class="item.icon"></i>
        <span>{{item.name}}</span>
      </a>
      <transition name="fade">
        <ul v-if="item.children" v-show="item.showChildren" class="sub-side-bar-menu">
          <li v-for="subItem in item.children" @click='menuNode(subItem, item.name)' v-permission-type="subItem.permission">
            <a :class="{currentSelected: activeSubIndex === subItem.id}">
              <i :class="subItem.icon"></i>
              <span>{{subItem.name}}</span>
            </a>
          </li>
        </ul>
      </transition>
    </li>
  </ul>
</template>

<script>
  import menus from '../../module/menu'
  import { eventHub } from '../../module/eventHub'
  export default {
    components: {
    },
    data () {
      return {
        menu: [],
        activeName: '',
        activeSubIndex: ''
      }
    },
    created () {
      for (let module of menus) {
        let permissionUserType = module.permissionUserType
        for (let child of module.children) {
          child.permissionUserType = permissionUserType
          for (let subChild of child.children) {
            subChild.permissionUserType = permissionUserType
          }
          this.menu.push(child)
        }
      }
    },
    methods: {
      menuNode (item, name) {
        eventHub.$emit('addMenuTabItem', item) // Hub触发事件
        this.activeSubIndex = item.id
        this.activeName = name
      },
      menuClick (item) {
        item.showChildren = !item.showChildren
        item.icon = item.showChildren ? 'far fa-minus-square' : 'far fa-plus-square'
        this.activeName = item.name
      }
    },
    computed: {
      isSelected: function () {
      }
    }
  }
</script>
<style scoped lang="scss">
  .iconfont{
    width: 20px;
    display: inline-block;
  }
</style>
