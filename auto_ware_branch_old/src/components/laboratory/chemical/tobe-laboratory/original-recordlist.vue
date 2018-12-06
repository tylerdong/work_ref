<!--待实验/原始记录-->
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
          <el-tree class="select-box" v-loading="tableLoading" :data="treeData" :props="defaultProps"
                   @node-click="handleNodeClick"></el-tree>
        </aside>
      </div>
      <div class="main-right">
        <div class="hy-admin__search-main cf">
          <div class="fr">
            <el-form :inline="true">
              <el-form-item>
                <el-input class="search-input" placeholder="请输入采样点" v-model="search.sampPoint"></el-input>
              </el-form-item>
              <el-form-item>
                <el-date-picker
                  class="search-input search-margin"
                  v-model="search.startTime"
                  type="date"
                  placeholder="请选择开始日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-date-picker
                  class="search-input search-margin"
                  v-model="search.endTime"
                  type="date"
                  placeholder="选择结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button @click="searchList" type="primary">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin-top: 4rem; width: 100%;">
            <el-tab-pane
              :name="item.id"
              v-for="(item, index) in tableTabs"
              key="index"
              :label="item.name"
              :key="index"
              style="background-color: #fff;">
            </el-tab-pane>
          </el-tabs>
          <el-table :data="tableData" border v-loading="loading.list" style="overflow-x: auto" element-loading-text="拼命加载中">
            <el-table-column prop="taskId" label="编号"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                {{ scope.row.status | toStatus }}
              </template>
            </el-table-column>
            <el-table-column prop="samplingPosition" label="采样点"></el-table-column>
            <el-table-column prop="sampler" label="采样人"></el-table-column>
            <el-table-column prop="samplingDate" label="采样时间"></el-table-column>
            <el-table-column prop="register" label="登记人"></el-table-column>
            <el-table-column label="登记时间">
              <template slot-scope="scope">
                {{ scope.row.registerDate | timeFormat('YYYY-MM-DD HH:mm') }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="165">
              <template slot-scope="scope">
                <el-button @click="cancel(scope)" type="text" size="small">取消</el-button>
                <el-button @click="doExperiment(scope)" type="text" size="small">实验</el-button>
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
    <dialog-do-experiment ref="refDoExperiment" @initExperiment="initExperiment"></dialog-do-experiment>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'storage'

  export default {
    components: {
      'dialog-do-experiment': require('./dialog-do-experiment.vue')
    },
    created () {
    },
    data () {
      return {
        tableTabs: [],
        defaultSelection: 'departId',
        dept: 'dept',
        classify: 'classify',
        activeName: '',
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
        firstId: '',
        userInfo: ''
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
      this.userInfo = storage.getUser()
      this.getTreeData()
    },
    computed: {},
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
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
        console.log(data)
      },
      // 初始化实验数据
      initExperiment () {
        this.getTreeData()
        this.getListData()
      },
      getTreeData () { // 获取树结构
        this.tableLoading = true
        let params = {
          queryLabOriginalPendingExperimentCo: {
            startRegisterDate: new Date(this.search.startTime).getTime(),
            endRegisterDate: new Date(this.search.endTime).getTime(),
            samplingPosition: this.search.sampPoint,
            isGuideSample: 'N'
          },
          type: this.defaultSelection
        }
        api.chemicalLaboratory.LabOriginalPendingExperiment.getLabOriginalPendingGroupVo(params).then(response => {
          const data = response.data
          if (data.success === true) {
            if (!data.data) {
              this.treeData = []
              this.treeData[0].name = '暂无数据'
              console.log(this.treeData)
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
      getTabData () { // 获取Tab列表
        let params = {
          queryLabOriginalPendingExperimentCo: {
            sampleId: this.search.sampleId,
            samplingPosition: this.search.sampPoint,
            startRegisterDate: new Date(this.search.startTime).getTime(),
            endRegisterDate: new Date(this.search.endTime).getTime(),
            isGuideSample: 'N'
          }
        }
        console.log(params)
        api.chemicalLaboratory.LabOriginalPendingExperiment.getLabTemplateVoBySampleId(params).then(response => {
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
        })
      },
      getListData () { // 获取列表结构
        this.loading.list = true
        let params = {
          queryLabOriginalPendingExperimentCo: {
            sampleId: this.search.sampleId,
            startRegisterDate: new Date(this.search.startTime).getTime(),
            endRegisterDate: new Date(this.search.endTime).getTime(),
            samplingPosition: this.search.sampPoint,
            templateId: this.templateId,
            isGuideSample: 'N'
          },
          page: {
            current: this.page.current,
            length: this.page.size
          }
        }
        api.chemicalLaboratory.LabOriginalPendingExperiment.getLabOriginalPendingExperimentDoListBySampleId(params).then(response => {
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
      cancel (data) {
        this.$confirm(`取消该实验会导致该实验无法继续,您确定要取消吗？`, '提示', {
          confirmButtonText: '确定',
          showCancelButton: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              let params = {
                modifier: this.userInfo.userId,
                id: data.row.id
              }
              api.chemicalLaboratory.LabOriginalPendingExperiment.cancelLabOriginalPendingExperimentDo(params).then(response => {
                const data = response.data
                if (data.success === true) {
                  done()
                  this.$message.success('取消成功')
                  this.getTreeData()
                  this.getTabData()
                  return true
                } else {
                  this.$message.error('错误')
                }
              }).finally(() => {
                instance.confirmButtonLoading = false
              })
            } else {
              done()
            }
          }
        }).catch(() => {
        })
      },
      doExperiment (data) {
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
