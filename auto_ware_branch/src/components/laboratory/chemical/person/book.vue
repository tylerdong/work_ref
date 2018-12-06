<!--人员台账-->
<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="flex-div-row" style="background: white">
        <div class="flex-div-column hy-admin__search-main cf" ref="container">
          <div>
            <el-table :data="tableData.book" border v-loading="loading.book" element-loading-text="拼命加载中">
              <el-table-column prop="id" label="编号" show-overflow-tooltip></el-table-column>
              <el-table-column prop="useName" label="姓名" show-overflow-tooltip></el-table-column>
              <el-table-column prop="account" label="帐号" show-overflow-tooltip></el-table-column>
              <el-table-column label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button @click="view(scope)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
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

          <el-dialog :visible.sync="visible.dialog" width="80%">
            <el-tabs @tab-click="tabsClick" v-model="currentTab">
              <el-tab-pane name="first" label="实验记录">
                <el-table :height="tableHeight" :data="tableData.laborRecord" border v-loading="loading.laborRecord"
                          element-loading-text="拼命加载中">
                  <el-table-column prop="taskId" label="编号"></el-table-column>
                  <el-table-column prop="name" label="名称"></el-table-column>
                  <el-table-column label="状态">
                    <template slot-scope="scope">{{ scope.row.status | toStatus }}</template>
                  </el-table-column>
                  <el-table-column prop="samplingPosition" label="采样点"></el-table-column>
                  <el-table-column prop="sampler" label="采样人"></el-table-column>
                  <el-table-column prop="samplingDate" label="采样时间"></el-table-column>
                  <el-table-column prop="register" label="登记人"></el-table-column>
                  <el-table-column label="登记时间">
                    <template slot-scope="scope">{{ scope.row.registerDate | timeFormat('YYYY-MM-DD HH:mm') }}</template>
                  </el-table-column>
                </el-table>
                <el-pagination class="fr" :current-page="page.laborRecord.current"
                               :page-size="page.laborRecord.size" layout="total, sizes, prev, pager, next, jumper"
                               :total="page.laborRecord.total" @size-change="laborRecordPageSizeChange"
                               @current-change="laborRecordPageCurrentChange">
                </el-pagination>
              </el-tab-pane>
              <el-tab-pane name="second" label="培训记录">
                <el-table :height="tableHeight" :data="tableData.train" border v-loading="loading.train"
                          element-loading-text="拼命加载中">
                  <el-table-column prop="labTrainingPlanDo.trainingTile" label="主题" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="labTrainingPlanDo.lecturer" label="讲师" show-overflow-tooltip></el-table-column>
                  <el-table-column label="培训时间" show-overflow-tooltip>
                    <template slot-scope="scope">{{scope.row.trainingDate | timeFormat('YYYY-MM-DD HH:mm')}}</template>
                  </el-table-column>
                </el-table>
                <el-pagination class="fr" :current-page="page.train.current"
                               :page-size="page.train.size" layout="total, sizes, prev, pager, next, jumper"
                               :total="page.train.total" @size-change="trainPageSizeChange"
                               @current-change="trainPageCurrentChange"></el-pagination>
              </el-tab-pane>
              <el-tab-pane name="third" label="奖惩记录">
                <el-table :height="tableHeight" :data="tableData.rewardAndPunish" border v-loading="loading.rewardAndPunish"
                          element-loading-text="拼命加载中">
                  <el-table-column label="奖惩类型"><template slot-scope="scope">{{scope.row.rewardType | rewardType}}</template>
                  </el-table-column>
                  <el-table-column prop="event" label="事件" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="fraction" label="分值" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="register" label="登记人" show-overflow-tooltip></el-table-column>
                  <el-table-column label="登记时间" slot-scope="scope">
                    <template slot-scope="scope">{{scope.row.registerDate | timeFormat('YYYY-MM-DD HH:mm')}}</template>
                  </el-table-column>
                </el-table>
                <el-pagination class="fr" :current-page="page.rewardPunishment.current"
                               :page-size="page.rewardPunishment.size" layout="total, sizes, prev, pager, next, jumper"
                               :total="page.rewardPunishment.total" @size-change="rewardPunishmentPageSizeChange"
                               @current-change="rewardPunishmentPageCurrentChange">
                </el-pagination>
              </el-tab-pane>
            </el-tabs>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    components: {},
    data () {
      return {
        search: {name: '', organization: '', start: '', end: ''},
        currentTab: 'first',
        tableHeight: 444,
        options: {material: ['玻璃器皿', '化学试剂', '仪器备件'], classify: ['化分工段', '物检工段', '成检车间']},
        tableData: {book: [], train: [{name: ''}], rewardAndPunish: [{name: ''}], laborRecord: [{name: ''}]},
        loading: {book: false, rewardAndPunish: false, train: false, laborRecord: false},
        userRowData: {},
        visible: {outbound: false, dialog: false},
        page: {
          current: 1,
          size: 15,
          total: 0,
          rewardPunishment: {current: 1, size: 10, total: 0},
          train: {current: 1, size: 10, total: 0},
          laborRecord: {current: 1, size: 10, total: 0}
        }
      }
    },
    mounted () {
      this.getData()
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
    methods: {
      tabsClick (tab, event) {
        console.log(tab.name)
        switch (tab.name) {
          case 'first':
            this.getLaboratoryRecord()
            break
          case 'second':
            this.getTrainRecord()
            break
          case 'third':
            this.getRewardPunishmentRecord()
            break
          default:
            break
        }
      },
      view (scope) {
        this.visible.dialog = true
        this.userRowData = scope.row
        this.currentTab = 'first'
        this.getLaboratoryRecord()
      },
      // 获取列表结构
      getData () {
        let params = {
          pageIndex: this.page.current,
          pageCount: this.page.size
        }
        api.chemicalLaboratory.userManagerCenter.normalUserList(params).then(response => {
          const data = response.data.data
          if (data.list && data.list.length > 0) {
            this.tableData.book = data.list
            this.page.total = data.count
            return true
          } else {
            this.tableData.book = []
            return
          }
        })
      },
      // 查询个人实验记录
      getLaboratoryRecord () {
        this.loading.laborRecord = true
        let params = {
          userId: this.userRowData.id,
          page: {current: this.page.laborRecord.current, length: this.page.laborRecord.size}
        }
        api.chemicalLaboratory.LabOriginalPendingExperiment.getLabOriginalPendingExperimentDoByUserId(params).then(response => {
          const data = response.data
          if (data.success === true) {
            if (!data.data) {
              this.tableData = []
              return
            }
            this.tableData.laborRecord = data.data.data
            this.page.laborRecord.total = data.data.count
            return true
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).finally(() => {
          this.loading.laborRecord = false
        })
      },
      // 查询个人培训记录
      getTrainRecord () {
        this.loading.train = false
        let param = {
          queryLabTrainingRecordCo: {
            trainingStartDate: this.search.startDate ? new Date(this.search.startDate) : '',
            trainingEndDate: this.search.endDate ? new Date(this.search.endDate) : ''
          },
          userId: this.userRowData.id,
          page: {
            current: this.page.train.current,
            length: this.page.train.size
          }
        }
        api.chemicalLaboratory.labTrainingRecordController.getLabTrainingRecordDoList(param).then(response => {
          let data = response.data
          if (!data.data) {
            this.tableData.train = []
            return
          }
          this.tableData.train = data.data.data
          this.page.train.total = data.data.count
          return true
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.loading.train = false
        })
      },
      // 查询个人奖惩记录
      getRewardPunishmentRecord () {
        this.loading.rewardAndPunish = true
        let params = {queryLabUserRewardsCo: {startDate: '', endDate: '', name: '', userId: this.userRowData.id},
          page: {current: this.page.rewardPunishment.current, length: this.page.rewardPunishment.size}
        }
        api.chemicalLaboratory.labUserRewardsController.getLabUserRewardsDoList(params).then(response => {
          const data = response.data
          if (data.success === true) {
            if (!data.data) {
              this.tableData = []
              return
            }
            this.tableData.rewardAndPunish = data.data.data
            this.page.rewardPunishment.total = data.data.count
            return true
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).finally(() => {
          this.loading.rewardAndPunish = false
        })
      },
      /* 分页 */
      pageSizeChange (size) {
        this.page.size = size
        if (this.page.current === 1) {
          this.getData()
        } else {
          this.page.current = 1
        }
      },
      pageCurrentChange (current) {
        this.page.current = current
        this.getData()
      },
      laborRecordPageSizeChange (size) {
        this.page.laborRecordpage.size = size
        if (this.page.laborRecordpage.current === 1) {
          this.getLaboratoryRecord()
        } else {
          this.page.laborRecordpage.current = 1
        }
      },
      laborRecordPageCurrentChange (current) {
        this.page.laborRecord.current = current
        this.getLaboratoryRecord()
      },
      trainPageSizeChange (size) {
        this.page.train.size = size
        if (this.page.train.current === 1) {
          this.getTrainRecord()
        } else {
          this.page.train.current = 1
        }
      },
      trainPageCurrentChange (current) {
        this.page.train.current = current
        this.getTrainRecord()
      },
      rewardPunishmentPageSizeChange (size) {
        this.page.rewardPunishment.size = size
        if (this.page.rewardPunishment.current === 1) {
          this.getRewardPunishmentRecord()
        } else {
          this.page.rewardPunishment.current = 1
        }
      },
      rewardPunishmentPageCurrentChange (current) {
        this.page.rewardPunishment.current = current
        this.getRewardPunishmentRecord()
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
    margin: .5rem;
    width: 100%;
  }
</style>
