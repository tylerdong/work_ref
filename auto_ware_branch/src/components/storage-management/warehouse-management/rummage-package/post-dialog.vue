<!--过账对话框-->
<template>
  <div>
    <el-dialog title="过账" width="90%" :visible.sync="dialogTableVisible">
      <div v-loading="loading.data">
        <div class="title">凭证号：{{voucherNum}}</div>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="title">已经扫描</div>
            <el-table v-if="data.scanTurnoverPackageRefundPostBo.boxBos.length>0"
                      :data="data.scanTurnoverPackageRefundPostBo.boxBos">
              <el-table-column property="code" label="唛头(整箱)"></el-table-column>
              <el-table-column property="allWeight" label="重量"></el-table-column>
              <el-table-column label="所需重量">
                <template slot-scope="scope">
                  <el-input-number size="small" :controls="false" v-model="scope.row.weight"></el-input-number>
                </template>
              </el-table-column>
            </el-table>
            <el-table v-if="data.scanTurnoverPackageRefundPostBo.packageCodeBos.length>0"
                      :data="data.scanTurnoverPackageRefundPostBo.packageCodeBos">
              <el-table-column property="code" label="唛头(打包)"></el-table-column>
              <el-table-column property="allWeight" label="重量"></el-table-column>
              <el-table-column label="所需重量">
                <template slot-scope="scope">
                  <el-input-number size="small" :controls="false" v-model="scope.row.weight"></el-input-number>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="12">
            <div class="title">未扫描</div>
            <el-table v-if="data.unScanTurnoverPackageRefundPostBo.boxBos.length>0"
                      :data="data.unScanTurnoverPackageRefundPostBo.boxBos">
              <el-table-column property="code" label="唛头(整箱)"></el-table-column>
              <el-table-column property="allWeight" label="重量"></el-table-column>
              <el-table-column label="所需重量">
                <template slot-scope="scope">
                  <el-input-number size="small" :controls="false" v-model="scope.row.weight"></el-input-number>
                </template>
              </el-table-column>
            </el-table>
            <el-table v-if="data.unScanTurnoverPackageRefundPostBo.packageCodeBos.length>0"
                      :data="data.unScanTurnoverPackageRefundPostBo.packageCodeBos">
              <el-table-column property="code" label="唛头(打包)"></el-table-column>
              <el-table-column property="allWeight" label="重量"></el-table-column>
              <el-table-column label="所需重量">
                <template slot-scope="scope">
                  <el-input-number size="small" :controls="false" v-model="scope.row.weight"></el-input-number>
                </template>
              </el-table-column>
            </el-table>
            <el-table v-if="data.unScanTurnoverPackageRefundPostBo.scatteredSpindleBos.length>0"
                      :data="data.unScanTurnoverPackageRefundPostBo.scatteredSpindleBos">
              <el-table-column property="code" label="散件"></el-table-column>
              <el-table-column property="allWeight" label="重量"></el-table-column>
              <el-table-column label="所需重量">
                <template slot-scope="scope">
                  <el-input-number size="small" :controls="false" v-model="scope.row.weight"></el-input-number>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <!--<el-col :span="12">-->
          <!--<div class="title">翻包记录</div>-->
          <!--<el-table :data="tableData2" v-loading="loading.table2">-->
          <!--<el-table-column property="barcode" label="唛头"></el-table-column>-->
          <!--<el-table-column property="boxNo" label="箱号"></el-table-column>-->
          <!--</el-table>-->
          <!--</el-col>-->
        </el-row>
      </div>
      <div slot="footer">
        <el-button @click="confirmShow" :loading="loading.create" class="submit-btn" type="primary">过账</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    data () {
      return {
        dialogTableVisible: false,
        data: {
          scanTurnoverPackageRefundPostBo: {
            boxBos: [],
            packageCodeBos: []
          },
          unScanTurnoverPackageRefundPostBo: {
            boxBos: [],
            packageCodeBos: [],
            scatteredSpindleBos: []
          }
        },
        // tableData2: [],
        loading: {
          data: false,
          // table2: false,
          create: false
        },
        voucherNum: ''
      }
    },
    mounted () {
    },
    methods: {
      show (row) {
        this.voucherNum = row.voucherNumber
        this.getData()
        // this.getTableData2()
        this.dialogTableVisible = true
      },
      updateData () {
        this.getData()
        // this.getTableData2()
      },
      getData () {
        this.loading.data = true
        api.storage.warehouseManagement.getRefundPostingInfo({
          voucherNumber: this.voucherNum
        }).then((response) => {
          const data = response.data
          this.data = this.init(data.data)
        }).finally(() => {
          this.loading.data = false
        })
      },
      init (tableData) {
        this.setDefaultValue(tableData.scanTurnoverPackageRefundPostBo.boxBos, 1)
        this.setDefaultValue(tableData.scanTurnoverPackageRefundPostBo.packageCodeBos, 1)
        this.setDefaultValue(tableData.unScanTurnoverPackageRefundPostBo.boxBos, 0)
        this.setDefaultValue(tableData.unScanTurnoverPackageRefundPostBo.packageCodeBos, 0)
        this.setDefaultValue(tableData.unScanTurnoverPackageRefundPostBo.scatteredSpindleBos, 0)
        return tableData
      },
      // type: 0, 设置默认值为 0
      //       1, 设置默认值为总重量
      setDefaultValue (arr, type) {
        for (let item of arr) {
          item.allWeight = item.weight
          if (type === 0) {
            item.weight = 0
          }
        }
      },
      // getTableData2 () {
      //   this.loading.table2 = true
      //   api.storage.warehouseManagement.getTurnOverPageResultByVoucherNumber({
      //     voucherNumber: this.voucherNum
      //   }).then((response) => {
      //     this.tableData2 = response.data.data
      //   }).finally(() => {
      //     this.loading.table2 = false
      //   })
      // },
      confirmShow () {
        this.loading.create = true
        api.storage.warehouseManagement.refundPosting(this.getSubmitData()).then((response) => {
          this.dialogTableVisible = false
          this.updateData()
        }).finally(() => {
          this.loading.create = false
        })
      },
      getSubmitData () {
        let copyData = JSON.parse(JSON.stringify(this.data))
        copyData.scanTurnoverPackageRefundPostBo.boxBos = this.removeZeroData(copyData.scanTurnoverPackageRefundPostBo.boxBos)
        copyData.scanTurnoverPackageRefundPostBo.packageCodeBos = this.removeZeroData(copyData.scanTurnoverPackageRefundPostBo.packageCodeBos)
        copyData.unScanTurnoverPackageRefundPostBo.boxBos = this.removeZeroData(copyData.unScanTurnoverPackageRefundPostBo.boxBos)
        copyData.unScanTurnoverPackageRefundPostBo.packageCodeBos = this.removeZeroData(copyData.unScanTurnoverPackageRefundPostBo.packageCodeBos)
        copyData.unScanTurnoverPackageRefundPostBo.scatteredSpindleBos = this.removeZeroData(copyData.unScanTurnoverPackageRefundPostBo.scatteredSpindleBos)
        return copyData
      },
      removeZeroData (arr) {
        return arr.filter(item => item.weight)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .title{
    font-size: 16px;
    margin-bottom: 10px;
  }
  .btn-box{
    text-align: center;
  }
  .submit-btn{
    margin-top: 10px;
  }
</style>
