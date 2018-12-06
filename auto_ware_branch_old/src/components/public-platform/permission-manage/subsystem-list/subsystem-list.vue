<template>
  <div>
    <!--<jk-breadcrumb nameId="030404"></jk-breadcrumb>-->
    <div class="hy-pub__main-wrapper">
      <el-row class="padbottom20" :gutter="20">
        <el-col :span="6">
          <el-input
            placeholder="搜索"
            icon="el-icon-search">
          </el-input>
        </el-col>
        <el-col :span="18">
          <el-button type="primary" icon="el-icon-plus" @click="showDialog(1)">新增子系统</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="delAll" :disabled="multipleSelection.length>0?false:true">批量删除</el-button>
        </el-col>
      </el-row>
      <el-table :data="subSystemData" border highlight-current-row style="width: 100%"
                @selection-change="handleSelectionChange" v-loading="tableLoading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="80"></el-table-column>
        <el-table-column property="name" label="子系统名称" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column property="code" label="编码" show-overflow-tooltip></el-table-column>
        <el-table-column property="describe" label="描述" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="300" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="showDialog(2, scope)">编辑
            </el-button>
            <!--<el-button size="small" type="success" icon="el-icon-setting" @click="edit(scope, subSystemData)">配置-->
            <!--</el-button>-->
            <el-button size="small" type="text" @click="del(scope, subSystemData)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block hy-admin__pagination-wrapper">
        <el-pagination
          class="floatRight fr"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageCount"
          :page-sizes="[10, 30, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <dlg-subsystem-list :title="title" :newSubSystem="newSubSystem" ref="refDialog" :btnType="btnType" @add="add" @modify="modify"></dlg-subsystem-list>
    <dialog-module-config ref="refDialogModuleConfig"></dialog-module-config>
  </div>

</template>

<script type="text/ecmascript-6">
  import * as api from 'api'

  export default {
    components: {
      // 'jk-breadcrumb': require('common/breadcrumb.vue'),
      'dlg-subsystem-list': require('./dialog-subsystem-list.vue'),
      'dialog-module-config': require('./dialog-module-config.vue')
    },
    data () {
      return {
        tableLoading: false,
        subSystemData: [],
        items: [],
        title: '新增子系统',
        newSubSystem: {
          name: '',
          code: '',
          describe: '',
          id: ''
        },
        currentPage: 1, // 当前页
        pageCount: 20, // 每页条数
        total: 0, // 总条数
        multipleSelection: [],
        btnType: 1
      }
    },
    mounted () {
      this.getDate(1)
    },
    methods: {
      delAll () {
        let params = this.multipleSelection
        this.delFun(params)
      },
      handleSelectionChange (val) {
        if (val.length > 0) {
          this.multipleSelection = val // 选中数组
        } else {
          this.multipleSelection = []
        }
      },
      pageSet (page) {
        if (page <= 1) {
          var start = page - 1
        } else {
          start = (page - 1) * this.pageCount
        }
        var end = page * this.pageCount
        if (this.total > this.pageCount) {
          this.subSystemData = this.items.slice(start, end)
        } else {
          this.subSystemData = this.items
        }
      },
      handleSizeChange (size) {
        this.pageCount = size
        this.getDate(this.currentPage)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.pageSet(val)
      },
      getDate (page) {
        let params = {}
        this.tableLoading = true
        api.superManagerUser.getSubSystemList(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.items = data.data
            this.total = data.data.length
            this.pageSet(page)

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
      add () { // 增加 {"name":"", "code":"", "describe":""}
        let params = {
          name: this.newSubSystem.name,
          code: this.newSubSystem.code,
          describe: this.newSubSystem.describe
        }

        api.superManagerUser.addSubSystem(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.$message({
              type: 'success',
              message: data.message
            })
            this.$refs.refDialog.dialogFormVisible = false
            this.newSubSystem.id = ''
            this.newSubSystem.name = ''
            this.newSubSystem.code = ''
            this.newSubSystem.describe = ''
            this.getDate(this.currentPage)
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
      },

      showDialog (type, scope) {
        if (type === 1) {
          this.title = '增加子系统'
          this.newSubSystem.name = ''
          this.newSubSystem.code = ''
          this.newSubSystem.describe = ''
          this.btnType = 1
        } else {
          this.title = '修改子系统'
          this.newSubSystem.name = scope.row.name
          this.newSubSystem.code = scope.row.code
          this.newSubSystem.describe = scope.row.describe
          this.newSubSystem.id = scope.row.id
          this.btnType = 2
        }
        this.$refs.refDialog.dialogFormVisible = true
      },
      modify () { //  修改 {"id":"", "name":"", "code":"", "describe":""}
        let params = {
          describe: this.newSubSystem.describe,
          code: this.newSubSystem.code,
          name: this.newSubSystem.name,
          id: this.newSubSystem.id
        }

        api.superManagerUser.modifySubSystem(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.newSubSystem.id = ''
            this.newSubSystem.name = ''
            this.newSubSystem.code = ''
            this.newSubSystem.describe = ''
            this.$message({
              type: 'success',
              message: data.message
            })
            this.$refs.refDialog.dialogFormVisible = false
            this.getDate(this.currentPage)
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
        }).catch(e => {
          console.log(e)
        })
      },

      del (scope, rows) {
        let params = [
          {
            id: scope.row.id
          }
        ]
        this.delFun(params)
      },

      edit (scope, subSystemData) {
        console.info(scope)
        this.$refs.refDialogModuleConfig.toggle({
          title: scope.row.name,
          id: scope.row.id,
          toggle: true
        })
        console.info('edit')
      },

      delFun (params) {
        this.$confirm('是否删除子系统与其关联的模块？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          api.superManagerUser.delSubSystemList(params).then(response => {
            const data = response.data
            if (data.messageType === 1) {
              this.$message({
                type: 'success',
                message: data.message
              })
              this.getDate(this.currentPage)
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
      }
    }
  }

</script>
<style scoped lang="scss" rel="stylesheet/scss">

</style>
