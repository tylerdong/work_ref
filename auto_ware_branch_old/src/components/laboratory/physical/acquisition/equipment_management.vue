<!--样品分组管理-->
<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-button @click="add" type="primary">新增</el-button>
        </div>
      </div>
      <el-table :data="tableData" border v-loading="loading.list" element-loading-text="拼命加载中">
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="model" label="型号"></el-table-column>
        <el-table-column prop="code" label="编码"></el-table-column>
        <el-table-column label="类别">
          <template slot-scope="scope">{{scope.row.type | equiTypes}}</template>
        </el-table-column>
        <el-table-column prop="manufacturer" label="厂商"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="deleteEqui(scope)" type="text" size="small">删除</el-button>
            <el-button @click="edit(scope)" type="text" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="hy-admin__pagination-wrapper cf">
        <el-pagination
          class="fr"
          :current-page="page.current"
          :page-sizes="[15, 30, 50, 100]"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange">
        </el-pagination>
      </div>
    </div>
    <add-dialog ref="addDialog" @getData="getData"></add-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'src/api'
  import storage from 'storage'

  export default {
    components: {
      'add-dialog': require('./dialog-add-edit-equipment.vue')
    },
    created () {},
    data () {
      return {
        userInfo: '',
        loading: {
          list: false
        },
        tableData: [],
        type: 'SIMPLE_CATEGORY',
        page: {
          current: 1,
          size: 15,
          total: 0
        }
      }
    },
    props: {},
    filters: {
      equiTypes (value) {
        return value === 'SERIAL_PORT' ? '串口' : '常规'
      }
    },
    mounted () {
      this.userInfo = storage.getUser()
      this.getData()
    },
    computed: {},
    methods: {
      add () {
        this.$refs.addDialog.show({action: 'add'})
      },
      edit (listItem) {
        this.$refs.addDialog.show({action: 'edit', ...listItem.row})
      },
      deleteEqui (item) {
        this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              let params = {id: item.row.id, creator: this.userInfo.userId, modifier: this.userInfo.userId}
              api.physicalLaboratory.labDeviceManagementController.deleteLabDeviceManagementDo(params).then((response) => {
                const data = response.data
                if (data.success === true) {
                  this.getData()
                }
              }).finally(() => {
                instance.confirmButtonLoading = false
                done()
              })
            } else {
              instance.confirmButtonLoading = false
              done()
            }
          }
        })
      },
      getData () {
        this.loading.list = true
        let params = {queryLabDeviceManagementCo: {}, page: {current: this.page.current, length: this.page.size}}
        api.physicalLaboratory.labDeviceManagementController.getLabDeviceManagementDoList(params).then(response => {
          const data = response.data
          if (data.success === true) {
            this.tableData = data.data.data
            this.page.total = data.data.count
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading.list = false
        })
      },
      /* 分页 */
      pageSizeChange (size) {
        this.page.size = size
        if (this.page.current === 1) {
          this.getData()
        } else {
          this.page.current = 1
        }
      },
      pageCurrentChange (current) {
        this.page.current = current
        this.getData()
      }
    }
  }
</script>
<style scoped>
</style>
