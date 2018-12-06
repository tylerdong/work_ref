<!--产品种类-->
<template>
  <div>
    <!--<main-breadcrumb nameId="020413"></main-breadcrumb>-->
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <!--<el-input></el-input>-->
          <!--<el-button type="primary" icon="search"></el-button>-->
          <el-button @click="add" type="primary">新增</el-button>
        </div>
      </div>
      <el-table :data="tableData" border v-loading="loading.list" element-loading-text="拼命加载中">
        <el-table-column prop="kindName" label="名称"></el-table-column>
        <el-table-column prop="productName" label="产品"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope)" type="text" size="small">修改</el-button>
            <el-button @click="deleteKind(scope)" type="text" size="small">删除</el-button>
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
    <edit-dialog :products="options.products" @submitSuccess="getData" ref="editDialog"></edit-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from 'src/api'
  export default {
    components: {
      // 'main-breadcrumb': require('common/breadcrumb.vue'),
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
        options: {
          products: []
        },
        loading: {
          list: false
        }
      }
    },
    mounted () {
      this.getAllProducts()
      this.getData()
    },
    methods: {
      getAllProducts () {
        api.automatic.dictionary.getAllProductTypeList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.products = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
      getData () {
        this.loading.list = true
        let params = {
          pageIndex: this.page.current,
          pageCount: this.page.size
        }
        api.automatic.dictionary.getKindList(params).then((response) => {
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
      add () {
        this.$refs.editDialog.show({action: 'add'})
      },
      edit (listItem) {
        this.$refs.editDialog.show({action: 'edit', ...listItem})
      },
      deleteKind (listItem) {
        this.$confirm('确认删除？', '提示', {
          type: 'warning'
        }).then(() => {
          let params = { id: listItem.row.kindId }
          api.automatic.dictionary.deleteKind(params).then((response) => {
            const data = response.data
            if (data.messageType === 1) {
              this.$message.success('删除成功')
              this.getData()
            }
          })
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

