<template>
  <el-dialog title="查看码单" width="90%" :visible.sync="dialogVisible" top="5%" @close="close">
    <div class="action-bar cf">
      <div class="fr">
        <!--<el-select v-model="search.lgort" placeholder="请选择SAP库位" clearable>-->
          <!--<el-option v-for="item in options.sapWorkhouse" :key="item.id" :label="item.lgobe"-->
                     <!--:value="item.lgort"></el-option>-->
        <!--</el-select>-->
        <el-autocomplete v-model="search.lgort" :fetch-suggestions="querySapSearchAsync" placeholder="请输入SAP库位"
                         @select="handleSearchSapSelect"></el-autocomplete>
        <el-select v-model="search.stockStatus" placeholder="请选择状态" clearable>
          <el-option v-for="item in options.stockStatus" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
        <el-input v-model="search.lineName" class="width1" placeholder="请输入线别"></el-input>
        <el-input v-model="search.productCode" class="width1" placeholder="请输入码单号"></el-input>
        <el-button type="primary" icon="el-icon-search" :loading="loading.table" @click="getData">搜索</el-button>
        <el-button v-if="row.clearInventory" style="float: right; margin-bottom: 10px" type="primary" :loading="loading.clearBtn" @click="clear">清理库存</el-button>
      </div>
    </div>

    <el-table :data="tableData" @selection-change="handleSelectionChange" v-loading="loading.table" style="min-height: 25rem;">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column property="code" label="码单"></el-table-column>
      <el-table-column label="生产日期">
        <template slot-scope="scope">{{scope.row.productTime | timeFormat('YYYY-MM-DD')}}</template>
      </el-table-column>
      <el-table-column property="stockStatus" label="状态"></el-table-column>
      <el-table-column label="入库日期">
        <template slot-scope="scope">{{scope.row.inboundTime | timeFormat('YYYY-MM-DD')}}</template>
      </el-table-column>
      <el-table-column label="扫码时间">
        <template slot-scope="scope">{{scope.row.scanTime | timeFormat('YYYY-MM-DD HH:mm:ss')}}</template>
      </el-table-column>
      <el-table-column property="inboundOperater" label="入库员"></el-table-column>
      <el-table-column property="netWeight" label="净重"></el-table-column>
      <el-table-column property="lgort" label="sap库存地点"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="transferStorage(scope.row)">移库</el-button>
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

    <el-dialog :title="'移库 ' + code" :visible.sync="subDialogVisible" width="50%" :modal="false" append-to-body="true"
               :style="transferDialogStyle">
      <el-tabs v-model="transferType" @tab-click="handleTabClick" type="border-card">
        <el-tab-pane label="普通" name="common">
          <el-autocomplete v-model="storage" :fetch-suggestions="querySearchAsync" placeholder="请输入库位"
                           @select="handleSelect"></el-autocomplete></el-tab-pane>
        <el-tab-pane label="SAP"  name="sap">
          <el-autocomplete v-model="sapStorage" :fetch-suggestions="querySapSearchAsync" placeholder="请输入SAP库位"
                           @select="handleSapSelect"></el-autocomplete>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="subDialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="loading.confirm" @click="confirmBtn">确 定</el-button>
      </span>
    </el-dialog>

  </el-dialog>
</template>

<script>
import * as api from 'src/api'
import storage from 'storage'
import {stockStatusEnum} from './../../value-label'

export default {
  props: ['lineOptions'],
  data () {
    return {
      transferType: 'common',
      warehouseType: '',
      search: {
        stockStatus: '',
        lineName: '',
        productCode: '',
        lgort: ''
      },
      tableData: [],
      loading: {
        table: false,
        confirm: false,
        clearBtn: false
      },
      options: { stockStatus: [], sapWorkhouse: [] },
      code: '',
      multipleSelection: [],
      row: {},
      storage: '',
      storageObj: {},
      sapStorage: '',
      sapStorageObj: {},
      searchSapStorageObj: {},
      dialogVisible: false,
      subDialogVisible: false,
      page: {
        currentPage: 1,
        sizes: [15, 30, 50, 100],
        size: 15,
        total: 0
      },
      transferDialogStyle: {
        // TODO
      }
    }
  },
  mounted () {
    this.options.stockStatus = stockStatusEnum
    this.getLgortList()
  },
  methods: {
    show (row) {
      if (row) {
        this.row = row
        this.warehouseType = row.warehouseType
      }
      this.subDialogVisible = false
      this.dialogVisible = true
      this.search.stockStatus = ''
      this.search.lineName = ''
      this.search.productCode = ''
      this.search.lgort = ''
      this.searchSapStorageObj = {}
      this.getData()
    },
    getLgortList () {
      api.storage.warehouseMaintain.getLgortList({}).then(response => {
        const data = response.data
        if (data.messageType === 1) {
          this.options.sapWorkhouse = data.data
        }
      }).finally(() => {})
    },
    getData () {
      this.loading.table = true
      let param = {
        batchNo: this.row.batch,
        warehouseType: this.warehouseType,
        houseId: this.row.houseId,
        productDate: this.row.productDate,
        inboundDate: this.row.inboundDate,
        storageId: this.row.storageId,
        classId: this.row.classId,
        startInboundDate: this.row.startInboundDate,
        startScanTime: this.row.startScanTime,
        endScanTime: this.row.endScanTime,
        level: this.row.level,
        isInventory: this.row.isInventory,
        // workshopId: this.row.workshopId,
        lineName: this.search.lineName,
        productCode: this.search.productCode,
        stockStatus: this.search.stockStatus,
        lgort: this.searchSapStorageObj.lgort,
        pageIndex: this.page.currentPage,
        pageCount: this.page.size
      }
      api.storage.warehouseManagement.viewWeightMemo(param).then(response => {
        const data = response.data
        if (data.messageType === 1) {
          this.page.total = data.data.count
          this.tableData = data.data.list
        } else {
          this.$message.error(data.message)
        }
      }).finally(() => {
        this.loading.table = false
      })
    },
    handleTabClick (tab, event) {
      console.log(tab)
      this.transferType = tab.name
    },
    transferStorage (row) {
      this.code = row.code
      this.storage = ''
      this.sapStorage = ''
      this.subDialogVisible = true
    },
    // 移库，搜索普通库位
    querySearchAsync (queryString, cb) {
      if (!queryString) {
        return cb(null)
      }
      api.storage.warehouseManagement.getStorageIdCodeByLikeCode({
        code: queryString
      }).then(response => {
        let result = response.data.data.map(item => {
          item.value = item.name
          return item
        })
        cb(result)
      })
    },
    // 搜索条件，选择sap库位
    handleSearchSapSelect (val) {
      this.searchSapStorageObj = val
    },
    // 移库，选择sap库位
    handleSapSelect (val) {
      console.log(val)
      this.sapStorageObj = val
    },
    // 移库，选择普通库位
    handleSelect (val) {
      this.storageObj = val
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.name
    },
    // 搜索条件，移库，搜索sap库位
    querySapSearchAsync (queryString, cb) {
      if (!queryString) {
        return cb(null)
      }
      let param = {lgort: queryString}
      api.storage.warehouseMaintain.getLgortList(param).then(response => {
        const data = response.data
        if (data.messageType === 1 && data.data.length > 0) {
          let result = data.data.map(item => {
            Object.assign(item, {value: `${item.lgort}-${item.lgobe}`})
            return item
          })
          cb(result)
        } else {
          cb(null)
        }
      }).finally(() => {})
    },
    confirmBtn () {
      this.loading.confirm = true

      if (this.transferType === 'common') {
        let param = {
          productCode: this.code,
          employeeId: storage.getUser().employeeId,
          storageId: this.storageObj.id
        }
        api.storage.warehouseManagement.moveStockDetail(param).then(response => {
          let data = response.data
          if (data.messageType === 1) {
            this.$message.success('移库成功')
            this.subDialogVisible = false
            this.show(this.row)
          }
        }).finally(() => {
          this.loading.confirm = false
        })
      } else if (this.transferType === 'sap') {
        let param = {
          codes: this.code,
          employeeId: storage.getUser().employeeId,
          destination: this.sapStorageObj.lgort
        }
        api.storage.warehouseManagement.lgortMove(param).then(response => {
          let data = response.data
          if (data.messageType === 1) {
            this.$message.success('移库成功')
            this.subDialogVisible = false
            this.show(this.row)
          }
        }).finally(() => {
          this.loading.confirm = false
        })
      }
    },
    clear () {
      if (!this.multipleSelection.length) {
        this.$message('请选择清除的库存')
        return
      }
      let detailIdList = this.multipleSelection.map(item => item.detailId)
      this.loading.clearBtn = true
      api.storage.warehouseManagement.clearStockDetail({
        detailIdList: detailIdList
      }).then(response => {
        if (response.data.messageType === 1) {
          this.$message.success('库存清除成功')
          this.show()
        }
      }).finally(() => {
        this.loading.clearBtn = false
      })
    },
    close () {
      this.search.lineName = ''
      this.search.productCode = ''
    },
    /* 分页 */
    sizeChange (val) {
      this.page.size = val
      if (this.page.currentPage === 1) {
        this.show()
      } else {
        this.page.currentPage = 1
      }
    },
    currentChange (val) {
      this.page.currentPage = val
      this.show()
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
