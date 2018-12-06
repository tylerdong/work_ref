<template>
  <div>
    <!--<main-breadcrumb nameId="020304"></main-breadcrumb>-->
    <div class="hy-admin__main-container">
      <div class="form-padding">
        <el-form :inline="true" :model="search" ref="search" label-width="100px">
          <el-form-item label="接收者">
            <el-select v-model="search.accepter" filterable clearable :remote="true" reserve-keyword :required="false"
                       @focus="getConfigPerson('')" :loading="loading.accepter" placeholder="请输入规则类型"
                       class="input-item-16">
              <el-option v-for="(item, index) in options.receivers" :key="index" :label="item.employeeName"
                         :value="item.employeeId"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="规则类型">
            <el-select v-model="search.kpiRuleType" filterable clearable :remote="true" reserve-keyword
                       @focus="getKpiType('')" :loading="loading.kpiRuleType" placeholder="请输入规则类型"
                       class="input-item-16">
              <el-option v-for="(item, index) in options.typeCodes" :key="index" :label="index"
                         :value="item[0].kpiTypeCode"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="开始发送时间" prop="startSendTime">
            <el-date-picker v-model="search.startSendTime" type="datetime" placeholder="请选择开始时间" class="input-item-16">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="结束发送时间" prop="startSendTime">
            <el-date-picker v-model="search.endSendTime" type="datetime" placeholder="请选择结束时间" class="input-item-16">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="是否发送成功">
            <el-checkbox v-model="search.noticeStatus" true-label="OK" false-label="WAIT"></el-checkbox>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="getData" :loading="loading.search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-table :data="tableData" border style="width: 100%" element-loading-text="拼命加载中">
        <el-table-column prop="accepter" label="接收者"></el-table-column>
        <el-table-column prop="kpiRuleType" label="规则" width="150"></el-table-column>
        <el-table-column label="是否成功" width="80">
          <template slot-scope="scope">
            {{scope.row.noticeStatus | booleanFormat}}
          </template>
        </el-table-column>
        <el-table-column label="生成时间">
          <template slot-scope="scope">
            {{scope.row.dataCreateTime | timeFormat('YYYY-MM-DD HH:mm')}}
          </template>
        </el-table-column>
        <el-table-column label="发送时间">
          <template slot-scope="scope">
            {{scope.row.sendTime | timeFormat('YYYY-MM-DD HH:mm')}}
          </template>
        </el-table-column>
        <el-table-column prop="actualValue" label="实际值"></el-table-column>
        <el-table-column prop="sendContent" label="发送内容" width="200"></el-table-column>
        <el-table-column prop="thresholdValue" label="阈值区间"></el-table-column>
      </el-table>

      <div class="hy-admin__pagination-wrapper">
        <el-pagination
          class="fr"
          :current-page="page.currentPage"
          :page-sizes="[20, 30, 40, 50]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from '../../../api/index'
  // import dateFns from 'date-fns'

  export default {
    components: {},
    data () {
      return {
        search: {
          accepter: '',
          kpiRuleType: '',
          noticeStatus: 'OK',
          startSendTime: '',
          endSendTime: ''
        },
        rules: {
          startSendTime: [
            {
              required: false,
              trigger: 'blur change',
              validator: (rule, value, callback) => {
                if (value && this.form.endSendTime) {
                  console.log(value, this.form.endSendTime)
                  callback()
                }
              }
            }],
          endSendTime: [
            {
              required: false,
              trigger: 'blur change',
              validator: (rule, value, callback) => {
                if (value && this.form.endSendTime) {
                  console.log(value, this.form.startSendTime)
                  callback()
                }
              }
            }]
        },
        tableData: [],
        options: {typeCodes: [], receivers: []},
        page: {currentPage: 1, total: 0, pageSize: 20},
        loading: {kpiRuleType: false, search: false}
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getKpiType (val) {
        this.loading.kpiRuleType = true
        this.options.typeCodes = {}
        api.dataAnalysis.getKpiType({name: val}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            for (let [key, value] of Object.entries(data.data)) {
              if (key.toLowerCase().indexOf(val.toLowerCase()) > -1) {
                this.options.typeCodes[key] = value
              }
            }
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.kpiRuleType = false
        })
      },
      // 获取发送员工
      getConfigPerson (val) {
        api.dataAnalysis.dataDictionarygetAccepterMessage({name: val}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.receivers = data.data
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).finally(() => {
        })
      },

      getData () {
        this.$refs.search.validate(valid => {
          if (valid) {
            this.loading.search = true
            this.page.total = 0
            this.tableData = []
            let param = {
              accepter: this.search.accepter,
              kpiRuleTypeCode: this.search.kpiRuleType,
              noticeStatus: this.search.noticeStatus,
              startSendTime: this.search.startSendTime ? this.search.startSendTime.getTime() : '',
              endSendTime: this.search.endSendTime ? this.search.endSendTime.getTime() : '',
              pageIndex: this.page.currentPage,
              pageCount: this.page.pageSize
            }
            api.dataAnalysis.getMessageRecordList(param).then(response => {
              const data = response.data
              if (data.messageType === 1) {
                this.tableData = data.data.list
                this.page.total = data.data.count
              } else {
                this.$message({type: 'error', message: data.message})
              }
            }).finally(() => {
              this.loading.search = false
            })
          }
        })
      },

      handleSizeChange (val) {
        this.page.pageSize = val
        this.getData()
      },
      handleCurrentChange (val) {
        this.page.currentPage = val
        this.getData()
      }
    }
  }
</script>
<style scoped lang="scss">
  .tags {
    margin-right: 10px
  }
</style>
