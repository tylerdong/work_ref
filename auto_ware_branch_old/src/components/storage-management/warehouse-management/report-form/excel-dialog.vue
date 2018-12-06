<template>
  <el-dialog width="90%" :visible.sync="dialogVisible">
    <div>
      <excel ref="excel"></excel>
    </div>
    <template slot="footer">
      <el-button @click="exportExcel" type="primary">导出</el-button>
    </template>
  </el-dialog>
</template>
<script>

  export default {
    components: {
      'excel': require('../../../common/excel.vue')
    },
    data () {
      return {
        dialogVisible: false
      }
    },
    methods: {
      show (wb) {
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs.excel.render(wb)
        })
      },
      exportExcel () {
        this.dialogVisible = false
        this.$emit('exportExcel')
      }
    }
  }
</script>
<style>
  .excel-wrapper {
    overflow-x: auto;
  }
</style>
