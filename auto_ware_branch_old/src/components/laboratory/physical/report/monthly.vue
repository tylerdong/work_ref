<template>
  <div ref="container">
    <div class="hy-admin__main-container">
      <div class="flex-div-row">
        <!--树形结构-->
        <aside>
          <div class="select-box">
            <el-select v-model="defaultSelection" placeholder="请选择" @change="getTreeData">
              <el-option label="按部门显示" value="departId"></el-option>
              <el-option label="按样品分类显示" value="groupId"></el-option>
            </el-select>
          </div>
          <el-tree class="select-box" v-loading="tableLoading" :data="treeData" :props="defaultProps"
                   @node-click="handleNodeClick"></el-tree>
        </aside>
        <div class="flex-div-column hy-admin__search-main cf" ref="container" :style="classData">
          <div class="hy-admin__search-main cf">
            <!--<el-tabs v-model="activeName" type="card" @tab-click="handleClick" :loading="loading.tabSearch">-->
            <!--<el-tab-pane :name="item.id" v-for="(item, index) in tableTabs" :key="index"-->
            <!--:label="item.name"></el-tab-pane>-->
            <!--</el-tabs>-->
            <div class="search-div">
              <el-date-picker class="search-input search-margin" v-model="search.selectTimer" type="date"
                              placeholder="请选择开始日期"></el-date-picker>
              <el-select v-model="search.labType" placeholder="请选择实验类型" clearable>
                <el-option v-for="item in labTypes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-button @click="searchList" type="primary" :loading="loading.tableSearch">查询</el-button>
              <el-button type="primary" @click="exportDownload" :loading="loading.download">导出</el-button>
              <a ref="refDownload" :href="downloadHref"></a>
            </div>
            <div class="report-table">
              <table v-if="tableData && tableData.tileVos && tableData.labRptGroupVos" border="0" cellspacing="0"
                     cellpadding="1">
                <tr>
                  <template v-for="col in tableData.tileVos">
                    <td colspan="2" v-if="col.spec === true">{{col.nodeName}}</td>
                    <td rowspan="2" v-else>{{col.nodeName}}</td>
                  </template>
                </tr>
                <tr>
                  <template v-for="subCol in tableData.tileVos.filter(item => { return item.spec === true })">
                    <td>上月</td>
                    <td>本月</td>
                  </template>
                </tr>
                <tr v-for="data in tableData.labRptGroupVos">
                  <td>{{data.orderNumber}}</td>
                  <td>{{data.batchNumber}}</td>
                  <td>{{data.spec}}</td>
                  <td>{{data.centerValue === undefined ? '' : data.centerValue}}</td>
                  <template v-for="labRptNodeNeedGroupVos in data.labRptNodeNeedGroupVos">
                    <td>{{labRptNodeNeedGroupVos.preValue}}</td>
                    <td>{{labRptNodeNeedGroupVos.value}}</td>
                  </template>
                </tr>
              </table>
              <div class="no-data" v-else="">没有数据</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import dateFns from 'date-fns'

  export default {
    components: {},
    created () {
    },
    data () {
      return {
        defaultSelection: 'departId',
        treeData: [],
        defaultProps: {children: 'labSampleManagementVos', label: 'name'},
        tableLoading: false,
        tableTabs: [],
        activeName: '',
        classData: {
          width: '',
          'overflow-x': 'auto'
        },
        downloadHref: '',
        tableData: {},
        page: {
          current: 1,
          size: 15,
          total: 0
        },
        labTypes: [{label: '常规', value: '常规'}, {label: '加样', value: '加样'}],
        search: {
//          templateId: '',
          sampleId: '',
          selectTimer: new Date(),
          batchNumber: '',
          labType: ''
        },
        loading: {
          tableSearch: false,
          tabSearch: false,
          download: false
        }
      }
    },
    props: {},
    mounted () {
//      this.getTabData()
      this.classData.width = `${this.$refs.container.getBoundingClientRect().width + 2}px`
      this.getTreeData()
    },
    computed: {},
    methods: {
      // 获取树结构
      getTreeData () {
        this.tableLoading = true
        let params = {
          queryLabRptRecordCo: {
            startRegisterDate: new Date(this.search.startTime).getTime(),
            endRegisterDate: new Date(this.search.endTime).getTime(),
            samplingPosition: this.search.sampPoint,
            statusList: ['COMPLETED'],
            labType: this.search.labType
          },
          type: this.defaultSelection
        }
        api.physicalLaboratory.labRptRecordController.getLabSampleManagementGroupVoByProcessingRptRecords(params).then(response => {
          const data = response.data
          if (data.success === true) {
            if (!data.data) {
              this.treeData = []
              this.treeData[0].name = '暂无数据'
              return
            }
            this.treeData = data.data
            return true
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.tableLoading = false
        })
      },
      // 点击树结构data
      handleNodeClick (data, node) {
        if (node.childNodes.length === 0) {
          this.search.sampleId = data.id
//          this.getTabData()
          this.getListData()
        }
      },
      // 获取Tab列表
//      getTabData () {
//        this.loading.tabSearch = true
//        let params = {isAudit: ''}
//        api.physicalLaboratory.labRptTemplateController.getCheckPendingLabTemplateVoList(params).then(response => {
//          const data = response.data
//          if (data.success) {
//            this.tableTabs = data.data
//            this.activeName = this.tableTabs[0].id
//            this.templateId = this.activeName
//            this.searchList()
//          }
//        }).catch(error => {
//          console.log(error)
//        }).finally(() => {
//          this.loading.tabSearch = false
//        })
//      },
      exportDownload () {
        this.loading.download = true
//        let downHref = 'templateId=' + this.templateId
        let downHref = ''
        if (this.search.sampleId) {
          downHref += 'sampleId=' + this.search.sampleId
        } else {
          downHref += 'sampleId='
          this.$message.error('没有选择样品')
          return
        }
        if (this.search.selectTimer) {
          downHref += '&groupDate=' + dateFns.format(this.search.selectTimer, 'YYYY-MM-DD')
        } else {
          downHref += '&groupDate='
        }
        downHref += '&labType=' + this.search.labType
        this.downloadHref = window.global.physicalAjaxBaseUrl + 'api/lab/report/labRptRecordController/exportMonthExcelLabRptGroupVo?' + downHref
        this.$nextTick(() => {
          this.$refs.refDownload.click()
          this.loading.download = false
        })
      },
//      handleClick (tab, event) {
//        this.templateId = tab.name
//      },
      searchList () {
        this.getTreeData()
        this.tableData = []
        this.tableTabs = []
      },
      // 获取列表结构
      getListData () {
        this.loading.tableSearch = true
        let params = {
          queryLabRptRecordCo: {
//            templateId: this.templateId,
            groupDate: new Date(this.search.selectTimer).getTime(),
            labType: this.search.labType,
            sampleId: this.search.sampleId
          },
          page: {
            current: this.page.current,
            length: this.page.size
          }
        }
        api.physicalLaboratory.labRptRecordController.getMonthExcelLabRptGroupVo(params).then(response => {
          // 数据
          this.tableData = response.data.data
          console.log(this.tableData)
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading.tableSearch = false
        })
      },
      /* 分页 */
      pageSizeChange (size) {
        this.page.size = size
        if (this.page.current === 1) {
          this.searchList()
        } else {
          this.page.current = 1
        }
      },
      pageCurrentChange (current) {
        this.page.current = current
        this.searchList()
      }
    }
  }
</script>
<style scoped>
  .search-div {
    margin-bottom: 10px;
  }

  .flex-div-row {
    display: flex;
    flex-direction: row;
  }

  .flex-div-column {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    width: 100%;
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
    border-color: #666666;
    background-color: #dedede;
    text-align: center;
  }

  table td {
    border-width: 1px;
    padding: 3px;
    border-style: solid;
    border-color: #666666;
    background-color: #ffffff;
    text-align: center;
  }

  .no-data {
    width: 100%;
    text-align: center;
  }
</style>
