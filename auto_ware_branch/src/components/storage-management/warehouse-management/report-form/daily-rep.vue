<!--报表-->
<template>
  <div class="page-wrapper">
    <el-form :inline="true" :model="searchInfo" ref="ruleForm" :rules="rules">
      <el-form-item label="开始入库日期" prop="startInboundDate">
        <el-date-picker class="input-item" v-model="searchInfo.startInboundDate" type="date" placeholder="请选择开始入库日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="截止入库日期" prop="inboundDate">
        <el-date-picker class="input-item" v-model="searchInfo.inboundDate" type="date" :picker-options="endOption" placeholder="请选择截止入库日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="品名">
        <el-select v-model="searchInfo.productName" clearable placeholder="请选择品名" :loading="loading.productName" class="margin-right-1 margin-bottom-1">
          <el-option v-for="item in options.nameList" :key="item.id" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="批号">
        <el-select class="input-item" v-model="searchInfo.batchNo" placeholder="请选择批号" :loading="loading.batchNo" filterable clearable>
          <el-option v-for="item in options.batchNo" :key="item.batchNo" :label="item.batchNo"
                     :value="item.batchNo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格">
        <el-input class="input-item" v-model="searchInfo.spec" placeholder="规格"></el-input>
      </el-form-item>
      <el-form-item label="等级">
        <el-input class="input-item" v-model="searchInfo.level" placeholder="等级"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getData('ruleForm')" type="primary" :loading="loading.search">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="exportData" type="primary">导出excel</el-button>
      </el-form-item>
    </el-form>
    <div class="outer-div">
      <!--表格-->
      <table id="table" ref="table" v-if="Object.keys(tableData).length > 0" class="check_pending_table report-table">
        <tbody>
        <tr class="header-tr">
          <th>品名</th>
          <th>批号</th>
          <th>规格</th>
          <th>等级</th>
          <th>生产入库(KG)</th>
          <th>退货入库(KG)</th>
          <th>返修入库(KG)</th>
          <th>返修投料(KG)</th>
          <th>出库(KG)</th>
          <th>库存结存(件)</th>
          <th>库存结存重量(KG)</th>
          <th>期初结存(件)</th>
          <th>期初结存重量(KG)</th>
        </tr>
        <template v-for="(item, key) in tableData">
          <template v-for="obj in item">
            <tr>
              <td>{{key}}</td>
              <td>{{obj.batchNo}}</td>
              <td>{{obj.spec}}</td>
              <td>{{obj.level}}</td>
              <td>{{obj.productionInbound}}</td>
              <td>{{obj.refundInbound}}</td>
              <td>{{obj.reworkInbound}}</td>
              <td>{{obj.reworkFeeding}}</td>
              <td>{{obj.outbound}}</td>
              <td>{{obj.monthlyBalanceCount}}</td>
              <td>{{obj.monthlyBalanceWeight}}</td>
              <td>{{obj.preMonthlyBalanceCount}}</td>
              <td>{{obj.preMonthlyBalanceWeight}}</td>
            </tr>
          </template>
          <tr>
            <th colspan="3">{{key}}小计</th>
            <th>&nbsp;</th>
            <th>{{ item.reduce((acc, curr) => { return acc + curr.productionInbound }, 0) }}</th>
            <th>{{ item.reduce((acc, curr) => { return acc + curr.refundInbound }, 0) }}</th>
            <th>{{ item.reduce((acc, curr) => { return acc + curr.reworkInbound }, 0) }}</th>
            <th>{{ item.reduce((acc, curr) => { return acc + curr.reworkFeeding }, 0) }}</th>
            <th>{{ item.reduce((acc, curr) => { return acc + curr.outbound }, 0) }}</th>
            <th>{{ item.reduce((acc, curr) => { return acc + curr.monthlyBalanceCount }, 0) }}</th>
            <th>{{ item.reduce((acc, curr) => { return acc + curr.monthlyBalanceWeight }, 0) }}</th>
            <th>{{ item.reduce((acc, curr) => { return acc + curr.preMonthlyBalanceCount }, 0) }}</th>
            <th>{{ item.reduce((acc, curr) => { return acc + curr.preMonthlyBalanceWeight }, 0) }}</th>
          </tr>
        </template>
        <tr>
          <th colspan="4">总合计</th>
          <th>{{ Object.values(tableData).flatten().reduce((acc, curr) => { return acc + curr.productionInbound }, 0) }}</th>
          <th>{{ Object.values(tableData).flatten().reduce((acc, curr) => { return acc + curr.refundInbound }, 0) }}</th>
          <th>{{ Object.values(tableData).flatten().reduce((acc, curr) => { return acc + curr.reworkInbound }, 0) }}</th>
          <th>{{ Object.values(tableData).flatten().reduce((acc, curr) => { return acc + curr.reworkFeeding }, 0) }}</th>
          <th>{{ Object.values(tableData).flatten().reduce((acc, curr) => { return acc + curr.outbound }, 0) }}</th>
          <th>{{ Object.values(tableData).flatten().reduce((acc, curr) => { return acc + curr.monthlyBalanceCount }, 0) }}</th>
          <th>{{ Object.values(tableData).flatten().reduce((acc, curr) => { return acc + curr.monthlyBalanceWeight }, 0) }}</th>
          <th>{{ Object.values(tableData).flatten().reduce((acc, curr) => { return acc + curr.preMonthlyBalanceCount }, 0) }}</th>
          <th>{{ Object.values(tableData).flatten().reduce((acc, curr) => { return acc + curr.preMonthlyBalanceWeight }, 0) }}</th>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import * as api from 'src/api'
  import {TableExport} from 'tableexport'
  export default {
    components: {
      'search-dialog': require('./dialog-search.vue')
    },
    data () {
      return {
        tableData: {},
        endOption: {
          disabledDate: (time) => {
            if (this.searchInfo.startInboundDate) {
              return time.getTime() < this.searchInfo.startInboundDate.getTime()
            }
          }
        },
        searchInfo: {
          startInboundDate: '',
          inboundDate: '',
          productName: '',
          batchNo: '',
          spec: '',
          level: ''
        },
        rules: {
          startInboundDate: [{ type: 'date', required: true, message: '请选择开始入库日期', trigger: 'change' }],
          inboundDate: [{ type: 'date', required: true, message: '请选择结束入库日期', trigger: 'change' }]
        },
        options: {
          batchNo: [],
          nameList: []
        },
        loading: {
          search: false,
          productName: false
        }
      }
    },
    mounted () {
      this.getAllBatchNo()
      this.getNameList()
    },
    methods: {
      getNameList () {
        this.loading.productName = true
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
          this.loading.productName = false
        })
      },
      getAllBatchNo () {
        this.loading.batchNo = true
        api.storage.warehouseManagement.getAllBatch().then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.batchNo = data.data
          }
        }).finally(() => {
          this.loading.batchNo = false
        })
      },
      getData (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let param = {
              startDate: this.searchInfo.startInboundDate ? this.searchInfo.startInboundDate.getTime() : '',
              endDate: this.searchInfo.inboundDate ? this.searchInfo.inboundDate.getTime() : '',
              productName: this.searchInfo.productName,
              batchNo: this.searchInfo.batchNo,
              spec: this.searchInfo.spec,
              level: this.searchInfo.level
            }
            this.loading.search = true
            api.storage.warehouseManagement.getDailyReport(param).then(response => {
              let data = response.data
              if (data.messageType === 1) {
                this.tableData = data.data
              } else {
                this.$message({type: 'error', message: data.message})
              }
            }).catch(e => {
              console.log(e)
            }).finally(() => {
              this.loading.search = false
            })
          }
        })
      },
      exportData () {
        if (Object.keys(this.tableData).length > 0) {
          let instance = new TableExport(this.$refs.table, {
            formats: ['xlsx'],
            filename: '产量日报表',
            exportButtons: false,
            charset: 'GBK'
          })
          let exportData = instance.getExportData()['table']['xlsx']
          instance.export2file(exportData.data, exportData.mimeType, exportData.filename, exportData.fileExtension)
        }
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
  .noTable {
    border: 1px solid rgb(223, 230, 236);
    height: 60px;
    line-height: 60px;
    text-align: center;
    color:rgb(94, 116, 130)
  }
  .action-bar {
    padding: 10px 0;
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

  .outer-div {
    overflow-x: auto;
  }
</style>

