<template>
  <el-dialog title="查看码单" width="80%" :visible.sync="dialogVisible" top="5%" @close="close">
    <div class="action-bar cf">
      <div class="fr">
        <!--<el-select v-model="search.lineName" placeholder="请选择线别" :loading="loading.line" clearable>-->
          <!--<el-option v-for="item in lineOptions" :key="item.id" :label="item.line" :value="item.line"></el-option>-->
        <el-select v-model="search.stockingStatus" placeholder="请输入状态" clearable>
          <el-option v-for="item in statuslist" :key="item.name" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
        <el-input v-model="search.lineName" class="width1" placeholder="请输入线别"></el-input>
        <el-input v-model="search.productCode" class="width1" placeholder="请输入码单号"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
        <!--<el-button style="float: right; margin-bottom: 10px" type="primary" @click="clear">清理库存</el-button>-->
      </div>
    </div>

    <el-table :data="tableData" @selection-change="handleSelectionChange" v-loading="loading.table">
      <el-table-column property="codeSingle" label="码单"></el-table-column>
      <el-table-column label="生产日期">
        <template slot-scope="scope">{{scope.row.productTime | timeFormat('YYYY-MM-DD')}}</template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope" > {{scope.row.stockingStatus}}</template>
      </el-table-column>
      <el-table-column label="入库日期">
        <template slot-scope="scope">{{scope.row.stockingTime | timeFormat('YYYY-MM-DD')}}</template>
      </el-table-column>
      <el-table-column label="扫码时间">
        <template slot-scope="scope">{{scope.row.scanTime | timeFormat('YYYY-MM-DD HH:mm:ss')}}</template>
      </el-table-column>
      <el-table-column property="operator" label="入库员"></el-table-column>
      <el-table-column property="netWeight" label="净重"></el-table-column>
      <!--移库操作-->
      <!--<el-table-column label="操作">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button type="primary" size="small" @click="transferStorage(scope.row)">移库</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
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
    <!--<el-dialog :title="'移库 ' + code" :visible.sync="subDialogVisible" width="30%" :modal="false">-->
      <!--<el-autocomplete v-model="storage" :fetch-suggestions="querySearchAsync" placeholder="请输入库位"-->
                       <!--@select="handleSelect"></el-autocomplete>-->
      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="subDialogVisible = false">取 消</el-button>-->
        <!--<el-button type="primary" :loading="loading.confirm" @click="confirmBtn">确 定</el-button>-->
      <!--</span>-->
    <!--</el-dialog>-->

  </el-dialog>
</template>

<script>
import * as api from 'src/api'
import storage from 'storage'

export default {
  props: ['lineOptions'],
  data () {
    return {
      warehouseType: '',
      status: '',
      search: {
        lineName: '',
        productCode: '',
        stockingStatus: ''
      },
      statuslist: [
        {
          name: '正常入库'
        },
        {
          name: '入库冲销'
        }],
      tableData: [],
      loading: {
        table: false,
        confirm: false
      },
      code: '',
      multipleSelection: [],
      row: {},
      storage: '',
      storageObj: {},
      dialogVisible: false,
      subDialogVisible: false,
      page: {
        currentPage: 1,
        sizes: [15, 30, 50, 100],
        size: 15,
        total: 0
      }
    }
  },
  methods: {
    show (row) {
      if (row) {
        this.row = row
        this.warehouseType = row.warehouseType
      }
      console.log(row)
      this.subDialogVisible = false
      this.dialogVisible = true
      this.search.stockStatus = ''
      this.search.lineName = ''
      this.search.productCode = ''
      this.getData()
    },
    getData () {
      this.loading.table = true
      let param = {
        productIds: this.row.productIds,
        stockingStatus: this.search.stockingStatus,
        warehouseType: this.warehouseType,
        lineName: this.search.lineName,
        productCode: this.search.productCode,
        pageIndex: this.page.currentPage,
        pageCount: this.page.size
      }
      api.storage.warehouseManagement.getCodeInfoList(param).then(response => {
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
    transferStorage (row) {
      this.code = row.codeSingle
      this.storage = ''
      this.subDialogVisible = true
    },
    // querySearchAsync (queryString, cb) {
    //   if (!queryString) {
    //     return cb(null)
    //   }
    //   api.storage.warehouseManagement.getStorageIdCodeByLikeCode({
    //     code: queryString
    //   }).then(response => {
    //     let result = response.data.data.map(item => {
    //       item.value = item.name
    //       return item
    //     })
    //     cb(result)
    //   })
    // },
    handleSelect (val) {
      this.storageObj = val
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    confirmBtn () {
      this.loading.confirm = true
      api.storage.warehouseManagement.moveStockDetail({
        productCode: this.code,
        storageId: this.storageObj.id,
        employeeId: storage.getUser().employeeId
      }).then(response => {
        let data = response.data
        if (data.messageType === 1) {
          this.$message.success('移库成功')
          this.subDialogVisible = false
          this.getData(this.row)
        }
      }).finally(() => {
        this.loading.confirm = false
      })
    },
    clear () {
      this.loading.clearBtn = true
      if (!this.multipleSelection.length) {
        this.$message('请选择清除的库存')
        return
      }
      let detailIdList = this.multipleSelection.map(item => item.detailId)
      api.storage.warehouseManagement.clearStockDetail({
        detailIdList: detailIdList
      }).then(response => {
        if (response.data.messageType === 1) {
          this.$message.success('库存清除成功')
          this.getData()
        }
      }).finally(() => {
        this.loading.clearBtn = false
      })
    },
    close () {
      this.page.currentPage = 1
      this.page.size = 15
      this.search.stockingStatus = ''
      this.search.lineName = ''
      this.search.productCode = ''
      this.dialogVisible = false
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

</style>
