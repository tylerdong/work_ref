<template>
  <div class="banner-wrapper">
    <el-carousel trigger="click" height="500px" :autoplay="false">
      <el-carousel-item v-for="item in items" :key="item.id" :style="item.style">
        <el-row class="banner-inner">
          <el-col :span="12">
            <div class="side-wrapper tc">
              <div class="side-inner tl">
                <h1> {{item.h1}} </h1>
                <p> {{item.p}} </p>
                <!--<button>查看详情</button>-->
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="side-wrapper tc">
              <div class="side-inner tl">
                <img :src="item.img">
              </div>
            </div>
          </el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        items: [
          {
            id: 1,
            h1: '携手共进 精诚合作',
            p: '',
            url: '',
            img: '',
            style: 'background: url(/static/img/home/banner0.png) no-repeat;background-position: 50% 0%;'
          },
          {
            id: 2,
            h1: '慧知连项目强势启动',
            p: '',
            url: '',
            img: '/static/img/home/banner.png'
          }
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-carousel{overflow: inherit;}
  .el-carousel__item{
    .banner-inner{
      height: 100%;
      .el-col{height: 100%;display: table;}
      .side-wrapper{
        display: table-cell;
        vertical-align: middle;
        width: 100%;
        .side-inner{display: inline-block}
        h1{
          font-size: 44px;
          font-weight: 400;
          font-family: '\5FAE\8F6F\96C5\9ED1', Arial, "Helvetica Neue", Helvetica, sans-serif;
        }
        p{font-size: 20px;}
        button{
          outline: none;
          cursor: pointer;
          margin-top: 30px;
          font-size: 16px!important;
          float: left;
          width: 120px;
          height: 36px;
          line-height: 30px;
          background: transparent;
          color: #fff;
          transition: color .3s ease-in-out,background .3s ease-in-out;
          &:hover{
           color: #373d41;
           background: #fff;
          }
        }
      }
    }
  }

</style>
<style>
  .banner-wrapper .el-carousel__button{
    width: 12px;
    height: 12px;
    border: 2px solid #fff;
    border-radius: 50%;
    background-color: transparent;
  }
</style>
