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
        <el-table-column type="index" label="序号" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="分类名称" show-overflow-tooltip></el-table-column>
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
    <add-dialog ref="addDialog" @submitSuccess="getData"></add-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'src/api'
  export default {
    components: {
      'add-dialog': require('./dialog-add-edit-split-group.vue')
    },
    created () {},
    data () {
      return {
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
    mounted () {
      this.getData()
    },
    computed: {},
    methods: {
      add () {
        this.$refs.addDialog.show({title: '新增', name: ''})
        console.log('add')
      },
      edit (listItem) {
        listItem.row['title'] = '修改'
        this.$refs.addDialog.show(listItem.row)
      },
      deleteNode (listItem) {
        console.log(listItem)
        console.log(listItem.row.id)
        console.log(listItem.row.modifier)
        this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              let params = {
                id: listItem.row.id,
                modifier: listItem.row.modifier
              }
              api.chemicalLaboratory.classify.deleteLabDataGroupDicDo(params).then((response) => {
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
        console.log(123)
        let params = {
          page: {
            current: this.page.current,
            length: this.page.size
          },
          queryLabDataGroupDicCo: {
            type: this.type
          }
        }
        this.loading.list = true
        api.chemicalLaboratory.classify.getLabDataGroupDicDoList(params).then(response => {
          const data = response.data
          if (data.success === true) {
            console.log(data)
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
