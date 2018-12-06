<!-- 统计报表 -- 质量报表 -->
<template>
  <div>
    <!--<breadcrumb name-id="020902"></breadcrumb>-->
    <div class="content">

      <el-form :inline="true" :model="search" :rules="rules" ref="search" label-width="100px" class="demo-ruleForm">
        <el-form-item label="" prop="startTime">
          <el-date-picker
            v-model="search.startTime"
            class="margin-right-1 margin-bottom-1"
            type="date"
            @change="startChange"
            placeholder="开始结算日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="" prop="overTime">
          <el-date-picker
            v-model="search.overTime"
            class="margin-right-1 margin-bottom-1"
            type="date"
            @change="overChange"
            placeholder="结束结算日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="" prop="workshop">
          <el-select v-model="search.workshop" clearable placeholder="请选择车间" class="margin-right-1 margin-bottom-1">
            <el-option
              v-for="item in search.workshopList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="name">
          <el-select v-model="search.name" clearable placeholder="请选择品名" class="margin-right-1 margin-bottom-1">
            <el-option
              v-for="item in search.nameList"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="" prop="platform">-->
          <!--<el-input v-model="search.platform" placeholder="请输入机台"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="" prop="number">
          <el-autocomplete
            class="inline-input"
            v-model="search.number"
            :fetch-suggestions="getNumberList"
            placeholder="请输入批号"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="margin-bottom-1" :loading="search.loading" @click="submitForm('search')">
            查询</el-button>
              <el-popover
                placement="top-start"
                title="提示"
                width="200"
                trigger="hover"
                v-model="value">
                <span ref="text">点击查看这是什么报表？</span>
                <span slot="reference" class="fa fa-info-circle fa-lg" style="cursor: pointer;outline:none;vertical-align: middle;color: #3b9dd8" @click="showinfo"></span>
              </el-popover>
          <el-button type="primary" class="margin-bottom-1" :loading="search.exporting" @click="btnExport('search')">
            导出</el-button>
          <el-button type="primary" class="margin-bottom-1" :loading="search.exporting" @click="showWeightColumn">
            {{switchToWeight.searchTip}}</el-button>
        </el-form-item>
      </el-form>

      <el-table
        v-for="item in table.list"
        :key="item.id"
        :data="item.outputReports"
        :show-header="item.showHeader"
        border
        v-loading="table.loading"
        sum-text="总计"
        style="width: 100%">

        <el-table-column prop="index" label="序号" width="70px"></el-table-column>
        <!--<el-table-column prop="item" label="机号"></el-table-column>-->
        <el-table-column prop="productTypeName" label="品名"></el-table-column>
        <el-table-column prop="spec" label="规格"></el-table-column>
        <el-table-column prop="batchNo" label="批号"></el-table-column>
        <el-table-column :prop="switchToWeight.AA" :label="switchToWeight.titleAA"></el-table-column>
        <el-table-column :prop="switchToWeight.A" :label="switchToWeight.titleA"></el-table-column>
        <el-table-column :prop="switchToWeight.B" :label="switchToWeight.titleB"></el-table-column>
        <el-table-column :prop="switchToWeight.C" :label="switchToWeight.titleC"></el-table-column>
        <el-table-column :prop="switchToWeight.SUM" :label="switchToWeight.titleSum"></el-table-column>
        <el-table-column prop="_primeRate" label="优等率(%)"></el-table-column>
        <el-table-column prop="_firstRate" label="一等率"></el-table-column>
      </el-table>

      <el-table
        :data="table.sum"
        :show-header=false
        border
        v-loading="table.loading"
        style="width: 100%">

        <el-table-column prop="index" label="序号" width="70px"></el-table-column>
        <!--<el-table-column prop="item" label="机号"></el-table-column>-->
        <el-table-column prop="productTypeName" label="品名"></el-table-column>
        <el-table-column prop="spec" label="规格"></el-table-column>
        <el-table-column prop="batchNo" label="批号"></el-table-column>
        <el-table-column :prop="switchToWeight.AA" sortable :label="switchToWeight.titleAA"></el-table-column>
        <el-table-column :prop="switchToWeight.A" sortable :label="switchToWeight.titleA"></el-table-column>
        <el-table-column :prop="switchToWeight.B" sortable :label="switchToWeight.titleB"></el-table-column>
        <el-table-column :prop="switchToWeight.C" sortable :label="switchToWeight.titleC"></el-table-column>
        <el-table-column :prop="switchToWeight.SUM" :label="switchToWeight.titleSum"></el-table-column>
        <el-table-column prop="_primeRate" label="优等率(%)"></el-table-column>
        <el-table-column prop="_firstRate" label="一等率"></el-table-column>
      </el-table>

    </div>

    <!-- 导出 -->
    <a ref="refDownload" :href="download.href"></a>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    components: {
      // 'breadcrumb': require('../../../common/breadcrumb.vue')
    },
    mounted () {
      this.getData()
      this.getWorkshopList()
      this.getNameList()
      this.getAllBatchList()
    },
    data () {
      return {
        value: false,
        rules: {
          startTime: [
            {required: true, message: '请选择开始结算日期', trigger: 'blur change'}
          ],
          overTime: [
            {required: true, message: '请选择结束结算日期', trigger: 'blur change'}
          ],
          workshop: [
            {required: true, message: '请选择车间', trigger: 'blur change'}
          ]
        },
        search: {
          exporting: false,
          loading: false,
          startTime: '',
          overTime: '',
          workshop: '',
          workshopList: [],
          workshopLoading: false,
          name: '',
          nameList: [],
          nameLoading: false,
          platform: '',
          platformList: [],
          platformLoading: false,
          number: '',
          numberList: [],
          numberLoading: false,
          numberTimeOut: ''
        },
        switchToWeight: {
          searchTip: '显示重量',
          AA: 'amountAA',
          A: 'amountA',
          B: 'amountB',
          C: 'amountC',
          SUM: 'amount',
          titleAA: 'AA(锭)',
          titleA: 'A(锭)',
          titleB: 'B(锭)',
          titleC: 'C(锭)',
          titleSum: '合计(锭)'
        },
        download: {
          href: ''
        },
        table: {
          loading: false,
          list: [],
          sum: []
        },
        page: {
          currentPage: 1,
          sizes: [15, 30, 50, 100],
          size: 15,
          total: 0
        }
      }
    },
    methods: {
      showinfo () {
        this.$refs.text.innerHTML = '查询中... <i class="fa fa-spinner fa-pulse fa-lg"></i>'
        setTimeout(() => {
          this.value = false
          this.$notify({
            title: '报表信息',
            message: '将织袜/测纤/染判/降等/物检/剥丝实时产生的生产数据(每天凌晨1点同步一次)按照条件查询出来'
          })
          this.$refs.text.innerHTML = '这是什么报表？'
        }, 100)
      },
      getData () {
        this.table.loading = true
        let params = {
          startDate: this.search.startTime,
          endDate: this.search.overTime,
          workshopId: this.search.workshop,
          productTypeName: this.search.name,
          // item: this.search.platform,
          batchNo: this.search.number
        }
        this.table.list = []
        this.table.sum = []
        api.automatic.statement.getOutputReportDataByParameters(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            data.data.outputReportCountBo.index = '总计'
            data.data.outputReportCountBo._primeRate = data.data.outputReportCountBo.primeRate.toFixed(2)
            data.data.outputReportCountBo._firstRate = data.data.outputReportCountBo.firstRate.toFixed(2)
            this.table.sum.push(data.data.outputReportCountBo)
            // 列表及小计数据
            let tableList = data.data.outputReportBos
            for (let index in tableList) {
              if (index === '0') { // 表单标题是否显示
                tableList[index].showHeader = true
              } else {
                tableList[index].showHeader = false
              }
              for (let chil of tableList[index].outputReports) {
                chil._primeRate = chil.primeRate.toFixed(2)
                chil._firstRate = chil.firstRate.toFixed(2)
              }
              tableList[index].outputReports.forEach((item, i) => { item.index = i + 1 })
              tableList[index].outputReportCountBo.index = tableList[index].outputReportCountBo.countName
              tableList[index].outputReportCountBo._primeRate = tableList[index].outputReportCountBo.primeRate.toFixed(2)
              tableList[index].outputReportCountBo._firstRate = tableList[index].outputReportCountBo.firstRate.toFixed(2)
              tableList[index].outputReports.push(tableList[index].outputReportCountBo)
              this.table.list.push(tableList[index])
            }
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.table.loading = false
          this.search.loading = false
        })
      },

      /* 获取车间下拉列表 */
      getWorkshopList () {
        this.search.workshopLoading = true
        api.automatic.dictionary.getAllWorkshopList({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.search.workshopList = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.search.workshopLoading = false
        })
      },

      /* 获取品名下拉列表 (获取所有产品分类) */
      getNameList () {
        this.search.nameLoading = true
        api.automatic.dictionary.getAllProductTypeList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.search.nameList = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.search.nameLoading = false
        })
      },
      getAllBatchList () { // 获取所有批号
        api.automatic.dictionary.getAllBatchList({}).then(response => {
          if (response.data.messageType === 1) {
            for (let item of response.data.data) {
              item.value = item.batchNo
              this.search.numberList.push(item)
            }
            return true
          }
          if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
            return true
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
        })
      },

      handleSelect (val) {
      },

      /* 获取批号搜索建议 */
      getNumberList (queryString, cb) {
        if (queryString) {
          let result = this.search.numberList.filter(item => {
            if (item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1) {
              return true
            } else {
              return false
            }
          })
          cb(result)
        } else {
          cb(this.search.numberList)
        }
//        clearTimeout(this.search.numberTimeOut)
//        this.search.numberTimeOut = setTimeout(() => {
//          /* 这里写API  */
//          cb(this.search.numberList = [
//            {value: '123'},
//            {value: '1231'},
//            {value: '12'},
//            {value: '1234'},
//            {value: '12345'}
//          ])
//        }, 800)
      },

      /* 搜索 */
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.search.loading = true
            this.getData()
          } else {
            return false
          }
        })
      },
      startChange (val) {
        this.search.startTime = val
      },
      overChange (val) {
        this.search.overTime = val
      },
      btnExport (formName) { // 导出
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.search.exporting = true
            let params = {
              startDate: this.search.startTime,
              endDate: this.search.overTime,
              workshopId: this.search.workshop,
              productTypeName: this.search.name,
              // item: this.search.platform,
              batchNo: this.search.number
            }
            api.automatic.statement.exportOutputReportDataByParameters(params).then(response => {
              if (response.data.messageType === 1) {
                if (response.data.data) {
                  this.download.href = response.data.data
                  this.$nextTick(() => {
                    this.$refs.refDownload.click()
                  })
                }
                return true
              }
              if (response.data.messageType === 2) {
                this.$message.error(response.data.message)
                return true
              }
            }).catch(e => {
              console.error(e)
            }).finally(() => {
              this.search.exporting = false
            })
          } else {
            return false
          }
        })
      },
      // 显示重量数据列
      showWeightColumn () {
        let isSwitch = this.switchToWeight.searchTip === '显示重量'
        this.switchToWeight.searchTip = isSwitch ? '显示锭数' : '显示重量'
        this.switchToWeight.AA = isSwitch ? 'weightAA' : 'amountAA'
        this.switchToWeight.A = isSwitch ? 'weightA' : 'amountA'
        this.switchToWeight.B = isSwitch ? 'weightB' : 'amountB'
        this.switchToWeight.C = isSwitch ? 'weightC' : 'amountC'
        this.switchToWeight.SUM = isSwitch ? 'weight' : 'amount'
        this.switchToWeight.titleAA = isSwitch ? 'AA(kg)' : 'AA(锭)'
        this.switchToWeight.titleA = isSwitch ? 'A(kg)' : 'A(锭)'
        this.switchToWeight.titleB = isSwitch ? 'B(kg)' : 'B(锭)'
        this.switchToWeight.titleC = isSwitch ? 'C(kg)' : 'C(锭)'
        this.switchToWeight.titleSum = isSwitch ? '合计(kg)' : '合计(锭)'
      }
    }
  }
</script>
<style lang="scss" scoped>
  .content {
    background: #fff;
    border: 1px solid #dee4ec;
    margin: 10px 10px;
    padding: 10px;
    border-radius: 0 5px 5px 5px;
  }

  .width-1 {
    width: 240px;
  }

  .margin-right-1 {
    margin-right: 5px;
  }

  .margin-bottom-1 {
    margin-bottom: 5px;
  }
</style>
