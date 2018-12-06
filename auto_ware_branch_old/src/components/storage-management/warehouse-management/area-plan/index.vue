<!--库位计划-->
<template>
  <div>
    <div class="page-wrapper">
      <div class="cf action-bar">
        <div class="fr">
          <el-select v-model="searchInfo.warehouseId" filterable placeholder="请选择仓库" :loading="loading.selWarehouse" clearable>
            <el-option v-for="item in list.warehouse" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-input class="width1" v-model="searchInfo.storageCode" placeholder="请输入库位"></el-input>
          <el-select v-model="searchInfo.batchNo" placeholder="请选择批号" :loading="loading.selBatchNo" filterable clearable>
            <el-option v-for="item in list.batchNo" :key="item.batchNo" :label="item.batchNo" :value="item.batchNo"></el-option>
          </el-select>
          <el-button type="primary" @click="searchClick" :loading="search.loading">查询</el-button>
          <el-button type="primary" @click="btnAdd">新增</el-button>
        </div>
      </div>

      <template>
        <el-table ref="tableRef" :data="tableData" @selection-change="selectChange" border style="width: 100%" v-loading="loading.table">
          <el-table-column prop="warehouseName" label="仓库名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="storageName" label="库位" show-overflow-tooltip></el-table-column>
          <el-table-column label="当前状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.storageStatus | filterStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column label="批号" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tag v-for="item in scope.row.planBatchNoList" :key="item" class="tags">{{ item + ' ' }}</el-tag>
            </template>
          </el-table-column>
          <!--<el-table-column prop="planSpec" label="规格" show-overflow-tooltip></el-table-column>-->
          <el-table-column label="使用车间" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tag v-for="item in scope.row.planWorkshopIdNameList" :key="item.id" class="tags">{{ item.name + ' ' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="maxCapacity" label="成品名称及最大容量" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row | filterMaxCapacity}}</span>
            </template>
          </el-table-column>
          <el-table-column label="成品类型" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.produceType | filterType}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="levelName" label="等级" show-overflow-tooltip></el-table-column>
          <!--<el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>-->
          <el-table-column label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="btnEdit(scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="hy-admin__pagination-wrapper cf">
        <el-pagination
          class="fr"
          @size-change="btnSizeChange"
          @current-change="btnCurrentChange"
          :current-page="pages.currentPage"
          :page-sizes="pages.sizes"
          :page-size="pages.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pages.total">
        </el-pagination>
      </div>
    </div>

    <!--&lt;!&ndash; 新增叉车 &ndash;&gt;-->
    <dialog-add ref="addDialog" :batchNoList="list.batchNo" :warehouseList="list.warehouse" :workshopList="list.workshop" :typeList="list.type" :gradeList="list.grade" @successSubmit="getData"></dialog-add>
    <dialog-edit ref="editDialog" :batchNoList="list.batchNo" :warehouseList="list.warehouse" :workshopList="list.workshop" :typeList="list.type" :gradeList="list.grade" @successSubmit="getData"></dialog-edit>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    components: {
      'dialog-add': require('./dialog-add.vue'),
      'dialog-edit': require('./dialog-edit.vue'),
      'location-dialog': require('./location-dialog.vue')
    },
    data () {
      return {
        search: {
          loading: false
        },
        tableData: [],
        loading: {
          table: false,
          selWarehouse: false,
          selBatchNo: false,
          ban: false
        },
        searchInfo: {
          warehouseId: '',
          storageId: '',
          batchNo: ''
        },
        selectedList: [],
        list: {
          type: [
            {id: 'INNER_SALE', name: '内销'},
            {id: 'OUT_SALE', name: '外贸'}
          ],
          batchNo: [],
          grade: [],
          warehouse: [],
          workshop: [],
          status: [
            {id: 'USING', name: '使用中'},
            {id: 'BAN', name: '禁用'}
          ]
        },
        pages: {
          currentPage: 1,
          sizes: [15, 30, 50, 100],
          size: 15,
          total: 0
        }
      }
    },
    mounted () {
      this.getAllWarehouseList()
      this.getAllWorkshopList()
      this.getAllGradeList()
      this.getAllBatchNo()
    },
    methods: {
      getData () {
        if (!this.searchInfo.warehouseId) {
          return this.$message.error('请选择仓库')
        }
        this.search.loading = true
        this.loading.table = true
        api.storage.warehouseManagement.getStorageLocationList({
          warehouseId: this.searchInfo.warehouseId,
          storageCode: this.searchInfo.storageCode,
          batch: this.searchInfo.batchNo,
          pageIndex: this.pages.currentPage,
          pageCount: this.pages.size
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.pages.total = data.data.count
            this.tableData = data.data.list
          }
        }).finally(() => {
          this.search.loading = false
          this.loading.table = false
        })
      },
      refresh () {
        this.pages.currentPage = 1
        this.getData()
      },
      searchClick () {
        this.pages.currentPage = 1
        this.getData()
      },
      getAllWarehouseList () {
        this.loading.selWarehouse = true
        api.storage.warehouseMaintain.getAllWarehouseList({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.list.warehouse = data.data
            this.searchInfo.warehouseId = this.list.warehouse[0].id
            this.getData()
          }
        }).finally(() => {
          this.loading.selWarehouse = false
        })
      },
      getAllWorkshopList () {
        api.storage.warehouseManagement.getAllWorkshop({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.list.workshop = data.data
          }
        })
      },
      getAllGradeList () {
        api.storage.warehouseManagement.getAllLevel({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.list.grade = data.data
          }
        })
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
      btnAdd (row) {
        this.$refs.addDialog.open()
      },
      selectChange (selection) {
        this.selectedList = selection
      },
      btnEdit (row) {
        if (row.storageStatus === 'BAN') {
          this.$message.error('只有使用中的才能修改')
          return
        }

        this.$refs.editDialog.open(row)
      },
      /* 分页 */
      btnSizeChange (size) {
        this.pages.size = size
        if (this.pages.currentPage === 1) {
          this.getData()
        } else {
          this.pages.currentPage = 1
        }
      },
      btnCurrentChange (currenPage) {
        this.pages.currentPage = currenPage
        this.getData()
      }
    },
    filters: {
      filterStatus (value) {
        let res = ''
        if (value === 'USING') {
          res = '使用中'
        } else if (value === 'BAN') {
          res = '禁用'
        }
        return res
      },
      filterType (value) {
        let res = ''
        if (value === 'INNER_SALE') {
          res = '内销'
        } else if (value === 'OUT_SALE') {
          res = '外贸'
        }
        return res
      },
      filterMaxCapacity (row) {
        let res = ''
        if (row.maxCapacityPoy) {
          res += 'POY(' + row.maxCapacityPoy + ') '
        }
        if (row.maxCapacityFdy) {
          res += 'FDY(' + row.maxCapacityFdy + ') '
        }
        if (row.maxCapacityChip) {
          res += 'CHIP(' + row.maxCapacityChip + ')'
        }
        return res
      }
    }
  }
</script>
<style scoped lang="scss">
  .page-wrapper{
    padding: 10px;
    background-color: #fff;
    margin: 10px;
    border-radius: 4px;
  }
  .action-bar{
    margin-bottom: 10px;
  }
  .tags {
    margin-right: 10px
  }
</style>
