<!-- 叉车管理 -->
<template>
  <div>
    <!--<breadcrumb nameId="020105"></breadcrumb>-->
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-select
            v-model="searchInfo.searchInput"
            filterable
            placeholder="按选择车间查询"
            :loading="loading.selectShop"
            @change="selectChangeShop" clearable>
            <el-option
              v-for="item in list.shopList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-button type="primary" @click="btnSearch">查询</el-button>
          <el-button type="primary" @click="btnAdd">新增</el-button>
          <!--<el-button type="primary">导入</el-button>-->
        </div>
      </div>

      <template>
        <el-table :data="list.tableData" border style="width: 100%" v-loading="loading.table">
          <el-table-column prop="workshopName" label="所属车间"></el-table-column>
          <el-table-column prop="number" label="叉车编号"></el-table-column>
          <el-table-column prop="classifyName" label="叉车类型" min-width="100"></el-table-column>
          <el-table-column label="当前状态">
            <template slot-scope="scope">
              <span>{{scope.row.status | filterState}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="supplier" label="厂商"></el-table-column>
          <el-table-column prop="brand" label="品牌"></el-table-column>
          <el-table-column label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="btnEdit(scope.row)">修改</el-button>
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
    <dialog-add
      ref="refDialogAdd"
      :shop-list="list.shopList"
      :forklift-type-list="list.forkliftTypeList"
      @callback-refresh-data="getData">
    </dialog-add>

    <!-- 修改叉车 -->
    <dialog-edit
      ref="refDialogEdit"
      :shop-list="list.shopList"
      :forklift-type-list="list.forkliftTypeList"
      @callback-refresh-data="getData">
    </dialog-edit>

  </div>
</template>

<script>
  import * as api from 'src/api'
  export default {
    components: {
      // 'breadcrumb': require('../../../common/breadcrumb.vue'),
      'dialog-add': require('./dialog-add.vue'),
      'dialog-edit': require('./dialog-edit.vue')
    },
    mounted () {
      this.getData()
      this.getShopList()
      this.getForkliftTypeList()
    },
    data () {
      return {
        searchInfo: {
          searchInput: ''
        },
        list: {
          tableData: [],
          shopList: [],
          forkliftTypeList: []
        },
        loading: {
          table: false,
          selectShop: false
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
        api.automatic.device.getForkliftList({
          workshopId: this.searchInfo.searchInput,
          pageIndex: this.pages.currentPage,
          pageCount: this.pages.size
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.pages.total = data.data.count
            this.list.tableData = data.data.list
          }
        }).finally(() => {
          this.loading = false
        })
      },

      /* 获取所有车间信息 */
      getShopList () {
        this.list.shopList = []
        this.loading.selectShop = true
        api.automatic.dictionary.getAllWorkshopList({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            for (let item of data.data) {
              this.list.shopList.push({
                id: item.id,
                name: item.name
              })
            }
          }
        }).finally(() => {
          this.loading.selectShop = false
        })
      },

      /* 获取所有叉车类型 */
      getForkliftTypeList () {
        this.list.forkliftTypeList = []
        api.automatic.dictionary.getAllForkliftClassifyList({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            for (let item of data.data) {
              this.list.forkliftTypeList.push({
                id: item.id,
                name: item.name
              })
            }
          }
        })
      },

      /* 线别选择 */
      selectChangeShop (id) {
        this.searchInfo.searchInput = id
      },

      /* 搜索 */
      btnSearch () {
        this.getData()
      },

      /* 添加 */
      btnAdd () {
        this.$refs.refDialogAdd.btnOpen()
      },

      /* 修改 */
      btnEdit (row) {
        this.$refs.refDialogEdit.btnOpen(row)
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
      filterState: function (value) {
        if (value === '1') {
          return '空闲'
        }
        if (value === '2') {
          return '工作中'
        }
      }
    }
  }
</script>
