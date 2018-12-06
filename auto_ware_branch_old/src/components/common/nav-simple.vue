<template>
  <nav>
    <a v-for='item in navList'
       :key="item.id"
       :class="{ active: item.id === selectNavId }"
       @click="selectNav(item)">
      {{item.name}}
    </a>
  </nav>
</template>
<script>
  export default {
    data () {
      return {}
    },
    props: {
      navList: {
        type: Array,
        default () {
          return []
        }
      },
      selectNavId: {
        type: String,
        default () {
          return ''
        }
      }
    },
    mounted () {
    },
    computed: {},
    methods: {
      selectNav (item) {
        this.$emit('callback-select-nav', item)
      }
    }
  }
</script>
<style scoped lang="scss">
  nav {
    margin: 10px 10px 0 10px;
    a {
      width: 96px;
      height: 36px;
      line-height: 36px;
      margin-right: 5px;
      border: 1px solid #dee4ec;
      background-color: #eff1f4;
      text-align: center;
      position: relative;
      display: inline-block;
      color: inherit;
      text-decoration: none;
      cursor: pointer;
      &::before {
        content: '';
        position: absolute;
        border-top: 2px solid #3b9dd8;
        top: -1px;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
      }
      &.active {
        z-index: 2;
        color: #367fa9;
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
      color: #fff;
      border-bottom-color: #3b9dd8;
      &::before {
        background-color: #3b9dd8;
      }
    }
  }
</style>
