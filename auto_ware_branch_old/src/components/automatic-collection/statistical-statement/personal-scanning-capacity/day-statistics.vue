<!-- 个人扫描量统计 -- 按天统计 -->
<template>
  <div>
    <search-toolbar :date-visible="true" :search-loading="search.loading" @callback-search="callbackSearch"
      @callback-bar-grape="callBackBarGrapeData"></search-toolbar>
    <template>
      <el-table :data="table.list" border v-loading="table.loading" show-summary style="width: 100%">
        <el-table-column width="70px" type="index"></el-table-column>
        <el-table-column prop="employeeName" label="员工名"></el-table-column>
        <el-table-column prop="workTypeName" label="工种"></el-table-column>
        <el-table-column prop="amount" label="总产量"></el-table-column>
        <el-table-column prop="abnormalAmount" label="异常丝数量"></el-table-column>
        <el-table-column header-align="center" label="降等品扫描数量">
          <el-table-column prop="amountAA" label="AA级品"></el-table-column>
          <el-table-column prop="amountA" label="A级品"></el-table-column>
          <el-table-column prop="amountB" label="B级品"></el-table-column>
          <el-table-column prop="amountC" label="C级品"></el-table-column>
        </el-table-column>
        <!--<el-table-column width="120px" label="统计时间">-->
          <!--<template scope="scope">-->
            <!--<span slot="">{{ scope.row.scanDate | timeFormat('YYYY-MM-DD') }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>

      <el-pagination
        class="fr"
        :current-page="page.current"
        :page-sizes="[15, 30, 50, 100]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        @size-change="pageSizeChange"
        @current-change="pageCurrentChange">
      </el-pagination>

    </template>
    <dialog-bar-graph-statistics ref="barGraphDialog"></dialog-bar-graph-statistics>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    components: {
      'search-toolbar': require('./search-toolbar.vue'),
      'dialog-bar-graph-statistics': require('./dialog-bar-graph-statistics')
    },
    mounted () {
    },
    data () {
      return {
        search: {
          userName: '',
          workshop: '',
          workTypeId: '',
          date: '',
          loading: false
        },
        table: {
          loading: false,
          list: []
        },
        page: {
          currentPage: 1,
          sizes: [15, 30, 50, 100],
          size: 15,
          total: 0
        }
      }
    },
    methods: {
      getData () {
        this.table.loading = true
        let params = {
          employeeName: this.search.userName,
          workshopId: this.search.workshop,
          workTypeId: this.search.workTypeId,
          scanDate: this.search.date,
          dateFlag: '0', // 日报
          pageIndex: this.page.currentPage,
          pageCount: this.page.size
        }
        api.automatic.statement.getEmployeeWorkReportListByParams(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data.data.list)
            this.table.list = data.data.list
            this.page.total = data.data.count
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.table.loading = false
        })
      },

      getBarGrapeData () {
        let params = {
          employeeName: this.search.userName,
          workshopId: this.search.workshop,
          workTypeId: this.search.workTypeId,
          scanDate: this.search.date,
          dateFlag: '0' // 日报
        }
        api.automatic.statement.getEmployeeWorkReportList(params).then(response => {
          let data = response.data
          if (data.messageType === 1 && data.data.length > 0) {
            this.$refs.barGraphDialog.show(data.data)
          } else {
            this.$message.error('没有数据')
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
        })
      },

      getSummaries (params) {
        const {columns, data} = params
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计'
            return
          }
          if (index === 1) {
            sums[index] = ''
            return
          }
          if (index === 2) {
            sums[index] = ''
            return
          }
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
          }
        })
        return sums
      },
      /* 分页 */
      pageSizeChange (size) {
        this.page.size = size
        if (this.page.current === 1) {
          this.getData()
        } else {
          this.page.current = 1
        }
      },
      pageCurrentChange (current) {
        this.page.current = current
        this.getData()
      },

      callbackSearch (data) {
        this.search.userName = data.userName
        this.search.workshop = data.workshop
        this.search.workTypeId = data.workTypeId
        this.search.date = data.date
        this.getData()
      },

      callBackBarGrapeData (data) {
        this.search.userName = data.userName
        this.search.workshop = data.workshop
        this.search.workTypeId = data.workTypeId
        this.search.date = data.date
        this.getBarGrapeData()
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
