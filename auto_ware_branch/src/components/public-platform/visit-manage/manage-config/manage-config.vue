<template>
  <div>
    <!--<jk-breadcrumb nameId="030202"></jk-breadcrumb>-->
    <div class="hy-pub__main-wrapper">
      <el-row class="padbottom20">
        <el-col :span="6">
          <el-input
            placeholder="搜索"
            icon="el-icon-search">
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="listData" border highlight-current-row style="width: 100%" v-loading="tableLoading">
        <el-table-column type="index" width="55"></el-table-column>
        <el-table-column prop="useName" label="用户名" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="success" icon="el-icon-setting" @click="bindModule(scope)">绑定模块</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          class="fr"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableTotal">
        </el-pagination>
      </div>
    </div>
    <dialog-manage-config ref="refDialog" :moduleData="moduleData" :nowUserID="nowUserID" :nowModuleData="this.nowModuleData"></dialog-manage-config>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from 'src/api'

  export default {
    components: {
      // 'jk-breadcrumb': require('common/breadcrumb.vue'),
      'dialog-manage-config': require('./dialog-manage-config.vue')
    },
    data () {
      return {
        tableTotal: 0,
        currentPage: 1,
        pageSize: 10,
        tableLoading: false,
        listData: [],
        nowUserID: 0,
        moduleData: [],
        nowModuleData: []
      }
    },
    mounted () {
      this.getUserList(1)
    },
    methods: {
      handleCurrentChange (i) {
        this.currentPage = i
        this.getUserList()
      },
      handleSizeChange (i) {
        this.pageSize = i
        this.currentPage = 1
      },
      getUserList () {
        this.tableLoading = true
        api.userManagerCenter.adminListUser({
          pageIndex: this.currentPage,
          pageCount: this.pageSize
        }).then(response => {
          let dataObj = response.data.data
          this.listData = dataObj.list
          this.tableTotal = dataObj.count
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.tableLoading = false
        })
      },
      bindModule (scope) {
        this.moduleData = []
        this.nowUserID = scope.row.id
        this.$refs.refDialog.nowIndex = 0
        this.$refs.refDialog.dialogLoading = true
        api.marManager.getManageUserBindList({
          manageUserId: this.nowUserID
        }).then(response => {
          let dataObj = response.data.data
          this.moduleData = dataObj
          this.nowModuleData = this.moduleData[0].moduleList
        }).catch(e => {
          console.error(e)
        }).finally(() => {
          this.$refs.refDialog.dialogLoading = false
        })
        this.$refs.refDialog.dialogShow = true
        return false
      }
    }
  }

</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .pagination{
    margin-top: 20px;
    display: block;
    overflow: hidden;
  }
</style>
