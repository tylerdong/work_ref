<template>
  <div>
    <!--<jk-breadcrumb nameId="030302"></jk-breadcrumb>-->
    <div class="hy-pub__main-wrapper">
      <el-row class="padbottom20" :gutter="20">
        <el-col :span="6">
          <el-input
            placeholder="搜索"
            v-model="manageName"
            :on-icon-click="getData"
            icon="el-icon-search">
          </el-input>
        </el-col>
        <el-col :span="18">
          <el-button type="primary" icon="el-icon-plus" @click="showDialog">新增管理员</el-button>
        </el-col>
      </el-row>

      <el-table :data="userList" border highlight-current-row style="width: 100%" v-loading="tableLoading">
        <el-table-column type="index" width="80"></el-table-column>
        <el-table-column property="account" label="账号名称" show-overflow-tooltip></el-table-column>
        <el-table-column property="useName" label="用户名" show-overflow-tooltip></el-table-column>
        <el-table-column label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              on-color="#13ce66"
              off-color="#ff4949"
              :disabled="scope.row.status"
              @change="activeItem(scope.$index, scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" @click="del(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block hy-admin__pagination-wrapper">
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
    <dialog-manager-list :newUserInfo="newUserInfo" ref="refDialog" @add="add"></dialog-manager-list>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    components: {
      // 'jk-breadcrumb': require('common/breadcrumb.vue'),
      'dialog-manager-list': require('./dialog-manager-list.vue')
    },
    data () {
      return {
        tableLoading: false,
        manageName: '',
        userList: [],
        page: {
          totle: 1,
          index: 1,
          pageSize: 10
        },
        newUserInfo: {
          account: '',
          useName: '',
          password: '',
          subSystem: []
        }
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        let params = {
          pageIndex: this.page.index,
          pageCount: this.page.pageSize
        }
        if (this.manageName) {
          params.manageName = this.manageName
        }
        this.tableLoading = true
        this.userList = []
        api.userManagerCenter.adminListUser(params).then(response => {
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
          if (data.messageType === 0) {
            console.error(response)
            return false
          }
        }).finally(() => {
          this.tableLoading = false
        })
      },
      showDialog () {
        this.$refs.refDialog.dialogFormVisible = true
        this.newUserInfo.account = ''
        this.newUserInfo.useName = ''
        this.newUserInfo.password = ''
        this.newUserInfo.subSystem = []
      },
      add () {
        let params = {
          account: this.newUserInfo.account,
          name: this.newUserInfo.useName,
          password: this.newUserInfo.password,
          subSystemId: this.newUserInfo.subSystem
        }
        api.userManagerCenter.addAdminUser(params).then(response => {
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
        })
      },
      del (scope) {
        this.$confirm('是否确定删除此项?', '提示', {
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          let params = {
            manageUserId: scope.row.id
          }
          api.userManagerCenter.delAdminUser(params).then(response => {
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
          })
        }).catch(() => {
        })
      },
      activeItem (index, row, rows) {
        api.userManagerCenter.adminSuperAudit({
          manageUserId: row.id
        }).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.$message({
              type: 'success',
              message: data.message
            })
            this.getData()
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
        console.log(111)
        this.page.index = val
        this.getData()
      }
    }
  }
</script>
