<!--散件发运-->
<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-input v-model="searchInfo.number" placeholder="请输入交货编号"></el-input>
          <el-date-picker v-model="searchInfo.date" type="date" placeholder="请选择日期" clearable></el-date-picker>

          <el-button type="primary" @click="getData">查询</el-button>
        </div>
      </div>

      <template>
        <el-table :data="tableData" border style="width: 100%" v-loading="loading.table">
          <el-table-column prop="data" label="交货编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="data" label="客户名称" show-overflow-tooltip></el-table-column>
          <el-table-column label="类型" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.data | filterStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="data" label="品名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="data" label="规格" show-overflow-tooltip></el-table-column>
          <el-table-column prop="data" label="等级" show-overflow-tooltip></el-table-column>
          <el-table-column prop="data" label="锭数" show-overflow-tooltip></el-table-column>
          <el-table-column prop="data" label="装运点" show-overflow-tooltip></el-table-column>
          <el-table-column prop="data" label="车牌号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="data" label="电话" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="btnDetail(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="hy-admin__pagination-wrapper">
        <el-pagination
          class="fr"
          style="text-align: right;"
          @size-change="btnSizeChange"
          @current-change="btnCurrentChange"
          :current-page="pages.currentPage"
          :page-sizes="pages.sizes"
          :page-size="pages.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pages.total">
        </el-pagination>
      </div>

      <detail-dialog ref="detailDialog"></detail-dialog>
    </div>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    components: {
      'detail-dialog': require('./detail-dialog.vue')
    },
    data () {
      return {
        tableData: [],
        loading: {
          table: false,
          selWarehouse: false
        },
        searchInfo: {
          number: '',
          date: ''
        },
        pages: {
          currentPage: 1,
          sizes: [15, 30, 50, 100],
          size: 15,
          total: 0
        }
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        this.tableData = [
          {data: '123'},
          {data: '1243'}
        ]
        console.log(api)
//        this.loading.table = true
//        api.storage.warehouseManagement.getPartDeliveryList({
//          number: this.searchInfo.number,
//          date: this.searchInfo.date,
//          pageIndex: this.pages.currentPage,
//          pageCount: this.pages.size
//        }).then(response => {
//          const data = response.data
//          if (data.messageType === 1) {
//            this.pages.total = data.data.count
//            this.tableData = data.data.list
//          }
//        }).finally(() => {
//          this.loading.table = false
//        })
      },
      btnDetail (row) {
        this.$refs.detailDialog.open(row)
      },
      /* 分页 */
      btnSizeChange (size) {
        this.pages.size = size
        if (this.pages.currentPage === 1) {
          this.getData()
        } else {
          this.pages.currentPage = 1
        }
      },
      btnCurrentChange (currenPage) {
        this.pages.currentPage = currenPage
        this.getData()
      }
    },
    filters: {
      filterStatus (value) {
        let res = ''
        if (value === 'ALLOWED') {
          res = '使用中'
        } else if (value === 'BAN') {
          res = '禁用'
        }
        return res
      }
    }
  }
</script>
<style scoped lang="scss">
  .tags {
    margin-right: 10px
  }
</style>
