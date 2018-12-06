<!-- 用户列表 -->
<template>
  <div>
    <!--<jk-breadcrumb nameId="030301"></jk-breadcrumb>-->
    <div class="hy-pub__main-wrapper">
      <el-row class="padbottom20" :gutter="20">
        <el-col :span="6">
          <el-input
            v-model="search.name"
            @keyup.enter.native="getData"
            placeholder="搜索"
            icon="el-icon-search">
          </el-input>
        </el-col>
        <el-col :span="18">
          <!--<el-button type="primary" icon="el-icon-plus"  @click="showDialog">新增帐号</el-button>-->
          <el-button type="primary" icon="el-icon-delete" @click="batchDel" :disabled="multipleSelection.disabled">批量删除</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" border highlight-current-row  style="width: 100%" @selection-change="selectionChange"
                v-loading="tableLoading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="80"></el-table-column>
        <el-table-column property="useName" label="用户名" show-overflow-tooltip></el-table-column>
        <el-table-column property="account" label="帐号" show-overflow-tooltip></el-table-column>
        <el-table-column label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="scope.row.status"
              @change="activeItem(scope.$index, scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <!--<el-table-column label="操作" width="150" show-overflow-tooltip>-->
          <!--<template slot-scope="scope">-->
            <!--<el-button-->
              <!--size="small"-->
              <!--type="danger"-->
              <!--@click.native.prevent="del(scope)">删除-->
            <!--</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
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
    <dialog-user-list ref="refDialog" :userInfo="userInfo" @organization="showOrganizationManagement" @add="addUser"></dialog-user-list>
    <!--组织选择-->
    <organization-management ref="dialog" @callback="callbackData"></organization-management>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    components: {
      'dialog-user-list': require('./dialog-user-list.vue'),
      'organization-management': require('./dialog-user-list-organization.vue')
      // 'jk-breadcrumb': require('common/breadcrumb.vue')
    },
    data () {
      return {
        userList: [],
        tableLoading: false,
        currentRow: null,
        activeIndex: '4',
        totle: 0,
        page: {
          totle: 1,
          index: 1,
          pageSize: 10
        },
        userInfo: {
          account: '',
          useName: '',
          organizationName: '',
          describe: ''
        },
        multipleSelection: {
          list: [],
          disabled: true
        },

        from: '',
        search: {
          name: ''
        }
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      del (scope) {
        let params = [
          {
            id: scope.row.id
          }
        ]
        this.confirmDel(params)
      },
      batchDel () {
        let params = this.multipleSelection.list
        this.confirmDel(params)
      },
      selectionChange (val) {
        if (val.length > 0) {
          this.multipleSelection.disabled = false
          this.multipleSelection.list = val
        } else {
          this.multipleSelection.disabled = true
        }
      },
      addUser () {
        this.getData(this.page.index)
        this.clearItem()
      },
      getData () {
        let params = {
          pageIndex: this.page.index,
          pageCount: this.page.pageSize,
          name: this.search.name
        }
        this.tableLoading = true
        this.userList = []
        api.userManagerCenter.normalUserList(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.page.totle = data.data.count
            this.page.pageSize = data.data.pageCount
            for (let item of data.data.list) {
              if (item.status === '1') {
                item.status = true
              } else {
                item.status = false
              }
              this.userList.push(item)
            }
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
      clearItem () {
        this.userInfo.account = ''
        this.userInfo.useName = ''
        this.userInfo.organizationName = ''
        this.userInfo.describe = ''
      },
      resetDialog () {
        this.clearItem()
        this.$refs.userInfo.resetFields()
      },
      showDialog () {
        this.clearItem()
        this.$refs.refDialog.dialogFormVisible = true
      },

      modifyItem (scope) {
        this.from = ''
        this.title = '修改用户'
        this.userInfo.account = scope.row.account
        this.userInfo.useName = scope.row.useName
        this.userInfo.organizationName = scope.row.organizationName
        this.userInfo.describe = scope.row.describe
        this.$refs.refDialog.dialogFormVisible = true
      },
      confirmDel (params) {
        this.$confirm('是否确定删除帐号', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          api.userManagerCenter.deleteUserByIds(params).then(response => {
            const data = response.data
            if (data.messageType === 1) {
              this.$message({
                type: 'success',
                message: data.message
              })
              this.getData(this.page.index)
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
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      activeItem (index, row, rows) {
        api.userManagerCenter.adminActiveUser({
          userId: row.id
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.$message({
              type: 'success',
              message: data.message
            })
            this.getData(this.page.index)
          }
          if (data.messageType === 2) {
            this.$message.error(data.message)
            row.status = false
          }
          if (data.messageType === 0) {
            console.error(response)
            row.status = false
          }
        }).catch(error => {
          console.log(error)
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
      //      组织管理开关
      showOrganizationManagement () {
        this.$refs.dialog.dialogTableVisible = true
      },
//      组织管理 回调
      callbackData (node) {
        let nameList = [node.data.name]
        let idList = [node.data.id]
        this.userInfo.organizationName = nameList.join(' / ')
        this.$refs.refDialog.$refs.userInfo.validateField('organizationName')
        this.userInfo.organizationIdList = idList
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
