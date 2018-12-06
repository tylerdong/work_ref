<!--人员管理/工作量统计-->
<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="flex-div-row">
        <div class="flex-div-column hy-admin__search-main cf">
          <div class="fr search-row">
            <el-select v-model="search.userId" placeholder="请选择人员">
              <el-option v-for="(item,index) in option.users" :key="index" :label="item.useName" :value="item.id"></el-option>
            </el-select>
            <el-date-picker class="search-input search-margin" v-model="search.startTime" type="date" placeholder="请选择开始日期">
            </el-date-picker>
            <el-date-picker class="search-input search-margin" v-model="search.endTime" type="date" placeholder="选择结束日期">
            </el-date-picker>
            <el-button @click="getListData" type="primary">查询</el-button>
          </div>
          <el-table :data="tableData" border v-loading="loading.list" element-loading-text="拼命加载中">
            <el-table-column prop="labType" label="类型" width="100"></el-table-column>
            <el-table-column prop="barCode" label="条码号" width="180"></el-table-column>
            <el-table-column prop="batchNumber" label="批号" width="120"></el-table-column>
            <el-table-column prop="spec" label="规格(dtex/f)" width="120"></el-table-column>
            <el-table-column prop="productLine" label="产线" width="80"></el-table-column>
            <el-table-column prop="item" label="位号" width="80"></el-table-column>
            <el-table-column prop="fallTime" label="落次" width="80"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">{{ scope.row.status | toStatus }}</template>
            </el-table-column>
            <el-table-column prop="sampler" label="采样人" width="200"></el-table-column>
            <el-table-column label="取样时间" width="200">
              <template slot-scope="scope">
                {{ scope.row.registerDate | timeFormat('YYYY-MM-DD HH:mm') }}
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
    components: {
    },
    created () {},
    data () {
      return {
        search: {startTime: '', endTime: '', userId: ''},
        option: { users: [] },
        tableData: [],
        loading: {list: false},
        page: {current: 1, size: 15, total: 0},
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
      this.getUserList()
      this.getListData()
    },
    computed: {},
    methods: {
      getUserList () {
        api.physicalLaboratory.userManagerCenter.normalUserList({pageIndex: 1, pageCount: 10000}).then(response => {
          let data = response.data
          if (data.messageType === 1) {
            this.option.users = data.data.list
          }
        })
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
      // 获取列表结构
      getListData () {
        this.loading.list = true
        let params = {
          queryLabOriginalPendingExperimentCo: {
            startRegisterDate: this.search.startTime ? new Date(this.search.startTime).getTime() : '',
            endRegisterDate: this.search.endTime ? new Date(this.search.endTime).getTime() : ''
          },
          userId: this.search.userId,
          page: {
            current: this.page.current,
            length: this.page.size
          }
        }
        api.physicalLaboratory.LabOriginalPendingExperiment.getLabOriginalPendingExperimentDoByUserId(params).then(response => {
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
        this.tableData = []
        this.tableTabs = []
      }
    }
  }
</script>
<style scoped>
  .search-row {
    margin-bottom: 20px;
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

