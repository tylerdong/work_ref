<!--库存明细-->
<template>
  <div class="page-wrapper">
    <el-form :inline="true">
      <el-form-item>
        <el-select v-model="search.warehouse" placeholder="请选择仓库" :loading="loading.selWarehouse" clearable>
          <el-option v-for="item in list.warehouse" :key="item.id" :label="item.name" :value="item.id" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="search.classId" placeholder="请选择班次" :loading="loading.classes" clearable>
          <el-option v-for="item in list.classes" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="search.batchNo" placeholder="请选择批号" :loading="loading.selBatchNo" filterable clearable>
          <el-option v-for="item in list.batchNo" :key="item.batchNo" :label="item.batchNo" :value="item.batchNo"></el-option>
        </el-select>
      </el-form-item>
        <!--<el-input class="width1" v-model="search.spec" placeholder="请输入规格"></el-input>-->
      <el-form-item>
        <el-date-picker v-model="search.productDate" type="date" @change="dtProductDateChange" placeholder="请选择生产日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="search.startInboundDate" type="date" @change="dtStartInboundDateChange" placeholder="请选择开始入库日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="search.inboundDate" type="date" @change="dtInboundDateChage" placeholder="请选择截止入库日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="search.startScanTime" type="datetime" @change="dtStartScanTimeDateChage" placeholder="请选择扫码开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="search.endScanTime" type="datetime" @change="dtEndScanTimeDateChage" placeholder="请选择扫码结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select class="width1" v-model="search.grade" placeholder="请选择等级" clearable>
          <el-option v-for="item in list.grade" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="search.isInventory" placeholder="请选择盘点状态" clearable>
          <el-option v-for="item in list.inventoryStatus" :key="item.id" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item>-->
        <!--<el-select v-model="search.workshopId" clearable placeholder="请选择车间" clearable>-->
          <!--<el-option v-for="item in list.workshopList" :key="item.id" :label="item.name" :value="item.id">-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchClick" :loading="search.loading"></el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border show-summary style="width: 100%" v-loading="loading.table">
      <!--<el-table-column prop="batchList" label="批号" show-overflow-tooltip>-->
        <!--<template slot-scope="scope">-->
          <!--<el-tag class="tags" type="info" v-for="batch in scope.row.batchList">{{batch + ' '}}</el-tag>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="batch" label="批号"></el-table-column>
      <el-table-column prop="spec" label="规格"></el-table-column>
      <el-table-column prop="houseName" label="仓库名称"></el-table-column>
      <el-table-column prop="storageCode" label="库位号"></el-table-column>
      <el-table-column prop="num" label="箱数"></el-table-column>
      <el-table-column prop="totalWeight" label="总净重"></el-table-column>
      <el-table-column label="包装来源">
        <template slot-scope="scope">{{scope.row.packageType | packSource}}</template>
      </el-table-column>
      <el-table-column prop="level" label="等级"></el-table-column>
      <el-table-column label="托盘类型">
        <template slot-scope="scope">{{scope.row.yoke | yokeTypes}}</template>
      </el-table-column>
      <el-table-column label="包装类型">
        <template slot-scope="scope">{{scope.row.packing | packTypes}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="view(scope.row)">查看码单</el-button>
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

    <dialog-weight-memo ref="weightMemoDialog" :lineOptions="list.lineOptions"></dialog-weight-memo>
  </div>
</template>
<script>
  import { packSource, yokeTypes, packTypes, inventoryStatus } from '../../value-label'
  import * as api from 'src/api'
  export default {
    components: {
      'dialog-weight-memo': require('./dialog-weight-memo.vue')
    },
    filters: {
      packSource: (val) => {
        if (val) {
          for (let item of packSource) {
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
      packTypes: (val) => {
        if (val) {
          for (let item of packTypes) {
            if (val === item.value) {
              return item.label
            }
          }
        }
        return ''
      }
    },
    data () {
      return {
        currentWarehouse: '',
        type: '',
        loading: {
          loading: false,
          table: false,
          selWarehouse: false,
          classes: false,
          selBatchNo: false
        },
        search: {
          type: '',
          warehouse: '',
          classId: '',
          batchNo: '',
          spec: '',
          grade: '',
          productDate: '',
          inboundDate: '',
          startScanTime: '',
          endScanTime: '',
          isInventory: '',
          workshopId: ''
        },
        list: {
          type: '',
          warehouse: [],
          batchNo: [],
          grade: [],
          classes: [],
          inventoryStatus: [],
          workshopList: []
        },
        tableData: [],
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
      this.getLevel()
      this.getClasses()
      this.getWorkshopList()
      this.list.inventoryStatus = inventoryStatus
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
      // 获取线别
      getLineOptions () {
        this.loading.line = true
        api.automatic.productPlan.getAllLine({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.list.lineOptions = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.line = false
        })
      },
      /* 获取车间下拉列表 */
      getWorkshopList () {
        api.automatic.dictionary.getAllWorkshopList({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.list.workshopList = data.data
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {})
      },
      getData () {
        // if (!this.search.warehouse) {
        //   return this.$message.error('请选择仓库')
        // }
        this.search.loading = true
        this.loading.table = true
        let param = {
          typeName: this.list.type,
          warehouseId: this.search.warehouse ? this.search.warehouse : '',
          batch: this.search.batchNo,
//          spec: this.search.spec,
          classId: this.search.classId,
          productDate: this.search.productDate,
          startInboundDate: this.search.startInboundDate,
          inboundDate: this.search.inboundDate,
          startScanTime: this.search.startScanTime,
          endScanTime: this.search.endScanTime,
          grade: this.search.grade,
          isInventory: this.search.isInventory,
          // workshopId: this.search.workshopId,
          pageIndex: this.page.currentPage,
          pageCount: this.page.size
        }
        api.storage.warehouseManagement.getStockInfo(param).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.page.total = data.data.count
            this.tableData = data.data.list
          }
        }).finally(() => {
          this.search.loading = false
          this.loading.table = false
        })
      },
      dtProductDateChange (value) {
        if (value) {
          this.search.productDate = this.search.productDate.getTime()
        } else {
          this.search.productDate = ''
        }
      },
      dtStartInboundDateChange (value) {
        if (value) {
          this.search.startInboundDate = this.search.startInboundDate.getTime()
        } else {
          this.search.startInboundDate = ''
        }
      },
      dtInboundDateChage (value) {
        if (value) {
          this.search.inboundDate = this.search.inboundDate.getTime()
        } else {
          this.search.inboundDate = ''
        }
      },
      dtStartScanTimeDateChage (value) {
        if (value) {
          this.search.startScanTime = this.search.startScanTime.getTime()
        } else {
          this.search.startScanTime = ''
        }
      },
      dtEndScanTimeDateChage (value) {
        if (value) {
          this.search.endScanTime = this.search.endScanTime.getTime()
        } else {
          this.search.endScanTime = ''
        }
      },
      searchClick () {
        this.currentWarehouse = this.search.warehouse ? this.list.warehouse.filter(item => { return item.id === this.search.warehouse })[0].type : ''
        this.page.currentPage = 1
        this.getData()
      },
      view (row) {
        console.log(this.type)
        this.$refs.weightMemoDialog.show({
          ...row,
          warehouseType: this.currentWarehouse,
          productDate: this.search.productDate,
          inboundDate: this.search.inboundDate,
          classId: this.search.classId,
          startInboundDate: this.search.startInboundDate,
          startScanTime: this.search.startScanTime,
          endScanTime: this.search.endScanTime,
          isInventory: this.search.isInventory,
          // workshopId: this.search.workshopId,
          clearInventory: true
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
      /* 分页 */
      sizeChange (size) {
        this.page.size = size
        if (this.page.currentPage === 1) {
          this.getData()
        } else {
          this.page.currentPage = 1
        }
      },
      currentChange (currenPage) {
        this.page.currentPage = currenPage
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
  .el-table__footer {
    color: blue;
  }
  .tags {
    margin-right: 10px
  }
</style>
