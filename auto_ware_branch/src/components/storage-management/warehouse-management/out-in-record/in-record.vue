<!--库存明细-->
<template>
  <div class="page-wrapper">
      <el-form :inline="true" :rules="rules" ref="ruleForm" :model="search">
        <el-form-item>
          <el-select v-model="search.warehouse" placeholder="请选择仓库" :loading="loading.selWarehouse" clearable>
            <el-option v-for="item in list.warehouse" :key="item.id" :label="item.name" :value="item.id" ></el-option>
          </el-select>
        </el-form-item>
        <!--@change="dtStartInboundDateChange"-->
        <el-form-item  prop="startInboundDate">
          <el-date-picker v-model="search.startInboundDate" type="date" placeholder="请选择开始入库日期">
          </el-date-picker>
        </el-form-item>
        <!--@change="dtInboundDateChage"-->
        <el-form-item prop="inboundDate">
          <el-date-picker v-model="search.inboundDate" type="date" placeholder="请选择截止入库日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select v-model="search.code" placeholder="请选择班次" :loading="loading.classes" clearable>
            <el-option v-for="item in list.classes" :key="item.code" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select class="width1" v-model="search.grade" placeholder="请选择等级" clearable>
            <el-option v-for="item in list.grade" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="search.productName" clearable placeholder="请选择品名" :loading="loading.productName" class="margin-right-1 margin-bottom-1">
            <el-option v-for="item in list.nameList" :key="item.id" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="search.batchNo" placeholder="请选择批号" :loading="loading.selBatchNo" filterable clearable>
            <el-option v-for="item in list.batchNo" :key="item.batchNo" :label="item.batchNo" :value="item.batchNo"></el-option>
          </el-select>
        </el-form-item>
        <!--<el-input class="width1" v-model="search.spec" placeholder="请输入规格"></el-input>-->
        <!--@change="dtProductDateChange"-->
        <el-form-item>
          <el-date-picker v-model="search.productDate" type="date" placeholder="请选择生产日期">
          </el-date-picker>
        </el-form-item>
        <!--@change="dtStartScanTimeDateChage"-->
        <el-form-item>
          <el-date-picker v-model="search.startScanTime" type="datetime" placeholder="请选择扫码开始时间">
          </el-date-picker>
        </el-form-item>
        <!--@change="dtEndScanTimeDateChage"-->
        <el-form-item>
          <el-date-picker v-model="search.endScanTime" type="datetime" placeholder="请选择扫码结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchClick" :loading="search.loading"></el-button>
        </el-form-item>
      </el-form>
    <el-table :data="tableData" border style="width: 100%" v-loading="loading.table">
      <el-table-column prop="batchNo" label="批号" show-overflow-tooltip></el-table-column>

      <el-table-column prop="spec" label="规格"></el-table-column>
      <el-table-column prop="warehouseName" label="仓库名称"></el-table-column>
      <el-table-column prop="storageName" label="库位号"></el-table-column>
      <el-table-column label="箱数" width="150">
        <template slot-scope="scope">{{scope.row.boxCount - scope.row.reversalCount}}<span class="blue">&nbsp;&nbsp;({{scope.row.boxCount}}-{{scope.row.reversalCount}})</span></template>
      </el-table-column>
      <el-table-column prop="totalWeight" label="总净重"></el-table-column>
      <el-table-column label="包装来源">
        <template slot-scope="scope">{{scope.row.packageType | packSource}}</template>
      </el-table-column>
      <el-table-column prop="level" label="等级"></el-table-column>
      <el-table-column label="木架">
        <template slot-scope="scope">{{scope.row.yoke | yokeTypes}}</template>
      </el-table-column>
      <el-table-column label="包装类型">
        <template slot-scope="scope">{{scope.row.packingType | packTypes}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope" >
          <el-button v-if="scope.row.batchNo !== '总计'" type="primary" @click="view(scope.row)">码单明细</el-button>
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
  import { packSource, yokeTypes, packTypes } from 'value-label'
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
        showsummary: true,
        currentWarehouse: '',
        type: '',
        loading: {
          table: false,
          selWarehouse: false,
          classes: false,
          selBatchNo: false,
          nameList: false
        },
        search: {
          loading: false,
          type: '',
          warehouse: '',
          classId: '',
          batchNo: '',
          productName: '',
          spec: '',
          grade: '',
          productDate: '',
          inboundDate: '',
          startScanTime: '',
          endScanTime: '',
          startInboundDate: '',
          code: ''
        },
        list: {
          type: '',
          warehouse: [],
          nameList: [],
          batchNo: [],
          grade: [],
          classes: []
        },
        tableData: [],
        rules: {
          // warehouse: [{ type: 'number', required: true, message: '请选择仓库', trigger: 'change' }],
          startInboundDate: [{ type: 'date', required: true, message: '请选择开始入库日期', trigger: 'change' }],
          inboundDate: [{ type: 'date', required: true, message: '请选择截止入库日期', trigger: 'change' }]
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
      this.getNameList()
      this.getLevel()
      this.getClasses()
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
      getNameList () {
        this.search.nameList = true
        api.automatic.dictionary.getAllProductTypeList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.list.nameList = data.data
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.search.nameList = false
        })
      },
      getData () {
        // if (!this.search.warehouse) {
        //   return this.$message.error('请选择仓库')
        // }
        // if (!this.search.startInboundDate) {
        //   return this.$message.error('请选择入库时间')
        // }
        // if (!this.search.inboundDate) {
        //   return this.$message.error('请选择截止入库时间')
        // }
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.search.loading = true
            this.loading.table = true
            let param = {
              typeName: this.list.type,
              warehouseId: this.search.warehouse ? this.search.warehouse : '',
              batchNo: this.search.batchNo,
//          spec: this.search.spec,
              classCode: this.search.code,
              productName: this.search.productName,
              productDate: Date.parse(this.search.productDate),
              inboundStartDate: Date.parse(this.search.startInboundDate),
              inboundEndDate: Date.parse(this.search.inboundDate) + 86400000,
              scanStartTime: Date.parse(this.search.startScanTime),
              scanEndTime: Date.parse(this.search.endScanTime),
              level: this.search.grade,
              pageIndex: this.page.currentPage,
              pageCount: this.page.size
            }
            api.storage.warehouseManagement.getInRecordList(param).then(response => {
              const data = response.data
              console.log(data)
              if (data.data && data.messageType === 1) {
                if (data.data && data.data.list) {
                  this.page.total = data.data.count
                  let result = data.data.list
                  let total = {
                    batchNo: '总计',
                    boxCount: 0,
                    reversalCount: 0,
                    totalWeight: 0
                  }
                  for (let i = 0; i < result.length; i++) {
                    total.boxCount += result[i].boxCount
                    total.reversalCount += result[i].reversalCount
                    total.totalWeight += result[i].totalWeight
                  }
                  result.push(total)
                  this.tableData = result
                } else {
                  this.tableData = []
                }
              }
            }).finally(() => {
              this.search.loading = false
              this.loading.table = false
            })
          }
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
        this.$refs.weightMemoDialog.show({
          ...row,
          warehouseType: this.currentWarehouse
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
  .blue {
    color: blue;
  }
</style>
