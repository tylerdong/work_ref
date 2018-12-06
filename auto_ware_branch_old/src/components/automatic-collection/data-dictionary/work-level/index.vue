<!--职位-->
<template>
  <div>
    <!--<main-breadcrumb nameId="020404"></main-breadcrumb>-->
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <!--<el-input></el-input>-->
          <!--<el-button type="primary" icon="search"></el-button>-->
          <el-button @click="add" type="primary">新增</el-button>
        </div>
      </div>
      <el-table :data="tableData" border v-loading="loading.list" element-loading-text="拼命加载中">
        <el-table-column prop="name" label="名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="code" label="编码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="describe" label="描述" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button
              @click="edit(scope)"
              type="text"
              size="small">
              修改
            </el-button>
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
    <add-dialog @submitSuccess="getData" ref="addDialog"></add-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from 'src/api'
  export default {
    components: {
      // 'main-breadcrumb': require('common/breadcrumb.vue'),
      'edit-dialog': require('./dialog-edit.vue'),
      'add-dialog': require('./dialog-add.vue')
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
        }
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        this.loading.list = true
        let params = {
          pageIndex: this.page.current,
          pageCount: this.page.size
        }
        api.automatic.dictionary.getPositionList(params).then((response) => {
          const data = response.data
          console.log(data)
          if (data.messageType === 1) {
            this.page.total = data.data.count
            this.tableData = data.data.list
          }
        }).finally(() => {
          this.loading.list = false
        })
      },
      add () {
        this.$refs.addDialog.show()
      },
      edit (listItem) {
        this.$refs.editDialog.show(listItem)
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
