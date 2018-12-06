<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="flex-div-row">
        <el-form ref="form" :inline="true" :model="search" :rules="rules" label-width="100px">
          <el-form-item prop="groupId">
            <el-select class="material-form-item" v-model="search.groupId" clearable placeholder="请选择分类"
                       @change="groupChange" :loading="loading.group">
              <el-option v-for="item in options.group" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="templateId">
            <el-select class="material-form-item" v-model="search.templateId" clearable placeholder="请选择报告单"
                       :loading="loading.group">
              <el-option v-for="item in options.template" :key="item.id" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="startRegisterDate">
            <el-date-picker class="search-input search-margin" v-model="search.startRegisterDate" type="date"
                            placeholder="选择开始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="endRegisterDate">
            <el-date-picker class="search-input search-margin" v-model="search.endRegisterDate" type="date"
                            placeholder="选择结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入采样点" v-model="samplingPosition"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="searchList" type="primary" :loading="loading.search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="showGraphical" type="primary">图形报表</el-button>
          </el-form-item>
          <!--<el-form-item>-->
            <!--<el-button @click="downLoadExcel" type="primary">下载</el-button>-->
          <!--</el-form-item>-->
            <!--<a ref="refDownload" :href="fileHref"></a>-->
        </el-form>
        <table class="check_pending_table report-table" v-if="table.tableData.length > 0">
          <!--表头-->
          <tr>
            <th><input type="checkbox" v-model="checkAll" @click="checkItem(0)" class="input-checkbox"/></th>
            <th v-for="(item, index) in table.tableColumns">{{item}}</th>
          </tr>
          <tr v-for="(item, index) in table.tableData">
            <td><input type="checkbox" v-model="item.checked" @click="checkItem(index + 1)" class="input-checkbox"/>
            </td>
            <td>{{item.nodeName}}</td>
            <td v-for="subItem in item.labRptMonthTrendGroupNodeVos">{{subItem.value}}</td>
          </tr>
        </table>
        <div v-else class="no-data">暂无数据</div>
      </div>
    </div>
    <dialog-trend-graphical ref="dialogTrend" :renderData="renderData"></dialog-trend-graphical>
  </div>
</template>

<script>
  import * as api from 'src/api'

  export default {
    components: {
      'dialog-trend-graphical': require('./dialog-trend-graphical')
    },
    data () {
      return {
        samplingPosition: '',
        search: {
          groupId: '',
          templateId: '',
          startRegisterDate: '',
          endRegisterDate: ''
        },
        options: {group: [], template: []},
        loading: {
          group: false,
          search: false,
          table: false
        },
        checkAll: false,
        rules: {
          groupId: [{required: true, message: '请选择分类', trigger: 'blur change'}],
          templateId: [{required: true, message: '请选择报告单', trigger: 'blur'}],
          startRegisterDate: [{type: 'date', required: true, message: '请选择开始日期', trigger: 'change'}],
          endRegisterDate: [{type: 'date', required: true, message: '请选择结束日期', trigger: 'change'}]
        },
        table: {tableData: [], tableColumns: []},
        renderData: {},
        fileHref: ''
      }
    },
    watch: {
      'options.template': 'updatetemplate'
    },
    mounted () {
      this.getGroups()
    },
    methods: {
      updatetemplate () {
        this.search.templateId = ''
      },
      getGroups () {
        let params = {
          page: {current: 1, length: 1000},
          queryLabDataGroupDicCo: {type: 'LAB_RPT_TEMPLATE'}
        }
        this.loading.group = false
        api.chemicalLaboratory.classify.getLabDataGroupDicDoList(params).then((response) => {
          const data = response.data
          if (data.success === true && data.data.data) {
            this.options.group = data.data.data
          } else {
            this.options.group = []
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.group = false
        })
      },
      groupChange (value) {
        this.loading.template = false
        let param = {queryLabRptlTemplateCo: {groupId: value}}
        api.chemicalLaboratory.labReportManage.getLabRptTemplateDoList(param).then(response => {
          const data = response.data
          if (data.success === true && data.data.data) {
            this.options.template = data.data.data
          } else {
            this.options.template = []
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading.template = true
        })
      },
      searchList () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let param = {
              samplingPosition: this.samplingPosition,
              templateId: this.search.templateId,
              startRegisterDate: new Date(this.search.startRegisterDate).getTime(),
              endRegisterDate: new Date(this.search.endRegisterDate).getTime()
            }
            this.loading.search = true
            api.chemicalLaboratory.labRptRecordController.getLabRptMonthTrendGroup(param).then(response => {
              const data = response.data
              if (data.success === true && data.data) {
                data.data.labRptMonthTrendGroupVos.forEach(item => {
                  this.$set(item, 'checked', false)
                })
                this.table.tableData = data.data.labRptMonthTrendGroupVos
                this.table.tableColumns = data.data.labRptMonthTrendGroupVos[0].labRptMonthTrendGroupNodeVos.map(item => {
                  return item.nodeName
                })
                this.table.tableColumns.unshift('日期')
              } else {
                this.table.tableData = []
              }
            }).catch(error => {
              console.log(error)
            }).finally(() => {
              this.loading.search = false
            })
          }
        })
      },
      checkItem (index) {
        this.$nextTick(() => {
          if (index === 0) {
            this.table.tableData.forEach(item => {
              item.checked = this.checkAll
            })
          } else {
            this.checkAll = this.table.tableData.every(item => {
              return item.checked
            })
          }
        })
      },
      showGraphical () {
        if (this.table.tableData.length > 0 && this.table.tableData.some(item => { return item.checked })) {
          this.$refs.dialogTrend.show(this.deepClone(this.table))
        } else {
          this.$message.error('请选择数据')
        }
      },
      downLoadExcel () {
        if (this.table.tableData.length > 0 && this.table.tableData.some(item => { return item.checked })) {
          // TODO
          this.$refs.refDownload.click()
        } else {
          this.$message.error('请选择数据')
        }
      }
    }
  }
</script>

<style scoped>

  table {
    color: #333333;
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
    width: 100%;
  }

  table th {
    border-width: 1px;
    padding: 3px;
    border-style: solid;
    border-color: #666666;
    background-color: #dedede;
    text-align: center;
  }

  table td {
    border-width: 1px;
    padding: 3px;
    border-style: solid;
    border-color: #666666;
    background-color: #ffffff;
    text-align: center;
  }

  .no-data {
    width: 100%;
    text-align: center;
  }
</style>
