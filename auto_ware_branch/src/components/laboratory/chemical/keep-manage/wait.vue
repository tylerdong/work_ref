<!--留样管理/未处理-->
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
          <el-tree class="select-box" v-loading="tableLoading" :data="treeData" :props="defaultProps" key="index" @node-click="handleNodeClick"></el-tree>
        </aside>
        <div class="flex-div-column hy-admin__search-main cf">
          <div class="fr">
            <el-input class="search-input" v-model="search.samplPiont" placeholder="请输入采样点"></el-input>
            <el-date-picker
              class="search-input search-margin"
              v-model="search.startTime"
              type="date"
              placeholder="开始日期">
            </el-date-picker>
            <span class="search-margin">至</span>
            <el-date-picker
              class="search-input search-margin"
              v-model="search.endTime"
              type="date"
              placeholder="结束日期">
            </el-date-picker>
            <el-button @click="searchList" type="primary">查询</el-button>
            <el-button @click="handleClick" type="primary">处理</el-button>
          </div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            border
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
            v-loading="loading.list"
            style="width: 100%;margin-top: 20px;">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="taskId"
              label="样品编号">
            </el-table-column>
            <el-table-column
              prop="name"
              label="名称">
            </el-table-column>
            <el-table-column
              prop="samplingPosition"
              label="采样点">
            </el-table-column>
            <el-table-column
              prop="samplingDate"
              label="采样时间">
            </el-table-column>
            <el-table-column
              prop="expDate"
              label="保留周期（天）">
            </el-table-column>
            <el-table-column label="剩余周期（天)">
              <template slot-scope="scope">
                {{
                Math.ceil(((new Date(scope.row.samplingDate).getTime() + scope.row.expDate * 86400000) - new Date().getTime()) / 86400000) >= 0
                  ?
                Math.ceil(((new Date(scope.row.samplingDate).getTime() + scope.row.expDate * 86400000) - new Date().getTime()) / 86400000) :
                '超过' + Math.abs(Math.ceil(((new Date(scope.row.samplingDate).getTime() + scope.row.expDate * 86400000) - new Date().getTime()) / 86400000))
                }}
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
  </div>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'storage'
  export default {
    created () {},
    data () {
      return {
        defaultSelection: 'departId',
        dept: 'dept',
        classify: 'classify',
        treeData: [],
        search: {
          startTime: '',
          endTime: '',
          samplPiont: '',
          sampleId: ''
        },
        defaultProps: {
          children: 'labSampleManagementVos',
          label: 'name'
        },
        tableData: [],
        loading: {
          list: false
        },
        tableLoading: false,
        page: {
          current: 1,
          size: 15,
          total: 0
        },
        picker: {
          startTime: '',
          overTime: ''
        },
        handId: [],
        multipleSelection: [],
        userInfo: ''
      }
    },
    props: {},
    mounted () {
      this.getTreeData()
      this.userInfo = storage.getUser().userId
    },
    filters: {},
    computed: {},
    methods: {
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleClick () {
        for (var i = 0; i < this.multipleSelection.length; i++) {
          this.handId.push(this.multipleSelection[i].id)
        }
        if (this.handId.length === 0) {
          return
        }
        let params = {
          sampleRegisterRecordIds: this.handId,
          modifier: this.userInfo
        }
        console.log(params)
        api.chemicalLaboratory.labSampleRegisterRecord.processedLabSampleRegisterRecord(params).then(response => {
          const data = response.data
          if (data.success === true) {
            this.$message.success('处理成功')
            this.getListData()
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
      getTreeData () { // 获取树结构
        this.tableLoading = true
        let params = {
          type: this.defaultSelection,
          queryLabSampleRegisterRecordCo: {
            startRegisterDate: new Date(this.search.startTime).getTime(),
            endRegisterDate: new Date(this.search.endTime).getTime(),
            samplingPosition: this.search.samplPiont
          }
        }
        api.chemicalLaboratory.labSampleRegisterRecord.getLabSampleManagementGroupVoByUntreatedRptRecords(params).then(response => {
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
          queryLabSampleRegisterRecordCo: {
            sampleId: this.search.sampleId,
            startRegisterDate: new Date(this.search.startTime).getTime(),
            endRegisterDate: new Date(this.search.endTime).getTime(),
            samplingPosition: this.search.samplPiont
          },
          page: {
            current: this.page.current,
            length: this.page.size
          }
        }
        console.log(params)
        api.chemicalLaboratory.labSampleRegisterRecord.getUntreatedLabSampleRegisterRecordDoList(params).then(response => {
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
      handleNodeClick (data, node) {
        if (node.childNodes.length === 0) {
          this.search.sampleId = data.id
          this.getListData()
        }
      },
      handleTabsClick (data) {
        console.log(data)
      },
      searchList () {
        this.getTreeData()
        this.tableData = []
      },
      cancel (data) {
      }
    }
  }
</script>
<style scoped lang="scss">
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
  .search-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 15px;
  .search-input {
    width: 158px;
  }
  .search-margin {
    margin: 0 10px 10px 0;
  }
  .search-margin-btn{margin-bottom: 10px}
  }
  .search-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 15px;
    .search-input {
      width: 158px;
    }
    .search-margin {
      margin: 0 10px 10px 0;
    }
    .search-margin-btn{margin-bottom: 10px}
  }
</style>
