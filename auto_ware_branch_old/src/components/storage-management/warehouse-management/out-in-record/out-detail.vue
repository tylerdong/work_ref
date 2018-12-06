<template>
  <el-dialog title="码单明细" width="80%" :visible.sync="dialogVisible" top="5%">
    <div class="action-bar cf">
      <div class="fr">
        <el-input v-model="search.codeSingle" class="width1" placeholder="请输入码单"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="getData"></el-button>
      </div>
    </div>
    <el-table :data="tableData"  v-loading="loading.table" >
      <el-table-column property="markSingle" label="码单"></el-table-column>
      <el-table-column label="生产日期">
        <template slot-scope="scope">{{scope.row.productTime | timeFormat('YYYY-MM-DD')}}</template>
      </el-table-column>
      <el-table-column label="出库时间">
        <template slot-scope="scope">{{scope.row.createTime | timeFormat('YYYY-MM-DD HH:mm:ss')}}</template>
      </el-table-column>
      <el-table-column label="入库时间">
        <template slot-scope="scope">{{scope.row.inboundDate | timeFormat('YYYY-MM-DD')}}</template>
      </el-table-column>
      <el-table-column property="deliveryPerson" label="出库员"></el-table-column>
      <el-table-column property="netWeight" label="净重"></el-table-column>
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
        primaryId: '',
        loading: {
          table: false,
          confirm: false
        },
        search: {
          codeSingle: ''
        },
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
        this.search.codeSingle = ''
        this.dialogVisible = true
        this.primaryId = data.primaryId
        this.getData()
      },
      getData () {
        let params = {
          codeSingle: this.search.codeSingle ? this.search.codeSingle : '',
          pageIndex: this.page.currentPage,
          pageCount: this.page.size,
          primaryId: this.primaryId
        }
        this.loading.table = true
        api.storage.warehouseManagement.getRetrievalRecordInfoList(params).then(response => {
          const data = response.data
          console.log(data.data)
          if (data.messageType === 1) {
            this.page.total = data.data.count
            this.tableData = data.data.list
          } else {
            this.$message.error(data.message)
          }
        }).finally(() => {
          this.loading.table = false
        })
      },
      // /* 分页 */
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

