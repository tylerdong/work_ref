<template>
  <div>
    <!--<jk-breadcrumb nameId="030201"></jk-breadcrumb>-->
    <div class="hy-pub__main-wrapper">
      <el-row class="padbottom20">
        <el-col :span="6" class="textCenter">
          <el-input v-model="search.name" placeholder="搜索" icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="3" class="textCenter">
          <el-button type="primary" @click="getData">搜索</el-button>
        </el-col>
      </el-row>
      <el-table :data="userData" border highlight-current-row style="width: 100%" v-loading="tableLoading">
        <el-table-column type="index" width="80"></el-table-column>
        <el-table-column property="useName" label="名称" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column property="account" label="账户" show-overflow-tooltip></el-table-column>
        <!--<el-table-column property="descripe" label="描述" show-overflow-tooltip></el-table-column>-->
        <!--<el-table-column property="roleName" label="角色" show-overflow-tooltip></el-table-column>-->
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope)">配置</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="page.index"
          :page-size="page.pageSize"
          class="floatRight fr"
          :page-sizes="[10, 30, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.totle">
        </el-pagination>
      </div>
    </div>
    <!-- 用户配置 配置弹窗 -->
    <dialog-user-list-deploy ref="refDialogUserListDeploy" :child-data="childData" @callback="getData"></dialog-user-list-deploy>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'src/api'

  export default {
    components: {
      // 'jk-breadcrumb': require('common/breadcrumb.vue'),
      'dialog-user-list-deploy': require('./dialog-user-config-deploy.vue')
    },
    data () {
      return {
        search: {name: ''},
        tableLoading: false,
        userData: [],
        currentRow: null,
        activeIndex: '4',
        page: {
          totle: 1,
          index: 1,
          pageSize: 10
        },
        /* 传递给子组件的内容 */
        childData: []
      }
    },
    mounted () {
      this.getData()
      this.getChildData()
    },
    methods: {
      edit (scope) {
        const data = scope.row
        this.$refs.refDialogUserListDeploy.toggle({
          title: data.account,
          id: data.id,
          toggle: true
        })
      },

      getData () {
        let params = {
          name: this.search.name,
          pageIndex: this.page.index,
          pageCount: this.page.pageSize
        }
        this.tableLoading = true
        api.userManagerCenter.normalUserList(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            let userData = data.data.list
            this.page.totle = data.data.count
            this.page.pageSize = data.data.pageCount
            this.userData = userData
            return true
          }
          if (data.messageType === 2) {
            this.$message.error(data.message)
            return false
          }
          if (data.messageType === 0) {
            console.error(response)
            return false
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.tableLoading = false
        })
      },
      sizeChange (val) {
        this.page.pageSize = val
        if (this.page.index === 1) {
          this.getData()
        } else {
          this.page.index = 1
        }
      },
      currentChange (val) {
        this.page.index = val
        this.getData()
      },

      getChildData () {
        api.userCenter.getListAllRole({
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.childData = data.data
            return true
          }
          if (data.messageType === 2) {
            this.$message.error(data.message)
            return false
          }
          if (data.messageType === 0) {
            console.error(response)
            return false
          }
        }).catch(error => {
          console.log(error)
        })
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
