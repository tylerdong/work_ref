<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.clearfix:after{display:block;clear:both;visibility:hidden;height:0;content:" ";font-size:0}
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
.mb-20 {
  margin-bottom: 20px;
}
.mb-10 {
  margin-bottom: 10px;
}
.mr-30 {
  margin-right: 30px;
}
.mr-20 {
  margin-right: 20px;
}
.fl {
  float: left;
}
.fr {
  float:right;
}
</style>
