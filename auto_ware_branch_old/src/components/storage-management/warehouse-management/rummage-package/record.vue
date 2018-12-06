<template>
  <div class="page-wrapper">
    <div class="action-bar cf">
      <div class="fr">
        <el-input class="width1 margin-bottom-10px" v-model="searchInfo.oddNum" placeholder="请输入码单号"></el-input>
        <el-select class="margin-bottom-10px" v-model="searchInfo.batchNum" placeholder="请选择批号" :loading="loading.batchNo" filterable clearable>
          <el-option v-for="item in options.batchNo" :key="item.batchNo" :label="item.batchNo" :value="item.batchNo"></el-option>
        </el-select>
        <el-input class="width1 margin-bottom-10px" v-model="searchInfo.voucherNum" placeholder="请输入凭证号"></el-input>
        <el-date-picker
          v-model="searchInfo.startDate"
          type="date"
          :picker-options="pickerOptions0"
          @change="dtStartChange"
          placeholder="请选择开始日期">
        </el-date-picker>
        <el-date-picker
          v-model="searchInfo.endDate"
          type="date"
          :picker-options="pickerOptions1"
          @change="dtEndChange"
          placeholder="请选择结束日期">
        </el-date-picker>
        <el-select v-model="searchInfo.reason" placeholder="请选择翻包原因" filterable clearable>
          <el-option :key="item.value" v-for="item in options.reason" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="searchInfo.person" placeholder="请选择翻包人" :loading="loading.person" remote :remote-method="queryPerson" filterable clearable>
          <el-option v-for="item in options.person" :key="item.employeeId" :label="item.employeeName" :value="item.employeeId"></el-option>
        </el-select>
        <el-button @click="btnSearch" type="primary" icon="el-icon-search">查询</el-button>
        <el-button type="primary" @click="printClick" :loading="loading.print">打印</el-button>
      </div>
    </div>
    <el-table :data="tableData" border v-loading="loading.table"
              @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column prop="vocherNumber" label="凭证号"></el-table-column>
      <el-table-column prop="barcode" label="码单号"></el-table-column>
      <el-table-column prop="operator" label="翻包人"></el-table-column>
      <el-table-column prop="productName" label="品名"></el-table-column>
      <el-table-column prop="level" label="等级"></el-table-column>
      <el-table-column prop="batchNo" label="批号"></el-table-column>
      <el-table-column prop="storage" label="库位"></el-table-column>
      <el-table-column prop="netWeight" label="净重"></el-table-column>
      <el-table-column prop="turnoverPackageWeight" label="翻包重量"></el-table-column>
      <el-table-column label="生产日期">
        <template slot-scope="scope">{{scope.row.productDate | timeFormat('YYYY-MM-DD')}}</template>
      </el-table-column>
      <el-table-column label="翻包日期">
        <template slot-scope="scope">{{scope.row.turnoverPackageDate | timeFormat('YYYY-MM-DD')}}</template>
      </el-table-column>
      <el-table-column prop="reason" label="翻包原因"></el-table-column>
    </el-table>
    <div class="hy-admin__pagination-wrapper cf">
      <el-pagination
        class="fr"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="page.currentPage"
        :page-sizes="page.sizes"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
    <div class="package-print" ref="printBox">
      <ul>
        <li v-for="item in printData">
          <div class="left-box">
            <div class="line1 batch-no">{{item.batchNo}}</div>
            <div class="line1">{{item.spec}}</div>
            <div class="line1">{{item.level}}</div>
            <div class="line1">{{ Number(item.lineCount) + Number(item.unpackCount) }}</div>
            <div class="line1">{{item.paperTube}}</div>
            <div class="line1">{{item.productDate | timeFormat('YYYY-MM-DD')}}</div>
            <div class="line2">
              <div class="inner">
                <span>{{item.barcode}}</span>
              </div>
            </div>
          </div>
          <div class="right-box">
            <div class="line1">{{item.turnoverPackageWeight}}</div>
            <div class="line1"></div>
          </div>
          <div class="qrcode" ref="qrcode"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import * as api from 'src/api'
  import { rummageReason } from '../../value-label'
  import QRCode from 'qrcodejs2'
  import 'jQuery.print'
  export default {
    components: {
    },
    data () {
      return {
        multipleSelection: [],
        searchInfo: {
          oddNum: '',
          batchNum: '',
          reason: '',
          startDate: '',
          endDate: '',
          voucherNum: '',
          person: ''
        },
        options: {
          reason: [],
          person: [],
          batchNo: []
        },
        dtBaseStart: '',
        dtBaseEnd: '',
        pickerOptions0: {
          disabledDate: (time) => {
            if (this.dtBaseStart) {
              return time.getTime() > this.dtBaseStart
            }
          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            if (this.dtBaseEnd) {
              return time.getTime() < this.dtBaseEnd
            }
          }
        },
        tableData: [],
        printData: [],
        loading: {
          table: false,
          person: false,
          print: false,
          batchNo: false
        },
        page: {
          currentPage: 1,
          sizes: [15, 30, 50, 100],
          size: 15,
          total: 0
        }
      }
    },
    mounted () {
      this.getReasonList()
      this.getWarehouseOptions()
      this.queryPerson()
      this.getAllBatchNo()
      this.getData()
    },
    methods: {
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
      getReasonList () {
        this.options.reason = []
        for (let item of rummageReason) {
          this.options.reason.push({
            value: item.value,
            label: item.label
          })
        }
        api.storage.warehouseMaintain.getReturnReasonList({
          pageIndex: 1,
          pageCount: 1000
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            for (let item of data.data.list) {
              this.options.reason.push({
                value: item.number,
                label: item.reason
              })
            }
          }
        })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      queryPerson (queryString) {
        this.loading.person = true
        let params = {
          name: queryString
        }
        api.storage.warehouseManagement.getOperatorList(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.person = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.person = false
        })
      },
      printClick () {
        if (this.multipleSelection.length) {
          this.print(this.multipleSelection)
        } else {
          this.$message('请选择要打印的条码')
        }
      },
      print (data) {
        console.log(data)
        this.printData = data
        this.$nextTick(function () {
          let qrcodeDoms = this.$refs.qrcode
          console.log(qrcodeDoms)
          for (let i = 0; i < this.printData.length; i++) {
            qrcodeDoms[i].innerHTML = ''
            let qrcode = new QRCode(qrcodeDoms[i], {
              text: this.printData[i].barcode,
              width: 250,
              height: 250
            })
            console.log(qrcode)
          }
          this.$nextTick(function () {
            setTimeout(() => {
              $(this.$refs.printBox).print({globalStyles: false, stylesheet: 'static/css/print-12-10.css'})
            }, 10) // 0ms也可以,不加延时二维码生成出错
          })
        })
      },
      btnSearch () {
        this.page.currentPage = 1
        this.getData()
      },
      dtStartChange (value) {
        if (value) {
          this.dtBaseEnd = this.searchInfo.startDate.getTime()
        } else {
          this.dtBaseEnd = ''
        }
      },
      dtEndChange (value) {
        if (value) {
          this.dtBaseStart = this.searchInfo.endDate.getTime()
        } else {
          this.dtBaseStart = ''
        }
      },
      getWarehouseOptions () {
//      api.automatic.barCode.foreignTradePackBoxCodePrint(params).then((response) => {
//        const data = response.data
//        if (data.messageType === 1) {
//          this.options.warehouse = data.data
//        }
//      }).catch((e) => {
//        console.log(e)
//      }).finally(() => {
//      })
      },
      getData () {
        this.loading.table = true
        let startDate = this.searchInfo.startDate ? this.searchInfo.startDate.getTime() : ''
        let endDate = this.searchInfo.endDate ? this.searchInfo.endDate.getTime() + 8.64e7 : ''
        let params = {
          pageIndex: this.page.currentPage,
          pageCount: this.page.size,
          batchNo: this.searchInfo.batchNum,
          startTime: startDate,
          endTime: endDate,
          barcode: this.searchInfo.oddNum,
          reason: this.searchInfo.reason,
          voucherNumber: this.searchInfo.voucherNum,
          creator: this.searchInfo.person
        }
        api.storage.warehouseManagement.getTurnoverPackageResultList(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.page.total = data.data.count
            this.tableData = data.data.list
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.table = false
        })
      },
      /* 分页 */
      sizeChange (val) {
        this.page.size = val
        if (this.page.currentPage === 1) {
          this.getData()
        } else {
          this.page.currentPage = 1
        }
      },
      currentChange (val) {
        this.page.currentPage = val
        this.getData()
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .page-wrapper{
    margin: 10px;
    padding: 10px;
    border-radius: 3px;
    background-color: #fff;
  }
  .action-bar{
    padding: 10px 0;
  }
  .margin-bottom-10px{
    margin-bottom: 10px;
  }
</style>
