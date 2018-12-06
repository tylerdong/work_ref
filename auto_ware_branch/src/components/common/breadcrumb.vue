<template>
  <div class="breadcrumb-wrapper cf" style="display: none">
    <span>当前位置：</span>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <template v-for="(item,index) in nameArray">
        <el-breadcrumb-item :key="index">{{item.name}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script type="text/ecmascript-6">
  import menu from '../../module/menu'
  export default {
    props: {
      nameId: {
        type: String,
        default: '01'
      }
    },
    mounted () {
      let nameId = this.nameId
      let nowNameArray = []
      let nameArray = []
      function forChild (child) { // obj是各级child
        for (let i in child) {
          if (i !== '0') {
            nowNameArray.splice(-1, 1)
          }
          nowNameArray.push({ name: child[i].name })
          if (child[i].id === nameId) {
            nameArray = nowNameArray.slice(0)
          }
          if (child[i].children && child[i].children.length !== 0) {
            forChild(child[i].children)
          }
        }
        nowNameArray.splice(-1, 1)
      }
      forChild(menu)
      this.nameArray = nameArray
    },
    data () {
      return {
        nameArray: []
      }
    },
    methods: {
    }
  }
</script>
<style lang="scss">
  .breadcrumb-wrapper .el-breadcrumb .el-breadcrumb__item:not(:first-child) .el-breadcrumb__item__inner {color: #444954;cursor: inherit;}
</style>
<style scoped lang="scss">
  .breadcrumb-wrapper{
    line-height:0;
    background: #fff;
    box-shadow: 0px 1px 3px 0px #cbd2d9;
    padding-left: 15px;
    span{
      display: inline-block;
      height: 30px;
      line-height: 30px;
      vertical-align: bottom;
    }
    .el-breadcrumb{
      display: inline-block;
      height: 30px;
      line-height: 30px;
      vertical-align: bottom;
    }
  }
</style>
