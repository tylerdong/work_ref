<template>
  <div class="auto-line">
    <p class="title">生产包装状况</p>
    <div class="common-border-top common-border-bottow">
      <ul>
        <li>
          <label class="sub-title top-title">待包装锭数</label>
          <span id="waitPackNum">0</span>
          <label class="sub-title top-title">打包锭数</label>
          <span id="packedNum">0</span>
          <label class="sub-title top-title">打包包数</label>
          <span id="boxNum">0</span>
        </li>
        <li>
          <div id="autoline" class="auto-line-right"></div>
        </li>
      </ul>
      <div style="clear: both"></div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {colors} from './common.js'
  export default {
    methods: {
      initData (data) {
        this.setTotalAmout(data)
        this.setWorklineSickNum(data)
      },
      // 当日产量，待包装数，打包锭数，打包包数
      setTotalAmout (data) {
        if (data) {
          let totalAmout = data.totalAmout.toString().padStart(6, '0')
          for (let i = 0; i < 6; i++) {
            $($('totalAmout li')[i]).html(totalAmout[i])
          }
          $('#waitPackNum').text(data.waitPackNum)
          $('#packedNum').text(data.packedNum)
          $('#boxNum').text(data.boxNum)
        }
      },
      // 自动1包装锭数，自动2包装锭数，自动3包装锭数
      setWorklineSickNum (data) {
        let autoline = echarts.init(document.getElementById('autoline'))
        let autolineOption = {
          series: [
            {
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {normal: {show: true, color: colors[10], formatter: '{b}\n{c}锭', fontSize: 15}},
              labelLine: {normal: {show: false}},
              data: [
                {value: data.autoPackNum1, name: '自动1线'},
                {value: data.autoPackNum2, name: '自动2线'},
                {value: data.autoPackNum3, name: '自动3线'},
                {value: data.handpackNum, name: '人工线'}
              ]
            }
          ]
        }
        autoline.setOption(autolineOption)
      }
    }
  }
</script>

<style scoped lang="css" src="./largescreen.css"></style>
