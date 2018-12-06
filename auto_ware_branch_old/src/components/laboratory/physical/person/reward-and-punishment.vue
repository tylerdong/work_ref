<!--奖惩管理-->
<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="flex-div-row" style="background: white">
        <div class="flex-div-column hy-admin__search-main cf" ref="container">
          <el-tabs value="record">
            <el-tab-pane label="奖惩记录" name="record">
              <div class="fr" style="margin-bottom: 20px">
                <el-date-picker v-model="search.startDate" placeholder="请输入开始时间"></el-date-picker>
                <el-date-picker v-model="search.endDate" placeholder="请输入结束时间"></el-date-picker>
                <el-input v-model="search.name" placeholder="请输入名称"></el-input>
                <el-button @click="searchList" type="primary">查询</el-button>
                <el-button @click="add" type="primary">新增</el-button>
              </div>
              <el-table :data="tableData" border v-loading="loading.table" element-loading-text="拼命加载中">
                <el-table-column prop="userName" label="姓名" show-overflow-tooltip></el-table-column>
                <el-table-column label="奖惩类型" show-overflow-tooltip>
                  <template slot-scope="scope">{{scope.row.rewardType | rewardType}}</template>
                </el-table-column>
                <el-table-column prop="event" label="事件" show-overflow-tooltip></el-table-column>
                <el-table-column prop="fraction" label="分值" show-overflow-tooltip></el-table-column>
                <el-table-column prop="register" label="登记人" show-overflow-tooltip></el-table-column>
                <el-table-column label="登记时间" show-overflow-tooltip>
                  <template slot-scope="scope">{{scope.row.registerDate | timeFormat('YYYY-MM-DD HH:mm')}}</template>
                </el-table-column>
                <el-table-column label="操作" width="220">
                  <template slot-scope="scope">
                    <el-button @click="editRecord(scope)" type="text" size="small">修改</el-button>
                    <el-button @click="deleteRecord(scope)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
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
    <dialog-reward-publishment ref="dialogRewardPublishment" @success="getListData"></dialog-reward-publishment>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'storage'

  export default {
    components: {
      'dialog-reward-publishment': require('./dialog-reward-punishment.vue')
    },
    data () {
      return {
        search: {name: '', startDate: '', endDate: ''},
        tableList: {
          name: [],
          value: []
        },
        templateId: '',
        options: {
          material: ['玻璃器皿', '化学试剂', '仪器备件'],
          lecturer: ['test1', 'test2', 'test3']
        },
        tableData: [],
        loading: {
          table: false,
          statement: false
        },
        firstId: '',
        userInfo: '',
        dialogTitle: '',
        visible: {
          addDialog: false,
          registerDialog: false
        },
        form: {
          add: {
            name: ''
          },
          register: {
            name: '',
            list: []
          }
        },
        isPlan: true,
        page: {
          current: 1,
          size: 15,
          total: 0
        }
      }
    },
    filters: {
      rewardType (value) {
        switch (value) {
          case 'PUNISH':
            return '惩罚'
          case 'REWARD':
            return '奖励'
          default:
            return ''
        }
      }
    },
    mounted () {
      this.userInfo = storage.getUser()
      this.getListData()
    },
    methods: {
      add () {
        this.$refs.dialogRewardPublishment.show('add', {})
      },
      editRecord (scope) {
        this.$refs.dialogRewardPublishment.show({type: 'edit', ...scope.row})
      },
      deleteRecord (scope) {
        this.$confirm('要删除此条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {id: scope.row.id, modifier: this.userInfo.userId}
          api.physicalLaboratory.labUserRewardsController.deleteLabUserRewardsDo(params).then(response => {
            const data = response.data
            if (data.success === true) {
              this.getListData()
              this.$message({type: 'success', message: '删除成功!'})
            }
          }).catch(error => {
            console.log(error)
          })
        })
      },
      // 获取列表结构
      getListData () {
        this.loading.table = true
        let params = {
          queryLabUserRewardsCo: {
            startDate: this.search.startDate ? new Date(this.search.startDate).getTime() : '',
            endDate: this.search.endDate ? new Date(this.search.endDate).getTime() : '',
            name: this.search.name
          },
          page: {
            current: this.page.current,
            length: this.page.size
          }
        }
        api.physicalLaboratory.labUserRewardsController.getLabUserRewardsDoList(params).then(response => {
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
        }).finally(() => {
          this.loading.table = false
        })
      },
      searchList () {
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
      }
    }
  }
</script>
<style scoped>
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
</style>
