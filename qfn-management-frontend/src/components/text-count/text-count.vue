<style lang="less">
.error-overlimit {
  color: red;
}
</style>
<template>
  <span :class="{'error-overlimit': isUltraLimit}">{{currentStrLens}}/{{max}}</span>
</template>
<script>
export default {
  name: 'text-count',
  components: {
  },
  props: {
    targetStr: {
      type: String,
      default: ''
    },
    max: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {

    }
  },
  computed: {
    currentStrLens: function () {
      return this.targetStr.length
    },
    isUltraLimit: function () {
      return (this.targetStr.length - this.max) > 0
    }
  }
}
</script>
