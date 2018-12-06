<template>
  <header>
    <div v-if="back" class="back-div" @click="goBack"><el-icon class="el-icon-back"></el-icon> 后退</div>
    <div class="center-title">{{$router.currentRoute.meta.title}}</div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      back: false
    }
  },
  watch: {
    '$route':
      {
        immediate: true,
        handler: function (to, from) {
          this.back = to.name === 'inner-search-detail'
        }
      }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  header {
    height: 4rem;
    line-height: 4rem;
    box-shadow: 3px 3px 0 #5a5b5c outset,0 1px 0 #080808;
    background: linear-gradient(to top,rgb(11, 119, 191), rgb(27, 114, 162));
    margin: 0.5rem 0 0 0;
    border-radius: 3px;
    color: #FFFFFF;
    font-size: large;
    font-weight: normal;
    float: left;
    position: relative;
    width: 100%;
  }
  header .back-div {
    display: inline-block;
    float: left;
    margin-left: 2rem;
  }
  header .center-title {
    *display: inline;
    display: inline-block;
    text-align: center;
    font-size: 25px;
    font-weight: normal;
    float: left;
    position: absolute;
    right: 50%;
  }
</style>
