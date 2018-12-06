<!-- 入库异常 -->
<template>
  <div class="page-wrapper">
    <div class="action-bar cf">
      <div class="fr">
        <el-select v-model="search.batchNo" placeholder="请选择批号" :loading="loading.selBatchNo" filterable clearable>
          <el-option v-for="item in list.batchNo" :key="item.batchNo" :label="item.batchNo" :value="item.batchNo"></el-option>
        </el-select>
        <el-input class="width1" v-model="search.stockNo" placeholder="请输入码单号"></el-input>
        <el-date-picker v-model="search.startDate" type="date" :picker-options="pickerOptions0" @keyup.enter="searchClick" @change="dtStartChange" placeholder="请选择开始日期"></el-date-picker>
        <el-date-picker v-model="search.endDate" type="date" :picker-options="pickerOptions1" @keyup.enter="searchClick" @change="dtEndChange" placeholder="请选择结束日期"></el-date-picker>
        <el-button @click="searchClick" type="primary" icon="el-icon-search"></el-button>
        <!--<el-button @click="inClick" :loading="loading.in" type="primary">重新入库</el-button>-->
      </div>
    </div>
    <el-table :data="tableData" border v-loading="loading.table" @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="codeSingle" label="码单号"></el-table-column>
      <el-table-column prop="productName" label="产品名称"></el-table-column>
      <el-table-column prop="batchNo" label="批号"></el-table-column>
      <el-table-column label="成品类型">
        <template slot-scope="scope">{{scope.row.shipmentType | productTypes}}</template>
      </el-table-column>
      <el-table-column prop="spec" label="规格"></el-table-column>
      <el-table-column prop="grade" label="等级"></el-table-column>
      <el-table-column prop="message" label="异常信息"></el-table-column>
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
  </div>
</template>

<script>
  import * as api from 'src/api'
  import {productTypes} from 'value-label'
  export default {
    components: {},
    data () {
      return {
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
        search: {
          batchNo: '',
          stockNo: '',
          startDate: '',
          endDate: ''
        },
        tableData: [],
        multipleSelection: [],
        loading: {
          table: false,
          in: false,
          selBatchNo: false
        },
        list: {
          batchNo: []
        },
        page: {
          currentPage: 1,
          sizes: [15, 30, 50, 100],
          size: 15,
          total: 0
        }
      }
    },
    filters: {
      productTypes: (val) => {
        if (val) {
          for (let item of productTypes) {
            if (val === item.value) {
              return item.label
            }
          }
        }
        return ''
      }
    },
    mounted () {
      this.getAllBatchNo()
      this.getData()
    },
    methods: {
      getAllBatchNo () {
        this.loading.selBatchNo = true
        api.storage.warehouseManagement.getAllBatch({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.list.batchNo = data.data
          }
        }).finally(() => {
          this.loading.selBatchNo = false
        })
      },
      searchClick () {
        this.page.currentPage = 1
        this.getData()
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      inClick () {
        if (!this.multipleSelection.length) {
          this.$message('请选择入库的数据')
          return
        }
        let productIdArray = []
        for (let item of this.multipleSelection) {
          productIdArray.push(item.productId)
        }
        this.loading.in = true
        api.storage.warehouseManagement.sapWarehousing({
          productIdArray
        }).then(response => {
          if (response.data.messageType === 1) {
            this.$message.success('重新入库成功')
            this.getData()
          }
        }).finally(() => {
          this.loading.in = false
        })
      },
      getData () {
        this.loading.table = true
        this.tableData = []
        let startDate = this.search.startDate ? this.search.startDate.getTime() : ''
        let endDate = this.search.endDate ? (this.search.endDate.getTime() + 8.64e7) : ''
        api.storage.warehouseManagement.getFailInSapList({
          batchNo: this.search.batchNo,
          markCode: this.search.stockNo,
          startTime: startDate,
          endTime: endDate,
          pageIndex: this.page.currentPage,
          pageCount: this.page.size
        }).then(response => {
          const data = response.data
          this.page.total = data.data.count
          for (let item of data.data.list) {
            item.loading = false
          }
          this.tableData = data.data.list
        }).finally(() => {
          this.loading.table = false
        })
      },
      dtStartChange (value) {
        if (value) {
          this.dtBaseEnd = this.search.startDate.getTime()
        } else {
          this.dtBaseEnd = ''
        }
      },
      dtEndChange (value) {
        if (value) {
          this.dtBaseStart = this.search.endDate.getTime()
        } else {
          this.dtBaseStart = ''
        }
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
  .page-wrapper {
    margin: 10px;
    padding: 10px;
    border-radius: 3px;
    background-color: #fff;
  }

  .action-bar {
    padding: 10px 0;
  }
</style>
