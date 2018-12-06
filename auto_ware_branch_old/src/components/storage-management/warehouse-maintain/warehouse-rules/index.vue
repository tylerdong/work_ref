<template>
  <div>
      <!--<breadcrumb nameId="060104"></breadcrumb>-->
      <div class="hy-admin__main-container">
        <div class="hy-admin__search-main cf">
          <div class="fr">
            <el-select v-model="searchInfo.batchNo" placeholder="请选择搜索的批号" clearable filterable>
              <el-option v-for="item in batchNolist" :key="item.id" :label="item.id" :value="item.id">{{item.id}}</el-option>
            </el-select>
            <el-button type="primary" @click="btnsearch" :icon="searchico" :loading="search.loading">{{allInfo}}</el-button>
            <el-button type="primary" size="big" @click="btnAdd()">增加</el-button>
          </div>
        </div>
        <template>
          <el-table :data="tableData" border style="width: 100%" v-loading="loading.table">
            <el-table-column prop="batchNo" label="批号"></el-table-column>
            <el-table-column prop="delayDate" label="延迟天数"></el-table-column>
            <el-table-column label="是否自动">
              <template slot-scope="scope">{{scope.row.isAuto | booleanFormat}}</template>
            </el-table-column>
            <el-table-column label="操作" min-width="100">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="btnDelete(scope.row)">删除</el-button>
                <el-button type="primary" size="small" @click="btnEdit(scope.row)">修改</el-button>
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
      <dialog-add ref="addDialog"  @submitSuccess="uploa"></dialog-add>
      <dialog-edit ref="editDialog" @submitSuccess="uploa"></dialog-edit>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    created () {},
    components: {
      // 'breadcrumb': require('../../../common/breadcrumb.vue'),
      'dialog-add': require('./dialog-add.vue'),
      'dialog-edit': require('./dialog-edit.vue')
    },
    mounted () {
      this.getData()
      this.getlist()
    },
    data () {
      return {
        search: {
          loading: false
        },
        allInfo: '',
        searchico: 'el-icon-search',
        batchNolist: [],
        tableData: [],
        loading: {
          table: false
        },
        searchInfo: {
          batchNo: ''
        },
        pages: {
          currentPage: 1,
          sizes: [15, 30, 50, 100],
          size: 15,
          total: 0
        }
      }
    },
    watch: {
      'searchInfo.batchNo': 'isAll'
    },
    methods: {
      isAll (a, b) {
        if (a !== '') {
          this.allInfo = ''
          this.searchico = 'el-icon-search'
        } else {
          this.searchico = ''
          this.allInfo = '显示全部'
        }
      },
      getlist () {
        const _vm = this
        let param = {
          pageIndex: this.pages.currentPage,
          pageCount: this.pages.size
        }
        api.storage.warehouseManagement.selectInboundRule(param).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.pages.total = data.data.count
            this.tableData = data.data.list
            for (let i = 0; i < data.data.list.length; i++) {
              _vm.batchNolist.push({id: data.data.list[i].batchNo})
            }
            console.log(this.batchNolist)
          }
        }).catch((e) => { console.log(e) }).finally(() => {
          this.loading.table = false
        })
      },
      btnsearch () {
        this.search.loading = true
        this.getData()
      },
      uploa () {
        this.batchNolist = []
        this.getlist()
      },
      getData () {
        this.loading.table = true
        let param = {
          batchNo: this.searchInfo.batchNo,
          pageIndex: this.pages.currentPage,
          pageCount: this.pages.size
        }
        api.storage.warehouseManagement.selectInboundRule(param).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.pages.total = data.data.count
            this.tableData = data.data.list
          }
        }).catch((e) => { console.log(e) }).finally(() => {
          this.search.loading = false
          this.loading.table = false
        })
      },
      btnAdd () {
        this.$refs.addDialog.open()
      },
      btnEdit (row) {
        this.$refs.editDialog.open(row)
      },
      btnDelete (row) {
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              api.storage.warehouseManagement.deleteInboundRule({
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

<style>

</style>
