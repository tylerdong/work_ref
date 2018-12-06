<template>
  <div>
    <!--<breadcrumb nameId="060103"></breadcrumb>-->
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-button type="primary" @click="btnAdd">新增</el-button>
        </div>
      </div>
      <template>
        <el-table :data="tableData" border style="width: 100%" v-loading="loading.table">
          <el-table-column type="index" label="序号" width="100"></el-table-column>
          <el-table-column prop="reason" label="翻包原因"></el-table-column>
          <el-table-column label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="btnEdit(scope.row)">修改</el-button>
              <el-button type="text" @click="btnDelete(scope.row)">删除</el-button>
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
    <dialog-add ref="refDialogAdd"  @submitSuccess="getData"></dialog-add>
    <dialog-edit ref="refDialogEdit" @submitSuccess="getData"></dialog-edit>
  </div>
</template>

<script>
  import * as api from 'src/api'
  import storage from 'storage'
  export default {
    components: {
      // 'breadcrumb': require('../../../common/breadcrumb.vue'),
      'dialog-add': require('./dialog-add.vue'),
      'dialog-edit': require('./dialog-edit.vue')
    },
    mounted () {
      this.getData()
    },
    data () {
      return {
        tableData: [
          { number: 'A001', reason: 'r1' },
          { number: 'A002', reason: 'r2' }
        ],
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
        this.loading.table = true
        api.storage.warehouseMaintain.getReturnReasonList({
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
      btnAdd () {
        this.$refs.refDialogAdd.btnOpen()
      },
      btnEdit (row) {
        this.$refs.refDialogEdit.btnOpen(row)
      },
      btnDelete (row) {
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              api.storage.warehouseMaintain.deleteReturnReason({
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
