<!--待实验/原始记录-->
<template>
  <div>
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
          <!--<el-tabs v-model="activeName" type="card" @tab-click="handleClick">-->
          <!--<el-tab-pane-->
          <!--:name="item.id"-->
          <!--v-for="(item, index) in tableTabs"-->
          <!--key="index"-->
          <!--:label="item.name"-->
          <!--:key="index">-->
          <!--</el-tab-pane>-->
          <!--</el-tabs>-->
          <div class="fr" style="margin-bottom: 20px">
            <el-input class="search-input" placeholder="请输入批号" v-model="search.batchNumber"></el-input>
            <el-date-picker
              class="search-input search-margin"
              v-model="search.selectTimer"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <el-select v-model="search.labType" placeholder="请选择实验类型" clearable>
              <el-option v-for="item in labTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button @click="searchList" type="primary" :loading="loading.list">查询</el-button>
            <el-button @click="auditingPass" type="primary">当前日期审核通过</el-button>
            <el-button @click="reject" :loading="loading.reject" type="primary">审核驳回</el-button>
          </div>
          <!--<el-table :data="tableData" border v-loading="loading.list" element-loading-text="拼命加载中">-->
          <!--<el-table-column prop="value" label="templateName"></el-table-column>-->
          <!--</el-table>-->
          <div>
            <table class="check_pending_table report-table">
              <template v-for="(items, index) in tableData">
                <tr v-if="index === 0">
                  <!--表头-->
                  <template v-for="(item, itemIndex) in items">
                    <th v-if="itemIndex === 0">
                      <input type="checkbox" v-model="item.isChecked" @click="checkItem(index, itemIndex)" class="input-checkbox"/>
                    </th>
                    <th v-else>{{item.templateName}}</th>
                  </template>
                </tr>
                <tr v-else>
                  <template v-for="(item, subItemIndex) in items">
                    <td v-if="subItemIndex === 0">
                      <!--{{index}}{{subItemIndex}}-->
                      <input type="checkbox" v-model="item.isChecked" @click="checkItem(index, subItemIndex)" class="input-checkbox"/>
                    </td>
                    <td v-else>{{item.value}}</td>
                  </template>
                </tr>
              </template>
            </table>
          </div>
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
  </div>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'storage'

  export default {
    components: {},
    created () {
    },
    data () {
      return {
        defaultSelection: 'departId',
        treeData: [],
        defaultProps: {children: 'labSampleManagementVos', label: 'name'},
        tableTabs: [],
        activeName: '',
        bookDate: '',
        labTypes: [{label: '常规', value: '常规'}, {label: '加样', value: '加样'}],
        search: {
          sampleId: '',
          selectTimer: '',
          batchNumber: '',
          labType: ''
        },
        tableList: {
          name: [],
          value: []
        },
//        templateId: '',
        tableData: [],
        loading: {
          list: false,
          reject: false
        },
        page: {
          current: 1,
          size: 15,
          total: 0
        },
        tableLoading: false,
        firstId: '',
        userInfo: '',
        classData: {
          width: '',
          'overflow-x': 'scroll'
        }
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
//      this.getTabData()
      this.userInfo = storage.getUser()
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
            statusList: ['CHECK_PENDING'],
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
      // 点击树结构data
      handleNodeClick (data, node) {
        if (node.childNodes.length === 0) {
          this.search.sampleId = data.id
          this.getListData()
        }
      },
//      handleClick (tab, event) {
//        console.log(tab, event)
//        this.templateId = tab.name
//        this.getListData()
//        this.search.selectTimer = ''
//        this.search.batchNumber = ''
//      },
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
      handleTabsClick (data) {
        console.log(data)
      },
//      getTabData () { // 获取Tab列表
//        let params = {isAudit: 'Y'}
//        api.physicalLaboratory.labRptTemplateController.getCheckPendingLabTemplateVoList(params).then(response => {
//          const data = response.data
//          if (data.success === true) {
//            this.tableTabs = data.data
//            this.activeName = this.tableTabs[0].id
//            this.templateId = this.activeName
//            this.getListData()
//          }
//          if (data.success === false) {
//            this.$message.error(data.errorMsg)
//            return false
//          }
//        }).catch(error => {
//          console.log(error)
//        }).finally(() => {
//        })
//      },
      // 获取列表数据
      getListData () {
        this.loading.list = true
        let params = {
          queryLabRptRecordCo: {
            batchNumber: this.search.batchNumber,
//            templateId: this.templateId,
            registerDate: new Date(this.search.selectTimer).getTime(),
            labType: this.search.labType,
            sampleId: this.search.sampleId
          },
          page: {
            current: this.page.current,
            length: this.page.size
          }
        }
        api.physicalLaboratory.labRptRecordController.getCheckPendingRptRecordoList(params).then(response => {
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
      auditingPass () {
        if (!this.search.selectTimer) {
          this.$message.error('当前日期为空')
          return
        }
        this.$confirm(`是否通过当前日期审核`, '提示', {
          confirmButtonText: '确定',
          showCancelButton: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              this.loading.list = true
              let params = {
                modifier: this.userInfo.userId,
//                templateId: this.templateId,
                sampleId: this.search.sampleId,
                registerDate: new Date(this.search.selectTimer).getTime()
              }
              api.physicalLaboratory.labRptRecordController.examineAndVerifyRptRecord(params).then(response => {
                const data = response.data
                if (data.success === true) {
                  done()
                  this.getListData()
                  this.$message.success('当前日期审核通过')
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
            } else {
              done()
            }
          }
        }).catch(() => {
        })
      },
      checkItem (index, subindex) {
        this.$nextTick(() => {
          console.log(index, subindex)
          console.log(this.tableData[index][subindex].isChecked)
          if (index === 0) {
            this.tableData.forEach((item, index) => {
              if (index !== 0) {
                this.tableData[index][0].isChecked = this.tableData[0][0].isChecked
              }
            })
          } else {
            let subItems = this.tableData.slice(1)
            this.tableData[0][0].isChecked = subItems.every(item => { return item[0].isChecked })
          }
        })
      },
      reject () {
        let checkedItems = this.tableData.filter(item => {
          return item[0].isChecked && item[0].id !== undefined
        })
        let checkIds = checkedItems.map(item => { return item[0].id })
        console.log(checkIds)
        this.loading.reject = true
        let params = {
          rptRecordIds: checkIds,
          modifier: this.userInfo.userId
        }
        api.physicalLaboratory.labRptRecordController.setAuditRejectedRptRecords(params).then(response => {
          let data = response.data
          if (data.success) {
            this.$message.success('驳回成功')
            this.getListData()
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.reject = false
        })
      }
    }
  }
</script>
<style scoped>
  .select-box {
    width: 200px;
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

  .check_pending_table {
    border: 1px solid #f9f9f9;
    border-radius: 5px;
    min-width: 100%;
  }

  .check_pending_table tr th {
    min-width: 80px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #ccc;
  }

  .report-table {
    background-color: white;
  }

  .check_pending_table tr td {
    min-width: 80px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #ccc
  }

  .input-checkbox {
    width: 24px;
    height: 15px;
  }
</style>
