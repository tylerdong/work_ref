<!-- 统计报表 -- 异常报表 -->
<template>
  <div>
    <!--<breadcrumb name-id="020903"></breadcrumb>-->
    <!-- 批号 线别 车间 开始时间和结束时间 这是搜索条件-->
    <div class="content">
      <el-row class="search-box">
        <el-date-picker
          v-model="search.startTime"
          class="margin-right-1 margin-bottom-1"
          type="date"
          placeholder="开始结算日期">
        </el-date-picker>

        <el-date-picker
          v-model="search.overTime"
          class="margin-right-1 margin-bottom-1"
          type="date"
          placeholder="结束结算日期">
        </el-date-picker>

        <el-select v-model="search.workshop" :loading="search.workshopLoading" clearable placeholder="请选择车间"
                   @change="changeWorkshop"
                   class="margin-right-1 margin-bottom-1">
          <el-option
            v-for="item in search.workshopList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>

        <el-select v-model="search.line" :loading="search.lineLoading" clearable placeholder="请选择线别"
                   class="margin-right-1 margin-bottom-1">
          <el-option
            v-for="item in search.lineList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>

        <el-autocomplete
          class="inline-input margin-right-2"
          v-model="search.number"
          :fetch-suggestions="getNumberList"
          placeholder="请输入批号">
        </el-autocomplete>

        <el-button
          type="primary"
          class="margin-bottom-1"
          :loading="search.loading"
          @click="handleSearch">
          查询
        </el-button>
        <el-popover
          placement="top-start"
          title="提示"
          width="200"
          trigger="hover"
          v-model="value">
          <span ref="text">点击查看这是什么报表？</span>
          <span slot="reference" class="fa fa-info-circle fa-lg" style="cursor: pointer;outline:none;vertical-align: middle;color: #3b9dd8" @click="showinfo"></span>
        </el-popover>

        <el-button
          type="primary"
          class="margin-bottom-1"
          :loading="search.exportLoading"
          @click="handleExport">
          导出
        </el-button>
      </el-row>

      <el-table
        :data="table.list"
        border
        v-loading="table.loading"
        show-summary
        sum-text="总计"
        style="width: 100%">

        <el-table-column
          v-for="item in table.header" :key="item.id"
          :prop="item.id"
          :label="item.name">
        </el-table-column>

      </el-table>

      <el-pagination
        class="fr"
        style="text-align: right;margin-top: 20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="page.sizes"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>

      <a ref="refDownload" :href="download.href" download></a>
    </div>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import dateFns from 'date-fns'
  export default {
    components: {
      // 'breadcrumb': require('../../../common/breadcrumb.vue')
    },
    mounted () {
      this.getData()
      this.getWorkshopList()
    },
    data () {
      return {
        value: false,
        search: {
          loading: false,
          exportLoading: false,
          startTime: dateFns.format(Date.parse(new Date()) - (24 * 3600000), 'YYYY-MM-DD'),
          overTime: dateFns.format(Date.parse(new Date()) - (24 * 3600000), 'YYYY-MM-DD'),
          workshop: '',
          workshopList: [],
          workshopLoading: false,
          line: '',
          lineList: [],
          lineLoading: false,
          number: '',
          numberList: [],
          numberLoading: false,
          numberTimeOut: ''
        },
        download: {
          href: ''
        },
        table: {
          loading: false,
          header: [],
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
      showinfo () {
        this.$refs.text.innerHTML = '查询中... <i class="fa fa-spinner fa-pulse fa-lg"></i>'
        setTimeout(() => {
          this.value = false
          this.$notify({
            title: '报表信息',
            message: '将染判/更新染判/新增丝锭异常信息的异常数据(每天凌晨3点同步一次)按照条件查询出来'
          })
          this.$refs.text.innerHTML = '这是什么报表？'
        }, 100)
      },
      getData () {
        this.table.loading = true
        api.automatic.statement.getSilkExceptionReport({
          startDate: this.search.startTime ? dateFns.format(this.search.startTime, 'YYYY-MM-DD') : '',
          endDate: this.search.overTime ? dateFns.format(this.search.overTime, 'YYYY-MM-DD') : '',
          workshopId: this.search.workshop,
          lineId: this.search.line,
          batchNo: this.search.number,
          pageIndex: this.page.currentPage,
          pageCount: this.page.size
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.table.header = []
            this.table.list = []
            this.page.total = data.data.count
            this.table.header = data.data.list[0]
            this.$nextTick(() => {
              this.table.list = data.data.list[1]
            })
          }
        }).finally(() => {
          this.table.loading = false
          this.search.loading = false
        })
      },

      /* 获取车间下拉列表 */
      getWorkshopList () {
        this.search.workshopLoading = true
        api.automatic.dictionary.getAllWorkshopList({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.search.workshopList = data.data
          }
        }).finally(() => {
          this.search.workshopLoading = false
        })
      },

      /* 选择车间列表 */
      changeWorkshop (val) {
        this.search.line = ''
        this.search.lineList = []
        if (val) {
          this.getLineList(val)
        }
      },

      /* 获取线别列表 */
      getLineList (val) {
        this.search.lineLoading = true
        api.automatic.productPlan.getAllLine({
          workShopId: val
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            for (let item of data.data) {
              this.search.lineList.push({
                id: item.id,
                name: item.line
              })
            }
          }
        }).finally(() => {
          this.search.lineLoading = false
        })
      },

      /* 获取批号下拉列表 */
      getNumberList (val, cb) {
        clearTimeout(this.search.numberTimeOut)
        this.search.numberTimeOut = setTimeout(() => {
          this.search.numberList = []
          api.automatic.dictionary.fuzzyQueryBatchNo({
            batchNo: val
          }).then(response => {
            const data = response.data
            if (data.messageType === 1) {
              for (let item of data.data) {
                this.search.numberList.push({
                  value: item
                })
              }
              cb(this.search.numberList)
            }
          }).catch(e => {
            cb([])
          })
        }, 800)
      },

      /* 搜索 */
      handleSearch () {
        this.search.loading = true
        this.page.currentPage = 1
        this.getData()
      },

      /* 报表导出 */
      handleExport () {
        this.search.exportLoading = true
        this.download.href = ''
        api.automatic.statement.exportSilkExceptionExcel({
          startDate: this.search.startTime ? dateFns.format(this.search.startTime, 'YYYY-MM-DD') : '',
          endDate: this.search.overTime ? dateFns.format(this.search.overTime, 'YYYY-MM-DD') : '',
          workshopId: this.search.workshop,
          lineId: this.search.line,
          batchNo: this.search.number
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.download.href = data.data
            this.$nextTick(() => {
              this.$refs.refDownload.click()
            })
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.search.exportLoading = false
        })
      },

      /* 分页 */
      handleSizeChange (size) {
        this.page.size = size
        if (this.page.currentPage === 1) {
          this.getData()
        } else {
          this.page.currentPage = 1
        }
      },
      handleCurrentChange (currentPage) {
        this.page.currentPage = currentPage
        this.getData()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .content {
    background: #fff;
    border: 1px solid #dee4ec;
    margin: 10px 10px;
    padding: 10px;
    border-radius: 0 5px 5px 5px;
    .search-box {
    }
  }

  .width-1 {
    width: 240px;
  }

  .margin-right-1 {
    margin-right: 5px;
  }

  .margin-right-2 {
    margin-right: 10px;
  }

  .margin-bottom-1 {
    margin-bottom: 5px;
  }
</style>
