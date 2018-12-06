<!--销售调拨单-->
<template>
  <div class="page-wrapper">
    <div class="action-bar cf">
      <!--<div class="fl">-->
        <!--<el-date-picker v-model="synDate" type="date" placeholder="调拨单同步日期" clearable></el-date-picker>-->
        <!--<el-button @click="synRequisition" type="primary">同步调拨单</el-button>-->
        <!--<el-button class="ml" @click="synMaterial" type="primary">同步物料</el-button>-->

        <!--<el-input class="width1" placeholder="请输入交货编码" v-model="search.deliveryNo"></el-input>-->
        <!--<el-button class="ml" @click="cancelAllot" type="primary">取消调拨</el-button>-->
      <!--</div>-->
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
          <el-button @click="searchClick" type="primary" icon="el-icon-search"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border v-loading="loading.table">
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
      <el-table-column width="276" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 'PENDING'" @click="supplementClick(scope.row)" type="text" size="small">出货安排</el-button>
          <!--<el-button v-if="scope.row.status === 'PENDING'" @click="bfOut(scope.row)" type="text" size="small">提前出库</el-button>-->
          <el-button v-if="scope.row.status !== 'PENDING'" @click="detailClick(scope.row)" type="text" size="small">查看详情</el-button>
          <el-button v-if="scope.row.status === 'PROCESSED'" @click="cancel(scope.row)" type="text" size="small">取消调拨</el-button>
          <el-button v-if="scope.row.status === 'PROCESSED' || scope.row.status === 'CHECKING' || scope.row.status === 'PICKUP_FAILED'" @click="manualPickup(scope.row)" type="text" size="small">手动拣配</el-button>
          <el-button v-if="scope.row.status === 'CHECKING' || scope.row.status === 'CHECKED'" @click="cancelPickup(scope.row)" type="text" size="small">取消拣配</el-button>
          <el-button v-if="scope.row.status === 'SAP_FINISH'" @click="cancelPost(scope.row)" type="text" size="small">取消过账</el-button>
          <el-button v-if="scope.row.status === 'SAP_FINISH'" @click="transfer(scope.row)" type="text" size="small">过账转移</el-button>
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
    <dialog-transfer @success="getData" ref="transferlDialog"></dialog-transfer>
  </div>
</template>

<script>
  import * as api from 'src/api'
  import {requisitionStatus} from '../../value-label'
  import storage from '../../../../module/storage'

  export default {
    components: {
      'dialog-supplement': require('./dialog-silk-car-allot.vue'),
      'dialog-detail': require('./dialog-sale-allot-finished.vue'),
      'dialog-transfer': require('./dialog-transfer.vue')
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
          status: '',
          deliveryNo: ''
        },
        synDate: '',
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
      cancelPickup (row) {
        this.$confirm('确认取消拣配？', '提示', {
          type: 'warning'
        }).then(() => {
          api.storage.warehouseManagement.cancelPickup({
            primaryId: row.primaryId
          }).then(response => {
            if (response.data.messageType === 1) {
              this.$message.success('取消拣配成功')
              this.getData()
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
      synRequisition () {
        if (!this.synDate) {
          return this.$message.error('请选择日期')
        }
        api.storage.warehouseManagement.synRequisition({
          date: this.synDate.getTime()
        }).then((res) => {
          if (res.data.messageType === 1) {
            this.$message.success('调拨单同步成功')
          }
        })
      },
      synMaterial () {
        api.storage.warehouseManagement.synMaterial()
          .then((res) => {
            if (res.data.messageType === 1) {
              this.$message.success('物料同步成功')
            }
          })
      },
      detailClick (data) {
        this.$refs.detailDialog.show(data)
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
          api.storage.warehouseManagement.cancelAllot({
            deliveryNo: this.search.deliveryNo
          }).then((res) => {
            if (res.data.messageType === 1) {
              this.$message.success('取消调拨成功')
              this.getData()
            }
          })
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
            }
          })
        })
      },
      transfer (row) {
        this.$refs.transferlDialog.show(row)
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
          requisitionType: 'SILKCAR',
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
        this.loading.table = true
        api.storage.warehouseManagement.getRequisitionByType(params).then((response) => {
          if (response.data.messageType === 1) {
            const data = response.data
            this.page.total = data.data.count
            this.tableData = data.data.list
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
    padding: 10px 0;
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
</style>
