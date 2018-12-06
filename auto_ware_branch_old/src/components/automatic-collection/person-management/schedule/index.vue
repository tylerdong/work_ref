<!-- 班组管理 -->
<template>
  <div>
    <!--<breadcrumb nameId="020202"></breadcrumb>-->
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-button type="primary" @click="btnAdd()">新增</el-button>
        </div>
      </div>
      <template>
        <el-table :data="tableData" border style="width: 100%" v-loading.body="loading" element-loading-text="拼命加载中">
          <el-table-column prop="workshopName" label="所属车间" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="groupName" label="班组名称" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column label="班组人员" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tag
                v-for="tag in scope.row.groupEmployeeMapBoList"
                :key="tag.employeeId"
                class="tags">
                {{tag.employeeName}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="groupEmployeeName" label="班长" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click.native.prevent="btnModify(scope)" type="text" size="small">修改</el-button>
              <!--<el-button-->
                <!--@click.native.prevent="btnDelete(scope)"-->
                <!--type="text"-->
                <!--size="small">-->
                <!--删除-->
              <!--</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="hy-admin__pagination-wrapper">
        <el-pagination
          class="fr"
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="page.index"
          :page-size="page.count"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.totle">
        </el-pagination>
      </div>
      <D_dialog ref="refDialog" @callback="getData"></D_dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from 'src/api'
  export default {
    components: {
      'D_dialog': require('./dialog-info.vue')
      // 'breadcrumb': require('../../../common/breadcrumb.vue')
    },
    data () {
      return {
        tableData: [],
        loading: false,
        page: {
          index: 1,
          totle: 0,
          pageSize: 30,
          count: 10
        }
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        this.loading = true
        this.tableData.splice(0, this.tableData.length)
        let params = {
          pageIndex: this.page.index,
          pageCount: this.page.count
        }
        api.automatic.person.getGroupList(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.page.totle = data.data.count
            this.page.count = data.data.pageCount
            this.tableData = data.data.list
          }
        }).finally(() => {
          this.loading = false
        })
      },
      btnAdd () {
        this.$refs.refDialog.show()
      },
      btnModify (scope) {
        let newRow = JSON.parse(JSON.stringify(scope.row))
        this.$refs.refDialog.show(newRow)
      },
      callback () {
        this.getData()
      },
      btnDelete (scope) {
        this.$confirm('是否确定删除', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          this.delFun(scope)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      delFun (scope) {
        let params = {
          id: scope.row.groupId
        }
        api.automatic.person.deleteGroup(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.$message.success(data.message)
            this.getData()
          }
        }).finally(() => {
        })
      },
      sizeChange (val) {
        this.page.count = val
        if (this.page.index === 1) {
          this.getData()
        } else {
          this.page.index = 1
        }
      },
      currentChange (val) {
        this.page.index = val
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
