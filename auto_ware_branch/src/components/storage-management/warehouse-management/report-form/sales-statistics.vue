<!--出入库销售统计-->
<template>
  <div class="page-wrapper" v-loading="loading.all">
    <el-form :inline="true">
      <el-form-item>
        <el-select v-model="searchInfo.workshopId" v-loading="loading.workshop" placeholder="请选择车间" clearable>
          <el-option v-for="item in options.workshop" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchInfo.productName" placeholder="请选择品名" clearable>
          <el-option v-for="item in options.productName" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input class="width1" v-model="searchInfo.spec" placeholder="规格"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchInfo.batch" placeholder="请选择批号" :loading="loading.batchNo" filterable clearable>
          <el-option v-for="item in options.batchNo" :key="item.batchNo" :label="item.batchNo"
                     :value="item.batchNo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="searchInfo.startTime" placeholder="请选择开始日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="searchInfo.endTime" placeholder="请选择结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" type="primary">查询</el-button>
        <el-popover placement="top-start" title="提示" width="200" trigger="hover" v-model="value">
          <span ref="text">点击查看这是什么报表？</span>
          <span slot="reference" class="fa fa-info-circle fa-lg"
                style="cursor: pointer;outline:none;vertical-align: middle;color: #3b9dd8" @click="showinfo"></span>
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
          workshopId: '',
          batch: '',
          spec: '',
          productName: '',
          startDate: '',
          endDate: ''
        },
        options: {
          workshop: [],
          productName: ['POY', 'FDY'],
          batchNo: []
        },
        filename: '出入库销售统计.xls',
        loading: {
          all: false,
          workshop: false,
          batchNo: false
        },
        data: {}
      }
    },
    mounted () {
      this.getAllBatchNo()
      this.getAllWorkshopList()
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
      getAllWorkshopList () {
        this.loading.workshop = true
        api.storage.warehouseManagement.getAllWorkshop({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.workshop = data.data
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.loading.workshop = false
        })
      },
      search () {
        if (this.searchInfo.startTime && this.searchInfo.endTime &&
          this.searchInfo.startTime.getTime() > this.searchInfo.endTime.getTime()) {
          return this.$message.error('开始时间大于结束时间')
        }
        this.loading.all = true
        let params = this.copy(this.searchInfo)
        params.startTime = this.getTime(this.searchInfo.startTime)
        params.endTime = this.getTime(this.searchInfo.endTime)
        if (params.endTime) {
          params.endTime += 86400000
        }
        api.storage.warehouseManagement.getSaleStatisticsReport(params).then(res => {
          if (res.data instanceof ArrayBuffer) {
            if (res.data.byteLength === 0) {
              return this.$message.error('没有数据')
            }
            this.data = res.data
            let data = new Uint8Array(res.data)
            let wb = XLSX.read(data, {type: 'array'})
            console.log(res.data)
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
          workshop: '',
          line: '',
          batch: '',
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
</style>
