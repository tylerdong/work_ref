<!--异常调拨单-->
<template>
  <div class="page-wrapper">
    <div class="action-bar cf">
      <el-form :inline="true">
        <el-form-item>
          <el-input class="width1" v-model="search.number" placeholder="请输入交货编码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="search.synDate" type="date" clearable placeholder="请选择同步日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="search.date" type="date" clearable placeholder="请选择日期"></el-date-picker>
        </el-form-item>
        <!--<el-select v-model="search.isHandle" placeholder="请选择是否处理" clearable>-->
        <!--<el-option v-for="item in options.isHandle" :key="item.id" :label="item.name" :value="item.id"></el-option>-->
        <!--</el-select>-->
        <el-form-item>
          <el-button @click="searchClick" type="primary" icon="el-icon-search"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border v-loading="loading.table" style="width: 100%">
      <el-table-column label="交货编号" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.deliveryNos" :key="item" class="tags">{{ item + ' ' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="客户名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.customerNames" :key="item" class="tags">{{ item + ' ' }}</el-tag>
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
        <template slot-scope="scope">{{scope.row.status | status}}</template>
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

export default {
  components: {
    'dialog-supplement': require('./dialog-sale-allot.vue'),
    'dialog-detail': require('./dialog-sale-allot-finished.vue')
  },
  data () {
    return {
      search: {
        number: '',
        date: '',
        synDate: ''
      },
      tableData: [],
      loading: {
        table: false
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
    this.getData()
  },
  filters: {
    status: (value) => {
      if (value) {
        if (value === 'PENDING') {
          return '未处理'
        }
        if (value === 'PROCESSED') {
          return '已处理'
        }
        if (value === 'CHECKING') {
          return '拣配中'
        }
        if (value === 'CHECKED') {
          return '已拣配'
        }
        if (value === 'FINISH') {
          return '已完成'
        }
      }
      return ''
    }
  },
  methods: {
    searchClick () {
      this.page.currentPage = 1
      this.getData()
    },
    getData () {
      let date = this.getTime(this.search.date)
      let synDate = this.getTime(this.search.synDate)

      let params = {
        requisitionType: 'EXCEPTION',
        pageIndex: this.page.currentPage,
        pageCount: this.page.size,
        deliveryNo: this.search.number,
        outBoundDate: date,
        synDate: synDate,
        requisitionStatus: []
      }
      this.loading.table = true
      api.storage.warehouseManagement.getRequisitionByType(params).then((response) => {
        const data = response.data
        this.page.total = data.data.count
        this.tableData = data.data.list
      }).finally(() => {
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
  .ml {
    margin-left: 20px;
  }
  .tags {
    margin-right: 10px
  }
</style>
