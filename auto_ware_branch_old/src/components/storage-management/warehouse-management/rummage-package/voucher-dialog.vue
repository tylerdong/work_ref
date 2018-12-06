<!--组件名-->
<template>
  <div>
    <el-dialog title="翻包" width="80%" :visible.sync="dialogTableVisible">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="title">凭证号：{{voucherNum}}</div>
          <el-table :data="tableData1" v-loading="loading.table1">
            <el-table-column property="barcode" label="唛头"></el-table-column>
            <el-table-column property="weight" label="重量"></el-table-column>
            <el-table-column label="所需重量">
              <template slot-scope="scope">
                <el-input-number size="small" :controls="false" v-model="scope.row.needWeight"></el-input-number>
              </template>
            </el-table-column>
          </el-table>
          <div class="btn-box">
            <el-button @click="confirmShow" :loading="loading.create" class="submit-btn" type="primary">生成唛头</el-button>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="title">翻包记录</div>
          <el-table :data="tableData2" v-loading="loading.table2">
            <el-table-column property="barcode" label="唛头"></el-table-column>
            <el-table-column property="boxNo" label="箱号"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-dialog>
    <voucher-confirm-dialog @update-data="updateData" ref="voucherConfirmDialog"></voucher-confirm-dialog>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    components: {
      'voucher-confirm-dialog': require('./voucher-confirm-dialog.vue')
    },
    data () {
      return {
        dialogTableVisible: false,
        tableData1: [],
        tableData2: [],
        loading: {
          table1: false,
          table2: false,
          create: false
        },
        voucherNum: ''
      }
    },
    methods: {
      show (row) {
        this.voucherNum = row.voucherNumber
        this.getTableData1()
        this.getTableData2()
        this.dialogTableVisible = true
      },
      updateData () {
        this.getTableData1()
        this.getTableData2()
      },
      getTableData1 () {
        this.loading.table1 = true
        api.storage.warehouseManagement.getTurnOverPageInfoByVoucherNumber({
          voucherNumber: this.voucherNum
        }).then((response) => {
          let data = response.data
          for (let item of data.data) {
            item.needWeight = 0
          }
          this.tableData1 = data.data
        }).finally(() => {
          this.loading.table1 = false
        })
      },
      getTableData2 () {
        this.loading.table2 = true
        api.storage.warehouseManagement.getTurnOverPageResultByVoucherNumber({
          voucherNumber: this.voucherNum
        }).then((response) => {
          this.tableData2 = response.data.data
        }).finally(() => {
          this.loading.table2 = false
        })
      },
      confirmShow () {
        let turnOverPageBos = []
        this.tableData1.forEach(row => {
          if (row.needWeight) {
            turnOverPageBos.push(row)
          }
        })
        if (!turnOverPageBos.length) {
          return this.$message('重量不能都为0')
        }
        this.$refs.voucherConfirmDialog.show(turnOverPageBos)
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
