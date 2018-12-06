<!--丝车规格-->
<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <el-input v-model="search.spec" placeholder="请输入规格" class="input-item-18"></el-input>

        <el-button :loading="loading.search" type="primary" @click="getData()">查询</el-button>

        <el-button :loading="loading.search" type="primary" @click="add()">新增</el-button>
      </div>
      <el-table :data="tableData" border v-loading="loading.list" element-loading-text="拼命加载中">
        <el-table-column prop="row" label="行数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="column" label="列数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="layer" label="层" show-overflow-tooltip></el-table-column>
        <el-table-column prop="spec" label="规格" show-overflow-tooltip></el-table-column>
        <el-table-column prop="desc" label="描述" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text">修改</el-button>
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
  export default {
    components: {
      'edit-dialog': require('./dialog-edit-spec.vue')
    },
    data () {
      return {
        search: {
          spec: ''
        },
        tableData: [],
        page: {
          current: 1,
          size: 15,
          total: 0
        },
        loading: {
          search: false
        }
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        this.loading.search = true
        let params = {
          spec: this.search.spec,
          pageIndex: this.page.current,
          pageCount: this.page.size
        }
        api.automatic.device.getSilkcarSpec(params).then((response) => {
          const data = response.data
          console.log(data)
          if (data.messageType === 1 && data.data.list.length > 0) {
            this.page.total = data.data.count
            this.tableData = data.data.list
          } else {
            this.page.total = 0
            this.tableData = []
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.search = false
        })
      },
      add () {
        this.$refs.editDialog.show(undefined)
      },
      edit (data) {
        this.$refs.editDialog.show(data)
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

