<!--待实验/原始记录-->
<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="flex-div-row">
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
        <div class="flex-div-column hy-admin__search-main cf" :style="classData">
          <div class="fr">
            <el-input class="search-input" placeholder="请输入条码号" v-model="search.barCode"></el-input>
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
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin-top: 20px; width: 100%;">
            <el-tab-pane
              :name="item.id"
              v-for="(item, index) in tableTabs"
              key="index"
              :label="item.name"
              :key="index"
              style="background-color: #fff;">
            </el-tab-pane>
          </el-tabs>
          <el-table :data="tableData" border v-loading="loading.list" element-loading-text="拼命加载中">
            <el-table-column prop="labType" label="类型" width="80"></el-table-column>
            <el-table-column prop="barCode" label="条码号" width="120"></el-table-column>
            <el-table-column prop="batchNumber" label="批号" width="100"></el-table-column>
            <el-table-column prop="spec" label="规格" width="70"></el-table-column>
            <el-table-column prop="productLine" label="产线" width="70"></el-table-column>
            <el-table-column prop="item" label="位号" width="70"></el-table-column>
            <el-table-column prop="fallTime" label="落次" width="70"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">{{ scope.row.status | toStatus }}</template>
            </el-table-column>
            <el-table-column prop="sampler" label="采样人" width="200"></el-table-column>
            <el-table-column label="时间" width="180">
              <template slot-scope="scope">{{ scope.row.registerDate | timeFormat('YYYY-MM-DD HH:mm') }}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="importData(scope)" type="text" size="small">导入</el-button>
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
    <dialog-data-import ref="refDoImportData"></dialog-data-import>
  </div>
</template>
<script>
  import * as api from 'src/api'

  export default {
    components: {
      'dialog-data-import': require('./dialog-import-side.vue')
    },
    created () {
    },
    data () {
      return {
        tableTabs: [],
        defaultSelection: 'departId',
        activeName: '',
        search: {
          startTime: '',
          endTime: '',
          barCode: '',
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
        classData: { 'overflow-x': 'scroll' }
      }
    },
    props: {},
    filters: {
      toStatus (value) {
        if (value === 'PROCESSING') {
          return '进行中'
        } else if (value === 'CHECK_PENDING') {
          return '待审核'
        } else if (value === 'COMPLETED') {
          return '已完成'
        } else if (value === 'CANCEL') {
          return '取消'
        }
      }
    },
    mounted () {
      this.getTreeData()
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
          this.getTabData()
        }
      },
      handleTabsClick (data) {
      },
      getTreeData () { // 获取树结构
        this.tableLoading = true
        let params = {
          queryLabOriginalPendingExperimentCo: {
            startRegisterDate: new Date(this.search.startTime).getTime(),
            endRegisterDate: new Date(this.search.endTime).getTime(),
            barCode: this.search.barCode,
            statusList: ['PROCESSING', 'CHECK_PENDING']
          },
          type: this.defaultSelection
        }
        api.physicalLaboratory.LabOriginalPendingExperiment.getLabOriginalPendingGroupVo(params).then(response => {
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
      // 获取Tab列表
      getTabData () {
        this.loading.list = true
        let params = {
          queryLabOriginalPendingExperimentCo: {
            sampleId: this.search.sampleId,
            barCode: this.search.barCode,
            startRegisterDate: new Date(this.search.startTime).getTime(),
            endRegisterDate: new Date(this.search.endTime).getTime(),
            statusList: ['PROCESSING', 'CHECK_PENDING']
          }
        }
        api.physicalLaboratory.LabOriginalPendingExperiment.getLabTemplateVoBySampleId(params).then(response => {
          const data = response.data
          if (data.success === true) {
            this.tableTabs = data.data
            this.activeName = this.tableTabs[0].id
            this.templateId = this.activeName
            this.getListData()
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
      // 获取列表结构
      getListData () {
        this.loading.list = true
        let params = {
          queryLabOriginalPendingExperimentCo: {
            sampleId: this.search.sampleId,
            startRegisterDate: new Date(this.search.startTime).getTime(),
            endRegisterDate: new Date(this.search.endTime).getTime(),
            barCode: this.search.barCode,
            templateId: this.templateId,
            statusList: ['PROCESSING', 'CHECK_PENDING']
          },
          page: {
            current: this.page.current,
            length: this.page.size
          }
        }
        api.physicalLaboratory.LabOriginalPendingExperiment.getLabOriginalPendingExperimentDoListBySampleId(params).then(response => {
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
        this.tableTabs = []
      },
      importData (data) {
        this.$refs.refDoImportData.show(data.row)
      }
    }
  }
</script>
<style scoped>
  .left-tree {
    border-right: 1px solid #dee4ec;
  }

  .flex-div-row {
    display: flex;
    flex-direction: row;
  }

  .flex-div-column {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
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
