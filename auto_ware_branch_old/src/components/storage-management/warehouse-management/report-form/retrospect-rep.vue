<!--追溯表-->
<template>
  <div class="page-wrapper" v-loading="loading.all">
    <el-form :inline="true">
      <el-form-item>
        <el-select v-model="searchInfo.lgort" v-loading="loading.lgort" placeholder="请选择库存地点" clearable>
          <el-option v-for="item in options.lgort" :key="item.lgort" :label="item.lgobe" :value="item.lgort"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchInfo.productName" placeholder="请选择品名" clearable>
          <el-option v-for="item in options.nameList" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input class="width1" v-model="searchInfo.operator" placeholder="业务员"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input class="width1" v-model="searchInfo.customer" placeholder="客户名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input class="width1" v-model="searchInfo.deliveryNo" placeholder="发货单"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input class="width1" v-model="searchInfo.spec" placeholder="规格"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchInfo.batchNo" placeholder="请选择批号" :loading="loading.batchNo" filterable clearable>
          <el-option v-for="item in options.batchNo" :key="item.batchNo" :label="item.batchNo" :value="item.batchNo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input class="width1" v-model="searchInfo.grade" placeholder="等级"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="searchInfo.startTime" placeholder="选择开始日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="searchInfo.endTime" :picker-options="endOption" placeholder="选择结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" type="primary">查询</el-button>
        <el-popover placement="top-start" title="提示" width="200" trigger="hover" v-model="value" ref="pop">
          <span ref="text">点击查看这是什么报表？</span>
          <span slot="reference" class="fa fa-info-circle fa-lg" style="cursor: pointer;outline:none;vertical-align: middle;color: #3b9dd8" @click="showinfo"></span>
        </el-popover>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <excel-dialog @exportExcel="exportExcel" ref="excelDialog"></excel-dialog>
  </div>
</template>

<script>
  import * as api from 'src/api'
  import XLSX from 'xlsx'
  export default {
    components: {
      'excel-dialog': require('./excel-dialog.vue')
    },
    data () {
      return {
        value: false,
        searchInfo: {
          batchNo: '',
          customer: '',
          deliveryNo: '',
          grade: '',
          lgort: '',
          operator: '',
          productName: '',
          spec: '',
          startTime: '',
          endTime: ''
        },
        endOption: {
          disabledDate: (time) => {
            if (this.searchInfo.startTime) {
              return time.getTime() < this.searchInfo.startTime.getTime()
            }
          }
        },
        options: {
          lgort: [],
          nameList: [],
          batchNo: []
        },
        filename: '追溯表.xls',
        loading: {
          all: false,
          lgort: false,
          batchNo: false,
          name: false
        },
        data: {}
      }
    },
    mounted () {
      this.getAllBatchNo()
      this.getLgortList()
      this.getNameList()
    },
    methods: {
      showinfo () {
        this.$refs.text.innerHTML = '查询中... <i class="fa fa-spinner fa-pulse fa-lg"></i>'
        setTimeout(() => {
          this.value = false
          this.$notify({
            title: '报表信息',
            message: '这是一张报表'
          })
          this.$refs.text.innerHTML = '这是什么报表？'
        }, 100)
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
      getNameList () {
        this.loading.name = true
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
          this.loading.name = false
        })
      },
      getLgortList () {
        this.loading.lgort = true
        api.storage.warehouseMaintain.getLgortList().then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.lgort = data.data
          }
        }).finally(() => {
          this.loading.lgort = false
        })
      },
      search () {
        this.loading.all = true
        let params = {
          batchNo: this.searchInfo.batchNo,
          customer: this.searchInfo.customer,
          deliveryNo: this.searchInfo.deliveryNo,
          grade: this.searchInfo.grade,
          lgort: this.searchInfo.lgort,
          operator: this.searchInfo.operator,
          productName: this.searchInfo.productName,
          spec: this.searchInfo.spec,
          startTime: this.searchInfo.startTime ? this.searchInfo.startTime.getTime() : '',
          endTime: this.searchInfo.endTime ? this.searchInfo.endTime.getTime() + 8.64e7 : ''
        }
        api.storage.warehouseManagement.getRetrospectReport(params).then(res => {
          if (res.data instanceof ArrayBuffer) {
            if (res.data.byteLength === 0) {
              return this.$message.error('没有数据')
            }
            this.data = res.data
            let data = new Uint8Array(res.data)
            let wb = XLSX.read(data, {type: 'array'})
            this.$refs.excelDialog.show(wb)
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading.all = false
        })
      },
      getTime (time) {
        if (time) {
          return time.getTime()
        } else {
          return ''
        }
      },
      copy (data) {
        let obj = {}
        for (let prop in data) {
          obj[prop] = data[prop]
        }
        return obj
      },
      reset () {
        this.searchInfo = {
          batchNo: '',
          customer: '',
          deliveryNo: '',
          grade: '',
          lgort: '',
          operator: '',
          productName: '',
          spec: '',
          startTime: '',
          endTime: ''
        }
      },
      exportExcel () {
        let blob = new Blob([this.data], {type: 'octet/stream'})
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        document.body.appendChild(a)
        a.style = 'display: none'
        a.href = url
        a.download = this.filename
        a.click()
        window.URL.revokeObjectURL(url)
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
  .width1 {
    width: 10rem;
  }
</style>
