<template>
  <div class="page-wrapper">
    <div class="action-bar cf">
      <div class="fr">
        <el-input class="width1" v-model="searchInfo.number" placeholder="请输入交货编号"></el-input>
        <el-date-picker v-model="searchInfo.date" type="date" placeholder="请选择日期" clearable></el-date-picker>
        <el-button @click="btnSearch" type="primary" icon="el-icon-search"></el-button>
      </div>
    </div>
    <el-table :data="tableData" border v-loading="loading.table" style="width: 100%">
      <el-table-column prop="data" label="交货编号"></el-table-column>
      <el-table-column prop="data" label="客户名称"></el-table-column>
      <el-table-column prop="data" label="品名"></el-table-column>
      <el-table-column prop="data" label="批号"></el-table-column>
      <el-table-column prop="data" label="等级"></el-table-column>
      <el-table-column prop="data" label="退货时间"></el-table-column>
      <el-table-column prop="data" label="退货数量"></el-table-column>
      <el-table-column prop="data" label="处理人"></el-table-column>
      <el-table-column prop="data" label="退货原因"></el-table-column>
      <el-table-column prop="data" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small">换货安排</el-button>
        </template>
      </el-table-column>
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
  </div>
</template>

<script>
  export default {
    components: {
    },
    data () {
      return {
        searchInfo: {
          number: '',
          date: ''
        },
        tableData: [
          {data: '213'}
        ],
        loading: {
          table: false
        },
        page: {
          currentPage: 1,
          sizes: [15, 30, 50, 100],
          size: 15,
          total: 0
        }
      }
    },
    mounted () {
      this.getWarehouseOptions()
      this.getData()
    },
    methods: {
      btnSearch () {
        this.page.currentPage = 1
        this.getData()
      },
      getWarehouseOptions () {
//      api.automatic.barCode.foreignTradePackBoxCodePrint(params).then((response) => {
//        const data = response.data
//        if (data.messageType === 1) {
//          this.options.warehouse = data.data
//        }
//      }).catch((e) => {
//        console.log(e)
//      }).finally(() => {
//      })
      },
      getData () {
//      this.loading.table = true
//      api.automatic.barCode.foreignTradePackBoxCodePrint(params).then((response) => {
//        const data = response.data
//        if (data.messageType === 1) {
//          this.page.total = data.data.total
//          this.tableData = data.data.list
//        }
//      }).catch((e) => {
//        console.log(e)
//      }).finally(() => {
//        this.loading.table = false
//      })
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
  .page-wrapper{
    margin: 10px;
    padding: 10px;
    border-radius: 3px;
    background-color: #fff;
  }
  .action-bar{
    padding: 10px 0;
  }
</style>
