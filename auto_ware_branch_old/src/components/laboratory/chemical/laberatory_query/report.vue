<!--实验查询/报告单-->
<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="main-left">
        <aside>
          <div class="select-box">
            <el-select v-model="defaultSelection" placeholder="请选择" @change="getTreeData">
              <el-option label="按部门显示" value="departId"></el-option>
              <el-option label="按样品分类显示" value="groupId"></el-option>
            </el-select>
          </div>
          <el-tree class="select-box" v-loading="tableLoading" :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </aside>
      </div>
      <div class="main-right">
        <div class="flex-div-column hy-admin__search-main cf">
          <div class="fr">
            <el-input class="search-input" placeholder="请输入采样点" v-model="search.sampPoint"></el-input>
            <el-date-picker
              class="search-input search-margin"
              v-model="search.startTime"
              type="date"
              placeholder="请选择开始日期">
            </el-date-picker>
            <el-date-picker
              class="search-input search-margin"
              v-model="search.endTime"
              type="date"
              placeholder="选择结束日期">
            </el-date-picker>
            <el-button @click="searchList" type="primary">查询</el-button>
          </div>
          <el-table :data="tableData" border v-loading="loading.list" element-loading-text="拼命加载中"
                    style="margin-top: 20px; width: 100%">
            <el-table-column prop="taskId" label="编号"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="samplingPosition" label="采样点"></el-table-column>
            <el-table-column prop="sampler" label="采样人"></el-table-column>
            <el-table-column prop="samplingDate" label="采样时间"></el-table-column>
            <el-table-column prop="originalRecordCount" label="实验项目数"></el-table-column>
            <el-table-column prop="completeOriginalRecordCount" label="已完成项目数"></el-table-column>
            <el-table-column label="发布状态">
              <template slot-scope="scope">
                {{ scope.row.status | toStatus }}
              </template>
            </el-table-column>
            <el-table-column prop="register" label="登记人"></el-table-column>
            <el-table-column label="登记时间">
              <template slot-scope="scope">
                {{ scope.row.registerDate | timeFormat('YYYY-MM-DD HH:mm') }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button @click="report(scope)" type="text" size="small" v-show="scope.row.status === 'COMPLETED'">报告单</el-button>
                <el-button @click="originRecord(scope)" type="text" size="small" v-show="scope.row.status === 'COMPLETED'">原始记录单</el-button>
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
        </div>
      </div>
    </div>
    <dialog-report ref="report"></dialog-report>
    <dialog-recordlist ref="recordList"></dialog-recordlist>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    components: {
      'dialog-report': require('./dialog-report.vue'),
      'dialog-recordlist': require('./dialog-original-record.vue')
    },
    created () {},
    data () {
      return {
        defaultSelection: 'departId',
        dept: 'dept',
        classify: 'classify',
        bookDate: '',
        search: {
          startTime: '',
          endTime: '',
          sampPoint: '',
          sampleId: ''
        },
        templateId: '',
        treeData: [],
        defaultProps: {
          children: 'labSampleManagementVos',
          label: 'name'
        },
        tableData: [],
        loading: {
          list: false
        },
        page: {
          current: 1,
          size: 15,
          total: 0
        },
        tableLoading: false,
        firstId: ''
      }
    },
    props: {},
    mounted () {
      this.getTreeData()
    },
    filters: {
      toStatus (value) {
        if (value === 'PROCESSING') {
          return '进行中'
        } else if (value === 'COMPLETED') {
          return '完成'
        } else if (value === 'CANCEL') {
          return '取消'
        }
      }
    },
    computed: {},
    methods: {
      handleClick (tab, event) {
        this.templateId = tab.name
        this.getListData()
      },
      /* 分页 */
      pageSizeChange (size) {
        this.page.size = size
        if (this.page.current === 1) {
          this.getListData()
        } else {
          this.page.current = 1
        }
      },
      pageCurrentChange (current) {
        this.page.current = current
        this.getListData()
      },
      handleNodeClick (data, node) { // 树结构data
        if (node.childNodes.length === 0) {
          this.search.sampleId = data.id
          this.getListData()
        }
      },
      handleTabsClick (data) {
        console.log(data)
      },
      report (data) {
        this.$refs.report.show(data)
      },
      originRecord (data) {
        this.$refs.recordList.show(data)
      },
      getTreeData () { // 获取树结构
        this.tableLoading = true
        let params = {
          type: this.defaultSelection,
          queryLabRptRecordCo: {
            startRegisterDate: new Date(this.search.startTime).getTime(),
            endRegisterDate: new Date(this.search.endTime).getTime(),
            samplingPosition: this.search.sampPoint
          }
        }
        api.chemicalLaboratory.labRptRecordController.getLabSampleManagementGroupVoByCompletedRptRecords(params).then(response => {
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
      getListData () { // 获取列表结构
        this.loading.list = true
        let params = {
          queryLabRptRecordCo: {
            sampleId: this.search.sampleId,
            startRegisterDate: new Date(this.search.startTime).getTime(),
            endRegisterDate: new Date(this.search.endTime).getTime(),
            samplingPosition: this.search.sampPoint
          },
          page: {
            current: this.page.current,
            length: this.page.size
          }
        }
        api.chemicalLaboratory.labRptRecordController.getLabRptRecordDoList4Completed(params).then(response => {
          const data = response.data
          if (data.success === true) {
            if (!data.data) {
              this.tableData = []
              return
            }
            this.tableData = data.data.data
            this.page.total = data.data.count
            return true
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading.list = false
        })
      },
      searchList () {
        this.getTreeData()
        this.tableData = []
      },
      cancel (data) {
      },
      doExperiment (data) {
        Object.assign(data, {title: '实验11'})
        this.$refs.refDoExperiment.show(data)
      }
    }
  }
</script>
<style scoped>
  .left-tree {
    border-right: 1px solid #dee4ec;
  }

  .main-left {
    width: 15%;
    float: left;
    /*margin: 10px;*/
  }

  .main-right {
    width: 82%;
    float: right;
    overflow-x: auto;
    /*margin: 10px;*/
  }

  .select-box {
    width: 16rem;
  }
  .el-tabs__item {
    background-color: #eeeff2;
    border-color: #dae1e9;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    background-color: #fff;
    color: #34799e;
    border-top: #3a98d0;
  }
</style>

