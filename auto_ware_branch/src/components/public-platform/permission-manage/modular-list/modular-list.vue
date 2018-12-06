<template>
  <div>
    <!--<jk-breadcrumb nameId="030403"></jk-breadcrumb>-->
    <div class="hy-pub__main-wrapper">
      <el-row class="padbottom20" :gutter="20">
        <el-select v-model="search.subsystemId" placeholder="请选择子系统" clearable>
          <el-option v-for="(item,index) in childData" :label="item.name" :key="index" :value="item.id"></el-option>
        </el-select>
        <el-input v-model="search.name" placeholder="请输入名字" class="search-input"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="addRole">新增模块</el-button>
        <el-button type="primary" icon="el-icon-delete" @click="batchDel" :disabled="multipleSelection.disabled">批量删除
        </el-button>
      </el-row>
      <el-table :data="modularData" border highlight-current-row style="width: 100%" @selection-change="selectionChange"
                v-loading="tableLoading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="80"></el-table-column>
        <el-table-column property="name" label="模块名称" show-overflow-tooltip></el-table-column>
        <el-table-column property="code" label="编码" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column property="subSystemName" label="子系统" show-overflow-tooltip></el-table-column>
        <el-table-column property="describe" label="描述" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="editRole(scope)">编辑</el-button>
            <el-button type="text" @click="del(scope)">删除</el-button>
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
    <!-- 模块添加修改 -->
    <dialog-add-edit-modular ref="refDialogAddEditModular" :child-data="childData"
                             @callback="getData"></dialog-add-edit-modular>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from 'api'

  export default {
    components: {
      // 'jk-breadcrumb': require('common/breadcrumb.vue'),
      'dialog-add-edit-modular': require('./dialog-add-edit-modular.vue')
    },
    data () {
      return {
        modularData: [],
        tableLoading: false,
        search: { moduleId: '', name: '', subsystemId: '' },
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
      this.getSubSystem()
    },
    methods: {
      /* 添加修改模块 */
      addRole () {
        this.$refs.refDialogAddEditModular.toggle({
          id: '',
          name: '',
          describe: '',
          moduleId: '',
          subsystem: '',
          title: '新增模块',
          toggle: true
        })
      },
      editRole (scope) {
        this.$refs.refDialogAddEditModular.toggle({
          id: scope.row.id,
          name: scope.row.name,
          code: scope.row.code,
          describe: scope.row.describe,
          moduleId: scope.row.moduleId,
          subsystem: scope.row.subSystemId,
          title: '修改模块',
          toggle: true
        })
      },

      del (scope) {
        console.info(scope.row)
        let params = [
          {
            moduleId: scope.row.moduleId
          }
        ]
        this.delModule(params)
      },
      batchDel () {
        let params = this.multipleSelection.list
        this.delModule(params)
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
          name: this.search.name,
          subsystemId: this.search.subsystemId
        }
        this.tableLoading = true
        api.marManager.superModuleList(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.modularData = data.data.list
            this.page.totle = data.data.count
            this.page.pageSize = data.data.pageCount
            return true
          }
          if (data.messageType === 2) {
            this.$message.error(data.message)
            return false
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.tableLoading = false
        })
      },
      getSubSystem () {
        api.superManagerUser.getSubSystemList().then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.childData = data.data
            return true
          }
          if (data.messageType === 2) {
            this.$message.error(data.message)
            return false
          }
        }).catch(error => {
          console.log(error)
        })
      },

      delModule (params) {
        console.log(params)
        this.$confirm('是否确定删除', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          api.marManager.superDelModule(params).then(response => {
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
        if (this.page.index !== 1) {
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
  .pagination {
    margin-top: 20px;
    display: block;
    overflow: hidden;
  }
  .search-input { width: 18rem; }
</style>
