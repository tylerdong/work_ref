<!--待打印-->
<template>
  <div class="page-wrapper">
    <el-form :inline="true" :model="search" :rules="rules" ref="form">
      <el-form-item prop="batchNo">
        <el-autocomplete v-model="search.batchNo" :fetch-suggestions="querySearch" placeholder="请输入批号"></el-autocomplete>
      </el-form-item>

      <el-form-item prop="warehouseId">
        <el-select v-model="search.warehouseId" @change="warehouseChange" placeholder="请选择仓库" :span="24">
          <el-option v-for="item in warehouseList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="preStorageCode">
        <el-select v-model="search.preStorageCode" placeholder="请选择库位">
          <el-option v-for="item in options.locationFrom" :key="item.storageId" :label="item.storageName"
                     :value="item.storageName"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="level">
        <el-select v-model="search.level" placeholder="请选择等级">
          <el-option v-for="item in levels" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="inboundDate">
        <el-date-picker v-model="search.inboundDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择截止入库日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button @click="searchClick('form')" type="primary" icon="el-icon-search" :loading="loading.search"></el-button>
      </el-form-item>

      <el-form-item>
        <el-button @click="batchPrint" type="primary">打印唛头</el-button>
      </el-form-item>
    </el-form>

    <div class="allot-tip">
      <el-alert type="warning" :closable="false" show-icon
                title="提示" description="如果涉及到补打唛头，请准确选择需要补打的箱包条件。新的唛头不需要重新入库，可直接扫码出库。">
      </el-alert>
    </div>

    <el-table :data="tableData" border v-loading="loading.table" @selection-change="handleSelectionChange"
              style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="singleCode" label="码单"></el-table-column>
      <el-table-column prop="batchNo" label="批号"></el-table-column>
      <el-table-column prop="preStorageCode" label="库位号"></el-table-column>
      <el-table-column prop="productTypeName" label="产品名称"></el-table-column>
      <el-table-column prop="spec" label="规格"></el-table-column>
      <el-table-column label="托盘类型">
        <template slot-scope="scope">{{scope.row.yoke | yokeType}}</template>
      </el-table-column>
      <el-table-column label="成品类型">
        <template slot-scope="scope">{{scope.row.shipmentType | productType}}</template>
      </el-table-column>
      <el-table-column prop="gradeName" label="等级"></el-table-column>
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

    <!-- 打印 -->
    <component :printData="printData" :is="product"></component>
  </div>
</template>

<script>
  import * as api from 'src/api'
  export default {
    components: {
      'dialog-staple-fiber-print': require('./dialog-staple-fiber-print.vue'),
      'dialog-slice-print': require('./dialog-slice-print.vue'),
      'dialog-poy-fdy-print': require('./dialog-print.vue')
    },
    props: ['batchNos', 'warehouseList', 'levels'],
    data () {
      return {
        product: 'dialog-slice-print', // 默认是切片打印格式
        multipleSelection: [],
        printData: [],
        search: {
          batchNo: '',
          warehouseId: '',
          preStorageCode: '',
          level: '',
          inboundDate: ''
        },
        rules: {
          batchNo: [{required: true, message: '请输入批号', trigger: 'change blur'}],
          warehouseId: [{required: true, message: '请选择仓库', trigger: 'change blur'}],
          preStorageCode: [{required: true, message: '请选择库位', trigger: 'change blur'}],
          level: [{required: true, message: '请选择等级', trigger: 'change blur'}],
          inboundDate: [{required: true, message: '请选择入库日期', trigger: 'change blur'}]
        },
        options: {
          locationFrom: []
        },
        tableData: [],
        loading: {
          table: false,
          search: false
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
      /* 筛选批号 */
      querySearch (queryString, cb) {
        if (queryString) {
          let result = this.batchNos.filter(item => {
            if (item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1) {
              return true
            } else {
              return false
            }
          })
          cb(result)
        } else {
          cb(this.batchNos)
        }
      },
      // 根据仓库选择库位
      warehouseChange (val) {
        this.search.preStorageCode = ''
        let params = {warehouseId: val}
        api.storage.warehouseManagement.getStorageInfoByWarehouseId(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.locationFrom = data.data
          }
        }).finally(() => {
          this.loading.locationFrom = false
        })
      },
      searchClick (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.page.currentPage = 1
            this.getData()
          }
        })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      // 打印唛头
      batchPrint () {
        console.log(this.multipleSelection)
        if (!this.multipleSelection.length) {
          return this.$message('请选择要打印的条码')
        }
        let selection = this.multipleSelection
        let first = selection[0]
        if (this.multipleSelection.some(item => { return item.preStorageCode !== first.preStorageCode })) {
          return this.$message('请选择相同库位打印')
        }
        if (this.multipleSelection.some(item => { return item.productName !== first.productName })) {
          return this.$message('请选择相同产品打印')
        }
        let idArr = this.multipleSelection.map(item => { return item.singleCode.toString() })
        api.automatic.barCode.updateProductPrintFlag({productCodes: idArr.join(',')}).then(response => {
          let data = response.data
          if (data.messageType === 1) {
            if (selection[0].productTypeName.includes('短纤')) { // 是否包含
              this.product = 'dialog-staple-fiber-print'
            } else if (selection[0].productTypeName.includes('切片')) {
              this.product = 'dialog-slice-print'
            } else if (['poy', 'fdy'].some(item => {
              return selection[0].productTypeName.toLowerCase().includes(item)
            })) {
              this.product = 'dialog-poy-fdy-print'
            }
            this.$nextTick(() => { // 修改数据后使用 获取更新后的dom
              this.printData = selection
              this.getData()
            })
          } else {
            this.$message.error(data.message)
          }
        })
      },
      getData () {
        this.loading.table = true
        this.tableData = []
        let endDate = new Date(this.search.endDate)
        endDate.setDate(endDate.getDate() + 1)
        if (this.search.productCode === '') {
          this.$message('请输入码单号')
        }
        let param = {
          ...this.search,
          printFlag: 1,
          pageIndex: this.page.currentPage,
          pageCount: this.page.size
        }
        // let param = {
        //   preStorageCode: 'aa301',
        //   batchNo: 'B31503',
        //   level: 'A',
        //   inboundDate: '2018-05-20',
        //   printFlag: '1',
        //   pageIndex: '1',
        //   pageCount: '2'
        // }
        api.automatic.barCode.getEndProductList(param).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            if (data.data.list && data.data.list.length > 0) {
              this.tableData = data.data.list
              this.page.total = data.data.count
            } else {
              this.tableData = []
            }
          } else {
            this.$message({type: 'error', message: data.message})
          }
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

  .page-wrapper {
    margin: 10px;
    padding: 10px;
    border-radius: 3px;
    background-color: #fff;
  }

  .action-bar {
    padding: 10px 0;
  }

  .allot-tip div {
    padding: 5px 10px;
    margin-bottom: 1rem;
  }
</style>
