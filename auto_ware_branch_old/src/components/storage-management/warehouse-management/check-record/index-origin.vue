<!--盘点记录-->
<template>
  <div class="page-wrapper">
    <div class="action-bar cf">
      <div class="fr">
        <el-select v-model="search.warehouse" filterable placeholder="请选择仓库" :loading="loading.selWarehouse" clearable>
          <el-option v-for="item in list.warehouse" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-select v-model="search.batchNo" placeholder="请选择批号" :loading="loading.selBatchNo" filterable clearable>
          <el-option v-for="item in list.batchNo" :key="item.batchNo" :label="item.batchNo" :value="item.batchNo"></el-option>
        </el-select>
        <el-date-picker
          v-model="search.date"
          type="date"
          clearable
          placeholder="请选择日期">
        </el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="searchClick"></el-button>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%" v-loading="loading.table" show-summary :summary-method="getSummaries">
      <el-table-column prop="storageCode" label="库位"></el-table-column>
      <el-table-column label="成品类型">
        <template slot-scope="scope">{{scope.row.productType | productTypes}}</template>
      </el-table-column>
      <el-table-column prop="productName" label="成品名称"></el-table-column>
      <el-table-column prop="batch" label="批号"></el-table-column>
      <el-table-column prop="spec" label="规格"></el-table-column>
      <el-table-column prop="grade" label="等级"></el-table-column>
      <el-table-column prop="totalNum" label="总箱数"></el-table-column>
      <el-table-column prop="totalWeight" label="总净重"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="btnDetail(scope.row)" type="primary" size="small">查看明细</el-button>
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
    <dialog-detail ref="detailDialog"></dialog-detail>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import {packTypes, yokeTypes, productTypes} from '../../value-label.js'
  export default {
    components: {
      'dialog-detail': require('./dialog-detail.vue')
    },
    data () {
      return {
        search: {
          warehouse: '',
          batchNo: '',
          date: ''
        },
        lastSearchDate: '',
        list: {
          warehouse: ''
        },
        tableData: [],
        loading: {
          table: false,
          selWarehouse: false
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
      this.getAllWarehouseList()
      this.getAllBatchNo()
      this.getData()
    },
    filters: {
      packTypes: (val) => {
        if (val) {
          for (let item of packTypes) {
            if (val === item.value) {
              return item.label
            }
          }
        }
        return ''
      },
      yokeTypes: (val) => {
        if (val) {
          for (let item of yokeTypes) {
            if (val === item.value) {
              return item.label
            }
          }
        }
        return ''
      },
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
    methods: {
      getSummaries (param) {
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 5) {
            sums[index] = '合计'
            return
          } else if (index !== 6 && index !== 7) {
            sums[index] = ''
            return
          }

          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
          } else {
            sums[index] = 'N/A'
          }
        })

        return sums
      },
      btnDetail (row) {
        this.$refs.detailDialog.show(row, this.lastSearchDate)
      },
      searchClick () {
        this.page.currentPage = 1
        this.getData()
      },
      getAllWarehouseList () {
        this.loading.selWarehouse = true
        api.storage.warehouseMaintain.getAllWarehouseList({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.list.warehouse = data.data
          }
        }).finally(() => {
          this.loading.selWarehouse = false
        })
      },
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
      getData () {
        let date = ''
        if (this.search.date) {
          date = this.search.date.getTime()
        } else {
          date = ''
        }

        this.loading.table = true
        api.storage.warehouseManagement.getCheckRecordList({
          batch: this.search.batchNo,
          warehouseId: this.search.warehouse,
          gmtDate: date,
          pageIndex: this.page.currentPage,
          pageCount: this.page.size
        }).then((response) => {
          const data = response.data
          this.page.total = data.data.count
          this.tableData = data.data.list
          this.lastSearchDate = date
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
<style lang="scss" scoped>
  .page-wrapper{
    margin: 10px;
    padding: 10px;
    border-radius: 3px;
    background-color: #fff;
  }
  .action-bar{
    padding: 10px 0;
  }
</style>
