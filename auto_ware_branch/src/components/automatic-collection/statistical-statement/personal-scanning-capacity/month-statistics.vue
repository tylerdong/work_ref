<!-- 个人扫描量统计 -- 按月统计 -->
<template>
  <div>
    <search-toolbar
      :month-visible="true"
      :search-loading="search.loading"
      @callback-search="callbackSearch"></search-toolbar>
    <template>
      <el-table
        :data="table.list"
        border
        v-loading="table.loading"
        show-summary
        style="width: 100%">
        <el-table-column
          width="70px"
          type="index">
        </el-table-column>
        <el-table-column
          prop="employeeName"
          label="员工名">
        </el-table-column>
        <el-table-column
          prop="workTypeName"
          label="工种">
        </el-table-column>

        <el-table-column
          prop="amount"
          label="总产量">
        </el-table-column>

        <el-table-column
          prop="abnormalAmount"
          label="异常丝数量">
        </el-table-column>

        <el-table-column
          header-align="center"
          label="降等品扫描数量">
          <el-table-column
            prop="amountAA"
            label="AA级品">
          </el-table-column>
          <el-table-column
            prop="amountA"
            label="A级品">
          </el-table-column>
          <el-table-column
            prop="amountB"
            label="B级品">
          </el-table-column>
          <el-table-column
            prop="amountC"
            label="C级品">
          </el-table-column>
        </el-table-column>

        <el-table-column
          width="120px"
          label="统计时间">
          <template slot-scope="scope">s
            <span slot="">{{ scope.row.scanDate | timeFormat('YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="hy-admin__pagination-wrapper cf">
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
      </div>
    </template>

  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    components: {
      'search-toolbar': require('./search-toolbar.vue')
    },
    mounted () {
      this.getData()
    },
    data () {
      return {
        search: {
          userName: '',
          workshop: '',
          classes: '',
          month: '',
          loading: false
        },
        table: {
          loading: true,
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
          schedulingName: this.search.classes,
          scanDate: this.search.month,
          dateFlag: '1', // 月报
          pageIndex: this.page.currentPage,
          pageCount: this.page.size
        }
        api.automatic.statement.getEmployeeWorkReportListByParams(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.table.list = data.data.list
            this.page.total = data.data.list.length
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.table.loading = false
          this.search.loading = false
        })
      },

      getSummaries (params) {
        const {columns, data} = params
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价'
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
        this.search.loading = true
        this.search.userName = data.userName
        this.search.workshop = data.workshop
        this.search.classes = data.classes
        this.search.month = data.month
        this.getData()
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
