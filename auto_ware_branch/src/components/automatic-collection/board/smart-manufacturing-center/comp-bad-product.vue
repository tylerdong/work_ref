<!--第一列第一行良品分布，不良品分布-->
<template>
  <div>
    <div class="leftring right-ring">
      <ul>
        <li>
          <div id="doubleARate"></div>
        </li>
        <li>
          <div id="aRate"></div>
        </li>
        <li>
          <div id="bRate"></div>
        </li>
        <li>
          <div id="cRate"></div>
        </li>
      </ul>
    </div>
    <div class="rightring">
      <div id="defectiveRate" class="defective-rate"></div>
    </div>
    <div style="clear: both;"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import {colors, fontSizes} from './common'
  export default {
    data () {
      return {}
    },
    methods: {
      initChart (data) {
        // 第一行第一列
        this.setRate(data)
        this.setBadistribution(data.maldistributionBoList)
      },
      // 设置双A率，A率，B率，C率
      setRate (data) {
        let doubleARate = echarts.init(document.getElementById('doubleARate'))
        let aRate = echarts.init(document.getElementById('aRate'))
        let bRate = echarts.init(document.getElementById('bRate'))
        let cRate = echarts.init(document.getElementById('cRate'))
        let doubleARateOption = this.getRateOption(data.rateAA, 'AA率(锭重)')
        let aRateOption = this.getRateOption(data.rateA, 'A率(锭重)')
        let bRateOption = this.getRateOption(data.rateB, 'B率(锭重)')
        let cRateOption = this.getRateOption(data.rateC, 'C率(锭重)')
        doubleARate.setOption(doubleARateOption)
        aRate.setOption(aRateOption)
        bRate.setOption(bRateOption)
        cRate.setOption(cRateOption)
      },
      // 设置不良品分布
      setBadistribution (maldistributionBoList) {
        if (!maldistributionBoList) {
          return
        }
        maldistributionBoList = maldistributionBoList.reverse()
        let option = {
          title: {
            show: true,
            text: '不良品分布',
            left: 'center',
            top: '2%',
            textStyle: {color: colors[9], fontWeight: 'normal', fontSize: fontSizes[0]}
          },
          grid: {
            top: '40%'
          },
          series: []
        }
        let sum = 0
        let categorys = []
        for (let j = 0; j < maldistributionBoList.length; j++) {
          sum += maldistributionBoList[j].exceptionNum
          categorys.push(maldistributionBoList[j].downReasonName)
        }
        option.legend = {
          top: '23%',
          left: '16%',
          padding: 0,
          data: [],
          orient: 'vertical',
          itemHeight: 12,
          itemGap: 4,
          textStyle: { fontSize: 14, color: colors[10] }
        }
        for (let i = 0; i < maldistributionBoList.length; i++) {
          option.legend.data.push({
            name: maldistributionBoList[i].downReasonName,
            icon: 'image://../../../../../static/board/img/legend.png'
          })
          let parsent = (maldistributionBoList[i].exceptionNum / sum).toFixed(2)
          option.series.push({
            type: 'pie',
            name: maldistributionBoList[i].downReasonName,
            clockWise: true,
            radius: [i * 19, (i + 1) * 18],
            center: ['45%', '56%'],
            itemStyle: {normal: {label: {show: false}, labelLine: {show: false}}},
            data: [{
              value: parsent,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#00B2EE'
                  }, {offset: 1, color: '#00DDE6'}])
                }
              }
            }, {
              value: 1 - parsent,
              itemStyle: {
                normal: {
                  color: 'transparent'
                }
              }
            }]
          })
        }
        option.legend.data = option.legend.data.reverse()
        let defectiveRate = echarts.init(document.getElementById('defectiveRate'))
        defectiveRate.resize()
        defectiveRate.setOption(option)
      },
      // 获取echarts环形图数据
      getRateOption (rate, title) {
        let Option = {
          title: {show: true, text: title, left: 'center', top: '0', bottom: '0', textStyle: {color: colors[10]}},
          graphic: {
            type: 'text',
            left: 'center',
            top: 'center',
            shadowColor: '#91918a',
            style: {text: rate + '%', font: 'bolder 1rem "Microsoft YaHei", sans-serif', fill: '#fff'}
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['38%', '50%'],
              avoidLabelOverlap: false,
              label: {normal: {show: false, position: 'center'}},
              data: [
                {value: rate, itemStyle: {normal: {color: '#5fe1fc'}}},
                {value: 100 - rate, itemStyle: {normal: {color: '#97afca'}}}
              ]
            }
          ]
        }
        return Option
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
          grid: {show: true, borderColor: '#33FFFF', left: 0, right: 0},
          xAxis: [{
            type: 'category',
            data: catetoryData,
            axisLabel: {show: true, textStyle: {color: '#fff', fontSize: '12'}}
          }],
          yAxis: [{type: 'value', axisLabel: {show: true, textStyle: {color: '#fff', fontSize: '12'}}}],
          series: seriesData
        }
        let singleDefectiveRate = echarts.init(document.getElementById('singleDefectiveRate'))
        singleDefectiveRate.setOption(singleDefectiveRateOption)
      },
      // 当日产量，待包装数，打包锭数，打包包数
      setTotalAmout (data) {
        if (data) {
          let totalAmout = data.totalAmout.toString().padStart(6, '0')
          let resultStr = ''
          for (let i = 0; i < 6; i++) {
            resultStr += '<li>' + totalAmout[i] + '</li>'
          }
          $('#totalAmout').html(resultStr)
          $('#waitPackNum').text(data.waitPackNum)
          $('#packedNum').text(data.packedNum)
          $('#boxNum').text(data.boxNum)
        }
      }
    }
  }
</script>

<style scoped lang="css" src="./largescreen.css"></style>
