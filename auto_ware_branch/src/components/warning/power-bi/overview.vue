<template>
  <div>
    <div :style="allWrapper">
      <img src="./../../../../static/img/full-screen.png" @click="showFullScreen" :style="floating" class="full-screen"/>
      <iframe :src="reportUrl" :style="contentStyle" ref="boardContent"></iframe>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        reportUrl: `${window.global.pbiServerUrl}Reports/powerbi/数据分析/质量追溯和数据分析-总体一览?rs:Embed=true`,
        allWrapper: {
          overflowX: 'auto',
          position: 'relative'
        },
        floating: {
          position: 'absolute'
        },
        contentStyle: {
          width: `100%`,
          height: `${window.screen.height - 60}px`
        }
      }
    },
    computed: {},
    mounted () {
      console.log(this.$route)
    },
    methods: {
      showFullScreen () {
        let docElm = this.$refs.boardContent
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen()
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen()
        }
      }
    }
  }
</script>

<style scoped>
  .all-wrapper {
    overflow-x: auto;
  }
</style>
