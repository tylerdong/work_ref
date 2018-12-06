<!--库存明细-->
<template>
  <el-dialog :visible.sync="dialogVisible" width="90%" @close="closeDialog">
    <el-table :data="tableData.stockBos" border show-summary v-loading="loading.table">
      <el-table-column type="index" width="60" label="编号"></el-table-column>
      <el-table-column prop="batch" label="批号" show-overflow-tooltip>
        <!--<template slot-scope="scope">-->
          <!--<el-tag class="tags" type="info" v-for="batch in scope.row.batchList">{{batch + ' '}}</el-tag>-->
        <!--</template>-->
      </el-table-column>
      <el-table-column prop="spec" label="规格"></el-table-column>
      <el-table-column prop="houseName" label="仓库名称"></el-table-column>
      <el-table-column prop="storageCode" label="库位号"></el-table-column>
      <el-table-column label="包装来源">
        <template slot-scope="scope">{{scope.row.packageType | packSource}}</template>
      </el-table-column>
      <el-table-column prop="level" label="等级"></el-table-column>
      <el-table-column label="木架">
        <template slot-scope="scope">{{scope.row.yoke | yokeTypes}}</template>
      </el-table-column>
      <el-table-column label="包装类型">
        <template slot-scope="scope">{{scope.row.packing | packTypes}}</template>
      </el-table-column>
      <el-table-column prop="totalWeight" label="单包净重"></el-table-column>
      <el-table-column prop="num" label="箱数"></el-table-column>
      <el-table-column label="实际箱数">
        <template slot-scope="scope">
          <el-input-number :controls="false" class="box-count-number" size="medium" min="0"
                           v-model="scope.row.realBoxCount">
          </el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="view(scope.row)">查看码单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="buttonTitle === '取消补录'" class="makeup-detail">
      <h5>说明：</h5>
      <ul>
        <li>只有平时找不到漏扫箱包的情况下，由专门的管理员才能够使用此功能！</li>
        <li>当找出了漏扫的箱包，需要及时把补录的码单替换掉！</li>
        <li>不能重复补录，补录操作不能撤销！</li>
        <li>使用此功能可能导致的报表错误与货物遗失等情况，请谨慎使用！</li>
      </ul>
      <h5>以下情况不允许使用：</h5>
      <ul>
        <li>待入库数量少于补录数量</li>
        <li>系统库存量大于实际用户输入的生产数量</li>
      </ul>
    </div>
    <div class="table-footer">
      <el-button @click="makeUpClick" :loading="loading.startMakeup">{{buttonTitle}}</el-button>
      <el-button v-show="buttonTitle === '取消补录'" type="primary" @click="repair" :loading="loading.repair">确认补录</el-button>
      <el-button type="primary" @click="endCheck" :loading="loading.endCheck">盘点结束</el-button>
    </div>


    <el-table v-if="tableData.needChange" :data="tableData.needChangeStockBos" class="margin-top-2rem" border show-summary v-loading="loading.table">
      <el-table-column type="index" width="60" label="编号"></el-table-column>
      <el-table-column prop="batch" label="批号" show-overflow-tooltip>
        <!--<template scope="scope">-->
        <!--<el-tag class="tags" type="info" v-for="batch in scope.row.batchList">{{batch + ' '}}</el-tag>-->
        <!--</template>-->
      </el-table-column>
      <!--<el-table-column prop="spec" label="规格"></el-table-column>-->
      <!--<el-table-column prop="houseName" label="仓库名称"></el-table-column>-->
      <!--<el-table-column prop="storageCode" label="库位号"></el-table-column>-->
      <!--<el-table-column label="包装来源">-->
        <!--<template scope="scope">{{scope.row.packageType | packSource}}</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="level" label="等级"></el-table-column>
      <!--<el-table-column label="木架">-->
        <!--<template scope="scope">{{scope.row.yoke | yokeTypes}}</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="包装类型">-->
        <!--<template scope="scope">{{scope.row.packing | packTypes}}</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="totalWeight" label="总净重"></el-table-column>
      <el-table-column prop="num" label="箱数"></el-table-column>
      <el-table-column label="实际箱数">
        <template slot-scope="scope">
          <el-input-number :controls="false" class="box-count-number" size="medium" min="0"
                           v-model="scope.row.needChangeInboundDateBoxCount">
          </el-input-number>
        </template>
      </el-table-column>
      <!--<el-table-column label="操作">-->
        <!--<template scope="scope">-->
          <!--<el-button size="small" type="primary" @click="view(scope.row)">查看码单</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <div class="table-footer margin-bottom-4">
      <el-button v-show="tableData.needChange" type="primary" @click="confirmInboundDate"
                 :loading="loading.confirmInboundDate">确认入库日期</el-button>
    </div>
    <!--<div class="hy-admin__pagination-wrapper cf">-->
      <!--<el-pagination-->
        <!--class="fr"-->
        <!--@size-change="sizeChange"-->
        <!--@current-change="currentChange"-->
        <!--:current-page="page.currentPage"-->
        <!--:page-sizes="page.sizes"-->
        <!--:page-size="page.size"-->
        <!--layout="total, sizes, prev, pager, next, jumper"-->
        <!--:total="page.total">-->
      <!--</el-pagination>-->
    <!--</div>-->
    <!--查看码单弹出框-->
    <dialog-inventory-detail @reload="reloadData" ref="inventoryDetail"></dialog-inventory-detail>
  </el-dialog>
</template>
<script>
  import { packSource, yokeTypes, packTypes } from 'value-label'
  import * as api from 'src/api'
  import storage from 'storage'
  export default {
    components: {
      'dialog-inventory-detail': require('./dialog-inventory-detail.vue')
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
        warehouseType: '',
        loading: {
          table: false,
          selWarehouse: false,
          selBatchNo: false,
          endCheck: false,
          repair: false,
          startMakeup: false,
          confirmInboundDate: false
        },
        userInfo: {},
        dialogVisible: false,
        search: {},
        buttonTitle: '开始补录',
        list: {
          warehouse: [],
          batchNo: [],
          grade: []
        },
        tableData: {},
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
      this.userInfo = storage.getUser()
    },
    methods: {
      show (searchInfo, data) {
        let currentWarehouse = data.find(val => { return val.id === searchInfo.warehouseId })
        this.warehouseType = currentWarehouse ? currentWarehouse.type : ''
        this.dialogVisible = true
        this.search.warehouseId = searchInfo.warehouseId
        this.search.warehouseType = searchInfo.warehouseType
        this.search.classId = searchInfo.classId
        this.search.batchNo = searchInfo.batchNo
        this.search.productDate = searchInfo.productDate
        this.search.startInboundDate = searchInfo.startInboundDate
        this.search.inboundDate = searchInfo.inboundDate
        this.search.startScanTime = searchInfo.startScanTime
        this.search.endScanTime = searchInfo.endScanTime
        this.search.grade = searchInfo.grade
        this.buttonTitle = '开始补录'
        this.getData(false)
      },
      closeDialog () {
        this.tableData.stockBos = []
        this.tableData.needChangeStockBos = []
      },
      makeUpClick () {
        if (this.buttonTitle === '开始补录') {
          this.getData(true)
          this.buttonTitle = '取消补录'
        } else if (this.buttonTitle === '取消补录') {
          this.getData(false)
          this.buttonTitle = '开始补录'
        }
      },
      endCheck () {
        let index = this.tableData.stockBos.findIndex((item) => { return item.realBoxCount !== item.num })
        if (index > -1) {
          this.$message.error(`第${index + 1}行实际箱数和库存箱数不一致`)
          return
        }
        this.$confirm('盘点结束后，库存将不允许修改，请谨慎操作！', '提示', {
          confirmButtonText: '确定盘点',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading.endCheck = true
          let param = {
            productIds: '',
            totalWeight: 0,
            warehouseId: this.search.warehouseId,
            storageCode: this.search.storageCode,
            batchNo: this.search.batchNo,
            level: this.search.level,
            lgort: this.search.lgort,
            inventoryTime: new Date().getTime(),
            inventoryPerson: storage.getUser().employeeId,
            inventoryCount: this.getCount(),
            creator: storage.getUser().employeeId
          }
          let idArray = []
          this.tableData.stockBos.forEach((item, index) => {
            if (item.productIdList && item.productIdList.length > 0) {
              idArray = idArray.concat(item.productIdList)
            }
            param.totalWeight += item.totalWeight
          })
          param.productIds = idArray.join(',')
          console.log(param)
          api.storage.warehouseManagement.addInventoryRecord(param).then(res => {
            if (res.data.messageType === 1) {
              this.$message.success(res.data.message)
              this.dialogVisible = false
              this.$emit('endCheck')
            } else {
              this.$message.error(res.data.message)
            }
          }).finally(() => {
            this.loading.endCheck = false
          })
        })
      },
      getCount () {
        let count = 0
        for (let item of this.tableData.stockBos) {
          count += item.num
        }
        return count
      },
      reloadData () {
        this.getData(this.buttonTitle === '取消补录')
      },
      getData (isFillRecord) {
        if (!this.search.warehouseId) {
          this.$message.error('请选择仓库')
        }
        this.loading.table = true
        let param = {
          warehouseType: this.warehouseType,
          warehouseId: this.search.warehouseId,
          classId: this.search.classId,
          batchNo: this.search.batchNo,
          productDate: this.search.productDate,
          startInboundDate: this.search.startInboundDate,
          inboundDate: this.search.inboundDate,
          startScanTime: this.search.startScanTime,
          endScanTime: this.search.endScanTime,
          grade: this.search.grade,
          isFillRecord: isFillRecord,
          pageIndex: this.page.currentPage,
          pageCount: this.page.size
        }
        api.storage.warehouseManagement.getStockInfoForInventory(param).then(response => {
          let data = response.data
          if (data.messageType === 1) {
            data = data.data
            data.stockBos.forEach((item) => { this.$set(item, 'realBoxCount', item.num) })
            this.tableData = data
          } else {
            this.tableData = []
          }
        }).finally(() => {
          this.loading.table = false
        })
      },
      // 确认补录
      repair () {
        let index = this.tableData.stockBos.findIndex((item) => { return item.realBoxCount < item.num })
        if (index > -1) {
          this.$message.error(`第${index + 1}行实际箱数应大于库存箱数`)
          return
        }
        let stockBoList = this.tableData.stockBos.filter((item) => { return item.realBoxCount > item.num })
        if (stockBoList.length > 0) {
          this.$confirm('是否确定补录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true
                this.loading.repair = true
                api.storage.warehouseManagement.repairMissingCodeList({stockBoList, employeeId: this.userInfo.userId}).then((response) => {
                  const data = response.data
                  if (data.messageType === 1) {
                    this.$message.success('补录成功')
                    this.loading.repair = false
                    this.getData()
                  }
                }).finally(() => {
                  instance.confirmButtonLoading = false
                  this.loading.repair = false
                  done()
                })
              } else {
                instance.confirmButtonLoading = false
                this.loading.repair = false
                done()
              }
            }
          })
        } else {
          this.$message.error('请输入实际箱数，实际箱数大于库存箱数')
        }
      },
      confirmInboundDate () {
        if (this.tableData.needChangeStockBos.every(item => { return item.needChangeInboundDateBoxCount <= 0 })) {
          this.$message.error('至少填写一行')
          return
        }
        let errIndex = this.tableData.needChangeStockBos.findIndex(item => { return item.needChangeInboundDateBoxCount > item.num })
        if (errIndex > -1) {
          this.$message.error(`第${errIndex + 1}行转移箱数大于实际箱数`)
          return
        }
        this.$confirm('是否修改入库日期?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              this.loading.confirmInboundDate = true
              let param = {
                needChangeStockBos: this.tableData.needChangeStockBos,
                inboundDate: this.tableData.inboundDate
              }
              api.storage.warehouseManagement.changeInboundDate(param).then((response) => {
                const data = response.data
                if (data.messageType === 1) {
                  this.$message.success(data.message)
                  this.loading.confirmInboundDate = false
                  this.getData(false)
                }
              }).finally(() => {
                instance.confirmButtonLoading = false
                this.loading.confirmInboundDate = false
                done()
              })
            } else {
              instance.confirmButtonLoading = false
              this.loading.confirmInboundDate = false
              done()
            }
          }
        })
      },
      searchClick () {
        this.page.currentPage = 1
        this.getData()
      },
      view (row) {
        this.$refs.inventoryDetail.show(row, this.search)
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
  .makeup-detail {
    color: red;
  }
  .makeup-detail ul {
    list-style-type: decimal;
    margin-left: 1.8rem;
  }
  .box-count-number {
    width: 60px;
  }
  .margin-top-2rem {
    margin-top: 2rem;
  }
  .table-footer {
    margin-top: 1rem;
    margin-bottom: 1rem;
    float: right;
  }
  .margin-bottom-4 {
    margin-bottom: 2.5rem;
  }
</style>
