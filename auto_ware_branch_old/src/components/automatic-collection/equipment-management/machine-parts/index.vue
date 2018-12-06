<template>
  <div>
    <breadcrumb nameId="020103"></breadcrumb>
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-input v-model="input" placeholder="请输入关键词"></el-input>
          <el-button type="primary">查询</el-button>
          <el-button type="primary" @click="chooseFun('add')">新增</el-button>
        </div>
      </div>
      <template>
        <el-table :data="tableData" border style="width: 100%" v-loading.body="loading">
          <el-table-column type="index" width="70"></el-table-column>
          <el-table-column prop="name" label="名称" min-width="100"></el-table-column>
          <el-table-column prop="number" label="机台编号"></el-table-column>
          <el-table-column prop="supplier" label="厂商"></el-table-column>
          <el-table-column prop="brand" label="品牌" min-width="200"></el-table-column>
          <el-table-column prop="describe" label="描述" min-width="200"></el-table-column>
          <el-table-column label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="chooseFun('modify', scope)"
                type="text"
                size="small">
                修改
              </el-button>
              <el-button
                @click.native.prevent="deleteFun(scope)"
                type="text"
                size="small">
                删除
              </el-button>
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
      <D_dialog ref="refDialog" :dialogData="dialogData" :type="type" @add="add" @modify="modify"></D_dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from 'src/api'
  export default {
    components: {
      'D_dialog': require('./dialog.vue'),
      'breadcrumb': require('../../../common/breadcrumb.vue')
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        let params = {
          accessToken: '123123',
          pageIndex: this.page.index,
          pageCount: this.page.count
        }
        api.automatic.device.getSilkCarList(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.page.totle = data.data.count
            this.page.count = data.data.pageCount
            this.tableData = data.data.list
            this.loading = false
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
          this.loading = false
        })
      },
      add () {
        let params = {
          name: this.dialogData.name,
          number: this.dialogData.number,
          supplier: this.dialogData.supplier,
          brand: this.dialogData.brand,
          describe: this.dialogData.describe
        }

        api.automatic.device.addSilkCar(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.$message({
              type: 'success',
              message: data.message
            })
            this.$refs.refDialog.dialogFormVisible = false
            this.clearItem()
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
      },
      chooseFun (type, scope) {
        if (type === 'add') {
          this.$refs.refDialog.title = '新增'
          this.clearItem()
        } else if (type === 'show') {
          this.$refs.refDialog.title = '查看'
        } else if (type === 'modify') {
          this.$refs.refDialog.title = '修改'
          this.modifyItem(scope)
        }
        this.type = type
        this.showDialog()
      },
      clearItem () {
        this.dialogData = {}
      },
      resetDialog () {
        this.clearItem()
        this.$refs.refDialog.resetFields()
      },
      showDialog () {
        this.$refs.refDialog.dialogFormVisible = true
      },
      deleteFun (scope) {
        let params = {id: scope.row.id}
        this.delFun(params)
      },
      modifyItem (scope) {
        this.dialogData.id = scope.row.id
        this.dialogData.name = scope.row.name
        this.dialogData.number = scope.row.number
        this.dialogData.supplier = scope.row.supplier
        this.dialogData.brand = scope.row.brand
        this.dialogData.describe = scope.row.describe
        this.$refs.refDialog.dialogFormVisible = true
      },
      modify () {
        let params = {
          id: this.dialogData.id,
          name: this.dialogData.name,
          number: this.dialogData.number,
          supplier: this.dialogData.supplier,
          brand: this.dialogData.brand,
          describe: this.dialogData.describe
        }

        api.automatic.device.updateSilkCar(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.$message({
              type: 'success',
              message: data.message
            })
            this.$refs.refDialog.dialogFormVisible = false
            this.clearItem()
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
        })
      },
      delFun (params) {
        this.$confirm('是否确定删除', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          api.automatic.device.basicDeleteFilature(params).then(response => {
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
    },
    data () {
      return {
        tableData: [],
        dialogData: {},
        input: '',
        loading: true,
        type: '',
        page: {
          index: 1,
          totle: 20,
          pageSize: 30,
          count: 10
        }
      }
    }
  }
</script>
