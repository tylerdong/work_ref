<!--退货调拨单-->
<template>
  <div class="page-wrapper">
    <div class="action-bar cf">
      <el-form :inline="true">
        <el-form-item>
          <el-input class="width1" v-model="search.number" placeholder="请输入交货编码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="width1" v-model="search.plateNumber" placeholder="请输入车牌"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="width1" v-model="search.customerName" placeholder="请输入客户名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="search.workshopId" placeholder="请选择车间" clearable>
            <el-option v-for="item in options.workshop" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="search.batchNo" placeholder="请选择批号" :loading="loading.batchNo" filterable clearable>
            <el-option v-for="item in options.batchNo" :key="item.batchNo" :label="item.batchNo"
                       :value="item.batchNo"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="search.synDate" type="date" clearable placeholder="请选择同步日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="search.date" type="date" clearable placeholder="请选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select v-model="search.status" placeholder="请选择调拨单状态" clearable>
            <el-option v-for="item in options.status" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchClick" type="primary" icon="el-icon-search" :loading="search.loading"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border v-loading="loading.table">
      <el-table-column min-width="130" label="交货编号" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.deliveryNos" :key="item" class="tags">{{ item + ' ' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="230" label="客户名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.customerNames" :key="item" class="tags">{{ item + ' ' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="100" label="批号" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.allBatchNos" :key="item" class="tags">{{ item + ' ' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="发货日期" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.outBoundDates" :key="item" class="tags">
            {{ item | timeFormat('YYYY-MM-DD') + ' ' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="同步日期" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.synDates" :key="item" class="tags">
            {{ item | timeFormat('YYYY-MM-DD') + ' ' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="发货仓库" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.loadPointNames" :key="item" class="tags">{{ item + ' ' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="plateNumber" label="车牌号"></el-table-column>
      <el-table-column label="当前状态">
        <template slot-scope="scope">
          {{scope.row.status | status}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 'PENDING'" @click="supplementClick(scope.row)" size="small" type="text">退货安排</el-button>
          <el-button v-if="scope.row.status !== 'PENDING'" @click="detailClick(scope.row)" size="small" type="text">查看详情</el-button>
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
    </div>
    <dialog-supplement @submit-success="searchClick" ref="supplementDialog"></dialog-supplement>
    <dialog-detail ref="detailDialog"></dialog-detail>
  </div>
</template>

<script>
  import * as api from 'src/api'
  import {requisitionStatus} from '../../value-label'
  export default {
    components: {
      'dialog-supplement': require('./dialog-return-allot.vue'),
      'dialog-detail': require('./dialog-return-allot-finished.vue')
    },
    data () {
      return {
        search: {
          loading: false,
          batchNo: '',
          customerName: '',
          plateNumber: '',
          workshopId: '',
          number: '',
          date: '',
          synDate: '',
          status: ''
        },
        options: {
          status: [],
          workshop: [],
          batchNo: []
        },
        tableData: [],
        loading: {
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
      this.options.status = requisitionStatus
      this.getAllWorkshop()
      this.getAllBatchNo()
      this.getData()
    },
    filters: {
      status: (value) => {
        for (let item of requisitionStatus) {
          if (value === item.value) {
            return item.label
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
      supplementClick (data) {
        this.$refs.supplementDialog.show(data)
      },
      getAllWorkshop () {
        api.automatic.dictionary.getAllWorkshopList({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.workshop = data.data
          }
        })
      },
      detailClick (data) {
        this.$refs.detailDialog.show(data)
      },
      searchClick () {
        this.page.currentPage = 1
        this.getData()
      },
      getData () {
        let date = this.getTime(this.search.date)
        let synDate = this.getTime(this.search.synDate)
        let status = []
        if (this.search.status) {
          status.push(this.search.status)
        } else {
          status = requisitionStatus.map(item => item.value)
        }
        let params = {
          requisitionType: 'REFUND',
          pageIndex: this.page.currentPage,
          pageCount: this.page.size,
          batchNo: this.search.batchNo,
          customerName: this.search.customerName,
          plateNumber: this.search.plateNumber,
          workshopId: this.search.workshopId,
          deliveryNo: this.search.number,
          outBoundDate: date,
          synDate: synDate,
          requisitionStatus: status
        }
        this.search.loading = true
        this.loading.table = true
        api.storage.warehouseManagement.getRequisitionByType(params).then((response) => {
          const data = response.data
          this.page.total = data.data.count
          this.tableData = data.data.list
        }).finally(() => {
          this.search.loading = false
          this.loading.table = false
        })
      },
      getTime (date) {
        return date ? date.getTime() : ''
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
  .tags {
    margin-right: 10px
  }
</style>
