<template>
  <el-dialog title="散件发运详情" :visible.sync="visible" width="30%">
    <el-table :data="tableData" border style="width: 100%" v-loading="loading">
      <el-table-column prop="code" label="丝锭条码" align="center" show-overflow-tooltip></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
  import * as api from 'src/api'
  export default {
    data () {
      return {
        tableData: [],
        visible: false,
        loading: false
      }
    },
    methods: {
      open (row) {
        console.log(api)

//        this.loading = true
//        api.storage.warehouseManagement.getPartDeliveryDetail({
//          id: row.id,
//        }).then(response => {
//          const data = response.data
//          if (data.messageType === 1) {
//            this.tableData = data.data.list
//          }
//        }).finally(() => {
//          this.loading = false
//        })

        this.tableData = [
          {code: '123'},
          {code: 'dfa'},
          {code: 'gfd'}
        ]
        this.visible = true
      }
    }
  }
</script>
