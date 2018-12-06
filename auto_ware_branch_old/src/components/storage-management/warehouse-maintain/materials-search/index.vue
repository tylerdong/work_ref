<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-form :inline="true" :model="searchInfo">

            <el-form-item prop="batchNo">
              <el-select v-model="searchInfo.batchNo" placeholder="请选择批号" :loading="loading.batchNos" filterable clearable>
                <el-option v-for="item in list.batchNo" :key="item.id" :label="item.batchNo" :value="item.batchNo"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item prop="material">
              <el-input v-model="searchInfo.material" placeholder="请输入物料"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="getData" :loading="search.loading">查询</el-button>
            </el-form-item>

          </el-form>
        </div>
      </div>

      <el-table :data="tableData" border style="width: 100%" v-loading="loading.table">
        <el-table-column prop="id" label="编号" width="100"></el-table-column>
        <el-table-column prop="batchno" label="批号" width="160"></el-table-column>
        <el-table-column prop="grade" label="等级" width="90"></el-table-column>
        <el-table-column prop="material" label="物料" width="200"></el-table-column>
        <el-table-column prop="materialtext" label="描述" width="350"></el-table-column>
        <el-table-column prop="product" label="产品名称"></el-table-column>
        <el-table-column prop="spec" label="规格" width="200"></el-table-column>
      </el-table>
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
    components: {},
    mounted () {
      this.getAllBatchNo()
      this.getData()
    },
    data () {
      return {
        search: {
          loading: false
        },
        searchInfo: {
          batchNo: '',
          material: ''
        },
        loading: { batchNo: false, table: false },
        pages: { currentPage: 1, sizes: [15, 30, 50, 100], size: 15, total: 0 },
        tableData: [],
        list: {
          batchNo: []
        },
        rules: {
          batchNo: [{}],
          material: [{}]
        }
      }
    },
    methods: {
      getAllBatchNo () {
        this.loading.batchNo = true
        api.storage.warehouseManagement.getAllBatch().then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.list.batchNo = data.data
          }
        }).finally(() => {
          this.loading.batchNo = false
        })
      },
      getData () {
        this.search.loading = true
        this.loading.table = true
        let param = {
          batchNo: this.searchInfo.batchNo,
          material: this.searchInfo.material,
          pageIndex: this.pages.currentPage,
          pageCount: this.pages.size
        }
        api.storage.warehouseMaintain.getSapMaterialList(param).then(response => {
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
<style scoped lang="scss">
  .tags {
    margin-right: 10px
  }
  .el-form-item {
    margin-bottom: 0;
  }
</style>
