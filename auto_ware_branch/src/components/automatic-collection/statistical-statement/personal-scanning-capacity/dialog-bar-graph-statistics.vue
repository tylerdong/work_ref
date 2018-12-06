<template>
  <el-dialog title="统计柱状图" :visible.sync="centerDialogVisible" width="80%" center>
    <div ref="barGraph" id="barGraph" class="bar-graph"></div>
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
        barGraph: {},
        centerDialogVisible: false
      }
    },
    props: {},
    mounted () {
    },
    computed: {},
    methods: {
      show (data) {
        this.centerDialogVisible = true
        this.renderChart(data)
      },
      renderChart (data) {
        console.log(data)
        this.$nextTick(() => {
          let employeeNames = data.map(item => { return item.employeeName })
          let amounts = data.map(item => { return item.amount })
          console.log(employeeNames)
          console.log(amounts)
          this.barGraph = echarts.init(this.$refs.barGraph)
          this.barGraph.setOption({
            title: {text: '统计结果柱状图'},
            tooltip: {},
            xAxis: {data: employeeNames},
            yAxis: {},
            series: [{name: '产量', type: 'bar', data: amounts, label: { normal: {show: true, position: 'top'} }}]
          })
        })
      }
    }
  }
</script>
<style scoped>
  .bar-graph {
    height: 43.26rem;
    width: 70rem;
    margin: 0 auto;
  }
</style>
