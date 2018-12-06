<template>
  <div>
    <el-form :inline="true" label-position="left" class="div-form-container">
      <el-form-item label="线别">
        <el-select v-model="search.lineCode" clearable placeholder="请选择线别">
          <el-option v-for="(item, index) in option.lineCode" :key="index" :value="item.code" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="批次">
        <el-select v-model="search.batchNo" clearable>
          <el-option v-for="(item, index) in option.batch" :key="index" :value="item" :label="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker v-model="search.searchDate" type="date" @change="dateChage" placeholder="请选择班次"></el-date-picker>
      </el-form-item>
      <el-form-item label="班次">
        <com-class :searchDate="search.searchDate" @classChange="classChange"></com-class>
      </el-form-item>
      <el-form-item label="按时间段查询">
        <el-date-picker v-model="search.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>
        至
        <el-date-picker v-model="search.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getData" :loading="loading.search">查找</el-button>
        <el-button type="primary" icon="el-icon-download" @click="btnDownload" :loading="loading.download">数据下载</el-button>
      </el-form-item>
    </el-form>
    <el-alert :title="`生产总数量：${summaryData.amount}，异常总数量：${summaryData.abnormalAmount}，良品总数量：${summaryData.goodAmount}`"
              type="success" :closable="false" show-icon class="alert-tip"></el-alert>
    <el-table :data="tableData" @sort-change="sortChange" border header-row-class-name="header-style">
      <el-table-column label="序号" prop="batchid" sortable="custom" width="73"></el-table-column>
      <el-table-column label="批次" prop="batch" sortable="custom" width="86"></el-table-column>
      <el-table-column label="线别" prop="lineName" sortable="custom" width="86"></el-table-column>
      <el-table-column label="等级" prop="grade" sortable="custom" width="73"></el-table-column>
      <el-table-column label="检测标准" prop="detectnorm" sortable="custom" width="103"></el-table-column>
      <el-table-column label="总件数" prop="totalcount" sortable="custom" width="90"></el-table-column>
      <el-table-column label="缺陷件数" prop="defectcount" sortable="custom" width="110"></el-table-column>
      <el-table-column label="生产时间段" sortable="custom" width="180">
        <template slot-scope="scope">{{scope.row.timestart | timeFormat('YYYY-MM-DD HH:mm:ss')}}~{{scope.row.timeend | timeFormat('HH:mm:ss')}}</template>
      </el-table-column>
      <el-table-column label="缺陷详情" prop="defectdetail" sortable="custom"></el-table-column>
      <el-table-column label="操作" width="50">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="btnDetail(scope.row)" class="inner-button">详情</el-button>
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
  </div>
</template>

<script>
import * as api from '../../../api/index'
import dateFns from 'date-fns'
export default {
  components: {
    'com-class': require('../../common/com-class').default
  },
  mounted () {
    this.getLineCode()
    this.getBatches()
  },
  data () {
    return {
      search: {
        startTime: new Date(new Date(new Date().toLocaleDateString()).getTime()),
        endTime: new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000),
        batchNo: '',
        lineCode: '',
        searchDate: new Date(new Date(new Date().toLocaleDateString()).getTime()),
        order: ''
      },
      page: {
        current: 1,
        size: 15,
        sizes: [15, 20, 25, 30],
        total: 0
      },
      option: { lineCode: [], batch: [] },
      tableData: [],
      summaryData: { amount: 0, abnormalAmount: 0, goodAmount: 0 },
      loading: {search: false},
      img: ''
    }
  },
  methods: {
    dateChage (val) {
      this.search.startTime = val
      this.search.endTime = new Date(val.getTime() + 24 * 60 * 60 * 1000)
    },
    btnDetail (data) {
      this.$router.push({ name: 'search-detail', params: data })
    },
    batchSelected (val) {
      this.search.batchNo = val
    },
    getLineCode () {
      api.defect.getLine({}).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          this.option.lineCode = data.data
        } else {
          this.$message({type: 'error', message: response.data.meta.message})
        }
      }).catch(e => {
        this.$message({type: 'error', message: e.message})
      })
    },
    getBatches () {
      api.defect.getBatches({}).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          this.option.batch = data.data
        } else {
          this.$message({type: 'error', message: response.data.meta.message})
        }
      })
    },
    classChange (param) {
      this.search.startTime = param.startTime
      this.search.endTime = param.endTime
      this.getData()
    },
    sortChange ({column, order, prop}) {
      if (column.label === '生产时间段') {
        this.search.order = 'timestart ' + ((order === 'descending') ? 'desc' : 'asc')
      } else {
        this.search.order = prop + ' ' + ((order === 'descending') ? 'desc' : 'asc')
      }
      this.getData()
    },
    btnDownload () {
      this.$router.push({
        name: 'search-download-preview',
        params: {
          batch: this.search.batchNo,
          lineCode: this.search.lineCode,
          startTime: this.search.startTime,
          endTime: this.search.endTime
        }
      })
    },
    getBatchSum () {
      let param = {
        lineCode: this.search.lineCode,
        startTime: this.search.startTime ? dateFns.format(this.search.startTime, 'YYYY-MM-DD HH:mm:ss') : '',
        endTime: this.search.endTime ? dateFns.format(this.search.endTime, 'YYYY-MM-DD HH:mm:ss') : '',
        batchNo: this.search.batchNo,
        order: this.search.order
      }
      api.defect.getBatchSum(param).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          if (data.data) this.summaryData = data.data
        } else {
          this.$message({type: 'error', message: response.data.meta.message})
        }
      }).catch(e => {
        this.$message({type: 'error', message: e.message})
      })
    },
    getBatchTable () {
      this.loading.search = true
      let param = {
        pageIndex: this.page.current,
        pageCount: this.page.size,
        lineCode: this.search.lineCode,
        startTime: this.search.startTime ? dateFns.format(this.search.startTime, 'YYYY-MM-DD HH:mm:ss') : '',
        endTime: this.search.endTime ? dateFns.format(this.search.endTime, 'YYYY-MM-DD HH:mm:ss') : '',
        batchNo: this.search.batchNo,
        order: this.search.order
      }
      this.tableData = []
      api.defect.getBatchList(param).then(response => {
        let data = response.data
        if (data.meta.code === 100000) {
          this.tableData = data.data.list
          this.page.total = data.data.count
        } else {
          this.$message({type: 'error', message: data.meta.message})
        }
      }).catch(e => {
        this.$message({type: 'error', message: e.message})
      }).finally(() => {
        this.loading.search = false
      })
    },
    getData () {
      this.getBatchTable()
      this.getBatchSum()
    },
    handleSizeChange (size) {
      this.page.size = size
      this.getData()
    },
    handleCurrentChange (current) {
      this.page.current = current
      this.getData()
    }
  }
}
</script>

<style scoped>
 .hover {
   color: #409eff;
   border-color: #c6e2ff;
   background-color: #ecf5ff;
 }
</style>
