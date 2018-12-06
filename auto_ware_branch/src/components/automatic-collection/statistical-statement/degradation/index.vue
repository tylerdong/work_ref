<!-- 统计报表 -- 异常报表 -->
<template>
  <div>
    <!--<breadcrumb name-id="020903"></breadcrumb>-->
    <!-- 批号 线别 车间 开始时间和结束时间 这是搜索条件-->
    <div class="content">
      <el-row class="search-box">
        <el-date-picker v-model="search.startTime" class="margin-right-1 margin-bottom-1" type="month"
                        placeholder="选择月">
        </el-date-picker>
        <el-select v-model="search.workshop" clearable placeholder="请选择车间" class="margin-right-1 margin-bottom-1">
          <el-option v-for="item in search.workshopList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-button type="primary" class="margin-bottom-1" :loading="loading.search" @click="handleSearch">查询</el-button>
        <el-popover
          placement="top-start"
          title="提示"
          width="200"
          trigger="hover"
          v-model="value">
          <span ref="text">点击查看这是什么报表？</span>
          <span slot="reference" class="fa fa-info-circle fa-lg" style="cursor: pointer;outline:none;vertical-align: middle;color: #3b9dd8" @click="showinfo"></span>
        </el-popover>
        <el-button type="primary" class="margin-bottom-1" :loading="search.exportLoading" @click="handleExport">导出
        </el-button>
        <a ref="refDownload" :href="download.href"></a>
      </el-row>

      <table v-if="tableData">
        <tbody>
        <tr>
          <td rowspan="2">车间</td>
          <td rowspan="2">批号</td>
          <td rowspan="2">规格</td>
          <td rowspan="2">总只数</td>
          <td colspan="2" style="width: 8%">染色</td>
          <td colspan="3">重量降等只数</td>
          <td>只数</td>
          <td colspan="2">染色</td>
        </tr>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>A</td>
          <td>B</td>
          <td>C</td>
          <td>去除重量降等只数</td>
          <td>1次判降千分之比</td>
          <td>2次判降千分之比</td>
        </tr>
        <template v-for="(data, index) in tableData">
          <template v-for="(list, rowIndex) in data.list">
            <tr>
              <td v-if="rowIndex === 0" :rowspan="data.list.length">{{data.workshopName}}</td>
              <td>{{list.batchNo}}</td>
              <td>{{list.spec}}</td>
              <td>{{list.amout}}</td>
              <td>{{list.sentenceOneNum}}</td>
              <td>{{list.sentenceTwoNum}}</td>
              <td>{{list.gradeDownNumA}}</td>
              <td>{{list.gradeDownNumB}}</td>
              <td>{{list.gradeDownNumC}}</td>
              <td>{{list.surplusNum}}</td>
              <td>{{list.sentenceOneRate}}</td>
              <td>{{list.sentenceTwoRate}}</td>
            </tr>
          </template>
        </template>
        </tbody>
      </table>
      <div v-else>没有数据</div>

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
          startTime: dateFns.format(Date.parse(new Date()) - (24 * 3600000), 'YYYY-MM'),
          workshop: '',
          workshopList: []
        },
        loading: {
          search: false,
          handleExport: false
        },
        download: { href: '' },
        tableData: [],
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
            message: '将落筒赋码产生的丝锭数据根据线别/批号/规格分组(每天凌晨2点同步一次)按照条件查询出来'
          })
          this.$refs.text.innerHTML = '这是什么报表？'
        }, 100)
      },
      getData () {
        this.loading.search = true
        let params = {
          dateMonth: this.search.startTime ? dateFns.format(this.search.startTime, 'YYYY-MM') : '',
          workshopId: this.search.workshop,
          pageIndex: this.page.currentPage,
          pageCount: this.page.size
        }
        api.automatic.statement.getSentenceRateReport(params).then(response => {
          this.tableData = response.data.data.list
          console.log(this.tableData)
          this.page.total = response.data.data.count
        }).finally(() => {
          this.loading.search = false
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

      /* 搜索 */
      handleSearch () {
        this.search.loading = true
        this.page.currentPage = 1
        this.getData()
      },

      /* 导出 */
      handleExport () {
        this.search.exportLoading = true
        this.download.href = ''
        let params = {
          dateMonth: this.search.startTime ? dateFns.format(this.search.startTime, 'YYYY-MM') : '',
          workshopId: this.search.workshop,
          pageIndex: this.page.currentPage,
          pageCount: this.page.size
        }
        api.automatic.statement.exportSentenceRateReport(params).then(response => {
          this.search.exportLoading = false
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

  table {
    color: #333333;
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
    width: 100%;
  }

  table th {
    border-width: 1px;
    padding: 3px;
    border-style: solid;
    border-color: rgb(209, 219, 229);
    background-color: #dedede;
    text-align: center;
  }

  table td {
    border-width: 1px;
    padding: 3px;
    border-style: solid;
    border-color: rgb(209, 219, 229);
    background-color: #ffffff;
    text-align: center;
  }
</style>
