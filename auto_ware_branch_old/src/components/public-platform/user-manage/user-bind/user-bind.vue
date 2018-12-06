<template>
  <div>
    <!--<jk-breadcrumb nameId="030303"></jk-breadcrumb>-->
    <div class="hy-pub__main-wrapper">
      <el-row class="padbottom20" :gutter="20">
        <el-col :span="6">
          <el-input
            placeholder="搜索"
            v-model="search.name"
            @keyup.enter.native="getData"
            icon="el-icon-search">
          </el-input>
        </el-col>
        <el-col :span="18">
          <el-button type="primary" icon="el-icon-plus"  @click="showDialog">绑定</el-button>
          <!--<el-button type="primary" icon="delete" @click="batchDel" :disabled="multipleSelection.disabled">批量删除</el-button>-->
        </el-col>
      </el-row>
      <el-table :data="userList" border highlight-current-row  style="width: 100%" @selection-change="selectionChange"
                v-loading="tableLoading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="80"></el-table-column>
        <el-table-column property="userName" label="用户名" show-overflow-tooltip></el-table-column>
        <el-table-column property="personName" label="员工" show-overflow-tooltip></el-table-column>
        <el-table-column property="personNumber" label="员工编号" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button
              size="small"
              type="danger"
              @click.native.prevent="del(scope)">解绑
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
    <dialog-add-bind ref="refDialog" @callback="getData"></dialog-add-bind>
  </div>
</template>
<script>
  import * as api from 'src/api'

  export default {
    components: {
      'dialog-add-bind': require('./dialog-add-bind.vue'),
//      'organization-management': require('./dialog-user-list-organization.vue'),
//       'jk-breadcrumb': require('./../../../common/breadcrumb.vue')
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
        multipleSelection: {
          list: [],
          disabled: true
        },
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
        let params = { id: scope.row.id }
        console.info(params)
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
      getData () {
        let params = {
          pageIndex: this.page.index,
          pageCount: this.page.pageSize,
          name: this.search.name
        }
        this.tableLoading = true
        this.userList = []
        api.userManagerCenter.getUserPersonList(params).then(response => {
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
      showDialog () {
        this.$refs.refDialog.toggle({
          title: '新增绑定',
          toggle: true
        })
      },
      confirmDel (params) {
        this.$confirm('是否解绑', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          api.userManagerCenter.deleteUserPersonById(params).then(response => {
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
