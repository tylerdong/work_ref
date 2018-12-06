<template>
  <div class="measure-printing">
    <div class="search-wrapper tr">
      <el-select v-model="search.workshopId" @change="changeWorkshop" placeholder="请选择车间" clearable>
        <el-option v-for="item in options.workshop" :label="item.name" :value="item.id" :key="item.id"></el-option>
      </el-select>
      <el-select v-model="search.lineId" placeholder="请选择线别" clearable>
        <el-option v-for="item in options.line" :label="item.line" :value="item.id" :key="item.id"></el-option>
      </el-select>
      <el-select v-model="search.packclass" placeholder="请选择班次" clearable>
        <el-option v-for="item in options.classes" :label="item.name" :value="item.name" :key="item.id"></el-option>
      </el-select>
      <el-autocomplete v-model="search.batchNo" :fetch-suggestions="querySearch" placeholder="请输入批号" @select="handleSelect"></el-autocomplete>
      <el-input v-model="search.level" placeholder="等级"></el-input>
      <el-date-picker v-model="search.startDate" type="date" placeholder="开始日期" clearable></el-date-picker>
      <el-date-picker v-model="search.endDate" type="date" placeholder="结束日期" clearable></el-date-picker>
      <el-button type="primary" @click="getData">查询</el-button>
      <el-button type="primary" @click="addBarCode">新增条码</el-button>
    </div>
    <el-table :data="tableData" border v-loading="loading.table" fit>
      <el-table-column prop="singleCode" label="编号" width="240"></el-table-column>
      <el-table-column label="打包类型" min-width="120">
        <template slot-scope="scope"> {{ scope.row.boxType | filterBoxType }} </template>
      </el-table-column>
      <el-table-column prop="productTypeName" label="品名"></el-table-column>
      <el-table-column prop="batchNo" label="批号"></el-table-column>
      <el-table-column prop="silkSpec" label="规格" ></el-table-column>
      <el-table-column prop="gradeName" label="等级"></el-table-column>
      <el-table-column prop="tubeColor" label="管色"></el-table-column>
      <el-table-column prop="boxNetWeight" label="净重"></el-table-column>
      <el-table-column prop="boxGrossWeight" label="毛重"></el-table-column>
      <el-table-column prop="boxSilkNum" label="数量"></el-table-column>
      <el-table-column prop="packclass" label="班次"></el-table-column>
      <el-table-column prop="boxTime" width="160" label="包装时间">
        <!--<template slot-scope="scope">-->
          <!--<span> {{ scope.row.boxTime | timeFormat('YYYY-MM-DD HH:mm') }} </span>-->
        <!--</template>-->
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="btnMetering(scope.row)">计量</el-button>
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

    <dialog-metering ref="refDialogMetering" @callback="callback"></dialog-metering>
    <dialog-create-barcode ref="refDialogCreateCode" :workShop="options.workshop"
                           :productName="options.productName" :grade="options.grade" :classes="options.classes"
                          :batcheItems="restaurants" @submitSuccess="getData">
    </dialog-create-barcode>
  </div>
</template>

<script>
  import * as api from 'src/api'
  import dateFns from 'date-fns'
  export default {
    components: {
      'dialog-metering': require('./dialog-metering.vue'),
      'dialog-create-barcode': require('./dialog-create-barcode')
    },
    data () {
      return {
        options: {
          workshop: [],
          classes: [],
          line: [],
          productName: [],
          grade: []
        },
        search: {
          workshopId: '',
          lineId: '',
          packclass: '',
          batchNo: '',
          level: '',
          startDate: '',
          endDate: ''
        },
        restaurants: [],
        page: {
          currentPage: 1,
          total: 0,
          pageSize: 15
        },
        loading: {
          table: false
        },
        tableData: []
      }
    },
    mounted () {
      this.getData()
      this.getAllBatchList()
      this.getwWorkshopIdOptions()
      this.getClassesOptions()
      this.getProductNameOptions()
      this.getGradeOptions()
    },
    methods: {
      getData () {
        this.loading.table = true
        let params = {
          printFlag: '1',
          workshopId: this.search.workshopId,
          lineId: this.search.lineId,
          packclass: this.search.packclass,
          batchNo: this.search.batchNo,
          grade: this.search.level,
          startDate: this.search.startDate === '' ? '' : dateFns.format(this.search.startDate, 'YYYY-MM-DD'),
          endDate: this.search.endDate === '' ? '' : dateFns.format(this.search.endDate, 'YYYY-MM-DD'),
          pageIndex: this.page.currentPage,
          pageCount: this.page.pageSize
        }
        api.automatic.measurePrinting.getPrintList(params)
          .then(response => {
            response.data.data.list.forEach(value => { value.boxTime = dateFns.format(value.boxTime, 'YYYY-MM-DD HH:mm') })
            this.tableData = response.data.data.list
            this.page.total = response.data.data.count
          }).catch(e => {
            console.error(e)
          }).finally(() => {
            this.loading.table = false
          })
      },
      changeWorkshop () {
        this.search.lineId = ''
        if (this.search.workshopId) {
          api.automatic.productPlan.getAllLine({
            workShopId: this.search.workshopId
          }).then(response => {
            this.options.line = response.data.data
          })
        } else {
          this.options.line = []
        }
      },
      getClassesOptions () {
        api.automatic.dictionary.getAllClassesList({}).then((response) => {
          const data = response.data
          this.options.classes = data.data
        }).catch((e) => {
          console.log(e)
        })
      },
      getwWorkshopIdOptions () {
        api.automatic.dictionary.getAllWorkshopList({}).then((response) => {
          const data = response.data
          this.options.workshop = data.data
        }).catch((e) => {
          console.log(e)
        })
      },
      btnMetering (item) {
        this.$refs.refDialogMetering.show(item)
      },
      getAllBatchList () {
        let params = {}
        api.automatic.dictionary.getAllBatchList(params).then(response => {
          if (response.data.messageType === 1) {
            for (let item of response.data.data) {
              item.value = item.batchNo
              this.restaurants.push(item)
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
      getProductNameOptions () {
        api.automatic.dictionary.getAllProductTypeList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.productName = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
      getGradeOptions () {
        api.automatic.dictionary.getAllSilkGradeList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.grade = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
      // 新增条码
      addBarCode () {
        this.$refs.refDialogCreateCode.show()
      },
      handleSelect (item) {
      },
      /* 分页 */
      handleSizeChange (size) {
        this.page.pageSize = size
        if (this.page.currentPage === 1) {
          this.getData()
        } else {
          this.page.currentPage = 1
        }
      },
      handleCurrentChange (currentPage) {
        this.page.currentPage = currentPage
        this.getData()
      },
      callback () {
        this.getData()
      }
    }
  }
</script>

<style scoped lang="scss">
  .measure-printing{
    padding: 10px;
    .search-wrapper{
      padding: 10px;
      .inline-input{margin: 0 10px}
      display: flex;
      flex-direction: row;
      div { margin-right: 1rem; }
    }
    .el-input {
      width: 175px;
    }
    li {
      padding: 20px 10px 10px 10px;
      border-bottom: 1px dashed #dee4ec;
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
      .btn-box {
        width: 80px;
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
  }
</style>
