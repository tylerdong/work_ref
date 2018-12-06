<!--第一列第二行 单线降等-->
<template>
  <div class="single-defective-rate" id="singleDefectiveRate"></div>
</template>

<script>
  import echarts from 'echarts'
  import {colors, fontSizes} from './common.js'

  export default {
    data () {
      return {
      }
    },
    methods: {
      initChart (data) {
        this.setLineBoardBo(data.linelist)
      },
      // 设置单线降等
      setLineBoardBo (list) {
        let catetoryData = []
        let seriesData = [
          {
            name: '总数',
            data: [],
            type: 'bar',
            itemStyle: {
              normal: {
                barBorderRadius: 3,
                borderRadius: 200,
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#cbf0f8'},
                    {offset: 1, color: '#042dad'}

                  ]
                )
              }
            },
            label: {normal: {show: true, position: 'top', color: '#fff'}}
          },
          {
            name: '异常数',
            data: [],
            type: 'bar',
            itemStyle: {
              barBorderRadius: 3,
              borderRadius: 200,
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#d0e7f8'},
                    {offset: 1, color: '#e6080f'}

                  ]
                )
              }
            },
            label: {normal: {show: true, position: 'top', color: '#fff'}}
          }]
        if (list) {
          for (let i = 0; i < list.length; i++) {
            catetoryData.push(list[i].line + '线')
            seriesData[0].data.push(list[i].amout)
            seriesData[1].data.push(list[i].exceptionNum)
          }
        }
        let singleDefectiveRateOption = {
          title: {
            show: true,
            text: '单线降等(锭)',
            left: 'left',
            top: 'top',
            textStyle: {color: colors[9], fontSize: fontSizes[0], fontWeight: 'normal'}
          },
          legend: {
            orient: 'horizontal',
            x: 'right',
            top: '4%',
            textStyle: {color: '#33FFFF', fontWeight: 'bold', fontSize: '20'}
          },
          grid: {show: true, borderColor: '#33FFFF', left: 0, right: 0},
          xAxis: [{
            type: 'category',
            data: catetoryData,
            axisLabel: {show: true, textStyle: {color: '#fff', fontSize: '14'}}
          }],
          yAxis: [{type: 'value'}],
          series: seriesData
        }
        let singleDefectiveRate = echarts.init(document.getElementById('singleDefectiveRate'))
        singleDefectiveRate.setOption(singleDefectiveRateOption)
      }
    }
  }
</script>

<style scoped lang="css" src="./largescreen.css"></style>
