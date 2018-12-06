<!--暂存箱条码-->
<template>
  <div class="page-wrapper">
    <div class="action-bar">
      <el-autocomplete v-model="search.batchNo" :fetch-suggestions="querySearch" placeholder="请输入批号"></el-autocomplete>
      <el-button @click="searchClick" type="primary" icon="el-icon-search"></el-button>
      <el-button class="fr" @click="create" type="primary">新增暂存箱</el-button>
      <el-button class="fr" @click="printClick" type="primary">打印</el-button>
    </div>
    <el-table
      :data="tableData"
      v-loading="loading.table"
      border
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="number"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="batchNo"
        label="批号">
      </el-table-column>
      <el-table-column
        prop="workshopName"
        label="车间">
      </el-table-column>
      <el-table-column
        prop="grade"
        label="等级">
      </el-table-column>
      <el-table-column
        prop="num"
        label="暂存数量">
      </el-table-column>
      <el-table-column
        prop="paperTube"
        label="管色">
      </el-table-column>
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
    <create-dialog @submitSuccess="getData" ref="createDialog"></create-dialog>
    <div class="keep-box-print" ref="printBox">
      <ul>
        <li v-for="(item,index) in printData" :key="index">
          <div class="line1">
            <span class="batch">{{item.batchNo}}</span>
            <span class="grade">{{item.grade}}</span>
          </div>
          <div class="line2">
            <svg class="barcode"></svg>
            <span class="color">{{item.paperTube}}</span>
          </div>
          <div class="line3">
            <div class="color-item"></div>
            <div class="color-item"></div>
            <div class="color-item"></div>
            <div class="color-item"></div>
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import jsBarcode from 'jsbarcode'
  import 'jQuery.print'
  import * as api from 'src/api'
  export default {
    components: {
      'create-dialog': require('./create-dialog.vue')
    },
    data () {
      return {
        search: {
          batchNo: ''
        },
        tableData: [],
        printData: [],
        multipleSelection: [],
        batcheItems: [],
        loading: {
          table: false
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
      this.getData()
      this.getAllBatchList()
      this.$refs.createDialog.getGradeOptions()
      this.$refs.createDialog.getLineIdOptions()
      this.$refs.createDialog.getwWorkshopIdOptions()
//      this.$refs.createDialog.getPaperTubeOptions()
    },
    methods: {
      create () {
        if (this.multipleSelection.length <= 1) {
          this.$refs.createDialog.show(this.multipleSelection, this.batcheItems)
        } else {
          this.$message('请选择一个条码')
        }
      },
      getData () {
        let params = {
          pageIndex: this.page.currentPage,
          pageCount: this.page.size,
          batchNo: this.search.batchNo
        }
        this.loading.table = true
        api.automatic.productionProcess.getTemporaryBoxList(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.tableData = data.data.list
            this.page.total = data.data.count
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.table = false
        })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      getAllBatchList () {
        api.automatic.dictionary.getAllBatchList({}).then(response => {
          this.batcheItems = response.data.data.map(item => {
            return Object.assign(item, {value: item.batchNo})
          })
        }).catch(e => {
          console.error(e)
        })
      },
      /* 筛选批号 */
      querySearch (queryString, cb) {
        if (queryString) {
          let result = this.batcheItems.filter(item => {
            if (item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1) {
              return true
            } else {
              return false
            }
          })
          cb(result)
        } else {
          cb(this.batcheItems)
        }
      },
      printClick () {
        if (this.multipleSelection.length) {
          console.log(this.multipleSelection)
          this.print(this.multipleSelection)
        } else {
          this.$message('请选择要打印的条码')
        }
      },
      print (data) {
        console.log(data)
        this.printData = data
        this.$nextTick(function () {
          let barcodeDom = this.$refs.printBox.querySelectorAll('.barcode')
          for (let i = 0; i < this.printData.length; i++) {
            jsBarcode(barcodeDom[i], this.printData[i].number, {
              height: 80
            })
          }
          this.$nextTick(function () {
            setTimeout(() => {
              $(this.$refs.printBox).print({globalStyles: false, stylesheet: 'static/css/print-landscape.css'})
            }, 10) // 0ms也可以,不加延时二维码生成出错
          })
        })
      },
      searchClick () {
        console.log(111)
        this.getData()
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
<style lang="scss" scoped>
  .action-bar{
    overflow: hidden;
    margin: 10px 0;
  }
  .page-wrapper{
    margin: 10px;
    padding: 10px;
    background-color: #fff;
    border-radius: 4px;
  }

  .keep-box-print{
    display: none;
  }
</style>
