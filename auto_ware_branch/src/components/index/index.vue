<template>
  <div class="container-cover" :style="coverStyle">
    <div class="content">
      <div class="title-box">
        <ul>
          <li>
            <h2>{{componyConfig.title}}</h2>
          </li>
          <li>
            <span>
              <img src="./../../assets/images/huizhilian_left.png" alt=""/>
              {{componyConfig.subTitle}}
              <img src="./../../assets/images/huizhilian_right.png" alt=""/>
            </span>
          </li>
        </ul>
      </div>
      <div class="login-box-process">
        <login-process></login-process>
      </div>
    </div>
    <!--底部-->
    <div class="footer-process">
      <div>
        技术支持提供商：<img :src="`./../../static/${componyConfig.imgPath}/img/logo.png`"/>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import loginProcess from './process/login-process'
  import homeFooter from './home-footer'
  export default {
    components: {
      loginProcess,
      homeFooter
    },
    data () {
      return {
        coverStyle: {
          width: `${document.body.clientWidth}px`,
          height: `${document.body.clientHeight}px`
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
