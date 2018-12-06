<!-- 机台机车管理 -->
<template>
  <div>
    <breadcrumb nameId="020101"></breadcrumb>
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-select
            v-model="searchInfo.searchInput"
            filterable
            placeholder="按线别查询"
            :loading="loading.selectLine"
            @change="selectChangeLine" clearable>
            <el-option
              v-for="item in searchInfo.searchList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-button type="primary" @click="btnSearch" :loading="searchInfo.loading">查询</el-button>
          <el-button type="primary" @click="btnAdd">新增</el-button>
          <!--<el-button type="primary">导入</el-button>-->
        </div>
      </div>
      <template>
        <el-table :data="list.tableData" border style="width: 100%" v-loading="loading.table">
          <el-table-column prop="workshopName" width="100" label="所属车间"></el-table-column>
          <el-table-column prop="lineName" width="70" label="线别"></el-table-column>
          <el-table-column prop="item" label="机台位号" min-width="100"></el-table-column>
          <el-table-column prop="number" label="设备编号" min-width="100"></el-table-column>
          <el-table-column prop="name" label="设备名称" min-width="100"></el-table-column>
          <el-table-column prop="partNum" label="卷绕头数"></el-table-column>
          <el-table-column prop="spindleNum" label="锭数"></el-table-column>
          <el-table-column prop="param" label="制造参数"></el-table-column>
          <el-table-column prop="supplier" label="厂商"></el-table-column>
          <el-table-column prop="brand" label="品牌" min-width="80"></el-table-column>
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

      <!-- 新增机台 -->
      <dialog-add
        ref="refDialogAdd"
        :shop-list="list.shopList"
        @callback-refresh-data="getData">
      </dialog-add>

      <!-- 修改机台 -->
      <dialog-edit
        ref="refDialogEdit"
        :shop-list="list.shopList"
        @callback-refresh-data="getData">
      </dialog-edit>
    </div>
  </div>
</template>

<script>
  import * as api from 'src/api'
  export default {
    components: {
      'dialog-add': require('./dialog-add.vue'),
      'dialog-edit': require('./dialog-edit.vue'),
      'breadcrumb': require('../../../common/breadcrumb.vue')
    },
    mounted () {
      this.getData()
      this.getProductLine()
      this.getShopList()
    },
    data () {
      return {
        searchInfo: {
          loading: false,
          searchInput: '',
          searchList: []
        },
        list: {
          tableData: [],
          shopList: []
        },
        loading: {
          table: false,
          selectLine: false
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
        this.searchInfo.loading = true
        this.loading.table = true
        this.list.tableData = []
        api.automatic.device.getProductionMachineList({
          lineId: this.searchInfo.searchInput,
          pageIndex: this.pages.currentPage,
          pageCount: this.pages.size
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.pages.total = data.data.count
            this.list.tableData = data.data.list
          }
        }).finally(() => {
          this.searchInfo.loading = false
          this.loading.table = false
        })
      },

      /* 获取所有线别信息 */
      getProductLine () {
        this.searchInfo.searchInput = ''
        this.searchInfo.searchList = []
        this.loading.selectLine = true
        api.automatic.productPlan.getAllLine({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            for (let item of data.data) {
              this.searchInfo.searchList.push({
                id: item.id,
                name: item.line
              })
            }
          }
        }).finally(() => {
          this.loading.selectLine = false
        })
      },

      /* 获取所有车间信息 */
      getShopList () {
        this.list.shopList = []
        api.automatic.dictionary.getAllWorkshopList({}).then(response => {
          const data = response.data
          for (let item of data.data) {
            this.list.shopList.push({
              id: item.id,
              name: item.name
            })
          }
        })
      },

      /* 线别选择 */
      selectChangeLine (id) {
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
    }
  }
</script>
