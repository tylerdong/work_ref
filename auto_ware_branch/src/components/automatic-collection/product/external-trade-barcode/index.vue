<!--外贸码单-->
<template>
  <div class="page-wrapper">
    <div class="action-bar">
      <el-select v-model="search.workShop" placeholder="请选择车间" clearable>
        <el-option v-for="item in options.workshopId"
                   :label="item.name" :value="item.id" :key="item.id"></el-option>
      </el-select>
      <el-select v-model="search.classes" placeholder="请选择班次" clearable>
        <el-option v-for="item in options.classes"
                   :label="item.name" :value="item.name" :key="item.id"></el-option>
      </el-select>
      <el-autocomplete v-model="search.batchNo" :fetch-suggestions="querySearch" placeholder="请输入批号"
                       class="width1"></el-autocomplete>
      <el-input class="width1" placeholder="请输入码单号" type="text" v-model="search.number"></el-input>
      <el-date-picker v-model="search.date" type="date" placeholder="选择日期" clearable></el-date-picker>
      <el-button @click="searchClick" type="primary" icon="el-icon-search"></el-button>
      <el-button class="fr" @click="create" type="primary">新增码单</el-button>
      <el-button :loading="loading.print" class="fr" @click="printClick" type="primary">打印</el-button>
    </div>
    <el-table :data="tableData" v-loading="loading.table" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="code" label="码单号"></el-table-column>
      <el-table-column prop="productDate" label="生产日期"></el-table-column>
      <el-table-column prop="packclass" label="班次"></el-table-column>
      <el-table-column prop="productName" label="品名"></el-table-column>
      <el-table-column prop="grade" label="等级"></el-table-column>
      <el-table-column prop="batchNo" label="批号"></el-table-column>
      <el-table-column prop="silkSpec" label="规格"></el-table-column>
      <el-table-column prop="paperTube" label="管色"></el-table-column>
      <el-table-column prop="packageNum" label="总箱数"></el-table-column>
      <el-table-column prop="silkNum" label="箱单数量"></el-table-column>
      <el-table-column prop="grossWeight" label="毛重"></el-table-column>
      <el-table-column prop="netWeight" label="净重"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.printFlag | printStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="detailClick(scope.row)" type="text">查看箱单</el-button>
        </template>
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
    <detail-dialog ref="detailDialog"></detail-dialog>

    <dialog-print :printData="printData"></dialog-print>
  </div>
</template>
<script>
  import dateFns from 'date-fns'
  import * as api from 'src/api'
  export default {
    components: {
      'create-dialog': require('./create-dialog.vue'),
      'detail-dialog': require('./detail-dialog.vue'),
      'dialog-print': require('../measure-printing/dialog-print.vue')
    },
    data () {
      return {
        options: {
          workshopId: [],
          classes: [],
          batcheItems: []
        },
        search: {
          classes: '',
          batchNo: '',
          number: '',
          date: '',
          workShop: ''
        },
        tableData: [],
        printData: [],
        multipleSelection: [],
        loading: {
          table: false,
          print: false
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
      this.getwWorkshopIdOptions()
      this.getClassesOptions()
      this.getAllBatchList()
//      this.$refs.createDialog.getPaperTubeOptions()
      this.$refs.createDialog.getClassesOptions()
//      this.$refs.createDialog.getSpecOptions()
      this.$refs.createDialog.getGradeOptions()
      this.$refs.createDialog.getProductNameOptions()
    },
    filters: {
      printStatus: function (val) {
        if (val === '1') {
          return '未打印'
        }
        return '已打印'
      }
    },
    methods: {
      getClassesOptions () {
        api.automatic.dictionary.getAllClassesList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.classes = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
      getwWorkshopIdOptions () {
        api.automatic.dictionary.getAllWorkshopList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.workshopId = data.data
            this.$refs.createDialog.options.workShop = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
      getAllBatchList () {
        api.automatic.dictionary.getAllBatchList({}).then(response => {
          if (response.data.messageType === 1) {
            this.options.batcheItems = response.data.data.map(item => {
              return Object.assign(item, {value: item.batchNo})
            })
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
      querySearch (queryString, cb) {
        if (queryString) {
          let result = this.options.batcheItems.filter(item => {
            if (item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1) {
              return true
            } else {
              return false
            }
          })
          cb(result)
        } else {
          cb(this.options.batcheItems)
        }
      },
      create () {
        if (this.multipleSelection.length <= 1) {
          this.$refs.createDialog.show(this.options.batcheItems)
        } else {
          this.$message('请选择一个条码')
        }
      },
      getData () {
        let date = ''
        if (this.search.date) {
          date = dateFns.format(this.search.date, 'YYYY-MM-DD')
        }
        let params = {
          packclass: this.search.classes,
          workshopId: this.search.workShop,
          batchNo: this.search.batchNo,
          boxCode: this.search.number,
          pageIndex: this.page.currentPage,
          pageCount: this.page.size,
          productDate: date
        }
        this.loading.table = true
        api.automatic.barCode.getForeignTradePackBoxCodeList(params).then((response) => {
          const data = response.data
          console.log(data)
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
      detailClick (data) {
        this.$refs.detailDialog.show(data)
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      printClick () {
        if (this.multipleSelection.length) {
          this.loading.print = true
          let params = {
            boxCode: []
          }
          for (let item of this.multipleSelection) {
            params.boxCode.push(item.code)
          }
          api.automatic.barCode.foreignTradePackBoxCodePrint(params).then((response) => {
            const data = response.data
            if (data.messageType === 1) {
              this.printData = this.multipleSelection.map(item => {
                return {
                  batchNo: item.batchNo,
                  silkSpec: item.silkSpec,
                  gradeName: item.grade,
                  boxSilkNum: item.silkNum,
                  tubeColor: item.paperTube,
                  boxTime: item.productDate,
                  code: item.code,
                  boxNetWeight: item.netWeight,
                  boxGrossWeight: item.grossWeight
                }
              })
              this.getData()
            }
          }).catch((e) => {
          }).finally(() => {
            this.loading.print = false
          })
        } else {
          this.$message('请选择要打印的条码')
        }
      },
      searchClick () {
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
    display: flex;
    flex-direction: row;
  }
  .action-bar div{
    margin-right: 1rem;
  }
  .page-wrapper{
    margin: 10px;
    padding: 10px;
    background-color: #fff;
    border-radius: 4px;
  }
  .package-print{
    display: none;
  }
</style>
