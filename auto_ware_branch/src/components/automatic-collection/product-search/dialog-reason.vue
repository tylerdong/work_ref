<template>
  <el-dialog title="查看异常原因" :visible.sync="dialog.visible" width="90%" center>
    <el-table v-if="tableData.length > 0" :data="tableData" border style="width: 100%">
      <el-table-column prop="workshopName" label="车间"></el-table-column>
      <el-table-column prop="lineName" label="线别"></el-table-column>
      <el-table-column prop="item" label="机位"></el-table-column>
      <el-table-column prop="fallNo" label="落次"></el-table-column>
      <el-table-column prop="productName" label="品名"></el-table-column>
      <el-table-column prop="batchNo" label="批次"></el-table-column>
      <el-table-column prop="spec" label="规格"></el-table-column>
      <el-table-column prop="silkCode" label="丝锭编码"></el-table-column>
      <el-table-column prop="processName" label="工艺"></el-table-column>
      <el-table-column label="操作类别">
        <template slot-scope="scope">{{scope.row.operateType | operateType}}</template>
      </el-table-column>
      <el-table-column prop="reasonName" label="异常原因"></el-table-column>
      <el-table-column prop="employeeName" label="操作人"></el-table-column>
      <el-table-column prop="createTimeGmt" label="操作时间"></el-table-column>
    </el-table>
    <div v-else class="no-data">暂无数据</div>
  </el-dialog>
</template>

<script>
  import * as api from 'src/api'

  export default {
    data () {
      return {
        dialog: {visible: false},
        tableData: []
      }
    },
    methods: {
      show (data) {
        this.dialog.visible = true
        this.tableData = []
        let params = {
          silkCode: data.dowSilkCode,
          pageIndex: 1,
          pageCount: 10000
        }
        api.automatic.statement.getSilkExceptionRecordList(params).then(response => {
          let data = response.data
          if (data.messageType === 1) {
            this.tableData = data.data.list
          } else {
            this.$message({type: 'error', message: data.message})
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
