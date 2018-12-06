<template>
  <div>
    <!--<breadcrumb nameId="060102"></breadcrumb>-->
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-select v-model="searchInfo.workshop" placeholder="请选择车间" :loading="loading.workshop" filterable clearable>
            <el-option v-for="item in list.workshop" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-button type="primary" @click="getData">查询</el-button>
          <el-button type="primary" @click="btnAdd">新增</el-button>
          <!--<el-button type="primary" @click="btnInRule">入库叉车规则</el-button>-->
          <!--<el-button type="primary" @click="btnOutRule">出库叉车规则</el-button>-->
        </div>
      </div>

      <template>
        <el-table :data="tableData" border style="width: 100%" v-loading="loading.table">
          <el-table-column prop="number" label="编号"></el-table-column>
          <el-table-column prop="plateNumber" label="车牌号"></el-table-column>
          <el-table-column label="叉车类型" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.forkliftType | filterType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="所属车间" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tag v-for="tag in getWorkshopList(scope.row)" :key="tag" class="tags">{{tag}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="所属仓库" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tag  v-for="tag in getWarehouseList(scope.row)" :key="tag" class="tags">{{tag}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="hy-admin__pagination-wrapper">
        <el-pagination
          class="fr"
          style="text-align: right;"
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

    <!-- 新增叉车 -->
    <dialog-add ref="refDialogAdd" :workshopList="list.workshop" :warehouseList="list.warehouse" :typeList="list.type" @successSubmit="getData"></dialog-add>

    <in-rule-dialog ref="inRuleDialog"></in-rule-dialog>
    <out-rule-dialog ref="outRuleDialog"></out-rule-dialog>
  </div>
</template>

<script>
  import * as api from 'src/api'
  export default {
    components: {
      // 'breadcrumb': require('../../../common/breadcrumb.vue'),
      'dialog-add': require('./dialog-add.vue'),
      'in-rule-dialog': require('./in-rule-dialog.vue'),
      'out-rule-dialog': require('./out-rule-dialog.vue')
    },
    mounted () {
      this.getData()
      this.getAllWorkshopList()
      this.getAllWarehouseList()
    },
    data () {
      return {
        searchInfo: {
          workshop: ''
        },
        tableData: [],
        list: {
          workshop: [],
          warehouse: [],
          type: [
            { id: 'OUT_STOCK', name: '出库' },
            { id: 'IN_STOCK', name: '入库' }
          ],
          status: [
            { id: 'OFF_LINE', name: '离线' },
            { id: 'SPARE_TIME', name: '空闲' },
            { id: 'WORKING', name: '工作中' }
          ]
        },
        loading: {
          table: false,
          workshop: false
        },
        pages: {
          currentPage: 1,
          sizes: [15, 30, 50, 100],
          size: 15,
          total: 0
        }
      }
    },
    methods: {
      getData () {
        this.loading.table = true
        api.storage.warehouseMaintain.getForkliftList({
          workshopId: this.searchInfo.workshop,
          pageIndex: this.pages.currentPage,
          pageCount: this.pages.size
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.pages.total = data.data.count
            this.tableData = data.data.list
          }
        }).finally(() => {
          this.loading.table = false
        })
      },
      getWorkshopList (row) {
        return (row.forkliftType === 'IN_STOCK') ? row.relationName : []
      },
      getWarehouseList (row) {
        return (row.forkliftType === 'OUT_STOCK') ? row.relationName : []
      },

      getAllWorkshopList () {
        this.loading.workshop = true
        api.storage.warehouseManagement.getAllWorkshop({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            for (let item of data.data) {
              this.list.workshop.push({
                id: item.id,
                name: item.name
              })
            }
          }
        }).finally(() => {
          this.loading.workshop = false
        })
      },

      getAllWarehouseList () {
        this.loading.selectWorkshop = true
        api.storage.warehouseMaintain.getAllWarehouseList({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            for (let item of data.data) {
              this.list.warehouse.push({
                id: item.id,
                name: item.name
              })
            }
          }
        }).finally(() => {
          this.loading.selectShop = false
        })
      },

      /* 添加 */
      btnAdd () {
        this.$refs.refDialogAdd.btnOpen()
      },
      btnInRule () {
        this.$refs.inRuleDialog.open()
      },
      btnOutRule () {
        this.$refs.outRuleDialog.open()
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
      filterType (value) {
        if (value === 'OUT_STOCK') {
          return '出库'
        }
        if (value === 'IN_STOCK') {
          return '入库'
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .tags {
    margin-right: 10px
  }
</style>
