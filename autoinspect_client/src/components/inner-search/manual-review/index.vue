<template>
  <div>
    <div class="summery">
      <el-alert type="success" :closable="false" show-icon class="alert-tip" style="float: left;width: 61%;"
        :title="`当前批次：${summaryData.batch}，生产总数量：${summaryData.amount}，异常总数量：${summaryData.abnormalAmount}，良品总数量：${summaryData.goodAmount}`">
      </el-alert>
      <el-select class="button-process" v-model="refreshRate" placeholder="请选择刷新频率" @change="rateChange">
        <el-option v-for="(item, index) in option.refreshRate" :key="index" :label="item.name" :value="item.value"></el-option>
      </el-select>
      <el-button class="button-process" type="text" icon="el-icon-refresh" @click="refresh" :loading="loading.refresh"></el-button>
      <el-button class="button-process" type="primary" @click="beginProcess">开始处理</el-button>
    </div>
    <el-table :data="tableData" border highlight-current-row @sort-change="sortChange">
      <el-table-column label="线别" prop="lineCode"  sortable="lineCode" width="107"></el-table-column>
      <el-table-column label="缺陷号" prop="defectNum"  sortable="custom" width="87"></el-table-column>
      <el-table-column label="纱盘号" prop="rfid" sortable="custom" width="87"></el-table-column>
      <el-table-column label="处理状态" width="110" sortable="custom">
        <template slot-scope="scope">{{scope.row.isgood | isgoodStatus}}</template>
      </el-table-column>
      <el-table-column label="外检等级" prop="defectGrade" sortable="custom" width="110"></el-table-column>
      <el-table-column label="缺陷描述" prop="defectDescribe" sortable="custom"></el-table-column>
      <el-table-column label="采样时间" prop="samplingTime" sortable="custom" width="180"></el-table-column>
      <el-table-column label="操作" width="50">
        <template slot-scope="scope">
          <el-button type="text" class="inner-button" @click="btnDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <dialog-review ref="refDialogReview" @confirmSuccess="getData" @dialogClosed="getData"></dialog-review>
    <dialog-process ref="refDialogProcess"></dialog-process>
  </div>
</template>

<script>
import axios from 'axios'
// import dateFns from 'date-fns'
import {defectChart, refreshRate} from '../../options'
export default {
  components: {
    'dialog-review': require('./dialog-review').default,
    'dialog-process': require('./dialog-process').default
  },
  data () {
    return {
      timeRange: [false, false, false],
      defectChart: defectChart,
      option: {refreshRate: refreshRate},
      search: {
        // startTime: dateFns.format(new Date(new Date().getTime() - 2 * 60 * 60 * 1000), 'YYYY-MM-DD HH:mm:ss'),
        startTime: '',
        endTime: '',
        batchNo: '',
        searchDate: new Date(new Date(new Date().toLocaleDateString()).getTime()),
        order: 'defectId desc'
      },
      refreshRate: 60,
      timeinter: null,
      page: {
        currentPage: 1,
        sizes: [50, 100],
        size: 100,
        total: 0
      },
      tableData: [],
      processData: [],
      summaryData: { batch: '', amount: '0', abnormalAmount: '0', goodAmount: '0' },
      loading: { search: false, refresh: false }
    }
  },
  computed: {
  },
  watch: {
    '$route':
      {
        handler: function (to, from) {
          if (to && to.name && to.name === 'inner-search-manual-review') {
            this.refresh()
            clearInterval(this.timeinter)
            this.timeinter = setInterval(this.refresh, this.refreshRate * 1000)
          }
        }
      }
  },
  deactivated () {
    clearInterval(this.timeinter)
  },
  methods: {
    rateChange (val) {
      clearInterval(this.timeinter)
      this.$nextTick(() => {
        this.timeinter = setInterval(this.refresh, parseInt(val) * 1000)
      })
    },
    refresh () {
      this.getData()
      this.getCurrentBatchSum()
    },
    btnDetail (data) {
      this.$refs.refDialogReview.show(data)
    },
    getData () {
      let param = {
        pageIndex: this.page.currentPage,
        pageCount: this.page.size,
        startTime: this.search.startTime,
        endTime: this.search.endTime,
        order: this.search.order
      }
      this.loading.refresh = true
      this.tableData = []
      this.processData = []
      this.page.total = 0
      let list = []
      for (let i = 0; i < this.plConfigs().length; i++) {
        list.push(axios.post(`${this.plConfigs()[i].ip}controller/defectInfo/getDefectInfoList`, param))
      }
      console.log(this.plConfigs())
      axios.all(list).then(response => {
        for (let i = 0; i < response.length; i++) {
          if (response[i].data.meta.code === 100000) {
            if (Array.isArray(response[i].data.data.list) && response[i].data.data.list.length > 0) {
              this.processData.push(response[i].data.data.list[0])
              this.tableData = this.tableData.concat(response[i].data.data.list)
            }
          } else {
            this.$message({type: 'error', message: response[i].data.meta.message, showClose: true})
          }
        }
        this.sortChange({col: undefined, prop: 'samplingTime', order: 'descending'})
      }).catch(e => {
        this.$message({type: 'error', message: e.message, showClose: true})
      }).finally(() => {
        this.loading.refresh = false
      })
    },
    sortChange ({col, prop, order}) {
      if (prop) {
        this.tableData.sort((a, b) => {
          if (Date.parse(a[`${prop}`]) > 0) {
            return (order === 'ascending')
              ? Date.parse(a[`${prop}`]) - Date.parse(b[`${prop}`])
              : Date.parse(b[`${prop}`]) - Date.parse(a[`${prop}`])
          } else if (Number.isFinite(a[`${prop}`])) {
            return (order === 'ascending')
              ? a[`${prop}`] - b[`${prop}`]
              : b[`${prop}`] - a[`${prop}`]
          } else {
            return (order === 'ascending')
              ? a[`${prop}`].localeCompare(b[`${prop}`], 'zh')
              : b[`${prop}`].localeCompare(a[`${prop}`], 'zh')
          }
        })
      }
    },
    getCurrentBatchSum () {
      let list = []
      this.summaryData.batch = 0
      this.summaryData.amount = 0
      this.summaryData.abnormalAmount = 0
      this.summaryData.goodAmount = 0
      for (let i = 0; i < this.plConfigs().length; i++) {
        list.push(axios.post(`${this.plConfigs()[i].ip}controller/batchInfo/getCurrentBatchSum`, {}))
      }
      axios.all(list).then(response => {
        for (let i = 0; i < response.length; i++) {
          if (response[i].data.meta.code === 100000) {
            this.summaryData.batch = response[i].data.data.batch
            this.summaryData.amount += response[i].data.data.amount
            this.summaryData.abnormalAmount += response[i].data.data.abnormalAmount
            this.summaryData.goodAmount += response[i].data.data.goodAmount
          }
        }
      }).catch(e => {
        this.$message({type: 'error', message: e.message, showClose: true})
      })
    },
    beginProcess () {
      if (this.processData.length === 0) {
        this.$message({type: 'error', message: '没有数据', showClose: true})
      } else {
        this.$refs.refDialogProcess.show(this.processData)
      }
    }
  }
}
</script>

<style scoped>
  .el-table .current-row {
   color: #409eff;
   border-color: #c6e2ff;
   background-color: #ecf5ff;
 }
  .button-process {
    float: right;
    margin-right: 2%
  }
</style>
