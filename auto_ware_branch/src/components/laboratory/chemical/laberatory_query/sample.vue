<!--实验查询/报告单-->
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
          <el-button @click="batchView(checked)" type="primary">批量查看</el-button>
          </div>
          <el-table :data="tableData" border v-loading="loading.list" element-loading-text="拼命加载中"
                    @selection-change="handleSelectionChange" ref="multipleTable" style="margin-top: 20px">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="register" label="登记人"></el-table-column>
            <el-table-column label="登记时间">
              <template slot-scope="scope">
                {{ scope.row.registerDate | timeFormat('YYYY-MM-DD HH:mm') }}
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="originLook(scope)" type="text" size="small" >查看</el-button>
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
    <dialog-look ref="recordLook"></dialog-look>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    components: {
      'dialog-look': require('./dialog-sample-look.vue')
    },
    created () {},
    data () {
      return {
        search: {
          startTime: '',
          endTime: '',
          sampPoint: '',
          sampleId: ''
        },
        dicData: [],
        templateId: '',
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
        checked: []
      }
    },
    props: {},
    mounted () {
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
        api.chemicalLaboratory.labOriginalRecordController.getLabTemplateVoListByGuideSample().then(response => {
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
      getListData () { // 获取列表结构
        this.loading.list = true
        let params = {
          queryLabOriginalRecordCo: {
            templateId: this.templateId,
            isGuideSample: 'Y'
          },
          page: {
            current: this.page.current,
            length: this.page.size
          }
        }
        api.chemicalLaboratory.labOriginalRecordController.getLabOriginalRecordDoList(params).then(response => {
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
      batchView (data) {
        if (data.length > 0) {
          this.$refs.recordLook.showSelect(data)
        } else {
          this.$message.error('请先选择您要查看的数据！')
        }
      },
      searchList () {
      },
      handleCurrentChange (dictionaryCurrent) {
        this.templateId = dictionaryCurrent.id
        this.getListData()
      },
      handleSelectionChange (val) {
        this.checked = val
      },
      originLook (data) {
        this.selected = []
        this.selected.push(data.row)
        this.$refs.recordLook.showSelect(this.selected)
      }
    }
  }
</script>
<style scoped>

  .main-left {
    width: 20%;
    float: left;
    /*margin: 10px;*/
  }

  .main-right {
    width: 76%;
    float: right;
    overflow-x: auto;
    /*margin: 10px;*/
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
