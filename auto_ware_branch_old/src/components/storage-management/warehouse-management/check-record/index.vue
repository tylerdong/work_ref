<!--盘点记录-->
<template>
  <div class="page-wrapper">
    <el-form :inline="true">
      <el-form-item>
        <el-select v-model="search.warehouse" filterable placeholder="请选择仓库" :loading="loading.selWarehouse" clearable>
          <el-option v-for="item in list.warehouse" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="search.batchNo" placeholder="请选择批号" :loading="loading.selBatchNo" filterable clearable>
          <el-option v-for="item in list.batchNo" :key="item.batchNo" :label="item.batchNo" :value="item.batchNo"></el-option>
        </el-select>
      </el-form-item>
        <!--<el-autocomplete v-model="search.storage" :fetch-suggestions="querySearchAsync" placeholder="请输入库位"></el-autocomplete>-->
      <el-form-item>
        <el-select v-model="search.classId" placeholder="请选择班次" :loading="loading.classes" clearable>
          <el-option v-for="item in list.classes" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item width="300">
        <el-input v-model="search.creator" placeholder="请输入盘点人" class="inline-input"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="search.startDate" type="date" :picker-options="pickerOptions0"
                        @change="dtStartChange" placeholder="请选择开始日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="search.endDate" type="date" :picker-options="pickerOptions1"
                        @change="dtEndChange" placeholder="请选择结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchClick"></el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="beginCheck">开始盘点</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%" v-loading="loading.table" show-summary :summary-method="getSummaries">
      <el-table-column prop="warehouse" label="仓库"></el-table-column>
      <el-table-column label="库位">
        <template slot-scope="scope">{{scope.row.storageCode | position}}</template>
      </el-table-column>
      <el-table-column prop="batchNo" label="批号"></el-table-column>
      <el-table-column prop="level" label="等级"></el-table-column>
      <el-table-column prop="inventoryTime" label="盘点时间" width="180">
        <template slot-scope="scope">{{scope.row.inventoryTime | timeFormat('YYYY-MM-DD HH:mm:ss') }}</template>
      </el-table-column>
      <el-table-column prop="inventoryPersonName" label="盘点人" width="110"></el-table-column>
      <el-table-column prop="inventoryCount" label="箱数"></el-table-column>
      <el-table-column prop="totalWeight" label="重量"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="btnDetail(scope.row)" type="text" size="small">查看明细</el-button>
          <el-button @click="printConfirmedList(scope.row)" type="text" size="small">打印确认单</el-button>
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
    <!--打印确认单-->
    <ul ref="printBox" class="print-box">
      <li style="border: 1px solid black;">
        <div class="print-title">入库码单汇总表</div>
        <table class="print-table margin-top-3mm">
          <tr>
            <td>时间</td>
            <td>班次</td>
            <td>品名</td>
            <td>批号</td>
            <td>规格</td>
            <td>等级</td>
            <td>箱数</td>
            <td>重数</td>
          </tr>
          <tr v-for="info in printData.printOrderInfo">
            <td>{{printData.gmtCreate | timeFormat('YYYY-MM-DD HH:mm:ss')}}</td>
            <!--班次-->
            <td>{{info.classes}}</td>
            <!--品名-->
            <td>{{info.productName}}</td>
            <!--批号-->
            <td>{{info.batchNo}}</td>
            <!--规格-->
            <td>{{info.spec}}</td>
            <td>{{info.level}}</td>
            <td>{{info.boxCount}}</td>
            <!--重数-->
            <td>{{info.totalWeight}}</td>
          </tr>
          <tr>
            <td colspan="6">合计</td>
            <td>{{totalCount}}</td>
            <!--重数-->
            <td>{{totalWeight}}</td>
          </tr>
        </table>
        <div class="cf margin-top-3mm">
          <div class="fl width30p">生产班：</div>
          <div class="fl width30p">仓库管：</div>
        </div>
        <div style="text-align: center">备注：时间，班次，品名选择</div>
      </li>
    </ul>
    <!--查看明细弹出框-->
    <dialog-detail-origin ref="dialogDetail"></dialog-detail-origin>
    <!--盘点条件弹出框-->
    <dialog-condition ref="conditionDialog" @search="searchInventory" :warehouseList="list.warehouse" :lgortList="list.lgort"
                      :batchNoList="list.batchNo" :classes="list.classes" :grade="list.grade"></dialog-condition>
    <!--结束盘点弹出框-->
    <dialog-inventory ref="inventoryDialog" @endCheck="getData"></dialog-inventory>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import 'jQuery.print'
  export default {
    components: {
      'dialog-condition': require('./dialog-condition.vue'),
      'dialog-inventory': require('./dialog-inventory.vue'),
      'dialog-detail-origin': require('./dialog-detail-origin')
    },
    data () {
      return {
        search: {
          warehouse: '',
          batchNo: '',
          date: '',
          storage: '',
          classId: '',
          creator: '',
          startDate: '',
          endDate: ''
        },
        dtBaseStart: '',
        dtBaseEnd: '',
        lastSearchDate: '',
        printData: {},
        list: {
          warehouse: [],
          lgort: [],
          classes: [],
          grade: []
        },
        tableData: [],
        loading: {
          table: false,
          selWarehouse: false,
          classes: false
        },
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
        page: {
          currentPage: 1,
          sizes: [15, 30, 50, 100],
          size: 15,
          total: 0
        }
      }
    },
    filters: {
      position (val) {
        return val === 'ALL' ? '所有' : val
      }
    },
    mounted () {
      this.getAllLgortList()
      this.getAllWarehouseList()
      this.getAllBatchNo()
      this.getData()
      this.getClasses()
      this.getLevel()
    },
    computed: {
      totalCount () {
        let total = 0
        if (this.printData.printOrderInfo && this.printData.printOrderInfo.length > 0) {
          this.printData.printOrderInfo.forEach(item => {
            total += item.boxCount
          })
        }
        return total
      },
      totalWeight () {
        let total = 0
        if (this.printData.printOrderInfo && this.printData.printOrderInfo.length > 0) {
          this.printData.printOrderInfo.forEach(item => {
            total += item.totalWeight
          })
        }
        return total
      }
    },
    methods: {
      // 获取班次
      getClasses () {
        this.loading.classes = true
        api.storage.warehouseManagement.getAllClasses().then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.list.classes = data.data
          }
        }).finally(() => {
          this.loading.classes = false
        })
      },
      querySearchAsync (queryString, cb) {
        if (!queryString) {
          return cb(null)
        }
        api.storage.warehouseManagement.getStorageIdCodeByLikeCode({
          code: queryString
        }).then(response => {
          let result = response.data.data.map(item => {
            item.value = item.name
            return item
          })
          cb(result)
        })
      },
      getSummaries (param) {
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 6) {
            sums[index] = '合计'
            return
          } else if (index !== 7) {
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
      searchClick () {
        this.page.currentPage = 1
        this.getData()
      },
      beginCheck () {
        this.$refs.conditionDialog.show()
      },
      searchInventory (searchInfo) {
        console.log(this.list.warehouse)
        this.$refs.inventoryDialog.show(searchInfo, this.list.warehouse)
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
      getAllLgortList () {
        api.storage.warehouseMaintain.getLgortList({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.list.lgort = data.data
          }
        })
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
      getLevel () {
        api.storage.warehouseManagement.getAllLevel({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.list.grade = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
      getData () {
        this.loading.table = true
        let startDate = this.search.startDate ? this.search.startDate.getTime() : ''
        let endDate = this.search.endDate ? this.search.endDate.getTime() + 8.64e7 : ''
        api.storage.warehouseManagement.getInventoryRecords({
          warehouseId: this.search.warehouse,
          batchNo: this.search.batchNo,
          // storageCode: this.search.storage,
          classId: this.search.classId,
          creator: this.search.creator,
          inventoryTimeStart: startDate,
          inventoryTimeEnd: endDate,
          pageIndex: this.page.currentPage,
          pageCount: this.page.size
        }).then((response) => {
          const data = response.data
          this.page.total = data.data.count
          this.tableData = data.data.list
          // this.lastSearchDate = date
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
      },
      // 查看明细
      btnDetail (data) {
        this.$refs.dialogDetail.show(data)
      },
      // 打印确认单
      printConfirmedList (data) {
        this.printData = data
        this.$nextTick(() => {
          $(this.$refs.printBox).print({globalStyles: false, stylesheet: 'static/css/print-inventory-confirm.css'})
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .print-box {
    display: none;
  }
  .page-wrapper{
    margin: 10px;
    padding: 10px;
    border-radius: 3px;
    background-color: #fff;
  }
  .action-bar{
    padding: 10px 0;
  }
  .inline-input {
    width: 16rem;
  }
</style>
    
