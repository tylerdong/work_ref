<!--待实验/原始记录-->
<template>
  <div>
    <div class="hy-admin__main-container">
      <el-tabs v-model="dicTypeId" @tab-click="handleTypeClick">
        <el-tab-pane v-for="item in dicTypes" :key="item.id" :label="item.name" :name="item.id"></el-tab-pane>
      </el-tabs>
      <div class="flex-div-row">
        <aside>
          <div class="select-box">
            <el-table :data="dicData" border
                      v-loading="loading.dic"
                      element-loading-text="拼命加载中"
                      highlight-current-row
                      @current-change="handleCurrentChange">
              <el-table-column prop="name" label="标样名称"></el-table-column>
            </el-table>
          </div>
        </aside>
        <div class="flex-div-column hy-admin__search-main cf">
          <div class="fr">
            <!--<el-input class="search-input" placeholder="请输入采样点" v-model="search.sampPoint"></el-input>-->
            <!--<el-date-picker-->
            <!--class="search-input search-margin"-->
            <!--v-model="search.startTime"-->
            <!--type="date"-->
            <!--placeholder="请选择开始日期">-->
            <!--</el-date-picker>-->
            <!--<el-date-picker-->
            <!--class="search-input search-margin"-->
            <!--v-model="search.endTime"-->
            <!--type="date"-->
            <!--placeholder="选择结束日期">-->
            <!--</el-date-picker>-->
            <!--<el-button @click="searchList" type="primary">查询</el-button>-->
            <!--<el-button @click="addNewSample" type="primary">增加含油任务</el-button>-->
          </div>
          <el-table :data="tableData" border v-loading="loading.list" element-loading-text="拼命加载中">
            <!--<el-table-column prop="id" label="编号"></el-table-column>-->
            <el-table-column prop="barCode" label="条码号" width="115"></el-table-column>
            <el-table-column prop="batchNumber" label="批号" width="100"></el-table-column>
            <el-table-column prop="spec" label="规格(dtex/f)" width="120"></el-table-column>
            <el-table-column prop="productLine" label="产线" width="70"></el-table-column>
            <el-table-column prop="item" label="位号" width="70"></el-table-column>
            <el-table-column prop="fallTime" label="落次" width="70"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                {{ scope.row.status | toStatus }}
              </template>
            </el-table-column>
            <el-table-column prop="sampler" label="采样人" width="270"></el-table-column>
            <el-table-column label="取样时间">
              <template slot-scope="scope">
                {{ scope.row.registerDate | timeFormat('YYYY-MM-DD HH:mm') }}
              </template>
            </el-table-column>
            <el-table-column label="操作">
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
    <!--实验-->
    <dialog-sample @submitSuccess="getDictionaryMessage" ref="refDoExperiment"></dialog-sample>
    <!--增加含油任务-->
    <add-dialog @submitSuccess="getDictionaryMessage" ref="addDialog"></add-dialog>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'storage'
  export default {
    components: {
      'dialog-sample': require('./dialog-sample.vue'),
      'add-dialog': require('./dialog-add-edit-sample.vue')
    },
    created () {},
    data () {
      return {
        dicTypes: [],
        dicTypeId: '',
        dicData: [],
//        search: {
//          startTime: '',
//          endTime: '',
//          sampPoint: '',
//        },
        tableData: [],
        loading: {
          list: false,
          dicType: false,
          dic: false
        },
        page: {
          current: 1,
          size: 15,
          total: 0
        },
        templateId: '',
        tableLoading: false,
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
      this.getAllDicByType()
    },
    computed: {},
    methods: {
      getAllDicByType () {
        this.loading.dicType = true
        let param = {type: 'LAB_ORIGINAL_TEMPLATE'}
        api.physicalLaboratory.classify.getAllDicByType(param).then(response => {
          const data = response.data
          if (data.success === true) {
            if (data.data) {
              this.dicTypeId = data.data[0].id
              this.dicTypes = data.data
              this.getDictionaryMessage()
            } else {
              this.dicData = []
              this.dicTypes = []
              this.tableData = []
            }
            return true
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading.dicType = false
        })
      },
      /* 获取左侧信息 */
      getDictionaryMessage () {
        this.loading.dic = true
        let params = {
          statusList: ['PROCESSING', 'CHECK_PENDING'],
          groupId: this.dicTypeId
        }
        api.physicalLaboratory.LabOriginalPendingExperiment.getLabOriginalPendingExperimentByCrude(params).then(response => {
          const data = response.data
          if (data.success === true) {
            if (data.data) {
              this.templateId = data.data[0].id
              this.dicData = data.data
              this.getListData()
            } else {
              this.dicData = []
              this.tableData = []
            }
            return true
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading.dic = false
        })
      },
      /* 新增标样 */
      addNewSample () {
        this.$refs.addDialog.show({title: '新增', name: ''})
        console.log('add')
      },
      getListData () {
        this.list = true
        let params = {
          queryLabOriginalPendingExperimentCo: {
            templateId: this.templateId,
            statusList: ['PROCESSING', 'CHECK_PENDING']
          },
          page: {
            current: this.page.current,
            length: this.page.size
          }
        }
        api.physicalLaboratory.LabOriginalPendingExperiment.getLabOriginalPendingExperimentDetailsByGuideCrude(params).then(response => {
          const data = response.data
          if (data.success === true) {
            if (data.data && data.data.data) {
              this.tableData = data.data.data
              this.page.total = data.data.count
              return true
            } else {
              this.tableData = []
            }
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.list = false
        })
      },
      // 点击类型
      handleTypeClick (tab, event) {
        this.dicTypeId = tab.name
        this.getDictionaryMessage()
      },
      handleCurrentChange (dictionaryCurrent) {
        console.log('运行前-----------------------' + dictionaryCurrent.id)
        this.templateId = dictionaryCurrent.id
        this.getListData()
        console.log('运行后-----------------------' + dictionaryCurrent.id)
      },
      searchList () {
        this.getDictionaryMessage()
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
              api.physicalLaboratory.LabOriginalPendingExperiment.cancelLabOriginalPendingExperimentDo(params).then(response => {
                const data = response.data
                if (data.success === true) {
                  done()
                  this.$message.success('取消成功')
                  this.getDictionaryMessage()
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
