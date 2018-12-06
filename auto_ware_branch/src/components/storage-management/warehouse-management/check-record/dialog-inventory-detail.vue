<template>
  <el-dialog title="查看码单" width="50%" :visible.sync="dialogVisible" top="5%" @close="close" :modal="false">
    <!--<el-button style="float: right; margin-bottom: 10px" type="primary" @click="clear" :loading="loading.clear">清理库存</el-button>-->
    <el-table :data="tableData" @selection-change="handleSelectionChange" v-loading="loading.table">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column property="code" label="码单"></el-table-column>
      <el-table-column label="生产日期">
        <template slot-scope="scope">{{scope.row.productTime | timeFormat('YYYY-MM-DD')}}</template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">正常入库</template>
      </el-table-column>
      <el-table-column label="入库时间">
        <template slot-scope="scope">{{scope.row.inboundTime | timeFormat('YYYY-MM-DD HH:mm')}}</template>
      </el-table-column>
      <el-table-column property="inboundOperater" label="入库员"></el-table-column>
      <el-table-column property="netWeight" label="净重"></el-table-column>
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
  data () {
    return {
      tableData: [],
      loading: {
        table: false,
        clear: false,
        confirm: false
      },
      code: '',
      multipleSelection: [],
      row: {},
      searchInfo: {},
      batchNo: '',
      warehouseType: '',
      lgort: '',
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
    show (row, searchInfo) {
      this.row = row
      this.searchInfo = searchInfo
      this.getData()
    },
    getData () {
      this.subDialogVisible = false
      this.dialogVisible = true
      this.loading.table = true
      console.log(this.row)
      console.log(this.searchInfo)
      api.storage.warehouseManagement.viewWeightMemo({
        batchNo: this.row.batch,
        warehouseType: this.searchInfo.warehouseType,
        productDate: this.searchInfo.productDate,
        inboundDate: this.searchInfo.inboundDate,
        storageId: this.row.storageId,
        classId: this.searchInfo.classId,
        startInboundDate: this.searchInfo.startInboundDate,
        startScanTime: this.searchInfo.startScanTime,
        endScanTime: this.searchInfo.endScanTime,
        netWeight: this.row.netWeight,
        level: this.row.level,
        pageIndex: this.page.currentPage,
        pageCount: this.page.size
      }).then(response => {
        const data = response.data
        if (data.messageType === 1) {
          this.page.total = data.data.count
          this.tableData = data.data.list
        }
      }).finally(() => {
        this.loading.table = false
      })
    },
    close () {
      console.log('arg', arguments)
      this.$emit('reload')
    },
    transferStorage (row) {
      this.code = row.code
      this.storage = ''
      this.subDialogVisible = true
    },
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
          this.getData()
        }
      }).finally(() => {
        this.loading.confirm = false
      })
    },
    clear () {
      if (!this.multipleSelection.length) {
        this.$message('请选择清除的库存')
        return
      }
      this.loading.clear = true
      let detailIdList = this.multipleSelection.map(item => item.detailId)
      api.storage.warehouseManagement.clearStockDetail({
        detailIdList: detailIdList
      }).then(response => {
        if (response.data.messageType === 1) {
          this.$message.success('库存清除成功')
          this.getData()
        }
      }).finally(() => {
        this.loading.clear = false
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

</style>
