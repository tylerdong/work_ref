<!--待实验/报告单-->
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
          <el-tree class="select-box" v-loading="tableLoading" :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </aside>
        <div class="flex-div-column hy-admin__search-main cf">
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
            <el-select v-model="search.labType" placeholder="请选择实验类型">
              <el-option v-for="item in labTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button @click="searchList" type="primary">查询</el-button>
          </div>
          <el-table :data="tableData" border v-loading="loading.list" element-loading-text="拼命加载中" style="margin-top: 20px">
            <el-table-column prop="labType" label="类型" width="100"></el-table-column>
            <el-table-column prop="barCode" label="条码号" width="180"></el-table-column>
            <el-table-column prop="batchNumber" label="批号" width="120"></el-table-column>
            <el-table-column prop="spec" label="规格（dtex/f）"></el-table-column>
            <el-table-column prop="productLine" label="产线" width="80"></el-table-column>
            <el-table-column prop="item" label="位号" width="80"></el-table-column>
            <el-table-column prop="fallTime" label="落次" width="80"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                {{ scope.row.status | toStatus }}
              </template>
            </el-table-column>
            <el-table-column prop="sampler" label="采样人"></el-table-column>
            <el-table-column label="取样时间" >
              <template slot-scope="scope">
                {{ scope.row.registerDate | timeFormat('YYYY-MM-DD HH:mm') }}
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button v-if="scope.row.status === 'COMPLETED'" @click="doExperiment(scope)" type="text" size="small" :loading="loading.doExperiment">查看</el-button>
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
    <dialog-view-experiment ref="refPublishExperiment" @searchListData="getListData"></dialog-view-experiment>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'storage'
  export default {
    components: {
      'dialog-view-experiment': require('./dialog-view-experiment.vue')
    },
    created () {},
    data () {
      return {
        labTypes: [{label: '常规', value: '常规'}, {label: '加样', value: '加样'}],
        defaultSelection: 'departId',
        dept: 'dept',
        classify: 'classify',
        activeName: 'first',
        bookDate: '',
        search: {
          startTime: '',
          endTime: '',
          barCode: '',
          sampleId: '',
          labType: ''
        },
        treeData: [],
        defaultProps: {
          children: 'labSampleManagementVos',
          label: 'name'
        },
        tableData: [],
        loading: {
          list: false,
          cancel: false,
          doExperiment: false
        },
        page: {
          current: 1,
          size: 15,
          total: 0
        },
        tableLoading: false,
        templateId: '',
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
      getTreeData () {
        this.tableLoading = true
        let params = {
          type: this.defaultSelection,
          queryLabRptRecordCo: {
            startRegisterDate: new Date(this.search.startTime).getTime(),
            endRegisterDate: new Date(this.search.endTime).getTime(),
            barCode: this.search.barCode,
            statusList: ['COMPLETED', 'CANCEL'],
            labType: this.search.labType
          }
        }
        api.physicalLaboratory.labRptRecordController.getLabSampleManagementGroupVoByProcessingRptRecords(params).then(response => {
          const data = response.data
          if (data.success === true) {
            if (!data.data) {
              this.treeData = []
              this.treeData[0].name = '暂无数据'
              return
            }
            this.tableData = []
            this.page.total = 0
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
            barCode: this.search.barCode,
            statusList: ['COMPLETED', 'CANCEL'],
            labType: this.search.labType
          },
          page: {
            current: this.page.current,
            length: this.page.size
          }
        }
        api.physicalLaboratory.labRptRecordController.getLabRptRecordDoList4Processing(params).then(response => {
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
//        this.getListData(null)
      },
      cancel (data) {
        this.$confirm(`是否取消？`, '提示', {
          confirmButtonText: '确定',
          showCancelButton: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              this.loading.cancel = true
              instance.confirmButtonLoading = true
              let params = {
                modifier: this.userInfo.userId,
                id: data.row.id
              }
              api.physicalLaboratory.labRptRecordController.cancelRptRecord(params).then(response => {
                const data = response.data
                if (data.success === true) {
                  done()
                  this.$message.success('取消成功')
                  this.getTreeData()
                  this.getListData()
                  return true
                } else {
                  this.$message.error(response.data.errorMsg)
                }
              }).finally(() => {
                instance.confirmButtonLoading = false
                this.loading.cancel = false
              })
            } else {
              done()
            }
          }
        }).catch(() => {
        })
      },
      handleNodeClick (data, node) { // 树结构data
        if (node.childNodes.length === 0) {
          this.search.sampleId = data.id
          this.getListData(this.search.sampleId)
        }
      },
      doExperiment (data) {
        this.$refs.refPublishExperiment.show(data)
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
    width: 100%;
  }

  .select-box {
    width: 16rem;
  }

  .fr-bottow {
    margin-bottom: 1rem;
  }
</style>
