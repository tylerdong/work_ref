<template>
  <div>
    <!--<main-breadcrumb nameId="020308"></main-breadcrumb>-->
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-select v-model="workshopId" placeholder="请选择车间" clearable>
            <el-option
              v-for="item in workShopList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-button type="primary" @click="getData" :loading="search.loading">查询</el-button>
          <el-button type="primary" @click="chooseFun('add')">新增</el-button>
        </div>
      </div>

      <el-table :data="tableData" border style="width: 100%" v-loading="loading" element-loading-text="拼命加载中">
        <el-table-column prop="workShopName" label="所属车间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="line" label="线别" show-overflow-tooltip></el-table-column>
        <el-table-column prop="productName" label="生产产品" show-overflow-tooltip></el-table-column>
        <el-table-column label="落筒方式" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.doffType==='1'?'手动落筒':'自动落筒' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="自动外观检">
          <template slot-scope="scope">{{scope.row.autoType | booleanFormat}}</template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <!--<el-button-->
              <!--@click.native.prevent="chooseFun('show', scope)"-->
              <!--type="primary"-->
              <!--size="small">-->
              <!--查看-->
            <!--</el-button>-->
            <el-button @click.native.prevent="chooseFun('edit', scope)" type="text">修改</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="hy-admin__pagination-wrapper">
        <el-pagination
          class="fr"
          :current-page="page.currentPage"
          :page-sizes="[20, 30, 40, 50]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
      <D_dialog ref="refDialog" @callback="callback" :workShopList="workShopList" :productList="productList" :type="type"></D_dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from 'src/api'
  export default {
    components: {
      'D_dialog': require('./dialog.vue')
      // 'main-breadcrumb': require('../../../common/breadcrumb.vue')
    },
    data () {
      return {
        search: {
          loading: false
        },
        type: '',
        workshopId: '',
        workShopList: [],
        productList: [],
        tableData: [],
        page: {
          currentPage: 1,
          total: 20,
          pageSize: 20
        },
        loading: false
      }
    },
    mounted () {
      this.getData()
      this.getWorkShopNameList()
      this.getProductList()
    },
    methods: {
      getData () {
        this.search.loading = true
        this.loading = true
        let params = {
          workshopId: this.workshopId,
          pageIndex: this.page.currentPage,
          pageCount: this.page.pageSize
        }
        api.automatic.productPlan.getLine(params).then(response => {
          if (response.data.messageType === 1) {
            this.tableData = response.data.data.list
            this.page.total = response.data.data.count
            return true
          }
          if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
            return true
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
          this.search.loading = false
          this.loading = false
        })
      },
      getWorkShopNameList () {
        let params = {}
        api.automatic.dictionary.getAllWorkshopList(params).then(response => {
          if (response.data.messageType === 1) {
            this.workShopList = response.data.data
            return true
          }
          if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
            return true
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
        })
      },
      getProductList () {
        let params = {}
        api.automatic.dictionary.getAllProductTypeList(params).then(response => {
          if (response.data.messageType === 1) {
            this.productList = response.data.data
            return true
          }
          if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
            return true
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
        })
      },
      handleSizeChange (val) {
        this.page.pageSize = val
        this.getData()
      },
      handleCurrentChange (val) {
        this.page.currentPage = val
        this.getData()
      },
      chooseFun (type, scope) {
        if (type === 'add') {
          this.$refs.refDialog.$refs.newInfo.resetFields()
          this.$refs.refDialog.toggle({
            title: '新增',
            id: '',
            line: '',
            workShopId: '',
            workShopName: '',
            productId: '',
            productName: '',
            doffType: '',
            autoType: '0',
            disabled: false,
            doffTypeDisabled: false,
            dialogFormVisible: true
          })
        } else if (type === 'show') {
          this.$refs.refDialog.toggle({
            title: '查看',
            id: scope.row.id,
            line: scope.row.line,
            workShopId: scope.row.workShopId,
            workShopName: scope.row.workShopName,
            productId: scope.row.productId,
            productName: scope.row.productName,
            doffType: scope.row.doffType,
            autoType: scope.row.autoType,
            disabled: true,
            doffTypeDisabled: true,
            dialogFormVisible: true
          })
        } else if (type === 'edit') {
          this.$refs.refDialog.toggle({
            title: '修改',
            id: scope.row.id,
            line: scope.row.line,
            workShopId: scope.row.workShopId,
            workShopName: scope.row.workShopName,
            productId: scope.row.productId,
            productName: scope.row.productName,
            doffType: scope.row.doffType,
            autoType: scope.row.autoType,
            disabled: true,
            doffTypeDisabled: false,
            dialogFormVisible: true
          })
        }
        this.type = type
      },
      callback () {
        this.getData()
      }
    }
  }
</script>
