<!--样品管理/样品-->
<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-button @click="add" type="primary">新增</el-button>
        </div>
      </div>
      <el-table :data="tableData" border v-loading="loading.list" element-loading-text="拼命加载中">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="groupName" label="分类"></el-table-column>
        <el-table-column prop="departName" label="部门"></el-table-column>
        <el-table-column label="仅用日常">
          <template slot-scope="scope">
            <span>{{scope.row.isUseDaily | sampleCheck}}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否留样">
          <template slot-scope="scope">
            <span>{{scope.row.isKeepSample | sampleCheck}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expDate" label="留样周期"></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="edit(scope)" type="text" size="small">修改</el-button>
            <el-button @click="deleteNode(scope)" type="text" size="small">删除</el-button>
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
    <add-edit-sample ref="addEditDialog" @submitSuccess="getData"></add-edit-sample>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'src/api'
  export default {
    components: {
      'add-edit-sample': require('./dialog-add-edit-sample.vue')
    },
    created () {},
    data () {
      return {
        loading: {
          list: false
        },
        tableData: [],
        page: {
          current: 1,
          size: 15,
          total: 0
        }
      }
    },
    props: {},
    mounted () {
      this.getData()
    },
    filters: {
      sampleCheck (val) {
        if (val === 'Y') {
          return '是'
        }
        if (val === 'N') {
          return '否'
        }
      }
    },
    computed: {},
    methods: {
      add () {
        this.$refs.addEditDialog.show({title: '新增', name: '', classify: '', dept: '', report: '', isUseDaily: false, isKeepSample: false, expDate: ''})
      },
      edit (listItem) {
        listItem.row['title'] = '修改'
        this.$refs.addEditDialog.show(listItem.row)
      },
      deleteNode (listItem) {
        this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              console.log(listItem.row)
              let params = {
                labSampleManagementId: listItem.row.id,
                modifier: listItem.row.modifier
              }
              api.chemicalLaboratory.labSampleManagement.deleteLabSampleManagementDo(params).then((response) => {
                const data = response.data
                if (data.success === true) {
                  this.$message.success('删除成功')
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
        let params = {
          page: {
            current: this.page.current,
            length: this.page.size
          }
        }
        api.chemicalLaboratory.labSampleManagement.getLabSampleManagementDoList(params).then(response => {
          const data = response.data
          if (data.success === true) {
            this.tableData = data.data.data
            console.log(this.tableData)
            this.page.total = data.data.count
            return true
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
