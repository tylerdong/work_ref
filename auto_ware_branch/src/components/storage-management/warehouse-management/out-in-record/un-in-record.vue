<template>
  <div class="page-wrapper">
    <el-form :inline="true">
      <el-form-item>
        <el-select v-model="search.workshop" placeholder="请选择车间" :loading="loading.selWorkshop" filterable clearable>
          <el-option v-for="item in list.workshop" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="search.batchNo" placeholder="请选择批号" :loading="loading.selBatchNo" filterable clearable>
          <el-option v-for="item in list.batchNo" :key="item.batchNo" :label="item.batchNo"
                     :value="item.batchNo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="search.productName" clearable placeholder="请选择品名" :loading="loading.productName" class="margin-right-1 margin-bottom-1">
          <el-option v-for="item in list.nameList" :key="item.id" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input class="width1" v-model="search.productCode" placeholder="请输入码单号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="search.startDate"
          type="date"
          :picker-options="pickerOptions0"
          @keyup.enter="searchClick"
          @change="dtStartChange"
          placeholder="请选择开始日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="search.endDate"
          type="date"
          :picker-options="pickerOptions1"
          @keyup.enter="searchClick"
          @change="dtEndChange"
          placeholder="请选择结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchClick" type="primary" icon="el-icon-search"></el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="inClick" type="primary">入库</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="updateClick" type="primary">修改</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border v-loading="loading.table" @selection-change="handleSelectionChange"
              style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <!--<el-table-column prop="billNo" label="入库单号"></el-table-column>-->
      <el-table-column prop="workshopName" label="车间名称"></el-table-column>
      <!--<el-table-column prop="storageName" label="库位"></el-table-column>-->
      <el-table-column prop="product.codeSingle" label="码单"></el-table-column>
      <el-table-column prop="product.productName" label="成品名称"></el-table-column>
      <el-table-column prop="product.batchNo" label="批号"></el-table-column>
      <el-table-column prop="product.spec" label="规格"></el-table-column>
      <el-table-column label="成品类型">
        <template slot-scope="scope">{{scope.row.product.shipmentType | productTypes}}</template>
      </el-table-column>
      <el-table-column prop="product.level" label="等级"></el-table-column>
      <el-table-column label="托盘类型">
        <template slot-scope="scope">{{scope.row.product.yoke | yokeTypes}}</template>
      </el-table-column>
      <el-table-column label="包装类型">
        <template slot-scope="scope">{{scope.row.product.packing | packTypes}}</template>
      </el-table-column>
      <el-table-column prop="packingDate " label="打包时间" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.packingDate | timeFormat('YYYY.MM.DD HH:mm')}}</span>
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

    <el-dialog :visible.sync="dialogVisible" width="50%" @close="close">
      <el-autocomplete v-model="storage" :fetch-suggestions="querySearchAsync" placeholder="请输入库位"
                       @select="handleSelect"></el-autocomplete>
      <span v-if="isShow" style="color: red">请输入正确的库位号</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="loading.confirm" @click="confirmBtn">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="updateDialogVisible" width="50%">
      <el-form ref="form" label-width="80px">
        <!--<el-form-item label="成品类型">-->
        <!--<el-select v-model="search.productTypes" placeholder="请选择成品类型" filterable clearable>-->
        <!--<el-option v-for="item in list.productTypes" :key="item.value" :label="item.label" :value="item.value">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->

        <el-form-item label="托盘类型">
          <el-select v-model="search.yokeTypes" placeholder="请选择托盘类型" filterable clearable>
            <el-option v-for="item in list.yokeTypes" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="包装类型">
          <el-select v-model="search.packTypes" placeholder="请选择包装类型" filterable clearable>
            <el-option v-for="item in list.packTypes" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="SAP仓库">
          <el-select v-model="search.sapWorkhouse" placeholder="请选择SAP仓库" :loading="loading.sapWorkhouse" filterable
                     clearable>
            <el-option v-for="item in list.sapWorkhouse" :key="item.lgort" :label="item.lgobe"
                       :value="item.lgort"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="泡沫类型">
          <el-select v-model="search.frothTypes" placeholder="请选择泡沫类型" filterable clearable>
            <el-option v-for="item in list.frothTypes" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否专访">
          <el-switch v-model="isSpecial" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button @click="updateDialogVisible = false">取 消</el-button>
          <el-button type="primary" :loading="loading.updateConfirm" @click="updateConfirmBtn">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import * as api from 'src/api'
  import storage from '../../../../module/storage'
  import {productTypes, yokeTypes, packTypes, frothTypes} from 'value-label'

  export default {
    components: {},
    data () {
      return {
        bstop: false,
        isShow: false,
        dtBaseStart: '',
        dtBaseEnd: '',
        storage: '',
        isSpecial: false,
        storageObj: {},
        multipleSelection: [],
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
        dialogVisible: false,
        updateDialogVisible: false,
        search: {
          workshop: '',
          batchNo: '',
          productName: '',
          productCode: '',
          startDate: '',
          endDate: '',
          productTypes: '',
          yokeTypes: '',
          packTypes: '',
          frothTypes: '',
          sapWorkhouse: ''
        },
        list: {
          workshop: [],
          batchNo: [],
          nameList: [],
          productTypes: [],
          yokeTypes: [],
          packTypes: [],
          frothTypes: [],
          sapWorkhouse: []
        },
        tableData: [],
        loading: {
          table: false,
          selWorkshop: false,
          selBatchNo: false,
          confirm: false,
          productTypes: false,
          productName: false
        },
        page: {
          currentPage: 1,
          sizes: [15, 30, 50, 100],
          size: 15,
          total: 0
        }
      }
    },
    filters: {
      productTypes: (val) => {
        if (val) {
          for (let item of productTypes) {
            if (val === item.value) {
              return item.label
            }
          }
        }
        return ''
      },
      yokeTypes: (val) => {
        if (val) {
          for (let item of yokeTypes) {
            if (val === item.value) {
              return item.label
            }
          }
        }
        return ''
      },
      packTypes: (val) => {
        if (val) {
          for (let item of packTypes) {
            if (val === item.value) {
              return item.label
            }
          }
        }
        return ''
      }
    },
    mounted () {
      this.getAllWorkshopList()
      this.getAllBatchNo()
      this.getNameList()
      this.getAllProductType()
      this.getAllYokeType()
      this.getAllPackType()
      this.getAllFrothType()
      this.getAllSapWorkhouse()
    },
    methods: {
      close () {
        this.isShow = false
      },
      getAllBatchNo () {
        this.loading.selBatchNo = true
        api.storage.warehouseManagement.getAllBatch({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.list.batchNo = data.data
          }
        }).finally(() => {
          this.loading.selBatchNo = false
        })
      },
      getNameList () {
        this.search.name = true
        api.automatic.dictionary.getAllProductTypeList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.list.nameList = data.data
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.search.name = false
        })
      },
      getAllProductType () {
        this.list.productTypes = productTypes
      },
      getAllYokeType () {
        this.list.yokeTypes = yokeTypes
      },
      getAllPackType () {
        this.list.packTypes = packTypes
      },
      getAllFrothType () {
        this.list.frothTypes = frothTypes
      },
      getAllSapWorkhouse () {
        this.loading.selSapWorkhouse = true
        api.storage.warehouseMaintain.getLgortList({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.list.sapWorkhouse = data.data
          }
        }).finally(() => {
          this.loading.selSapWorkhouse = false
        })
      },
      getSapWorkhouse (lgort) {
        for (let item of this.list.sapWorkhouse) {
          if (item.lgort === lgort) {
            return item
          }
        }
      },
      searchClick () {
        this.page.currentPage = 1
        this.getData()
      },
      handleSelect (val) {
        this.bstop = true
        this.isShow = false
        this.storageObj = val
      },
      confirmBtn () {
        console.log(this.storageObj)
        if (!this.storageObj.id || this.bstop === false) {
          this.isShow = true
          return
        }
        let codes = ''
        for (let item of this.multipleSelection) {
          codes += (item.product.codeSingle + ',')
        }
        codes = codes.substring(0, codes.length - 1)
        this.loading.confirm = true
        api.storage.warehouseManagement.scanStorageQr({
          qrCode: codes,
          storageId: this.storageObj.id,
          storageCode: this.storageObj.value,
          employeeId: storage.getUser().employeeId
        }).then(response => {
          let data = response.data
          if (data.messageType === 1) {
            this.$message.success('入库成功')
            this.dialogVisible = false
            this.getData()
          }
        }).finally(() => {
          this.loading.confirm = false
        })
      },
      updateConfirmBtn () {
        let params = this.multipleSelection.map(item => {
          let parduct = item.product
          let lgort = this.getSapWorkhouse(this.search.sapWorkhouse)
          return {
            id: parduct.id,
            shipmentType: lgort.shipmentType,
            yoke: this.search.yokeTypes ? this.search.yokeTypes : parduct.yoke,
            packing: this.search.packTypes ? this.search.packTypes : parduct.packing,
            lgort: this.search.sapWorkhouse ? this.search.sapWorkhouse : parduct.lgort,
            foamType: this.search.frothTypes ? this.search.frothTypes : parduct.foamType,
            isSpecial: this.search.isSpecial ? 'Y' : 'N'
          }
        })

//        for (let item of this.multipleSelection) {
//          if (this.search.productTypes === '') {
//            item.product.shipmentType = null
//          } else {
//            item.product.shipmentType = this.search.productTypes
//          }
//
//          if (this.search.yokeTypes === '') {
//            item.product.yoke = null
//          } else {
//            item.product.yoke = this.search.yokeTypes
//          }
//
//          if (this.search.packTypes === '') {
//            item.product.packing = null
//          } else {
//            item.product.packing = this.search.packTypes
//          }
//
//          if (this.search.sapWorkhouse === '') {
//            item.product.lgort = null
//          } else {
//            item.product.lgort = this.search.sapWorkhouse
//          }
//
//          if (this.search.frothTypes === '') {
//            item.product.foamType = null
//          } else {
//            item.product.foamType = this.search.frothTypes
//          }
//
//          if (this.search.isSpecial === true) {
//            item.product.isSpecial = 'Y'
//          } else {
//            item.product.isSpecial = 'N'
//          }
//
//          params.push(item.product)
//        }
        this.loading.updateConfirm = true
        api.storage.warehouseManagement.updateProductInfos(params).then(response => {
          let data = response.data
          if (data.messageType === 1) {
            this.$message.success('修改成功')
            this.updateDialogVisible = false
            this.getData()
          } else {
            this.$message.error(data.message)
          }
        }).finally(() => {
          this.loading.updateConfirm = false
        })
      },
      inClick () {
        if (!this.multipleSelection.length) {
          this.$message('请选择入库的数据')
          return
        }
        this.storage = ''
        this.storageObj = {}
        this.dialogVisible = true
      },
      updateClick () {
        if (!this.multipleSelection.length) {
          this.$message('请选择入库的数据')
          return
        }
        this.updateDialogVisible = true
      },
      querySearchAsync (queryString, cb) {
        if (!queryString) {
          return cb([])
        }
        api.storage.warehouseManagement.getStorageIdCodeByLikeCode({
          code: queryString
        }).then(response => {
          let result = response.data.data.map(item => {
            item.value = item.name
            return item
          })
          cb(result)
          if (result[0].name === this.storage) {
            this.storageObj = result[0]
            this.isShow = false
            this.bstop = true
          } else {
            this.bstop = false
            this.isShow = true
          }
        })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      getAllWorkshopList () {
        this.loading.selWorkshop = true
        api.storage.warehouseManagement.getAllWorkshop({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.list.workshop = data.data
          }
        }).finally(() => {
          this.loading.selWorkshop = false
        })
      },
      getData () {
        // if (!this.search.startDate || !this.search.endDate) {
        //   return this.$message.error('请选择日期')
        // }
        this.loading.table = true
        this.tableData = []
        let endDate = new Date(this.search.endDate)
        endDate.setDate(endDate.getDate() + 1)
        api.storage.warehouseManagement.getUnInRecord({
          batchNo: this.search.batchNo,
          productName: this.search.productName,
          productCode: this.search.productCode,
          workshopId: this.search.workshop,
          startTime: new Date(this.search.startDate).getTime(),
          endTime: endDate.getTime(),
          pageIndex: this.page.currentPage,
          pageCount: this.page.size
        }).then(response => {
          const data = response.data
          if (data.messageType === 1 && data.data && data.data.list) {
            this.page.total = data.data.count
            this.tableData = data.data.list.map(item => {
              if (!item.product) {
                item.product = {}
              }
              return item
            })
          } else {
            this.tableData = []
          }
        }).finally(() => {
          this.loading.table = false
        })
      },
      dtStartChange (value) {
        if (value) {
          this.dtBaseEnd = this.search.startDate.getTime()
        } else {
          this.dtBaseEnd = ''
        }
      },
      dtEndChange (value) {
        if (value) {
          this.dtBaseStart = this.search.endDate.getTime()
        } else {
          this.dtBaseStart = ''
        }
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
</style>
