<!-- 权限管理 -->
<template>
  <div>
    <!--<jk-breadcrumb nameId="030402"></jk-breadcrumb>-->
    <div class="hy-pub__main-wrapper">
      <el-row class="padbottom20" :gutter="20">
        <el-col :span="6" >
          <el-input
            placeholder="搜索"
            icon="el-icon-search">
          </el-input>
        </el-col>
        <el-col :span="18">
          <el-button type="primary" icon="el-icon-plus" @click="addRole">新增权限</el-button>
          <el-button type="primary" icon="el-icon-delete" @click="batchDel" :disabled="multipleSelection.disabled">批量删除</el-button>
        </el-col>

      </el-row>

      <el-table :data="privilegesData" border highlight-current-row style="width: 100%"
                @selection-change="selectionChange" v-loading="tableLoading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="80"></el-table-column>
        <el-table-column property="name" label="权限名称" width="120" show-overflow-tooltip></el-table-column>
        <!--<el-table-column property="privilegeName" label="角色权限" show-overflow-tooltip></el-table-column>-->
        <el-table-column property="describe" label="描述" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="300" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="edit(scope)">配置</el-button>
            <el-button size="small" type="text" @click="editRole(scope)">编辑</el-button>
            <el-button size="small" type="text" @click="del(scope)">删除
            </el-button>
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
    <!-- 权限添加修改弹窗 -->
    <dialog-add-edit-permission ref="refDialogAddEditPermission" @callback="getData"></dialog-add-edit-permission>
    <!-- 权限 模块配置弹窗 -->
    <dialog-permission-manage-deploy ref="refDialogPrivilegeManagerDeploy" :child-data="childData" @callback="getData"></dialog-permission-manage-deploy>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from 'src/api'
  import storage from 'storage'
  export default {
    components: {
      // 'jk-breadcrumb': require('common/breadcrumb.vue'),
      'dialog-permission-manage-deploy': require('./dialog-permission-manage-deploy.vue'),
      'dialog-add-edit-permission': require('./dialog-add-edit-permission.vue')
    },
    data () {
      return {
        privilegesData: [],
        userInfo: {},
        page: {
          totle: 1,
          index: 1,
          pageSize: 10
        },
        tableLoading: false,
        multipleSelection: {
          list: [],
          disabled: true
        },
        /* 传递给子组件的内容 */
        childData: []
      }
    },
    mounted () {
      this.userInfo = storage.getUser()
      this.getData()
      this.getChildData()
    },
    methods: {
      /* 添加修改权限 */
      addRole () {
        this.$refs.refDialogAddEditPermission.toggle({
          id: '',
          name: '',
          describe: '',
          title: '新增权限',
          toggle: true
        })
      },
      editRole (scope) {
        this.$refs.refDialogAddEditPermission.toggle({
          id: scope.row.id,
          name: scope.row.name,
          describe: scope.row.describe,
          title: '修改权限',
          toggle: true
        })
      },

      edit (scope) {
        const data = scope.row
        this.$refs.refDialogPrivilegeManagerDeploy.toggle({
          title: data.name,
          id: data.id,
          toggle: true
        })
      },
      del (scope) {
        let params = [
          {
            id: scope.row.id
          }
        ]
        this.delFun(params)
      },
      batchDel () {
        let params = this.multipleSelection.list
        this.delFun(params)
      },
      selectionChange (val) {
        if (val.length > 0) {
          this.multipleSelection.disabled = false
          this.multipleSelection.list = val
        } else {
          this.multipleSelection.disabled = true
        }
      },
      getData () {
        let params = {
          pageIndex: this.page.index,
          pageCount: this.page.pageSize
        }
        this.tableLoading = true
        api.marManager.adminPrivilegeList(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.privilegesData = data.data.list
            this.page.totle = data.data.count
            this.page.pageSize = data.data.pageCount
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

      delFun (params) {
        this.$confirm('是否确定删除', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          api.marManager.deletePrivilege(params).then(response => {
            const data = response.data
            if (data.messageType === 1) {
              this.$message({
                type: 'success',
                message: data.message
              })
              this.getData()
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
        }).catch(() => {
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
        api.marManager.getListAllModule({
          subSystemId: this.userInfo.subsystemId
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
