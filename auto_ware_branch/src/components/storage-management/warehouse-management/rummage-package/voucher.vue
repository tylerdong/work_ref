<template>
  <div class="page-wrapper">
    <div class="action-bar cf">
      <div class="fr">
        <el-select class="margin-bottom-10px" v-model="searchInfo.batchNum" placeholder="请选择批号" :loading="loading.batchNo" filterable clearable>
          <el-option v-for="item in options.batchNo" :key="item.batchNo" :label="item.batchNo" :value="item.batchNo"></el-option>
        </el-select>
        <el-input class="width1 margin-bottom-10px" v-model="searchInfo.voucherNum" placeholder="请输入凭证号"></el-input>
        <el-date-picker v-model="searchInfo.startDate" type="date" :picker-options="pickerOptions0" @change="dtStartChange"
                        placeholder="请选择翻包开始日期"></el-date-picker>
        <el-date-picker v-model="searchInfo.endDate" type="date" :picker-options="pickerOptions1" @change="dtEndChange"
                        placeholder="请选择翻包结束日期"></el-date-picker>
        <el-select v-model="searchInfo.level" placeholder="请选择等级" clearable>
          <el-option :key="item.id" v-for="item in options.level" :label="item.name" :value="item.name"></el-option>
        </el-select>
        <el-select v-model="searchInfo.isOpen" placeholder="请选择开或关" clearable>
          <el-option :key="item.id" v-for="item in options.isOpen" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <!--<el-select v-model="searchInfo.person" placeholder="请选择创建人" :loading="loading.person" remote :remote-method="queryPerson" filterable clearable>-->
          <!--<el-option v-for="item in options.person" :key="item.employeeId" :label="item.employeeName" :value="item.employeeId"></el-option>-->
        <!--</el-select>-->
        <el-input class="width1 margin-bottom-10px" v-model="searchInfo.person" placeholder="请填写翻包人"></el-input>
        <el-button @click="btnSearch" type="primary" icon="el-icon-search">查询</el-button>
      </div>
    </div>
    <el-table :data="tableData" border v-loading="loading.table" style="width: 100%">
      <el-table-column prop="voucherNumber" label="凭证号"></el-table-column>
      <el-table-column prop="batchNo" label="批号"></el-table-column>
      <el-table-column prop="level" label="等级"></el-table-column>
      <el-table-column prop="turnoverWeight" label="翻包重量"></el-table-column>
      <el-table-column prop="inWeight" label="入库重量"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">{{scope.row.status | isOpen}}</template>
      </el-table-column>
      <el-table-column prop="creator" label="创建人"></el-table-column>
      <el-table-column label="创建日期">
        <template slot-scope="scope">{{scope.row.createTime | timeFormat('YYYY-MM-DD')}}</template>
      </el-table-column>
      <el-table-column label="翻包日期">
        <template slot-scope="scope">{{scope.row.turnoverTime | timeFormat('YYYY-MM-DD')}}</template>
      </el-table-column>
      <el-table-column prop="reason" label="翻包原因"></el-table-column>
      <el-table-column width="250" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button v-if="scope.row.reason ==='退货翻包'" :disabled="scope.row.status === 'OFF' || scope.row.sapPostStatus === 'y'" @click="btnPost(scope.row)" type="primary">过账安排</el-button>
            <el-button @click="rummageClick(scope.row)" type="primary" :disabled="(scope.row.reason==='退货翻包' && scope.row.sapPostStatus === 'n') || scope.row.status === 'OFF'">翻包</el-button>
            <el-button @click="btnStatus(scope.row)" :loading="scope.row.loading" type="primary">状态切换</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="hy-admin__pagination-wrapper cf">
      <el-pagination
        class="fr"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="page.currentPage"
        :page-sizes="page.sizes"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
      <voucher-dialog ref="voucherDialog"></voucher-dialog>
      <post-dialog ref="postDialog"></post-dialog>
    </div>
  </div>
</template>

<script>
  import * as api from 'src/api'
  export default {
    components: {
      'voucher-dialog': require('./voucher-dialog.vue'),
      'post-dialog': require('./post-dialog.vue')
    },
    data () {
      return {
        searchInfo: {
          batchNum: '',
          level: '',
          startDate: '',
          endDate: '',
          isOpen: '',
          voucherNum: '',
          person: ''
        },
        options: {
          level: [],
          isOpen: [
            { id: 'ON', name: '开' },
            { id: 'OFF', name: '关' }
          ],
          person: [],
          batchNo: []
        },
        dtBaseStart: '',
        dtBaseEnd: '',
        pickerOptions0: {
          disabledDate: (time) => {
            if (this.dtBaseStart) {
              return time.getTime() > this.dtBaseStart
            }
          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            if (this.dtBaseEnd) {
              return time.getTime() < this.dtBaseEnd
            }
          }
        },
        tableData: [
          {data: '213'}
        ],
        loading: {
          person: false,
          table: false,
          batchNo: false
        },
        page: {
          currentPage: 1,
          sizes: [15, 30, 50, 100],
          size: 15,
          total: 0
        }
      }
    },
    mounted () {
      this.getOptions()
      this.queryPerson()
      this.getAllBatchNo()
      this.getData()
    },
    filters: {
      isOpen (val) {
        if (val) {
          if (val === 'ON') {
            return '开'
          }
          if (val === 'OFF') {
            return '关'
          }
        }
        return ''
      }
    },
    methods: {
      getAllBatchNo () {
        this.loading.batchNo = true
        api.storage.warehouseManagement.getAllBatch().then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.batchNo = data.data
          }
        }).finally(() => {
          this.loading.batchNo = false
        })
      },
      getOptions () {
        api.storage.warehouseManagement.getAllLevel({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.level = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
      queryPerson (queryString) {
        this.loading.person = true
        let params = {
          name: queryString
        }
        api.storage.warehouseManagement.getOperatorList(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.person = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.person = false
        })
      },
      btnSearch () {
        this.page.currentPage = 1
        this.getData()
      },
      btnStatus (row) {
        let newStatus = 'ON'
        if (row.status === 'ON') {
          newStatus = 'OFF'
        }
        let params = {
          voucherNumber: row.voucherNumber,
          reason: row.reason,
          turnoverWeight: row.turnoverWeight,
          inBoundWeight: row.inWeight,
          status: newStatus
        }
        row.loading = true
        api.storage.warehouseManagement.updateTurnoverPackageStatus(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.getData()
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          row.loading = false
        })
      },
      btnPost (row) {
        // this.loading.post = true
        // api.storage.warehouseManagement.refundPosting({
        //   voucherNumber: row.voucherNumber
        // }).then((res) => {
        //   if (res.data.messageType === 1) {
        //     this.getData()
        //   }
        // }).finally(() => {
        //   // this.loading.post = false
        // })
        this.$refs.postDialog.show(row)
      },
      rummageClick (row) {
        this.$refs.voucherDialog.show(row)
      },
      dtStartChange (value) {
        if (value) {
          this.dtBaseEnd = this.searchInfo.startDate.getTime()
        } else {
          this.dtBaseEnd = ''
        }
      },
      dtEndChange (value) {
        if (value) {
          this.dtBaseStart = this.searchInfo.endDate.getTime()
        } else {
          this.dtBaseStart = ''
        }
      },
      getData () {
        this.loading.table = true
        let startDate = this.searchInfo.startDate ? this.searchInfo.startDate.getTime() : ''
        let endDate = this.searchInfo.endDate ? this.searchInfo.endDate.getTime() + 8.64e7 : ''
        let params = {
          pageIndex: this.page.currentPage,
          pageCount: this.page.size,
          batchNo: this.searchInfo.batchNum,
          level: this.searchInfo.level,
          status: this.searchInfo.isOpen,
          startTime: startDate,
          endTime: endDate,
          voucherNumber: this.searchInfo.voucherNum,
          creator: this.searchInfo.person
        }
        api.storage.warehouseManagement.getTurnoverPackageList(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.page.total = data.data.count
            this.tableData = data.data.list
            for (let item of this.tableData) {
              item.loading = false
            }
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.table = false
        })
      },
      /* 分页 */
      sizeChange (val) {
        this.page.size = val
        if (this.page.currentPage === 1) {
          this.getData()
        } else {
          this.page.currentPage = 1
        }
      },
      currentChange (val) {
        this.page.currentPage = val
        this.getData()
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .page-wrapper{
    margin: 10px;
    padding: 10px;
    border-radius: 3px;
    background-color: #fff;
  }
  .action-bar{
    padding: 10px 0;
  }
  .margin-bottom-10px{
    margin-bottom: 10px;
  }
</style>
