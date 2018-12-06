<template>
  <div class="content">
    <el-form :inline="true" ref="form" :rules="rules" :model="search">
      <el-form-item prop="workshopId">
        <el-select v-model="search.workshopId" placeholder="请选择车间" @change="getLineList" clearable>
          <el-option v-for="item in options.workshop" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="search.lineId" :loading="search.lineLoading" placeholder="请选择线别" clearable>
          <el-option v-for="item in options.lineList" :key="item.id" :label="item.line" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="startDate">
        <el-date-picker v-model="search.startDate" type="date" placeholder="选择开始日期"></el-date-picker>
      </el-form-item>
      <el-form-item prop="endDate">
        <el-date-picker v-model="search.endDate" type="date" placeholder="选择结束日期"
                        :picker-options="endOptions"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchClick('form')" :loading="loading.search">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button v-show="!boardCurrent" type="primary" @click="showClick">全屏</el-button>
      </el-form-item>
    </el-form>
    <!--看板内容-->
    <div class="board-content" id="boardContent" ref="boardContent">
      <div class="inner-content" :style="contentStyle">
      <div class="top-title">
        <ul>
          <li><img class="logo" src="../../../../../static/img/logo.png" alt=""></li>
          <li><div>自动化分析看板</div></li>
          <li>
            <div class="date-box">
              <span id="currTime">2017-12-07</span>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <div class="title-box">产量分析<span id="quaUpdateDate"></span></div>
        <div class="content-box">
          <div class="production flex-grow-1">
            <ul>
                <li>
                  <table>
                    <tr>
                      <th>双A率</th>
                    </tr>
                    <tr>
                      <td id="rateAA">NA</td>
                    </tr>
                    <tr>
                      <td>AA%</td>
                    </tr>
                  </table>
                </li>
                <li>
                  <table>
                    <tr><th>一等率</th></tr>
                    <tr><td id="rateA">NA</td></tr>
                    <tr><td>一等率%</td></tr>
                  </table>
                </li>
              </ul>
          </div>
          <div class="production-table flex-grow-3">
            <table>
                <tr>
                  <th>车间</th>
                  <th>线别</th>
                  <th>班次</th>
                  <th>AA数</th>
                  <th>AA%</th>
                  <th>A数</th>
                  <th>A%</th>
                  <th>B数</th>
                  <th>B%</th>
                  <th>C数</th>
                  <th>C%</th>
                  <th>丝锭数</th>
                </tr>
                <tbody id="productionTable">
                  <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                  <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                  <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                  <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                  <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                  <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                  <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                  <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                  <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                  <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                  <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                  <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>
        <div class="content-box">
          <div class="inspection-table">
            <div class="title-box">自动外观检分析</div>
            <table :style="tableStyle">
              <tr v-if="silkExceptData[0] && silkExceptData[0].length > 0">
                <th v-for="item in silkExceptData[0]">{{item.name}}</th>
              </tr>
              <tbody>
                <tr v-for="item in pagedSilkExcData">
                  <td v-for="index in  Array(silkExceptData[0].length).fill(0).map((item, i) =>  ++i)">{{item[`id${index}`]}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="inspection">
            <div class="title-box" :style="chartTitle">TOPN</div>
            <div id="inspectionChart" :style="chartStyle"></div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
</template>

<script>
  import * as api from 'src/api'
  import echarts from 'echarts'
  import dateFns from 'date-fns'
  export default {
    components: {},
    data () {
      return {
        contentStyle: {
          width: `${window.screen.width}px`,
          height: `${window.screen.height}px`
        },
        chartTitle: {
          width: `${window.screen.width * 0.408}px`,
          textAlign: 'center'
        },
        chartStyle: {
          width: `${window.screen.width * 0.408}px`,
          height: `${window.screen.height * 0.235}px`
        },
        tableStyle: {
          width: `${window.screen.width * 0.57}px`
        },
        inspectionChart: null,
        quaPage: {
          current: 1,
          size: 12,
          total: 0
        },
        excPage: {
          current: 1,
          size: 12,
          total: 0
        },
        intervalFlag: {
          intExc: null,
          intQua: null,
          total: null
        },
        search: {
          workshopId: '',
          lineId: '',
          startDate: new Date(),
          endDate: new Date()
        },
        silkQualityData: [],
        silkExceptData: [],
        pagedSilkExcData: [],
        options: {
          workshop: [],
          lineList: []
        },
        endOptions: {
          disabledDate: (time) => {
            if (this.search.startDate) {
              return time.getTime() < this.search.startDate.getTime()
            }
          }
        },
        rules: {
          startDate: [{type: 'date', required: true, message: '请选择开始日期', trigger: 'change'}],
          endDate: [{type: 'date', required: true, message: '请选择截止日期', trigger: 'change'}]
        },
        loading: {
          search: false
        },
        boardCurrent: false
      }
    },
    deactivated () {
      clearInterval(this.intervalFlag.intExc)
      clearInterval(this.intervalFlag.intQua)
      clearInterval(this.intervalFlag.total)
    },
    mounted () {
      this.inspectionChart = echarts.init(document.getElementById('inspectionChart'))
      this.getAllWorkshop()
      this.getData()
    },
    methods: {
      showClick () {
        let docElm = this.$refs.boardContent
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen()
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen()
        }
      },
      // 选择车间
      getAllWorkshop () {
        api.automatic.dictionary.getAllWorkshopList({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.workshop = data.data
          } else {
            this.$message({type: 'error', message: data.message})
          }
        })
      },
      // 根据车间选择线别
      getLineList (val) {
        this.search.lineId = ''
        if (val) {
          api.automatic.productPlan.getAllLine({
            workShopId: val
          }).then(response => {
            const data = response.data
            if (data.messageType === 1) {
              this.options.lineList = data.data
            } else {
              this.$message({type: 'error', message: data.message})
            }
          }).finally(() => {
          })
        }
      },
      searchClick (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            clearInterval(this.intervalFlag.intExc)
            clearInterval(this.intervalFlag.intQua)
            clearInterval(this.intervalFlag.total)
            this.quaPage.current = 1
            this.excPage.current = 1
            this.getData()
            this.intervalFlag.total = setInterval(this.getData, 5 * 60 * 1000)
          }
        })
      },
      getData () {
        let currentDate = dateFns.format((new Date()), 'YYYY-MM-DD')
        $('#currTime').html(currentDate)
        this.loading.search = true
        const param = {
          startDate: `${dateFns.format(this.search.startDate, 'YYYY-MM-DD')}`,
          endDate: `${dateFns.format(this.search.endDate, 'YYYY-MM-DD')}`,
          workshopId: this.search.workshopId,
          lineId: this.search.lineId
        }
        Promise.all([api.automatic.statement.getSilkQualityReport(param), api.automatic.statement.getExceptSilkReportList(param)]).then(response => {
          let quality = response[0].data
          if (quality.messageType === 1) {
            if (quality.data.list && quality.data.list.length > 0) {
              this.silkQualityData = quality.data
              this.renderSilkRate()
              this.renderSilkQuality()
              this.intervalFlag.intQua = setInterval(this.renderSilkQuality, 5000)
            } else {
              this.silkQualityData = []
              this.clearSilkQuality()
            }
          } else {
            this.$message({type: 'error', message: quality.message})
          }
          const except = response[1].data
          if (except.messageType === 1) {
            if (except.data.length > 0 && except.data[1].length > 0) {
              this.silkExceptData = except.data
              this.renderExceptSilkChart(except.data)
              this.renderExceptSilk()
              this.intervalFlag.intExc = setInterval(this.renderExceptSilk, 5000)
            } else {
              this.silkExceptData = []
              this.pagedSilkExcData = []
              this.clearSilkException()
            }
          } else {
            this.$message({type: 'error', message: except.message})
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading.search = false
        })
      },
      renderSilkRate () {
        const data = this.silkQualityData.list
        const total = data.reduce((acc, curr) => { return acc + curr.total }, 0)
        const aa = data.reduce((acc, curr) => { return acc + curr.aa }, 0)
        const a = data.reduce((acc, curr) => { return acc + curr.a }, 0)
        $('#rateAA').html(`${((aa / total) * 100).toFixed(2)}%`)
        $('#rateA').html(`${(((aa + a) / total) * 100).toFixed(2)}%`)
        $('#quaUpdateDate').html(`(数据刷新时间:${dateFns.format(this.silkQualityData.reportData, 'YYYY-MM-DD HH:mm')})`)
      },
      renderSilkQuality () {
        const data = this.silkQualityData.list
        // 数据总数
        const length = data.length
        // 页数
        this.quaPage.total = Math.ceil(length / this.quaPage.size)
        for (let j = 0; j < this.quaPage.size; j++) {
          // 第j行
          let tr = $(`#productionTable tr:eq(${j})`)
          // 选取数据
          let index = (this.quaPage.current - 1) * this.quaPage.size + j
          $(tr).find('td:eq(0)').html(index >= length ? '&nbsp;' : data[index].workshopName)
          $(tr).find('td:eq(1)').html(index >= length ? '&nbsp;' : data[index].lineName)
          $(tr).find('td:eq(2)').html(index >= length ? '&nbsp;' : data[index].classesName)
          $(tr).find('td:eq(3)').html(index >= length ? '&nbsp;' : data[index].aa)
          $(tr).find('td:eq(4)').html(index >= length ? '&nbsp;' : `${((data[index].aa / data[index].total) * 100).toFixed(2)}%`)
          $(tr).find('td:eq(5)').html(index >= length ? '&nbsp;' : data[index].a)
          $(tr).find('td:eq(6)').html(index >= length ? '&nbsp;' : `${((data[index].a / data[index].total) * 100).toFixed(2)}%`)
          $(tr).find('td:eq(7)').html(index >= length ? '&nbsp;' : data[index].b)
          $(tr).find('td:eq(8)').html(index >= length ? '&nbsp;' : `${((data[index].b / data[index].total) * 100).toFixed(2)}%`)
          $(tr).find('td:eq(9)').html(index >= length ? '&nbsp;' : data[index].c)
          $(tr).find('td:eq(10)').html(index >= length ? '&nbsp;' : `${((data[index].c / data[index].total) * 100).toFixed(2)}%`)
          $(tr).find('td:eq(11)').html(index >= length ? '&nbsp;' : data[index].total)
        }
        console.log(`quaPage.current:${this.quaPage.current}`)
        // 下一页
        this.quaPage.current++
        if (this.quaPage.current > this.quaPage.total) {
          this.quaPage.current = 1
        }
      },
      clearSilkQuality () {
        $('#rateAA').html('NA')
        $('#rateA').html('NA')
        $('#quaUpdateDate').html('')
        for (let j = 0; j < this.quaPage.size; j++) {
          let tr = $(`#productionTable tr:eq(${j})`)
          $(tr).find('td:eq(0)').html('&nbsp;')
          $(tr).find('td:eq(1)').html('&nbsp;')
          $(tr).find('td:eq(2)').html('&nbsp;')
          $(tr).find('td:eq(3)').html('&nbsp;')
          $(tr).find('td:eq(4)').html('&nbsp;')
          $(tr).find('td:eq(5)').html('&nbsp;')
          $(tr).find('td:eq(6)').html('&nbsp;')
          $(tr).find('td:eq(7)').html('&nbsp;')
          $(tr).find('td:eq(8)').html('&nbsp;')
          $(tr).find('td:eq(9)').html('&nbsp;')
          $(tr).find('td:eq(10)').html('&nbsp;')
          $(tr).find('td:eq(11)').html('&nbsp;')
        }
      },
      renderExceptSilk () {
        const data = this.silkExceptData[1]
        const length = data.length
        this.excPage.total = Math.ceil(length / this.excPage.size)
        const start = (this.excPage.current - 1) * this.excPage.size
        const end = this.excPage.current * this.excPage.size > length ? length : this.excPage.current * this.excPage.size
        this.pagedSilkExcData = data.slice(start, end)
        console.log(`excPage.current:${this.excPage.current}`)
        // 下一页
        this.excPage.current++
        if (this.excPage.current > this.excPage.total) {
          this.excPage.current = 1
        }
      },
      renderExceptSilkChart () {
        const data = this.silkExceptData
        let serName = []
        let serData = []
        let arrData = []
        for (let i = 2; i < data[0].length; i++) {
          arrData.push([data[0][i].name, data[1].reduce((acc, curr) => { return acc + (curr[`id${i + 1}`] ? parseInt(curr[`id${i + 1}`]) : 0) }, 0)])
        }
        arrData.sort((a, b) => { return a[1] - b[1] })
        serName = arrData.map(item => { return item[0] })
        serData = arrData.map(item => { return item[1] })
        console.log(arrData, serName, serData)
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: '{b}: {c}'
          },
          grid: {
            left: '4%',
            right: '4%',
            bottom: '2%',
            top: 0,
            containLabel: true
          },
          xAxis: {
            type: 'value',
            axisLabel: { textStyle: { fontWeight: '80' } }
          },
          yAxis: {
            type: 'category',
            data: serName,
            axisLabel: {
              show: true,
              interval: 0,
              rotate: 0,
              margin: 10,
              inside: false,
              fontSize: 20,
              fontWeight: 'bolder'
            }
          },
          series: [{
            type: 'bar',
            label: {
              normal: {
                show: true,
                formatter: (v) => {
                  let val = v.data
                  if (val === 0) {
                    return ''
                  }
                  return val
                },
                color: '#fff'
              }
            },
            color: () => { return `#${Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(16)}` },
            data: serData
          }]
        }
        this.inspectionChart.clear()
        this.inspectionChart.setOption(option)
        this.inspectionChart.resize()
      },
      clearSilkException () {
        this.silkExceptData = [[], []]
        this.pagedSilkExcData = []
        if (this.inspectionChart) {
          this.inspectionChart.clear()
        }
      }
    }
  }
</script>
<style scoped lang="css">
  .board-content {
    border: 1px solid #5a5a5a;
    background: #FFFFFF;
    overflow: auto;
  }
  .border-content > div {
    border: 1px solid #5a5a5a;
  }
  .inner-content {
    padding: 1rem;
  }
  .inner-content > div:not(1) {
    margin: 1rem;
    height: 40%;
  }
  .inner-content > div:first-child {
    margin-bottom: 2rem;
    height: 9%;
  }
  .inner-content > div:last-child {
    margin-top: 2rem;
  }
  .top-title ul li {
    list-style: none;
    width: 33.33%;
    float: left;
    height: 8rem;
    line-height: 8rem;
  }
  .top-title {
    margin: 1rem 0 3rem 0;
  }
  .top-title li:nth-child(2) > div {
    text-align: center;
    font-size: 5rem;
    font-weight: bolder;
  }
  .top-title .date-box {
    font-size: 3rem;
    float: right;
  }
  .production ul {
    display: flex;
    flex-direction: row;
  }
  .production ul li {
    float: left;
    flex-grow: 1;
    width: 49%;
    margin: 0 0.2rem;
  }
  .production ul li:first-child {
    margin-left: 0 !important;
  }
  .production table {
    width: 100%;
    margin: 0 auto;
    padding: 0;
    border: 1px solid rgb(1, 184, 170);
  }
  .production table tr:first-child{
    background-color: rgb(1, 184, 170);
  }
  .production table th {
    text-align: left;
    height: 5rem;
    line-height: 5rem;
    text-indent: 1.3rem;
    font-size: 2.1rem;
  }
  .production table tr:nth-child(2) td {
    text-align: center;
    font-size: 3rem;
    font-weight: bold;
    height: 8.5rem;
    line-height: 8.5rem;
  }
  .production table tr:nth-child(3) td {
    text-align: center;
    height: 6rem;
    line-height: 6rem;
    font-size: 2.1rem;
    font-weight: 500;
  }
  .production-table table {
    width: 100%;
    margin-left: 0.5rem;
  }
  .production-table table tr {
    height: 1rem;
  }
  .inspection-table table tr th,
  .inspection-table table tr td,
  .production-table table tr th,
  .production-table table tr td {
    text-align: center;
    height: 2rem;
    line-height: 2rem;
  }
  .inspection-table table {
    width: 100%;
  }
  .inspection-table table>tr:first-child, .production-table table>tr:first-child {
    background-color: rgb(138, 215, 232);
    height: 3rem;
    line-height: 3rem;
    font-size: 2rem;
    padding: 0.4rem 0;
  }
  .inspection-table table td, .production-table table td {
    font-size: 2rem;
    height: 2.5rem;
    line-height: 2.5rem;
    padding: .1rem;
    padding: 0.4rem 0;
  }
  .inspection-table table tbody tr:nth-child(even), .production-table table tbody tr:nth-child(even) {
    background-color: rgb(239, 239, 239);
  }
  .inspection {
    width: 40rem;
    height: 25rem;
  }
  .title-box {
    font-size: xx-large;
    font-weight: bold;
  }
  .title-box span {
    font-size: 2rem;
    margin-left: 1rem;
  }
  .text-indent {
    text-align: center;
  }
  .content-box {
    display: flex;
    flex-direction: row;
    margin: 0.2rem;
  }

  .flex-grow-1 {
    flex-grow: 1;
  }
  .flex-grow-3 {
    flex-grow: 3;
  }
  .flex-grow-5 {
    flex-grow: 5;
  }


</style>
