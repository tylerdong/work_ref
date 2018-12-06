<!--组件名-->
<template>
  <div>
    <el-dialog title="箱单列表" width="80%" :visible.sync="dialogTableVisible">
      <el-button :loading="loading.print" @click="printClick" class="print-btn" type="primary">打印</el-button>
      <el-table :data="tableData" v-loading="loading.code" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          width="55">
        </el-table-column>
        <el-table-column property="productDate" label="生产日期"></el-table-column>
        <el-table-column property="number" label="箱单编号"></el-table-column>
        <el-table-column property="code" label="箱码单号"></el-table-column>
        <el-table-column property="batchNo" label="批号"></el-table-column>
        <el-table-column property="classesName" label="班次"></el-table-column>
        <el-table-column property="grade" label="等级"></el-table-column>
        <el-table-column property="productName" label="品名"></el-table-column>
        <el-table-column property="silkNum" label="数量"></el-table-column>
        <el-table-column property="grossWeight" label="毛重"></el-table-column>
        <el-table-column property="netWeight" label="净重"></el-table-column>
        <!--<el-table-column property="paperTube" label="纸管"></el-table-column>-->
        <el-table-column label="打印状态">
          <template slot-scope="scope">
            <span>{{scope.row.printFlag | printStatus}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <dialog-print :printData="printData"></dialog-print>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    components: {
      'dialog-print': require('../measure-printing/dialog-print.vue')
    },
    data () {
      return {
        dialogTableVisible: false,
        tableData: [],
        printData: [],
        multipleSelection: [],
        nowData: null,
        loading: {
          code: false
        }
      }
    },
    mounted () {
    },
    filters: {
      printStatus: function (val) {
        if (val === '1') {
          return '未打印'
        }
        return '已打印'
      }
    },
    methods: {
      getData () {
        let params = {
          boxCode: this.nowData.code
        }
        this.loading.table = true
        api.automatic.barCode.getPackageCodeList(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.tableData = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.table = false
        })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      printClick () {
        if (this.multipleSelection.length) {
          console.log(this.multipleSelection)
          this.loading.print = true
          let params = {
            packageCode: []
          }
          for (let item of this.multipleSelection) {
            params.packageCode.push(item.code)
          }
          console.log(params)
          api.automatic.barCode.packageCodePrint(params).then((response) => {
            const data = response.data
            if (data.messageType === 1) {
              this.printData = this.multipleSelection.map(item => {
                return {
                  batchNo: item.batchNo,
                  silkSpec: this.nowData.silkSpec,
                  gradeName: item.grade,
                  boxSilkNum: item.silkNum,
                  tubeColor: item.paperTube,
                  boxTime: item.productDate,
                  code: item.code,
                  boxNetWeight: item.netWeight,
                  boxGrossWeight: item.grossWeight
                }
              })
              this.getData()
            }
          }).catch((e) => {
            console.log(e)
          }).finally(() => {
            this.loading.print = false
          })
        } else {
          this.$message('请选择要打印的条码')
        }
      },
      show (data) {
        this.dialogTableVisible = true
        this.nowData = data
        this.getData()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .print-btn{
    float: right;
    margin-bottom: 10px;
  }
  .package-print{
    display: none;
  }
</style>
