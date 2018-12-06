<template>
  <div class="flex-container">
    <el-form :inline="true" label-position="left" class="div-form-container" label-width="100px">
      <el-form-item label="按班次查询">
        <el-date-picker v-model="search.searchDate" type="date" @change="dateChage"
                        class="input-item-l-m"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <com-class :searchDate="search.searchDate" @classChange="classChange"></com-class>
      </el-form-item>
      <el-form-item label="按时间段查询">
        <el-date-picker v-model="search.startTime" type="datetime" placeholder="选择开始时间"
                        class="input-item-l-m"></el-date-picker>
        至
        <el-date-picker v-model="search.endTime" type="datetime" placeholder="选择结束时间"
                        class="input-item-l-m"></el-date-picker>
      </el-form-item>
      <el-form-item label="批次" label-width="40px">
        <com-batch-select @batchSelected="batchSelected"></com-batch-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getData" :loading="loading.search">查找</el-button>
        <el-button type="primary" icon="el-icon-download" @click="btnDownload" :loading="loading.download">数据下载
        </el-button>
      </el-form-item>
    </el-form>
    <el-tabs v-if="Array.isArray(plConfigs) && plConfigs.length > 1" v-model="activeTab" @tab-click="handleTabClick" type="border-card" stretch>
      <el-tab-pane v-for="(config, index) in plConfigs" :label="config.lineName" :name="config.linecode" :key="index">
        <template v-if="Array.isArray(tableData) && tableData.length > 0">
          <el-alert :title="`生产总数量：${summaryData.amount}，异常总数量：${summaryData.abnormalAmount}，良品总数量：${summaryData.goodAmount}`"
            type="success" :closable="false" show-icon class="alert-tip"></el-alert>
          <el-table :data="tableData" border @sort-change="sortChange" :loading="loading.table">
            <el-table-column label="序号" prop="num" width="73" sortable="custom"></el-table-column>
            <el-table-column label="批次" prop="batch" width="79" sortable="custom"></el-table-column>
            <el-table-column label="等级" prop="grade" width="73" sortable="custom"></el-table-column>
            <el-table-column label="检测标准" prop="detectNorm" width="103" sortable="custom"></el-table-column>
            <el-table-column label="总件数" prop="totalCount" width="90" sortable="custom"></el-table-column>
            <el-table-column label="缺陷件数" prop="defectCount" width="130" sortable="custom"></el-table-column>
            <el-table-column label="生产时间段" prop="timeQuantum" width="180" sortable="custom"></el-table-column>
            <el-table-column label="缺陷详情" prop="defectDetail" sortable="custom"></el-table-column>
            <el-table-column label="操作" width="50">
              <template slot-scope="scope">
                <el-button type="text" class="inner-button" @click="btnDetail(scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page.sync="page.current"
                         :page-sizes="page.sizes"
                         :page-size="page.size"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="page.total"
                         class="pagenation">
          </el-pagination>
        </template>
        <div v-else class="no-data">没有数据</div>
      </el-tab-pane>
    </el-tabs>
    <template v-else>
      <el-alert :title="`生产总数量：${summaryData.amount}，异常总数量：${summaryData.abnormalAmount}，良品总数量：${summaryData.goodAmount}`"
                type="success" :closable="false" show-icon class="alert-tip"></el-alert>
      <el-table :data="tableData" border @sort-change="sortChange" :loading="loading.table">
        <el-table-column label="序号" prop="num" width="73" sortable="custom"></el-table-column>
        <el-table-column label="批次" prop="batch" width="79" sortable="custom"></el-table-column>
        <el-table-column label="等级" prop="grade" width="73" sortable="custom"></el-table-column>
        <el-table-column label="检测标准" prop="detectNorm" width="103" sortable="custom"></el-table-column>
        <el-table-column label="总件数" prop="totalCount" width="90" sortable="custom"></el-table-column>
        <el-table-column label="缺陷件数" prop="defectCount" width="130" sortable="custom"></el-table-column>
        <el-table-column label="生产时间段" prop="timeQuantum" width="180" sortable="custom"></el-table-column>
        <el-table-column label="缺陷详情" prop="defectDetail" sortable="custom"></el-table-column>
        <el-table-column label="操作" width="50">
          <template slot-scope="scope">
            <el-button type="text" class="inner-button" @click="btnDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="page.current"
                     :page-sizes="page.sizes"
                     :page-size="page.size"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="page.total"
                     class="pagenation">
      </el-pagination>
    </template>
  </div>
</template>

<script>
import {batchChart} from '../../options'
import axios from 'axios'
import dateFns from 'date-fns'
export default {
  components: {
    'com-batch-select': require('./../../common/com-batch-select').default,
    'com-class': require('./../../common/com-class').default
  },
  data () {
    return {
      search: {
        startTime: new Date(new Date(new Date().toLocaleDateString()).getTime()),
        endTime: new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000),
        batch: '',
        searchDate: new Date(new Date(new Date().toLocaleDateString()).getTime()),
        order: ''
      },
      activeTab: '',
      page: {
        current: 1,
        size: 15,
        sizes: [15, 20, 25, 30],
        total: 0
      },
      batchChart: batchChart,
      tableData: [],
      summaryData: { amount: '', abnormalAmount: '', goodAmount: '' },
      loading: { search: false, download: false, table: false }
    }
  },
  computed: {},
  mounted () {
    this.activeTab = this.plConfigs()[0].linecode
    this.getData()
  },
  beforeUpdate () {
  },
  methods: {
    dateChage (val) {
      this.search.startTime = val
      this.search.endTime = new Date(val.getTime() + 24 * 60 * 60 * 1000)
    },
    btnDetail (data) {
      this.$router.push({
        name: 'inner-search-detail',
        params: {batch: data.batch, startTime: data.timeStart, endTime: data.timeEnd, lineCode: this.activeTab}})
    },
    batchSelected (val) {
      this.search.batch = val
    },
    sortChange (col) {
      if (col.prop) {
        this.search.order = this.batchChart[`${col.prop}`] + ' ' + ((col.order === 'descending') ? 'desc' : 'asc')
      }
      this.getBatchTable()
    },
    classChange (param) {
      this.search.startTime = param.startTime
      this.search.endTime = param.endTime
      this.getData()
    },
    handleTabClick (tab, event) {
      this.activeTab = tab.name
      this.getData()
    },
    getData () {
      this.getBatchTable()
      this.getBatchSum()
    },
    getBatchTable () {
      let param = {
        pageIndex: this.page.current,
        pageCount: this.page.size,
        batch: this.search.batch,
        startTime: this.search.startTime ? dateFns.format(this.search.startTime, 'YYYY-MM-DD HH:mm:ss') : '',
        endTime: this.search.endTime ? dateFns.format(this.search.endTime, 'YYYY-MM-DD HH:mm:ss') : '',
        order: this.search.order
      }
      this.loading.table = true
      this.tableData = []
      this.page.total = 0
      axios.post(`${this.currentLine(this.activeTab).ip}controller/batchInfo/getBatchInfoList`, param).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          this.tableData = data.data.list
          this.page.total = data.data.count
          this.page.current = data.data.pageIndex
        } else {
          this.$message({type: 'error', message: response.data.meta.message})
        }
      }).catch(e => {
        this.$message({type: 'error', message: e.message})
      }).finally(() => {
        this.loading.table = false
      })
    },
    getBatchSum () {
      let param = {
        batch: this.search.batch,
        startTime: this.search.startTime ? dateFns.format(this.search.startTime, 'YYYY-MM-DD HH:mm:ss') : '',
        endTime: this.search.endTime ? dateFns.format(this.search.endTime, 'YYYY-MM-DD HH:mm:ss') : ''
      }
      axios.post(`${this.currentLine(this.activeTab).ip}controller/batchInfo/getBatchSum`, param).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          this.summaryData = data.data
        } else {
          this.$message({type: 'error', message: response.data.meta.message})
        }
      })
    },
    currentLine (lineCode) {
      let line = this.plConfigs().find(item => item.linecode === lineCode)
      if (line === undefined) {
        return this.$message({type: 'error', message: `线别编码${lineCode}不存在`, showClose: true})
      } else {
        return line
      }
    },
    btnDownload () {
      this.$router.push({
        name: 'inner-search-download-preview',
        params: {
          lineCode: this.activeTab,
          batch: this.search.batch,
          startTime: this.search.startTime ? dateFns.format(this.search.startTime, 'YYYY-MM-DD HH:mm:ss') : '',
          endTime: this.search.endTime ? dateFns.format(this.search.endTime, 'YYYY-MM-DD HH:mm:ss') : ''
        }
      })
    },
    handleSizeChange (size) {
      this.page.size = size
      this.getBatchTable()
    },
    handleCurrentChange (current) {
      this.getBatchTable()
    }
  }
}
</script>

<style scoped>
  .flex-container {
    display: flex;
    flex-direction: column;
  }
</style>
