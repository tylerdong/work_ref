<!--下机产量日报表-->
<template>
  <div class="page-wrapper" v-loading="loading.all">
    <el-form :inline="true" :rules="rules" :model="searchInfo" ref="ruleForm">
      <el-form-item>
        <el-select v-model="searchInfo.workShopId" placeholder="请选择车间" clearable>
          <el-option v-for="item in options.workshop" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchInfo.productName" clearable placeholder="请选择品名" :loading="loading.productName" class="margin-right-1 margin-bottom-1">
          <el-option v-for="item in options.nameList" :key="item.id" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchInfo.classCode" placeholder="请选择班组" clearable>
          <el-option v-for="item in options.classes" :key="item.id" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="startInboundDate">
        <el-date-picker class="width1" v-model="searchInfo.startInboundDate" type="date" placeholder="请选择开始入库日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="inboundDate">
        <el-date-picker class="width1" v-model="searchInfo.inboundDate" type="date" :picker-options="endOption"
                        placeholder="请选择截止入库日期">
        </el-date-picker>
      </el-form-item>
      <!--<el-form-item prop="startScanTime">-->
        <!--<el-date-picker v-model="searchInfo.startScanTime" type="datetime" placeholder="请选择扫码开始时间">-->
        <!--</el-date-picker>-->
      <!--</el-form-item>-->
      <!--<el-form-item prop="endScanTime">-->
        <!--<el-date-picker v-model="searchInfo.endScanTime" type="datetime" :picker-options="scanEndOption"-->
                        <!--placeholder="请选择扫码结束时间">-->
        <!--</el-date-picker>-->
      <!--</el-form-item>-->
      <el-form-item label="是否SAP同步" prop="isInventory">
        <el-checkbox v-model="searchInfo.isInventory"></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-popover placement="top-start" title="报表信息" width="200" trigger="hover" content="车间下机产量日报表">
          <el-button @click="search('ruleForm')" type="primary" slot="reference" :loading="loading.search">查询</el-button>
        </el-popover>
      </el-form-item>
      <el-form-item>
        <el-button @click="exportData('ruleForm')" type="primary">导出excel</el-button>
      </el-form-item>
    </el-form>
    <div class="ourter-div">
    <table id="table" ref="table" class="check_pending_table">
      <tbody>
        <tr>
          <th>车间</th>
          <th>机号</th>
          <th>品名</th>
          <th>规格</th>
          <th>批号</th>
          <th>AA(KG)</th>
          <th>A(KG)</th>
          <th>B(KG)</th>
          <th>C(KG)</th>
          <th>合计(KG)</th>
          <th>合计(件)</th>
          <th>筒管数</th>
          <th>优等率</th>
          <th>壹等率</th>
        </tr>
        <template v-for="data in tableData">
          <template v-for="list in data.lineReportVoList">
            <tr v-for="item in list.lineReportDetailVoList">
              <td>{{data.workShopName}}</td>
              <td>{{item.lineName}}</td>
              <td>{{item.productName}}</td>
              <td>{{item.spec}}</td>
              <td>{{item.batchNo}}</td>
              <td>{{item.countWeightAA}}</td>
              <td>{{item.countWeightA}}</td>
              <td>{{item.countWeightB}}</td>
              <td>{{item.countWeightC}}</td>
              <td>{{item.countWeight}}</td>
              <td>{{item.countAmount}}</td>
              <td>{{item.bobbinNumber}}</td>
              <td>{{item.goodRate}}</td>
              <td>{{item.firstClassRate}}</td>
            </tr>
            <tr>
              <th>{{data.workShopName}}</th>
              <th>{{data.lineName}}</th>
              <th></th>
              <th>机台小计</th>
              <th></th>
              <th>{{list.countWeightAA}}</th>
              <th>{{list.countWeightA}}</th>
              <th>{{list.countWeightB}}</th>
              <th>{{list.countWeightC}}</th>
              <th>{{list.countWeight}}</th>
              <th>{{list.countAmount}}</th>
              <th>{{list.bobbinNumber}}</th>
              <th>{{list.goodRate}}</th>
              <th>{{list.firstClassRate}}</th>
            </tr>
          </template>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th>合计</th>
            <th></th>
            <th>{{data.countWeightAA}}</th>
            <th>{{data.countWeightA}}</th>
            <th>{{data.countWeightB}}</th>
            <th>{{data.countWeightC}}</th>
            <th>{{data.countWeight}}</th>
            <th>{{data.countAmount}}</th>
            <th>{{data.bobbinNumber}}</th>
            <th>{{data.goodRate}}</th>
            <th>{{data.firstClassRate}}</th>
          </tr>
        </template>
      </tbody>
    </table>
    </div>
    </div>
</template>

<script>
  import * as api from 'src/api/index'
  import {TableExport} from 'tableexport'
  export default {
    components: {},
    data () {
      return {
        searchInfo: {
          workShopId: '',
          productName: '',
          classCode: '',
          startInboundDate: '',
          startScanTime: '',
          endScanTime: '',
          inboundDate: '',
          isInventory: true
        },
        rules: {
          startInboundDate: [{type: 'date', required: true, message: '请选择开始入库日期', trigger: 'change'}],
          inboundDate: [{type: 'date', required: true, message: '请选择结束入库日期', trigger: 'change'}]
        },
        options: { workshop: [], classes: [], nameList: [] },
        filename: '车间下机产量日报表.xls',
        loading: {
          workshop: false,
          classes: false,
          search: false,
          productName: false
        },
        tableData: [],
        endOption: {
          disabledDate: (time) => {
            if (this.searchInfo.startInboundDate) {
              return time.getTime() < this.searchInfo.startInboundDate.getTime()
            }
          }
        },
        scanEndOption: {
          disabledDate: (time) => {
            if (this.searchInfo.startScanTime) {
              return time.getTime() < this.searchInfo.startScanTime.getTime()
            }
          }
        }
      }
    },
    mounted () {
      this.getAllWorkshopList()
      this.getAllClasses()
      this.getNameList()
    },
    methods: {
      getAllWorkshopList () {
        this.loading.workshop = true
        api.storage.warehouseManagement.getAllWorkshop({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.workshop = data.data
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.loading.workshop = false
        })
      },
      getNameList () {
        this.search.nameList = true
        api.automatic.dictionary.getAllProductTypeList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.nameList = data.data
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.search.nameList = false
        })
      },
      getAllClasses () {
        this.loading.classes = true
        api.automatic.dictionary.getAllClassesList({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.classes = data.data
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).finally(() => {
          this.loading.classes = false
        })
      },
      search (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.loading.search = true
            let params = {
              workShopId: this.searchInfo.workShopId,
              classCode: this.searchInfo.classCode,
              productName: this.searchInfo.productName,
              startTime: this.searchInfo.startInboundDate ? this.searchInfo.startInboundDate.getTime() : '',
              endTime: this.searchInfo.inboundDate ? this.searchInfo.inboundDate.getTime() : '',
              // startScanTime: this.searchInfo.startScanTime ? this.startScanTime.getTime() : '',
              // endScanTime: this.searchInfo.endScanTime ? this.endScanTime.getTime() : '',
              isInventory: this.searchInfo.isInventory ? 'Y' : 'N'
            }
            api.storage.warehouseManagement.getWorkShopReport(params).then(response => {
              let data = response.data
              if (data.messageType === 1) {
                this.tableData = data.data
                console.log(this.tableData)
              } else {
                this.$message({type: 'error', message: data.message})
              }
            }).catch(error => {
              console.log(error)
            }).finally(() => {
              this.loading.search = false
            })
          }
        })
      },
      exportData (formName) {
        this.$refs[formName].validate(valid => {
          if (this.tableData.length > 0) {
            let instance = new TableExport(this.$refs.table, {
              formats: ['xlsx'],
              filename: '下机产量日报表',
              exportButtons: false,
              charset: 'GBK'
            })
            let exportData = instance.getExportData()['table']['xlsx']
            instance.export2file(exportData.data, exportData.mimeType, exportData.filename, exportData.fileExtension)
          }
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .page-wrapper {
    margin: 10px;
    padding: 10px;
    border-radius: 3px;
    background-color: #fff;
  }

  .action-bar {
    padding: 10px 0;
  }
  .ourter-div {
    overflow-x: auto;
  }

  .check_pending_table {
    border: 1px solid #f9f9f9;
    border-radius: 5px;
    min-width: 100%;
  }

  .check_pending_table tr th {
    min-width: 80px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #ccc;
  }

  .check_pending_table tr td {
    min-width: 80px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #ccc
  }
</style>
