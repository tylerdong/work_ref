<template>
  <div class="measure-printing">
    <div class="search-wrapper tr">
      <el-input class="inline-input" v-model="deliveryNo" placeholder="请输入交货编号"></el-input>
      <el-autocomplete
        class="inline-input"
        v-model="batchNo"
        :fetch-suggestions="querySearch"
        placeholder="请输入批号"
        @select="handleSelect"></el-autocomplete>
      <el-button type="primary" @click="getData">查询</el-button>
      <el-button type="primary" @click="printClick('allPrint')" :loading="loading.print">打印</el-button>
    </div>

    <el-table
      :data="tableData"
      border
      v-loading="loading.table"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="singleCode"
        width="280"
        label="码单号">
      </el-table-column>
      <el-table-column
        prop="deliveryNo"
        label="交货编码">
      </el-table-column>
      <el-table-column
        prop="batchNo"
        label="批号">
      </el-table-column>
      <el-table-column
        prop="spec"
        label="规格">
      </el-table-column>
      <el-table-column
        prop="paperTube"
        label="管色">
      </el-table-column>
      <el-table-column
        prop="grade"
        label="等级">
      </el-table-column>
      <el-table-column
        prop="unpackCount"
        label="拆包区数量">
      </el-table-column>
      <el-table-column
        prop="lineCount"
        label="生产线数量">
      </el-table-column>
      <el-table-column
        prop="silkWeight"
        label="锭重">
      </el-table-column>
      <el-table-column
        prop="netWeight"
        label="净重">
      </el-table-column>
      <el-table-column
        prop="grossWeight"
        label="毛重">
      </el-table-column>
      <el-table-column
        label="生产日期">
        <template slot-scope="scope">
          <span> {{ scope.row.productDate | timeFormat('YYYY-MM-DD') }} </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="yoke"
        label="托盘类型">
      </el-table-column>
      <el-table-column
        prop="packType"
        label="包装类型">
      </el-table-column>
      <el-table-column
        prop="frothType"
        label="泡沫类型">
      </el-table-column>
      <el-table-column
        prop="frothCount"
        label="泡沫数量">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="printClick ('aPrint', scope.row)"
          >打印
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="fr"
      style="text-align: right;margin-top: 20px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="[15, 30, 50, 100]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
    <!--<div class="package-print" ref="printBox">-->
      <!--<ul>-->
        <!--<li v-for="(item,index) in printData" :key="index">-->
          <!--<div class="left-box">-->
            <!--<div class="line1 batch-no">{{item.batchNo}}</div>-->
            <!--<div class="line1">{{item.spec}}</div>-->
            <!--<div class="line1">{{item.grade}}</div>-->
            <!--<div class="line1">{{ Number(item.lineCount) + Number(item.unpackCount) }}</div>-->
            <!--<div class="line1">{{item.paperTube}}</div>-->
            <!--<div class="line1">{{item.productDate}}</div>-->
            <!--<div class="line2">-->
              <!--<div class="inner">-->
                <!--<span>{{item.singleCode}}</span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="right-box">-->
            <!--<div class="line1">{{item.netWeight}}</div>-->
            <!--<div class="line1">{{item.grossWeight}}</div>-->
          <!--</div>-->
          <!--<div class="qrcode" ref="qrcode"></div>-->
        <!--</li>-->
      <!--</ul>-->
    <!--</div>-->
    <dialog-print ref="refPrint" :printData="printData"></dialog-print>
  </div>
</template>

<script>
  import * as api from 'src/api'
  // import QRCode from 'qrcodejs2'
  import 'jQuery.print'
  export default {
    components: {
      'dialog-print': require('./dialog-print')
    },
    data () {
      return {
        multipleSelection: [],
        restaurants: [],
        workshopId: '',
        printFlage: 2,
        boxCode: '',
        productDate: '',
        deliveryNo: '',
        batchNo: '',
        page: {
          currentPage: 1,
          pageSize: 15,
          total: 0
        },
        loading: {
          table: false,
          print: false
        },
        tableData: [],
        printData: []
      }
    },
    mounted () {
      this.getData()
//      this.getAllBatchList()
    },
    methods: {
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      getData () {
        this.loading.table = true
        let params = {
          printFlage: this.printFlage,
          workshopId: this.workshopId,
          deliveryNo: this.deliveryNo,
          batchNo: this.batchNo,
          boxCode: this.boxCode,
          productDate: this.productDate,
          pageIndex: this.page.currentPage,
          pageCount: this.page.pageSize
        }
        api.automatic.barCode.getUnpackingCodePrintList(params).then(response => {
          if (response.data.messageType === 1) {
            this.tableData = response.data.data.list
            this.page.total = response.data.data.count
            // console.log(this.tableData)
          }
          if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
            return true
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
          this.loading.table = false
        })
      },
      printClick (print, id) {
        // console.log(id)
        if (print === 'allPrint') {
          if (this.multipleSelection.length) {
            // console.log(this.multipleSelection)
            this.loading.print = true
            let params = {
              boxCode: []
            }
            for (let item of this.multipleSelection) {
              params.boxCode.push(item.singleCode)
              // console.log(params.boxCode)
            }
            // console.log(params)
            api.automatic.barCode.foreignTradePackBoxCodePrint(params).then((response) => {
              const data = response.data
              if (data.messageType === 1) {
                this.print(this.multipleSelection)
                this.getData()
              }
            }).catch((e) => {
              console.log(e)
            }).finally(() => {
              this.loading.print = false
            })
          } else {
            this.$message('请选择要打印的条码')
          }
        }
      },
//        else if (print === 'aPrint') {
//          if (id.singleCode.length) {
//            this.loading.print = true
//            let params = {
//              boxCode: [id.singleCode]
//            }
//            api.automatic.barCode.foreignTradePackBoxCodePrint(params).then((response) => {
//              const data = response.data
//              if (data.messageType === 1) {
//                this.print(id.singleCode)
//                this.getData()
//              }
//            }).catch((e) => {
//              console.log(e)
//            }).finally(() => {
//              this.loading.print = false
//            })
//          } else {
//            this.$message('请选择要打印的条码')
//          }
//        }
      print (data) {
        this.printData = data
        // this.$nextTick(function () {
        //   let qrcodeDoms = this.$refs.qrcode
        //   console.log(qrcodeDoms)
        //   for (let i = 0; i < this.printData.length; i++) {
        //     qrcodeDoms[i].innerHTML = ''
        //     let qrcode = new QRCode(qrcodeDoms[i], {
        //       text: this.printData[i].singleCode,
        //       width: 250,
        //       height: 250
        //     })
        //     console.log(qrcode)
        //   }
        //   this.$nextTick(function () {
        //     setTimeout(() => {
        //       $(this.$refs.printBox).print({globalStyles: false, stylesheet: 'static/css/print-12-10.css'})
        //     }, 10) // 0ms也可以,不加延时二维码生成出错
        //   })
        // })
      },
      /* 搜索建议 规格 */
      querySearch (queryString, cb) {
        if (queryString) {
          let result = this.restaurants.filter(item => {
            if (item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1) {
              return true
            } else {
              return false
            }
          })
          cb(result)
        } else {
          cb(this.restaurants)
        }
      },
      handleSelect (item) {
      },
      /* 分页 */
      handleSizeChange (size) {
        this.page.pageSize = size
        if (this.page.currentPage === 1) {
          this.getData()
        } else {
          this.page.pageIndex = 1
        }
      },
      handleCurrentChange (currenPage) {
        this.page.pageIndex = currenPage
        this.getData()
      }
    }
  }
</script>

<style scoped lang="scss">
  .package-print {
    display: none;
  }
  .measure-printing{
    padding: 10px;
    .search-wrapper{
      padding: 10px;
      .inline-input{margin: 0 10px}
    }
    li {
      padding: 20px 10px 10px 10px;
      border-bottom: 1px dashed #dee4ec;
      .btn-box {
        width: 80px;
      }
      .text {
        display: flex
      }
      .fixation {
        flex: 0 0 400px;
      }
      .fixation-box {
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: normal;
        white-space: nowrap;
        width: 400px;
      }
      .fixation-jz{
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: normal;
        white-space: nowrap;
        min-width: 100px;
      }
      .time {min-width: 185px}
      .inner {
        flex: 1;
      }
      .sl-box{min-width: 60px;}
      .mini {
        font-size: 13px;
      }
      .user {
        color: #000;
        font-size: 15px;
      }
      .space {
        font-size: 16px;
        color: #99a9bf;
        margin-left: 10px;
        margin-right: 10px;
      }
      .red {
        color: #f50000;
        font-size: 18px;
        font-weight: bold;
        margin-right: 5px;
        font-family: 'Arial Bold';
      }

      .person {
        font-size: 16px;
      }

      h4 {
        margin: 0 0 10px;
        font-size: 16px;
        font-weight: bold;
        span {
          font-weight: normal;
          margin-left: 5px;
        }
      }
      .note {
        font-size: 13px;
        color: #99a9bf;
      }
      .notebg{
        color: #99a9bf;
        font-size: 18px;
      }
      .font1 {
        font-size: 16px;
        color: #000;
      }
    }
    .el-input {
      width: 175px;
    }
  }
</style>
