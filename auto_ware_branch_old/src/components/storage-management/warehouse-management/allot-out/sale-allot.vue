<!--销售调拨单-->
<template>
  <div class="page-wrapper">
    <div class="action-bar cf">
      <el-form :inline="true">
        <el-form-item>
          <el-date-picker v-model="synDate" type="date" placeholder="调拨单同步日期" clearable></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="synRequisition" type="primary" :loading="loading.requisition">同步调拨单</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="ml" @click="synMaterial" type="primary" :loading="loading.material">同步物料</el-button>
        </el-form-item>
        <el-form-item>
          <el-input class="width1" placeholder="请输入交货编码" v-model="search.deliveryNo"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="ml" @click="cancelAllot" type="primary" :loading="loading.cancel">取消调拨</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="factory.isAutCombine === 'N'" class="ml" @click="mergeAllot" type="primary" :loading="loading.merge">合并调拨单</el-button>
        </el-form-item>
      </el-form>
      <el-form :inline="true" ref="ruleForm" :model="search">
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
        <el-form-item prop="synDate">
          <el-date-picker v-model="search.synDate" type="date" clearable placeholder="请选择同步日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="search.date" type="date" clearable placeholder="请选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select v-model="search.status" placeholder="请选择调拨单状态" multiple clearable class="template-input">
            <el-option v-for="item in options.status" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchClick('ruleForm')" type="primary" icon="el-icon-search" :loading="loading.search"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="allot-tip">
      <el-alert type="warning" :closable="false" show-icon
        title="提示" description="如果涉及拆SAP调拨单，请联系物流公司，让物流公司操作TMS拆单后，重新同步并重新打印调拨单与出库单，原调拨单与出库单作废。">
      </el-alert>
    </div>
    <el-table :data="tableData" border v-loading="loading.table" @selection-change="handleSelectionChange">
      <el-table-column v-if="factory.isAutCombine === 'N'" type="selection" width="55"></el-table-column>
      <el-table-column min-width="130" class-name="rgb-red" label="交货编号" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tooltip v-if="scope.isEnough" effect="dark" content="提前出库单库存不足" placement="top-start">
            <i class="fa fa-exclamation-triangle" style="color:red" aria-hidden="true"></i>
          </el-tooltip>
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
        <template slot-scope="scope">{{scope.row.status | status}}</template>
      </el-table-column>
      <el-table-column min-width="300" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 'PENDING'" @click="supplementClick(scope.row)" type="text" size="medium">出货安排</el-button>
          <!--<el-button v-if="scope.row.status === 'PENDING'" @click="bfOut(scope.row)" type="text" size="medium">提前出库</el-button>-->
          <el-button v-if="scope.row.status !== 'PENDING'" @click="detailClick(scope.row)" type="text" size="medium">查看详情</el-button>
          <el-button v-if="scope.row.status === 'CHECKING' || scope.row.status === 'CHECKED'" @click="cancelPickup(scope.row)" type="text" size="medium">取消拣配</el-button>
          <el-button v-if="scope.row.status === 'PROCESSED'" @click="cancel(scope.row)" type="text" size="medium">取消调拨</el-button>
          <el-button v-if="scope.row.status === 'PROCESSED'" @click="goodsReturn(scope.row)" type="text" size="medium">货物回退</el-button>
          <el-button v-if="scope.row.status === 'PROCESSED' || scope.row.status === 'CHECKING' || scope.row.status === 'PICKUP_FAILED'" @click="manualPickup(scope.row)" type="text" size="medium">手动拣配</el-button>
          <el-button v-if="scope.row.status === 'SAP_FINISH'" @click="cancelPost(scope.row)" type="text" size="medium">取消过账</el-button>
          <!--<el-button v-if="scope.row.status === 'SAP_FINISH'" @click="transfer(scope.row)" type="text" size="medium">过账转移</el-button>-->
          <el-button v-if="scope.row.status === 'PROCESSED'" @click="goodsTransfer(scope.row)" type="text" size="medium">货物转移</el-button>
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
    <!--出货安排-->
    <dialog-supplement @submit-success="searchClick" ref="supplementDialog"></dialog-supplement>
    <!--查看详情-->
    <dialog-detail ref="detailDialog"></dialog-detail>
    <!--过账转移-->
    <!--<dialog-transfer @success="getData" ref="transferlDialog"></dialog-transfer>-->
    <!--货物转移-->
    <el-dialog title="货物转移" :visible.sync="dialogGoodsTransferVisible" width="45%">
      <el-form :model="transferForm" ref="refTransferForm" :inline="true">
        <el-form-item label="交货编号">
          <el-select v-model="goodsTransferSearch.toPrimaryId" placeholder="请选择交货编号" filterable clearable remote
                     :remote-method="searchTransferTo" :loading="loading.transferTo" @change="goodTransferChange"
                     style="width: 28rem">
            <el-option v-for="item in options.filterDeliverNumber" :key="item.primaryId" :label="item.deliveryNos.join(',')" :value="item.primaryId">
              <span style="float: left">{{ item.plateNumber }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.deliveryNos.join(',') }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="confirmTransferClick" type="primary" :loading="loading.goodsReturn">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <dialog-goods-transfer @submit-success="searchClick" ref="refGoodsTransfer"></dialog-goods-transfer>
  </div>
</template>

<script>
import * as api from 'src/api'
import {requisitionStatus} from '../../value-label'
import storage from '../../../../module/storage'

export default {
  components: {
    'dialog-supplement': require('./dialog-sale-allot.vue'),
    'dialog-detail': require('./dialog-sale-allot-finished.vue'),
    // 'dialog-transfer': require('./dialog-transfer.vue')
    'dialog-goods-transfer': require('./dialog-goods-transfer')
  },
  data () {
    return {
      search: {
        batchNo: '',
        customerName: '',
        plateNumber: '',
        workshopId: '',
        number: '',
        date: '',
        synDate: '',
        status: ['PENDING', 'SAP_FINISH'],
        deliveryNo: ''
      },
      rules: {
        synDate: [{ type: 'date', required: true, message: '请选择同步日期', trigger: 'change' }]
      },
      dialogGoodsTransferVisible: false,
      transferForm: {
        toPrimaryId: ''
      },
      goodsTransferSearch: {
        fromPrimaryId: '',
        toPrimaryId: '',
        toPlateNumber: ''
      },
      rowData: {},
      factory: {isAutCombine: 'N', sharePalletCode: ''},
      synDate: '',
      options: {
        status: [],
        workshop: [],
        batchNo: [],
        deliveryNumber: [],
        filterDeliverNumber: []
      },
      tableData: [],
      tableRowsSelected: [],
      loading: {
        table: false,
        batchNo: false,
        requisition: false,
        material: false,
        cancel: false,
        merge: false,
        goodsReturn: false,
        transferTo: false
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
    this.getFactoryConfig()
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
    getFactoryConfig () {
      let config = storage.getFactoryConfig()
      this.factory.isAutCombine = config.isAutCombine
      this.factory.sharePalletCode = config.sharePalletCode
    },
    cancelPickup (row) {
      this.$confirm('确认取消拣配？', '提示', {
        type: 'warning'
      }).then(() => {
        api.storage.warehouseManagement.cancelPickup({
          primaryId: row.primaryId
        }).then(response => {
          let data = response.data
          if (data.messageType === 1) {
            this.$message.success('取消拣配成功')
            this.getData()
          } else {
            this.$message.error(data.message)
          }
        })
      })
    },
    manualPickup (row) {
      this.$confirm('确认拣配？', '提示', {
        type: 'warning'
      }).then(() => {
        api.storage.warehouseManagement.repick({
          primaryIdList: [row.primaryId]
        }).then(response => {
          if (response.data.messageType === 1) {
            this.$message.success('拣配成功')
            this.getData()
          }
        }).finally(() => {
        })
      })
    },
    cancelPost (row) {
      this.$confirm('确认取消过账？', '提示', {
        type: 'warning'
      }).then(() => {
        api.storage.warehouseManagement.cancelPost({
          primaryId: row.primaryId,
          operator: storage.getUser().employeeId
        }).then(res => {
          if (res.data.messageType === 1) {
            this.$message.success('取消过账成功')
            this.getData()
          }
        })
      })
    },
    supplementClick (data) {
      this.$refs.supplementDialog.show({...data, sharePalletCode: this.factory.sharePalletCode})
    },
    getAllWorkshop () {
      api.automatic.dictionary.getAllWorkshopList({}).then(response => {
        const data = response.data
        if (data.messageType === 1) {
          this.options.workshop = data.data
        }
      })
    },
    synRequisition () {
      if (!this.synDate) {
        return this.$message.error('请选择日期')
      }
      this.loading.requisition = true
      api.storage.warehouseManagement.synRequisition({
        date: this.synDate.getTime()
      }).then((res) => {
        if (res.data.messageType === 1) {
          this.$message.success('调拨单同步成功')
          this.getData()
        } else {
          this.$message.error(res.data.message)
        }
      }).finally(() => {
        this.loading.requisition = false
      })
    },
    synMaterial () {
      this.loading.material = true
      api.storage.warehouseManagement.synMaterial().then((res) => {
        if (res.data.messageType === 1) {
          this.$message.success('物料同步成功')
          this.getData()
        } else {
          this.$message.error(res.data.message)
        }
      }).finally(() => {
        this.loading.material = false
      })
    },
    detailClick (data) {
      this.$refs.detailDialog.show({...data, sharePalletCode: this.factory.sharePalletCode})
    },
    bfOut (row) {
      api.storage.warehouseManagement.checkEnough({
        primaryId: row.primaryId
      }).then((response) => {
        let message = ''
        if (!response.data.data) {
          message += '提前出库单库存不足！'
        }
        message += '确认提前出库？'

        this.$confirm(message, '提示', {
          type: 'warning'
        }).then(() => {
          api.storage.warehouseManagement.advancePosting({
            requisitionId: row.primaryId,
            operator: storage.getUser().employeeId
          }).then((res) => {
            if (res.data.messageType === 1) {
              this.$message.success('提前出库成功')
              this.getData()
            } else {
              this.$message.error(res.data.message)
            }
          })
        })
      })
    },
    cancelAllot () {
      if (!this.search.deliveryNo) {
        return this.$message.error('交货编号为空')
      }
      this.$confirm('确认取消调拨？', '提示', {
        type: 'warning'
      }).then(() => {
        this.loading.cancel = true
        api.storage.warehouseManagement.cancelAllot({
          deliveryNo: this.search.deliveryNo
        }).then((res) => {
          if (res.data.messageType === 1) {
            this.$message.success('取消调拨成功')
            this.getData()
          } else {
            this.$message.error(res.data.message)
          }
        }).finally(() => {
          this.loading.cancel = false
        })
      })
    },
    handleSelectionChange (val) {
      this.tableRowsSelected = val
    },
    mergeAllot () {
      if (this.tableRowsSelected.length <= 1) {
        this.$message({type: 'warning', message: '请选择两个以上调拨单'})
        return
      }
      if (this.tableRowsSelected.some((item, index) => { return item.plateNumber === '' })) {
        this.$message({type: 'warning', message: '调拨单车牌号为空'})
        return
      }
      let first = this.tableRowsSelected[0]
      if (this.tableRowsSelected.some(item => { return item.plateNumber !== first.plateNumber })) {
        this.$message({type: 'warning', message: '调拨单车牌号不一致'})
        return
      }
      if (this.tableRowsSelected.some(item => { return item.status !== 'PENDING' })) {
        this.$message({type: 'warning', message: '调拨单必须是未处理状态'})
        return
      }
      if (this.tableRowsSelected.some(item => { return item.isInternalTrade !== first.isInternalTrade })) {
        this.$message({type: 'warning', message: '调拨单必须同为内销单或同为外贸单'})
        return
      }
      let param = {
        mergeList: this.tableRowsSelected.reduce((acc, cur) => { return acc.concat(cur.requisitionIds) }, []),
        empId: storage.getUser().employeeId
      }
      console.log(param)
      this.loading.merge = true
      api.storage.warehouseManagement.manualMergeRequisition(param).then((res) => {
        if (res.data.messageType === 1) {
          this.$message.success('合并调拨单成功')
          this.getData()
        } else {
          this.$message.error(res.data.message)
        }
      }).finally(() => {
        this.loading.merge = false
      })
    },
    cancel (row) {
      this.$confirm('确认取消？', '提示', {
        type: 'warning'
      }).then(() => {
        api.storage.warehouseManagement.cancelRequisition({
          primaryId: row.primaryId,
          deliveryNos: row.deliveryNos
        }).then((res) => {
          if (res.data.messageType === 1) {
            this.$message.success('取消成功')
            this.getData()
          } else {
            this.$message.error(res.data.message)
          }
        })
      })
    },
    // 过账转移
    // transfer (row) {
    //   this.$refs.transferlDialog.show(row)
    // },
    // 货物转移
    goodsTransfer (row) {
      this.dialogGoodsTransferVisible = true
      this.goodsTransferSearch.fromPrimaryId = row.primaryId
      this.goodsTransferSearch.toPrimaryId = ''
      this.rowData = row
      // this.$refs.refTransferForm.resetFields()
      let param = {}
      api.storage.warehouseManagement.getRequisitionInfoByParams(param).then(response => {
        let data = response.data
        if (data.messageType === 1) {
          this.options.deliveryNumber = data.data
        } else {
          this.$message.success(data.message)
        }
      })
    },
    // 模糊搜索选项
    searchTransferTo (query) {
      if (query === '') {
        this.options.filterDeliverNumber = this.options.deliveryNumber
      } else {
        this.options.filterDeliverNumber = this.options.deliveryNumber.filter(item => {
          return item.plateNumber.toLowerCase().includes(query.toLowerCase()) ||
            item.deliveryNos.join().includes(query.toLowerCase()) ||
            item.primaryId.toString().includes(query.toLowerCase())
        })
      }
    },
    // 转移车牌获取车牌号
    goodTransferChange (val) {
      this.goodsTransferSearch.toPlateNumber = (this.options.deliveryNumber.find(item => { return item.primaryId === val })).plateNumber
    },
    confirmTransferClick () {
      this.dialogGoodsTransferVisible = false
      this.$refs.refGoodsTransfer.show({...this.goodsTransferSearch, ...this.rowData, sharePalletCode: this.factory.sharePalletCode})
    },
    // 货物回退
    goodsReturn (row) {
      this.$confirm('是否确定回退?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            let param = {primaryId: row.primaryId}
            api.storage.warehouseManagement.stockReverse(param).then((response) => {
              const data = response.data
              if (data.messageType === 1) {
                this.$message.success('回退成功')
                this.getData()
              } else {
                this.$message.success(data.message)
              }
            }).finally(() => {
              instance.confirmButtonLoading = false
              done()
            })
          } else {
            instance.confirmButtonLoading = false
            done()
          }
        }
      })
    },
    searchClick (form) {
      this.page.currentPage = 1
      this.getData()
    },
    getData () {
      let date = this.getTime(this.search.date)
      let synDate = this.getTime(this.search.synDate)

      // let status = []
      // if (this.search.status) {
      //   status.push(this.search.status)
      // } else {
      //   status = requisitionStatus.map(item => item.value)
      // }

      let params = {
        requisitionType: 'SALE',
        pageIndex: this.page.currentPage,
        pageCount: this.page.size,
        batchNo: this.search.batchNo,
        customerName: this.search.customerName,
        plateNumber: this.search.plateNumber,
        workshopId: this.search.workshopId,
        deliveryNo: this.search.number,
        outBoundDate: date,
        synDate: synDate,
        requisitionStatus: this.search.status
      }
      console.log(params)
      this.loading.table = true
      api.storage.warehouseManagement.getRequisitionByType(params).then((response) => {
        const data = response.data
        if (data.messageType === 1) {
          if (data.data && data.data.list && data.data.list.length > 0) {
            this.page.total = data.data.count
            this.tableData = data.data.list
          } else {
            this.page.total = 0
            this.tableData = []
          }
        } else {
          this.$message.error(response.data.message)
        }
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
    padding: 10px 0 0 0;
  }
  .ml {
    margin-left: 20px;
  }
  .tags {
    margin-right: 10px
  }
  .rgb-red {
    color: red;
  }
  .allot-tip div {
    padding: 5px 10px;
    margin-bottom: 1rem;
  }
  .template-input {
    width: 33rem;
  }
</style>
