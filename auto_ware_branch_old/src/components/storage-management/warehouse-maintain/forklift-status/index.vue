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
        </div>
      </div>

      <template>
        <el-table :data="tableData" border style="width: 100%" v-loading="loading.table">
          <el-table-column prop="plateNumber" label="车牌号"></el-table-column>
          <el-table-column prop="currentUser" label="当前用户"></el-table-column>
          <el-table-column label="当前状态">
            <template slot-scope="scope">
              <span>{{scope.row.currentStatus | filterStatus}}</span>
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
  </div>
</template>

<script>
  import * as api from 'src/api'
  export default {
    components: {
      // 'breadcrumb': require('../../../common/breadcrumb.vue')
    },
    mounted () {
      this.getData()
      this.getAllWorkshopList()
    },
    data () {
      return {
        searchInfo: {
          workshop: ''
        },
        tableData: [],
        list: {
          workshop: [],
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
        api.storage.warehouseMaintain.getForkliftStatusList({
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

      getAllWorkshopList () {
        this.list.workshop = []
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
        if (value === 'OFF_LINE') {
          return '离线'
        }
        if (value === 'SPARE_TIME') {
          return '空闲'
        }
        if (value === 'WORKING') {
          return '工作中'
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
