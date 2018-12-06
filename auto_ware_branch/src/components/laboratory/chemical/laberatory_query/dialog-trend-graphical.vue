<template>
  <el-dialog title="趋势图" :visible.sync="dialogShow" @close="close" class="graphical-dialog" width="80%">
    <div class="outer">
      <div ref="lineChart" v-bind:style="{height: dynamicHeight + 'px' }" class="inner-chart"></div>
    </div>
  </el-dialog>
</template>
<script>
  import echarts from 'echarts'

  export default {
    components: {},
    created () {
    },
    data () {
      return {
        dialogShow: false,
        dynamicHeight: '90',
        data: {},
        lineChart: {}
      }
    },
    mounted () {
    },
    computed: {},
    methods: {
      show (data) {
        this.dialogShow = true
        this.renderChart(data)
      },
      renderChart (data) {
        data.tableColumns.shift()
        data.tableData = data.tableData.filter(item => { return item.checked })
        this.dynamicHeight = data.tableData.length * 300 + 100
        let option = {
          grid: [],
          title: [],
          tooltip: {formatter: '{a}: {c}'},
          xAxis: [],
          yAxis: [],
          series: [],
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          }
        }
        this.$nextTick(() => {
          data.tableData.forEach((item, index) => {
            option.grid.push({left: 'center', top: index * 300 + 45, height: '200', width: '90%', containLabel: true})
            option.title.push({
              text: data.tableData[index].nodeName,
              left: 'center',
              top: index * 300,
              textStyle: {
                fontSize: 14,
                fontWeight: 'normal'
              }
            })
            option.xAxis.push({gridIndex: index, name: '', type: 'category', data: data.tableColumns})
            option.yAxis.push({
              gridIndex: index,
              axisLabel: {
                show: true,
                formatter: (value) => {
                  return value.toString().padStart(8, ' ')
                } }
            })
            option.series.push({
              name: data.tableData[index].nodeName,
              type: 'line',
              xAxisIndex: index,
              yAxisIndex: index,
              data: data.tableData[index].labRptMonthTrendGroupNodeVos.map(item => {
                return item.value ? item.value : '0'
              })
            })
          })
          this.lineChart = echarts.init(this.$refs.lineChart)
          this.lineChart.setOption(option, true)
          this.lineChart.resize()
        })
      },
      close () {
        this.dialogShow = false
      }
    }
  }
</script>
<style scoped>
  .outer {
    height: 50rem;
    overflow-y: auto;
  }

  .inner-chart {
    width: 80%;
    margin: 0 auto;
  }

  .graphical-dialog {
    /*width: 82rem;*/
  }

</style>
