<!--班次维护-->
<template>
  <div>
    <!--<main-breadcrumb nameId="060101"></main-breadcrumb>-->
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-button @click="add" type="primary">新增</el-button>
        </div>
      </div>
      <el-table :data="tableData" border v-loading="loading.list" element-loading-text="拼命加载中">
        <el-table-column prop="code" label="编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="仓库名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="type" label="仓库类型" show-overflow-tooltip></el-table-column>
        <el-table-column label="SAP仓库点" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag  v-for="tag in scope.row.lgortList" :key="tag.lgort" class="tags">{{tag.lgobe + ' '}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="车间" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag  v-for="tag in scope.row.workshopList" :key="tag" class="tags">{{tag + ' '}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="categoryRow" label="库位行数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="categoryColumn" label="库位列数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="categoryNum" label="库位数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="capacityPoy" label="全POY库容（箱）" show-overflow-tooltip></el-table-column>
        <el-table-column prop="capacityFdy" label="全FDY库容（箱）" show-overflow-tooltip></el-table-column>
        <el-table-column prop="capacityFullSection" label="全切片库容（包）" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="hy-admin__pagination-wrapper cf">
        <el-pagination
          class="fr"
          :current-page="page.current"
          :page-sizes="[15, 30, 50, 100]"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange">
        </el-pagination>
      </div>
    </div>
    <add-dialog @submitSuccess="getData" :workshopList="list.workshop" :typeList="typeList" ref="addDialog"></add-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from 'src/api'
  import storage from 'storage'
  export default {
    components: {
      // 'main-breadcrumb': require('common/breadcrumb.vue'),
      'add-dialog': require('./dialog-add.vue')
    },
    data () {
      return {
        tableData: [],
        list: {
          workshop: []
        },
        typeList: [
          { id: '固定', name: '固定库' },
          { id: '临时', name: '临时库' },
          { id: '立体库', name: '立体库' },
          { id: '车丝库', name: '车丝库' }
        ],
        page: {
          current: 1,
          size: 15,
          total: 0
        },
        loading: {
          list: false
        }
      }
    },
    mounted () {
      this.getAllWorkshopList()
      this.getData()
    },
    methods: {
      getData () {
        this.loading.list = true
        let params = {
          pageIndex: this.page.current,
          pageCount: this.page.size
        }
        api.storage.warehouseMaintain.getWarehouseList(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.page.total = data.data.count
            this.tableData = data.data.list
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.loading.list = false
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
      add () {
        this.$refs.addDialog.show()
      },
      del (row) {
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              api.storage.warehouseMaintain.deleteWarehouse({
                modifier: storage.getUser().account,
                id: row.id
              }).then((response) => {
                const data = response.data
                if (data.messageType === 1) {
                  this.dialogVisible = false
                  this.getData()
                }
              }).finally(() => {
                instance.confirmButtonLoading = false
                done()
              })
            } else {
              instance.confirmButtonLoading = false
              done()
            }
          }
        })
      },
      /* 分页 */
      pageSizeChange (size) {
        this.page.size = size
        if (this.page.current === 1) {
          this.getData()
        } else {
          this.page.current = 1
        }
      },
      pageCurrentChange (current) {
        this.page.current = current
        this.getData()
      }
    }
  }
</script>
<style scoped lang="scss">
  .tags {
    margin-right: 10px
  }
</style>
