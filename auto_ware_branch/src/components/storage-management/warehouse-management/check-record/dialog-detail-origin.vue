<template>
  <el-dialog title="盘点详情" width="80%" :visible.sync="dialogVisible">
    <el-table :data="tableData" v-loading="loading.table">
      <el-table-column prop="codeSingle" label="码单号"></el-table-column>
      <el-table-column prop="gmtCreate" label="扫码时间">
        <template slot-scope="scope">{{scope.row.gmtCreate | timeFormat('YYYY-MM-DD HH:mm:ss')}}</template>
      </el-table-column>
      <el-table-column prop="inboundOperater" label="入库人"></el-table-column>
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
  </el-dialog>
</template>

<script>
  import * as api from 'src/api'
  export default {
    data () {
      return {
        loading: {
          table: false
        },
        searchDate: '',
        row: {},
        tableData: [],
        dialogVisible: false,
        page: {
          currentPage: 1,
          sizes: [15, 30, 50, 100],
          size: 15,
          total: 0
        }
      }
    },
    methods: {
      show (data) {
        this.row = data
        this.page.currentPage = 1
        this.dialogVisible = true
        this.getData()
      },
      getData () {
        console.log(this.row)
        let param = {
          inventoryRecordId: this.row.id,
          pageIndex: this.page.currentPage,
          pageCount: this.page.size
        }
        api.storage.warehouseManagement.getInventoryDetail(param).then((response) => {
          const data = response.data
          this.page.total = data.data.count
          this.tableData = data.data.list
        }).finally(() => {
        })
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

</style>
