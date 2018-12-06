<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave">
    <div :style="{ width: width, top: top, bottom: bottom }" ref="dialog" v-show="visibleC" class="jk-dialog">
      <div @click="close" class="jk-dialog__close">
        <i class="el-icon-close jk-dialog__close-i"></i>
      </div>
      <div class="jk-dialog__title">{{title}}</div>
      <div ref="dialogMain" class="jk-dialog__main">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      width: {
        type: String,
        default: '400px'
      },
      visible: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '提示'
      },
      top: {
        type: String,
        default: '50px'
      },
      bottom: {
        type: String,
        default: '0'
      },
      time: {
        type: String,
        default: '.3'
      }
    },
    data () {
      return {
      }
    },
    computed: {
      visibleC () {
        return this.visible
      }
    },
    mounted () {
    },
    methods: {
      beforeEnter (el) {
        el.style.transition = 'right ' + this.time + 's'
        el.style.right = '-' + this.width
      },
      enter (el) {
        setTimeout(() => {
          el.style.right = 0
        }, 1)
      },
      afterEnter (el) {
        el.style.transition = ''
      },
      beforeLeave (el) {
        el.style.transition = 'right ' + this.time + 's'
      },
      leave (el) {
        el.style.right = '-' + this.width
      },
      afterLeave (el) {
        el.style.transition = ''
      },
      close () {
        this.$emit('update:visible', false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .jk-dialog{
    position: fixed;
    z-index: 1900;
    top: 50px;
    bottom: 0;
    right: 0;
    background-color: #fff;
    border: 1px solid #efefef;
    box-sizing: border-box;
    box-shadow: -1px 0px 5px 0px #efefef
  }
  .jk-dialog__close{
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 10px;
    transition: all .3s ease;
    cursor: pointer;
    .jk-dialog__close-i{
      color: #999;
      font-size: 14px;
    }
    &:hover{
      .jk-dialog__close-i{
        color: #333;
      }
      transform:rotate(180deg);
    }
  }
  .jk-dialog__title{
    line-height: 70px;
    height: 70px;
    font-size: 18px;
    text-align: left;
    padding-left: 25px;
  }
  .jk-dialog__main{
    position: absolute;
    top: 70px;
    left: 10px;
    right: 0;
    bottom: 0;
    padding: 10px;
    overflow-y: auto;
  }
</style>
