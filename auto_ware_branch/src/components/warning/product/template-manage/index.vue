<!--丝锭等级-->
<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <el-button @click="showDialog(null)" type="primary">新增</el-button>
      </div>
      <el-table :data="tableData" border v-loading="loading.list" element-loading-text="拼命加载中">
        <el-table-column label="类型">
          <template slot-scope="scope">{{scope.row.type | warnMessageType}}</template>
        </el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="showDialog(scope.row)" type="text">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <edit-dialog @submitSuccess="getData" ref="editDialog"></edit-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from 'src/api'

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
        }
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        this.tableData = []
        this.loading.list = true
        api.dataAnalysis.getMsgTemplateList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.tableData = data.data
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.loading.list = false
        })
      },
      showDialog (data) {
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
