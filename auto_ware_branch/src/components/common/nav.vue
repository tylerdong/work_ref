<template>
  <nav :class="className">
    <a v-for='item in items' :class="{ active: item.name===activeName }" @click="changeTab(item)">
      {{item.name}}
    </a>
  </nav>
</template>
<style scoped lang="scss">
  // 主题样式
  @import "./../../../element-variables";
  /* 主要内容区域的tab样式 */
  nav {
    margin: 10px 10px 0 10px;
    a {
      min-width: 96px;
      padding: 0 10px;
      height: 36px;
      line-height: 36px;
      margin-right: 5px;
      border: 1px solid #dee4ec;
      background-color: #eff1f4;
      text-align: center;
      position: relative;
      display: inline-block;
      color: #000000;
      text-decoration: none;
      cursor: pointer;
      &::before {
        content: '';
        position: absolute;
        border-top: 1px solid $--color-primary-light-8;
        top: -1px;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
      }
      &.active {
        z-index: 2;
        color: #000000;
        border-bottom-color: #fff;
      }
      &.active::before {
        background-color: #fff;
      }
    }
  }
  /* dialog中tab的stayle */
  nav.dialog-tab {
    margin-top: 0;
    a.active {
      color:#fff;
      border-bottom-color: $--color-primary-light-8;
      &::before {
        background-color: $--color-primary-light-8;
      }
    }
  }
</style>
<script>
  export default {
    props: {
      items: {
        type: Array,
        default () {
          return []
        }
      },
      activeName: {
        type: String,
        default () {
          return ''
        }
      },
      className: {
        default () {
          return []
        }
      }
    },
    data () {
      return {
      }
    },
    computed: {},
    mounted () {
    },
    methods: {
      changeTab (item) {
        this.$emit('select', item)
      }
    }
  }
</script>
