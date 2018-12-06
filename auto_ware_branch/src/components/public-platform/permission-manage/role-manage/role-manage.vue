<!-- 角色管理列表 -->
<template>
  <div>
    <!--<jk-breadcrumb nameId="030401"></jk-breadcrumb>-->
    <div class="hy-pub__main-wrapper">
      <el-row class="padbottom20" :gutter="20">
        <el-col :span="6">
          <el-input placeholder="搜索" icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="18">
          <el-button type="primary" icon="el-icon-plus" @click="addRole">新增角色</el-button>
          <el-button type="primary" icon="el-icon-delete" @click="batchDel" :disabled="multipleSelection.disabled">批量删除
          </el-button>
        </el-col>
      </el-row>
      <el-table :data="rolesData" border
                style="width: 100%"
                @selection-change="selectionChange" v-loading="tableLoading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="80"></el-table-column>
        <el-table-column property="name" label="角色名称" width="150" show-overflow-tooltip></el-table-column>
        <!--<el-table-column property="privilegeName" label="角色权限">-->
          <!--<template slot-scope="scope">-->
            <!-- scope.row -->
            <!--<el-tag-->
              <!--v-for="tag in tags"-->
              <!--:key="tag.name"-->
              <!--:closable="true"-->
              <!--:type="tag.type">-->
              <!--{{tag.name}}-->
            <!--</el-tag>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column property="describe" label="描述" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="300" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope)">配置</el-button>
            <el-button type="text" @click="editRole(scope)">编辑</el-button>
            <el-button type="text" @click="del(scope, rolesData)">删除</el-button>
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
    <!-- 新增用户弹窗 -->
    <dialog-add-edit-role ref="refDialogAddEditRole" @callback="getData"></dialog-add-edit-role>

    <!-- 角色 权限配置弹窗 -->
    <dialog-role-manager-deploy ref="refDialogRoleManagerDeploy" :child-data="childData"
                                @callback="getData"></dialog-role-manager-deploy>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from 'api'

  export default {
    components: {
      // 'jk-breadcrumb': require('common/breadcrumb.vue'),
      'dialog-role-manager-deploy': require('./dialog-role-manage-deploy.vue'),
      'dialog-add-edit-role': require('./dialog-add-edit-role.vue')
    },
    data () {
      return {
        rolesData: [],
        tableLoading: false,
        page: {
          totle: 1,
          index: 1,
          pageSize: 10
        },
        multipleSelection: {
          list: [],
          disabled: true
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
      /* 添加修改角色 */
      addRole () {
        this.$refs.refDialogAddEditRole.toggle({
          id: '',
          name: '',
          describe: '',
          title: '新增角色',
          toggle: true
        })
      },
      editRole (scope) {
        this.$refs.refDialogAddEditRole.toggle({
          id: scope.row.id,
          name: scope.row.name,
          describe: scope.row.describe,
          title: '修改角色',
          toggle: true
        })
      },

      edit (scope) {
        const data = scope.row
        this.$refs.refDialogRoleManagerDeploy.toggle({
          title: data.name,
          id: data.id,
          toggle: true
        })
      },

      getData () {
        let params = {
          pageIndex: this.page.index,
          pageCount: this.page.pageSize
        }
        this.tableLoading = true
        api.marManager.adminRoleList(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.rolesData = data.data.list
            this.page.totle = data.data.count
            this.page.pageSize = data.data.pageCount
            return true
          }
          if (data.messageType === 2) {
            this.$message.error(data.message)
            return false
          }
        }).catch(error => {
          console.log(error.response.data)
        }).finally(() => {
          this.tableLoading = false
        })
      },

      del (scope) {
        let params = [
          {
            id: scope.row.id
          }
        ]
        this.delRole(params)
      },
      delRole (params) {
        this.$confirm('是否确定删除', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          api.marManager.deleteRole(params).then(response => {
            const data = response.data
            if (data.messageType === 1) {
              this.$message({
                message: response.data.meta.message,
                type: 'success'
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
      batchDel () {
        let params = this.multipleSelection.list
        this.delRole(params)
      },
      selectionChange (val) {
        if (val.length > 0) {
          this.multipleSelection.disabled = false
          this.multipleSelection.list = val // 选中数组
        } else {
          this.multipleSelection.disabled = true
        }
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
        api.marManager.getListAllPrivilege({}).then(response => {
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
  .pagination {
    margin-top: 20px;
    display: block;
    overflow: hidden;
  }
</style>
