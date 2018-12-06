<!-- 统计报表 -- 异常报表 -->
<template>
  <div>
    <!--<breadcrumb name-id="020903"></breadcrumb>-->
    <!-- 批号 线别 车间 开始时间和结束时间 这是搜索条件-->
    <div class="content">
      <el-row class="search-box">
        <el-date-picker v-model="search.startTime" class="margin-right-1 margin-bottom-1" type="date" clearable
                        placeholder="开始结算日期"></el-date-picker>

        <el-date-picker v-model="search.overTime" class="margin-right-1 margin-bottom-1" type="date" clearable
                        placeholder="结束结算日期"></el-date-picker>

        <el-select v-model="search.workshop" :loading="search.workshopLoading" clearable placeholder="请选择车间"
                   @change="changeWorkshop"
                   class="margin-right-1 margin-bottom-1">
          <el-option v-for="item in search.workshopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>

        <el-select v-model="search.line" :loading="search.lineLoading" clearable placeholder="请选择线别"
                   class="margin-right-1 margin-bottom-1">
          <el-option v-for="item in search.lineList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>

        <el-autocomplete class="inline-input margin-right-2" clearable v-model="search.number" :fetch-suggestions="getNumberList"
                         placeholder="请输入批号"></el-autocomplete>

        <el-button type="primary" class="margin-bottom-1" :loading="loading.search" @click="handleSearch">查询</el-button>
        <el-popover placement="top-start" title="提示" width="200" trigger="hover" v-model="value">
          <span ref="text">点击查看这是什么报表？</span>
          <span slot="reference" class="fa fa-info-circle fa-lg" style="cursor: pointer;outline:none;vertical-align: middle;color: #3b9dd8" @click="showinfo"></span>
        </el-popover>

        <el-button type="primary" class="margin-bottom-1" :loading="search.exportLoading" @click="handleExport">导出
        </el-button>
      </el-row>

      <div class="ourter-div">
        <table id="table" ref="tableException" class="customized-table"
               v-if="Array.isArray(tableData) && tableData.length > 0 && Array.isArray(tableData[0].filterException)">
          <tbody>
            <tr>
              <th>车间</th>
              <th>线别</th>
              <th>批号</th>
              <th>规格</th>
              <th>产量</th>
              <th v-for="column in tableData[0].filterException">{{column.exceptionName}}</th>
            </tr>
            <tr v-for="row in tableData">
              <td>{{row.workshopName}}</td>
              <td>{{row.lineName}}</td>
              <td>{{row.batchNo}}</td>
              <td>{{row.spec}}</td>
              <td>{{row.produceCount}}</td>
              <td v-for="column in row.filterException">{{column.exceptionCount}}</td>
            </tr>
            <tr>
              <td>总计</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{{ tableData.reduce((pre, curr) => { return pre + parseInt(curr.produceCount) }, 0) }}</td>
              <td v-for="(exc, index) in tableData[0].filterException">
                {{tableData.reduce((pre, curr) => { return pre + ((curr.filterException[index].exceptionCount === '') ? 0 : parseInt(curr.filterException[index].exceptionCount)) }, 0)}}
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="no-data">暂无数据</div>
      </div>

      <a ref="refDownload" :href="download.href" download></a>
    </div>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import dateFns from 'date-fns'
  import {TableExport} from 'tableexport'
  export default {
    components: {},
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
          startTime: dateFns.format(Date.parse(new Date()), 'YYYY-MM-DD'),
          overTime: dateFns.format(Date.parse(new Date()), 'YYYY-MM-DD'),
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
        loading: { search: false },
        tableData: []
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
        this.loading.search = true
        this.tableData = []
        api.automatic.statement.getSilkExceptionDetailReport({
          startDate: this.search.startTime ? dateFns.format(this.search.startTime, 'YYYY-MM-DD') : '',
          endDate: this.search.overTime ? dateFns.format(this.search.overTime, 'YYYY-MM-DD') : '',
          workshopId: this.search.workshop,
          lineId: this.search.line,
          batchNo: this.search.number
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.tableData = this.mergeData(data.data)
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).finally(() => {
          this.loading.search = false
        })
      },

      // 合并数据
      mergeData (list) {
        let filterList = []
        let filterExceptionSet = new Set()
        list.forEach(data => {
          // 过滤异常类型
          if (data.hasOwnProperty('exceptionName')) {
            filterExceptionSet.add(data.exceptionName)
          }
          // 根据线别，批号，规格过滤
          if (!filterList.find(res => {
            return data.lineId === res.lineId && data.batchNo === res.batchNo && data.spec === res.spec
          })) {
            filterList.push(data)
          }
        })

        filterList.forEach(res => {
          let filterException = Array.from(filterExceptionSet).map(item => {
            return { exceptionName: item, exceptionCount: '' }
          })
          res = Object.assign(res, { filterException })
        })
        filterList.forEach(l => {
          l.filterException.forEach(except => {
            list.forEach(data => {
              if (data.hasOwnProperty('exceptionName') &&
                data.lineId === l.lineId &&
                data.batchNo === l.batchNo &&
                data.spec === l.spec &&
                data.exceptionName === except.exceptionName) {
                except.exceptionCount = data.exceptionCount
              }
            })
          })
        })
        return filterList
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
        this.getData()
      },

      /* 报表导出 */
      handleExport () {
        if (this.tableData.length > 0) {
          let instance = new TableExport(this.$refs.tableException, {
            formats: ['xlsx'],
            filename: '异常报表',
            exportButtons: false,
            charset: 'GBK'
          })
          let exportData = instance.getExportData()['table']['xlsx']
          instance.export2file(exportData.data, exportData.mimeType, exportData.filename, exportData.fileExtension)
        }
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
  .ourter-div {
    overflow-x: auto;
  }
  .check_pending_table {
    border: 1px solid #f9f9f9;
    border-radius: 5px;
    min-width: 100%;
  }
</style>
