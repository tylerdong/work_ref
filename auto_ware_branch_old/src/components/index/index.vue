<template>
  <div>
    <div class="banner-container">
      <mainMenu></mainMenu>
      <indexTopBanner></indexTopBanner>
    </div>
    <!--<projectProcess></projectProcess>-->
    <homeFooter></homeFooter>
  </div>
</template>

<script type="text/ecmascript-6">
  import mainMenu from './menu/topMenu.vue'
  import indexTopBanner from './banner/index-top-banner.vue'
  import projectProcess from './process/project-process.vue'
  import homeFooter from './home-footer.vue'

  export default {
    components: {
      mainMenu,
      indexTopBanner,
      projectProcess,
      homeFooter
    }
  }
</script>
