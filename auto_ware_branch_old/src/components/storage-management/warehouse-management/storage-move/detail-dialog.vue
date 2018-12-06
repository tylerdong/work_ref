<!--组件名-->
<template>
  <div>
    <el-dialog title="详情" :visible.sync="dialogVisible" width="50%">
      <el-table :data="tableData">
        <el-table-column property="number" align="center" label="码单号"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        dialogVisible: false,
        tableData: []
      }
    },
    mounted () {
    },
    methods: {
      show (data) {
        this.dialogVisible = true
        this.tableData = data
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
