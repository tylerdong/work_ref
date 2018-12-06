<!--待实验/原始记录-->
<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="main-left">
        <aside>
          <div class="select-box">
            <el-table :data="dicData" border
                      v-loading="loading.dic"
                      element-loading-text="拼命加载中"
                      highlight-current-row
                      @current-change="handleCurrentChange"
            >
              <el-table-column prop="name" label="标样名称"></el-table-column>
            </el-table>
          </div>
        </aside>
      </div>
      <div class="main-right">
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
            <el-button @click="addNewSample" type="primary">增加新标样</el-button>
          </div>
          <el-table :data="tableData" border v-loading="loading.list" element-loading-text="拼命加载中" style="margin-top: 4rem">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                {{ scope.row.status | toStatus }}
              </template>
            </el-table-column>
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
      <dialog-sample ref="refDoExperiment"></dialog-sample>
      <add-dialog @submitSuccess="getDictionaryMessage" ref="addDialog"></add-dialog>
    </div>
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
    created () {
    },
    data () {
      return {
        dicData: [],
//        search: {
//          startTime: '',
//          endTime: '',
//          sampPoint: '',
//        },
        tableData: [],
        loading: {
          list: false
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
      this.getDictionaryMessage()
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
      /* 获取左侧信息 */
      getDictionaryMessage () {
        this.loading.list = true
//        let params = {
//          queryLabOriginalPendingExperimentCo: {
//            startRegisterDate: new Date(this.search.startTime).getTime(),
//            endRegisterDate: new Date(this.search.endTime).getTime(),
//            samplingPosition: this.search.sampPoint
//          }
//        }
        api.chemicalLaboratory.LabOriginalPendingExperiment.getLabOriginalPendingExperimentByGuideSample().then(response => {
          const data = response.data
          if (data.success === true) {
            this.templateId = data.data[0].id
            this.dicData = data.data
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
          this.loading.list = false
        })
      },
      /* 新增标样 */
      addNewSample () {
        this.$refs.addDialog.show({title: '新增', name: ''})
        console.log('add')
      },
      getListData () {
        this.tableLoading = true
        let params = {
          queryLabOriginalPendingExperimentCo: {
            templateId: this.templateId
          },
          page: {
            current: this.page.current,
            length: this.page.size
          }
        }
        api.chemicalLaboratory.LabOriginalPendingExperiment.getLabOriginalPendingExperimentDetailsByGuideSample(params).then(response => {
          const data = response.data
          if (data.success === true) {
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
          this.tableLoading = false
        })
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
              api.chemicalLaboratory.LabOriginalPendingExperiment.cancelLabOriginalPendingExperimentDo(params).then(response => {
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

  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    background-color: #fff;
    color: #34799e;
    border-top: #3a98d0;
  }
</style>
