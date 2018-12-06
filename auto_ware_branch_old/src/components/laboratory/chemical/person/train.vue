<!--培训管理-->
<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="flex-div-row" style="background: white">
        <div class="flex-div-column hy-admin__search-main cf">
          <el-tabs @tab-click="tabClick" :value="option.tabs[0].name">
            <el-tab-pane v-for="(item,index) in option.tabs" :label="item.label" :name="item.name" :key="index">
              <div class="fr" style="margin-bottom: 20px">
                <el-date-picker v-model="search.startDate" placeholder="请输入开始日期"></el-date-picker>
                <el-date-picker v-model="search.endDate" placeholder="请输入结束日期"></el-date-picker>
                <el-input v-show="isPlan" v-model="search.trainingTile" placeholder="请输入名称"></el-input>
                <!--<el-autocomplete v-show="!isPlan" v-model="search.trainingPlan" :fetch-suggestions="suggestTrainPlan"-->
                                 <!--@select="selectTrainPlan" placeholder="请输入名称" clearable></el-autocomplete>-->
                <el-select v-show="!isPlan" v-model="search.trainingPlanId" clearable placeholder="请选择培训计划">
                  <el-option v-for="item in option.trainTitle" :label="item.trainingTile" :key="item.id" :value="item.id">
                  </el-option>
                </el-select>
                <el-button @click="searchInfo" type="primary">查询</el-button>
                <el-button v-show="isPlan" @click="addPlan" type="primary">新增计划</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
          <div>
          <!--培训计划列表-->
          <el-table v-show="isPlan" :data="tableData.plan" border v-loading="loading.plan"
                    element-loading-text="拼命加载中">
            <el-table-column prop="trainingTile" label="培训主题" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lecturer" label="讲师" show-overflow-tooltip></el-table-column>
            <el-table-column label="计划完成时间" show-overflow-tooltip>
              <template slot-scope="scope">{{scope.row.planCompleteDate | timeFormat('YYYY-MM-DD HH:mm')}}</template>
            </el-table-column>
            <el-table-column prop="name" label="参与人员" show-overflow-tooltip width="360">
              <template slot-scope="scope">{{scope.row.users | joinUserNames}}</template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="register" label="登记人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="registerDate" label="登记时间" show-overflow-tooltip>
              <template slot-scope="scope">{{scope.row.registerDate | timeFormat('YYYY-MM-DD HH:mm')}}</template>
            </el-table-column>
            <el-table-column label="操作" width="230">
              <template slot-scope="scope">
                <el-button @click="register(scope)" :disabled="scope.row.isAlreadyRegister === 'Y'" type="text"
                           size="small" :loading="loading.register">培训登记</el-button>
                <el-button @click="editPlan(scope)" :disabled="scope.row.isAlreadyRegister === 'Y'" type="text" size="small">修改</el-button>
                <el-button @click="deletePlan(scope)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--培训记录列表-->
          <el-table v-show="!isPlan" :data="tableData.record" border v-loading="loading.record"
                    element-loading-text="拼命加载中">
            <el-table-column prop="labTrainingPlanDo.trainingTile" label="培训主题"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="labTrainingPlanDo.lecturer" label="讲师" show-overflow-tooltip></el-table-column>
            <el-table-column label="培训时间" show-overflow-tooltip>
              <template slot-scope="scope">{{scope.row.trainingDate | timeFormat('YYYY-MM-DD HH:mm')}}</template>
            </el-table-column>
            <el-table-column label="参与人员" show-overflow-tooltip width="360">
              <template slot-scope="scope">{{scope.row.users | joinUserNames}}</template>
            </el-table-column>
            <el-table-column prop="labTrainingPlanDo.remark" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="230">
              <template slot-scope="scope">
                <el-button @click="viewPlan(scope)" type="text" size="small">查看计划</el-button>
                <el-button @click="editRecord(scope)" type="text" size="small">修改</el-button>
                <el-button @click="deleteRecord(scope)" type="text" size="small">删除</el-button>
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
        </div>
      </div>
    </div>
    <!--培训记录登记对话框 放在class为hy-admin__search-main的元素外面-->
    <el-dialog title="培训登记" width="50%" :visible.sync="visible.registerDialog">
      <el-form ref="recordForm" :model="form" :rules="rules" label-width="108px">
        <el-form-item label="培训主题" prop="name">
          <el-input v-model="form.trainingTile" disabled placeholder="请填写培训主题"
                    class="edit-dialog-template-input"></el-input>
        </el-form-item>
        <el-form-item label="培训时间" prop="name">
          <el-date-picker type="datetime" v-model="form.trainingDate" placeholder="请选择培训时间"
                          class="edit-dialog-template-input"></el-date-picker>
        </el-form-item>
        <el-form-item label="参与人员" prop="name" placeholder="请选择参与人员" width="360">
          <el-select v-model="form.usersArray" multiple placeholder="请选择参与人员" class="edit-dialog-template-input">
            <el-option v-for="(item,index) in option.users" :label="item.useName" :value="item.id" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button type="primary" @click="confirmRegister('recordForm')" :loading="loading.register">确认</el-button>
      </template>
    </el-dialog>
    <!--培训计划对话框 放在class为hy-admin__search-main的元素外面-->
    <train-plan-dialog ref="trainPlanDialog" @success="gePlantListData"></train-plan-dialog>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'storage'

  export default {
    components: {
      'train-plan-dialog': require('./train-plan-dialog.vue')
    },
    data () {
      return {
        activeName: '',
        bookDate: '',
        search: {startDate: '', endDate: '', trainingTile: '', trainingPlan: '', trainingPlanId: ''},
        tableList: {name: [], value: []},
        templateId: '',
        option: {tabs: [{label: '培训计划', name: 'plan'}, {label: '培训记录', name: 'record'}], users: [], trainTitle: []},
        tableData: {plan: [{name: 'name'}], record: [{name: 'name'}]},
        loading: {plan: false, register: false},
        firstId: '',
        userInfo: '',
        dialogTitle: '',
        visible: {addDialog: false, registerDialog: false},
        form: {
          id: '',                     // 主键id
          trainingTile: '',           // 培训主题
          creator: '',                // 创建人
          gmtCreate: '',              // 创建时间
          modifier: '',               // 更新人
          gmtModified: '',            // 更新时间
          trainingDate: '',           // 培训时间
          trainingPlanId: '',         // 计划培训记录id
          users: [],                  // 参与人
          usersArray: [],
          isAlreadyRegister: ''       // 是否已经添加了培训记录
        },
        rules: {
          trainingDate: [{required: true, message: '请选择培训时间', trigger: 'blur'}],
          usersArray: [{required: true, message: '请选择培训人', trigger: 'blur'}]
        },
        isPlan: true,
        page: {
          current: 1,
          size: 15,
          total: 0,
          recordList: {current: 1, size: 15, total: 0}
        }
      }
    },
    filters: {
      joinUserNames (users) {
        if (users && users.length > 0) {
          let nameArray = users.map(user => { return user.useName })
          return nameArray.join(',')
        } else {
          return ''
        }
      }
    },
    mounted () {
      this.gePlantListData()
      this.getRecordListData()
      this.getUserList()
      this.suggestTrainPlan()
      this.userInfo = storage.getUser()
    },
    methods: {
      // 点击子标签
      tabClick (selectedTab) {
        this.isPlan = selectedTab.name === 'plan'
      },
      handlePreview (file) {
        console.log(file)
      },
      // 获取人员列表
      getUserList () {
        api.chemicalLaboratory.userManagerCenter.normalUserList({pageIndex: 1, pageCount: 10000}).then(response => {
          let data = response.data
          if (data.data && data.data.list && data.data.list.length > 0) {
            this.option.users = data.data.list
          } else {
            this.option.users = []
          }
        })
      },
      // 添加培训计划
      addPlan () {
        this.$refs.trainPlanDialog.show({type: 'add'})
      },
      // 编辑培训计划
      editPlan (scope) {
        this.$refs.trainPlanDialog.show({type: 'edit', trainingPlanId: scope.row.id})
      },
      // 删除培训计划
      deletePlan (scope) {
        this.$confirm('是否删除该培训计划, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {id: scope.row.id, modifier: this.userInfo.userId}
          api.chemicalLaboratory.labTrainingPlanController.deleteLabTrainingPlanVo(params).then(response => {
            const data = response.data
            if (data.success === true) {
              this.$message({type: 'success', message: '删除成功!'})
              this.gePlantListData()
            } else {
              this.$message({type: 'error', message: data.errorMsg})
            }
          })
        })
      },
      // 弹出新增培训记录
      register (scope) {
        this.$nextTick(() => {
          this.visible.registerDialog = true
          // this.$refs.recordForm.resetFields()
          this.form.trainingTile = scope.row.trainingTile
          this.form.trainingPlanId = scope.row.id
          this.form.isAlreadyRegister = scope.row.isAlreadyRegister
          this.form.trainingDate = ''
          this.form.usersArray = []
          this.form.id = 0
        })
      },
      // 添加编辑培训记录
      confirmRegister (formName) {
        this.form.users = this.form.usersArray.map(value => {
          return this.option.users.find(user => {
            return user.id === value
          })
        })
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.loading.register = true
            this.form.creator = this.userInfo.userId
            this.form.gmtCreate = new Date()
            this.form.modifier = this.userInfo.userId
            this.form.gmtModified = new Date()
            if (this.form.id > 0) {
              api.chemicalLaboratory.labTrainingRecordController.updateLabTrainingRecordVo(this.form).then(response => {
                const data = response.data
                if (data.success === true) {
                  this.gePlantListData()
                } else {
                  this.$message.error(response.data.errorMsg)
                }
              }).finally(() => {
                this.loading.register = false
                this.visible.registerDialog = false
              })
            } else {
              api.chemicalLaboratory.labTrainingRecordController.createLabTrainingRecordVo(this.form).then(response => {
                const data = response.data
                if (data.success === true) {
                  this.gePlantListData()
                } else {
                  this.$message.error(response.data.errorMsg)
                }
              }).finally(() => {
                this.loading.register = false
                this.visible.registerDialog = false
              })
            }
          }
        })
      },
      viewPlan (scope) {
        this.$refs.trainPlanDialog.show({type: 'view', trainingPlanId: scope.row.trainingPlanId})
      },
      // 弹出编辑培训记录
      editRecord (scope) {
        this.$nextTick(() => {
          this.visible.registerDialog = true
          this.$refs.recordForm.resetFields()
          this.form.trainingTile = scope.row.labTrainingPlanDo.trainingTile
          this.form.trainingPlanId = scope.row.trainingPlanId
          this.form.trainingDate = scope.row.trainingDate
          this.form.usersArray = scope.row.users.length > 0 ? scope.row.users.map(item => { return item.id }) : []
          this.form.id = scope.row.id
        })
      },
      deleteRecord (scope) {
        this.$confirm('是否要删除此记录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.chemicalLaboratory.labTrainingRecordController.deleteLabTrainingRecordVo({
            id: scope.row.id,
            modifier: this.userInfo.userId
          }).then(response => {
            let data = response.data
            if (data.success) {
              this.getRecordListData()
              this.$message({type: 'success', message: '删除记录成功'})
            }
          })
        })
      },
      confirm () {},
      getTabData () { // 获取Tab列表
        let params = {isAudit: 'Y'}
        api.chemicalLaboratory.labRptTemplateController.getCheckPendingLabTemplateVoList(params).then(response => {
          const data = response.data
          if (data.success === true) {
            this.tableTabs = data.data
            this.activeName = this.tableTabs[0].id
            this.templateId = this.activeName
            this.gePlantListData()
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        })
      },
      gePlantListData () { // 获取列表结构
        this.loading.plan = true
        let params = {
          queryLabTrainingPlanCo: {
            trainingTile: this.search.trainingTile,
            planCompleteStartDate: this.search.startDate ? new Date(this.search.startDate).getTime() : '',
            planCompleteEndDate: this.search.endDate ? new Date(this.search.endDate).getTime() : ''
          },
          page: {
            current: this.page.current,
            length: this.page.size
          }
        }
        api.chemicalLaboratory.labTrainingPlanController.getLabTrainingPlanDoList(params).then(response => {
          const data = response.data
          if (data.success === true) {
            if (!data.data) {
              this.tableData.plan = []
              return
            }
            this.tableData.plan = data.data.data
            this.page.total = data.data.count
            return true
          } else {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.loading.plan = false
        })
      },
      searchInfo () {
        if (this.isPlan) {
          this.gePlantListData()
        } else {
          this.getRecordListData()
        }
      },
      // 模糊搜索计划
      suggestTrainPlan () {
        let params = {trainingTile: ''}
        api.chemicalLaboratory.labTrainingPlanController.getLabTrainingPlanDosByTrainingTile(params).then(response => {
          if (response.data.success) {
            this.option.trainTitle = response.data.data
          }
        })
      },
      // 选择计划
      selectTrainPlan (item) {
        this.search.trainingPlanId = item.id
      },
      // 获取培训记录
      getRecordListData () {
        this.loading.record = false
        let param = {
          queryLabTrainingRecordCo: {
            trainingPlanId: this.search.trainingPlanId,
            trainingStartDate: this.search.startDate ? new Date(this.search.startDate) : '',
            trainingEndDate: this.search.endDate ? new Date(this.search.endDate) : ''
          },
          page: {
            current: this.page.recordList.current,
            length: this.page.recordList.size
          }
        }
        api.chemicalLaboratory.labTrainingRecordController.getLabTrainingRecordDoList(param).then(response => {
          let data = response.data
          if (!data.data) {
            this.tableData.record = []
            return
          }
          this.tableData.record = data.data.data
          this.page.recordList.total = data.data.count
          return true
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.loading.record = false
        })
      },
      /* 分页 */
      pageSizeChange (size) {
        this.page.size = size
        if (this.page.current === 1) {
          this.gePlantListData()
        } else {
          this.page.current = 1
        }
      },
      pageCurrentChange (current) {
        this.page.current = current
        this.gePlantListData()
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

  .edit-dialog-template-input {
    width: 30rem;
  }
</style>
