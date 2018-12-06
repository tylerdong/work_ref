<!--SAP状态-->
<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <el-form ref="form" :inline="true" :rules="rules" :model="searchInfo">

          <el-form-item prop="deliveryNo">
            <el-input v-model="searchInfo.deliveryNo" placeholder="请输入交货编码" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="getData('form')" :loading="search.loading">查询</el-button>
          </el-form-item>

        </el-form>
      </div>
      <el-table :data="tableData" border style="width: 100%" v-loading="loading.table">
        <el-table-column label="SAP" label-class-name="label-center">
          <!--<el-table-column label="可调拨">-->
            <!--<template slot-scope="scope">-->
              <!--<el-tag class="color-sap">{{scope.row.assigin | sapRequisitionStep}}</el-tag>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column label="调拨">
            <template slot-scope="scope">
              <el-tag :class="colorSap(scope.row.lprio)">{{scope.row.lprio | sapRequisitionStep}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="拣配">
            <template slot-scope="scope">
              <el-tag :class="colorSap(scope.row.pickup)">{{scope.row.pickup | sapRequisitionStep}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="过账">
            <template slot-scope="scope">
              <el-tag :class="colorSap(scope.row.post)">{{scope.row.post | sapRequisitionStep}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="开票">
            <template slot-scope="scope">
              <el-tag :class="colorSap(scope.row.post)">{{scope.row.invoice | sapRequisitionStep}}</el-tag>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="系统" label-class-name="label-center">
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag :class="colorSys(scope.row.wmRequisition.status)">{{scope.row.wmRequisition.status | sapRequisitionStatus }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="内销/外贸">
            <template slot-scope="scope">
              <el-tag :class="colorSys(scope.row.wmRequisition.status)">{{scope.row.wmRequisition.isInternalTrade | productType}}</el-tag>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="(scope.row.post === 'X' && ['CHECKED', 'POST_FAILED'].includes(scope.row.wmRequisition.status)) ||
                       (scope.row.pickup === 'X' && ['PICKUP_FAILED', 'PROCESSED'].includes(scope.row.wmRequisition.status))"
                       type="text" @click="asyncSAP(scope.row)" :loading="loading.async">同步
            </el-button>

            <el-button v-if="scope.row.pickup === 'X' && !scope.row.post && ['POST_FAILED'].includes(scope.row.wmRequisition.status)"
                       @click="requisitionRepost(scope.row)" type="text" :loading="loading.post">过账
            </el-button>

            <el-button v-if="scope.row.lprio === 'X' && !scope.row.pickup && ['PICKUP_FAILED'].includes(scope.row.wmRequisition.status)"
                       @click="requisitionRepick(scope.row)" type="text" :loading="loading.pick">拣配
            </el-button>

            <el-button v-if="!scope.row.pickup && scope.row.wmRequisition.status !== 'CHECKED'" @click="reAllot(scope.row)"
                       type="text" :loading="loading.reAllot">重新调拨</el-button>
            <!--v-if="!scope.row.lprio"-->
            <!--<el-button v-if="!scope.row.lprio" @click="transfer(scope)" type="text" :loading="loading.async">调拨</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="调拨" :visible.sync="transferVisible" width="50%">
      <el-date-picker v-model="date" type="date" placeholder="选择日期"></el-date-picker>
      <span slot="footer" class="dialog-footer">
    <el-button @click="transferVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmTransfer">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as api from 'src/api'

  export default {
    components: { },
    mounted () {
    },
    data () {
      return {
        transferVisible: false,
        date: '',
        search: {loading: false},
        searchInfo: {deliveryNo: ''},
        loading: {table: false, async: false, post: false, pick: false, transfer: false, reAllot: false},
        tableData: [],
        rules: {deliveryNo: [{required: true, message: '请输入物料号', trigger: 'change'}]}
      }
    },
    computed: {},
    methods: {
      colorSap (value) {
        return value === 'X' ? 'color-sap-X' : 'color-sap'
      },
      colorSys (value) {
        if (['PROCESSED', 'CHECKING', 'CHECKED', 'FINISH', 'SAP_FINISH'].includes(value)) {
          return 'color-sap-X'
        } else if (['PENDING', 'PICKUP_FAILED', 'POST_FAILED'].includes(value)) {
          return 'color-sap'
        } else {
          return ''
        }
      },
      getData (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.search.loading = true
            this.loading.table = true
            let param = {deliveryNo: this.searchInfo.deliveryNo}
            api.storage.warehouseMaintain.getDeliveryStatus(param).then(response => {
              const data = response.data
              if (data.messageType === 1) {
                this.tableData = [data.data]
                console.log(this.tableData)
              } else {
                this.$message({type: 'error', message: data.message})
              }
            }).finally(() => {
              this.search.loading = false
              this.loading.table = false
            })
          }
        })
      },
      // “过账”操作
      requisitionRepost (data) {
        this.loading.post = true
        let param = {
          deliveryNo: data.wmRequisition.deliveryNo
        }
        api.storage.warehouseMaintain.requisitionRepost(param).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.$message({type: 'success', message: data.message})
            this.getData('form')
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading.post = false
        })
      },
      // “拣配”操作
      requisitionRepick (data) {
        this.loading.pick = true
        let param = {
          deliveryNo: data.wmRequisition.deliveryNo
        }
        api.storage.warehouseMaintain.requisitionRepick(param).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.$message({type: 'success', message: data.message})
            this.getData('form')
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading.pick = false
        })
      },
      // 调拨弹出框
      transfer () {
        // TODO
        this.transferVisible = true
      },
      confirmTransfer () {
        // TODO
      },
      // 同步SAP
      asyncSAP (data) {
        this.loading.async = true
        let param = {
          status: '',
          deliveryNo: data.wmRequisition.deliveryNo
        }
        if (data.post === 'X' && ['CHECKED', 'POST_FAILED'].includes(data.wmRequisition.status)) {             /* sap过账“是”，系统状态“已拣配”, 状态传已过账“SAP_FINISH” */
          param.status = 'SAP_FINISH'
        } else if (data.pickup === 'X' && ['PICKUP_FAILED', 'PROCESSED'].includes(data.wmRequisition.status)) {  /* sap拣配是“是”， 系统状态是“已处理”，状态传已拣配“PROCESSED” */
          param.status = 'CHECKED'
        }
        api.storage.warehouseMaintain.updateRequisitionStatus(param).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.$message({type: 'success', message: data.message})
            this.getData('form')
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading.async = false
        })
      },
      // 重新调拨
      reAllot (data) {
        this.loading.reAllot = true
        let param = {
          reverse: '',
          deliveryNoList: [data.wmRequisition.deliveryNo]
        }
        api.storage.warehouseMaintain.deliveryAllot(param).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.$message({type: 'success', message: data.message})
            this.getData('form')
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading.reAllot = false
        })
      }
    }
  }
</script>
<style scoped>
  .color-sap-X {
    background-color: #67C23A;
  }
  .color-sap {
     background-color: rgb(131, 146, 165);
   }
</style>
