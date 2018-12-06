<!--车间-->
<template>
  <div>
    <!--<main-breadcrumb nameId="020402"></main-breadcrumb>-->
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <!--<el-input></el-input>-->
          <!--<el-button type="primary" icon="search"></el-button>-->
          <el-button @click="add" type="primary">新增</el-button>
        </div>
      </div>
      <el-table :data="tableData" border v-loading="loading.list" element-loading-text="拼命加载中">
        <el-table-column prop="factoryName" label="名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="factoryCode" label="编码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="city" label="城市" show-overflow-tooltip></el-table-column>
        <el-table-column prop="currency" label="货币" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="edit(scope)" type="text" size="small">修改</el-button>
            <el-button @click="deleteSaleOrganization(scope)" type="text" size="small">删除</el-button>
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
    <edit-dialog @submitSuccess="getData" ref="editDialog"></edit-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from 'src/api'
  import storage from './../../../../module/storage'
  export default {
    components: {
      'edit-dialog': require('./dialog-edit.vue')
    },
    data () {
      return {
        tableData: [],
        page: {
          current: 1,
          size: 15,
          total: 0
        },
        loading: {
          list: false
        },
        user: {}
      }
    },
    mounted () {
      this.getData()
      this.user = storage.getUser()
    },
    methods: {
      getData () {
        this.loading.list = true
        let params = {
          pageIndex: this.page.current,
          pageCount: this.page.size
        }
        api.storage.warehouseManagement.getSaleOrganization(params).then((response) => {
          const data = response.data
          console.log(data)
          if (data.messageType === 1) {
            console.log(data)
            this.page.total = data.data.count
            this.tableData = data.data.list
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.list = false
        })
      },
      add () {
        this.$refs.editDialog.show({action: 'add'})
      },
      edit (listItem) {
        this.$refs.editDialog.show({action: 'edit', ...listItem.row})
      },
      deleteSaleOrganization (data) {
        this.$confirm('是否确定删除', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          let param = { id: data.row.id, modifier: this.user.userId }
          api.storage.warehouseManagement.delSaleOrganization(param).then(response => {
            const data = response.data
            if (data.messageType === 1) {
              this.$message({
                type: 'success',
                message: data.message
              })
              this.getData()
              return true
            } else {
              this.$message.error(data.message)
            }
          }).catch(error => {
            console.log(error)
          })
        }).catch(() => {
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
