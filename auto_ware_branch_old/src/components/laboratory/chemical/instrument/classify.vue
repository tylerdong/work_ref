<!--仪器分类-->
<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-button @click="add" type="primary">新增</el-button>
        </div>
      </div>
      <el-table :data="tableData" border v-loading="loading" element-loading-text="拼命加载中">
        <el-table-column prop="name" label="名称" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="edit(scope)" type="text" size="small">修改</el-button>
            <el-button @click="del(scope)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="hy-admin__pagination-wrapper cf">
        <el-pagination
          class="fr"
          :current-page="page.current"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange">
        </el-pagination>
      </div>
    </div>
    <add-dialog ref="addDialog" @loadData="getData"></add-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as api from 'src/api'
  export default {
    components: {
      'add-dialog': require('./dialog-add-edit-classify.vue')
    },
    created () {},
    data () {
      return {
        loading: false,
        tableData: [],
        page: {
          current: 1,
          size: 10,
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
      edit (item) {
        item.row['title'] = '修改'
        this.$refs.addDialog.show(item.row)
      },
      del (item) {
        this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              let params = {
                id: item.row.id,
                modifier: item.row.modifier
              }
              api.chemicalLaboratory.classify.deleteLabDataGroupDicDo(JSON.stringify(params)).then(response => {
                let data = response.data
                if (data.success) {
                  this.$message.success('删除成功')
                  this.getData()
                } else {
                  this.$message.error(data.errorMsg)
                }
              }).catch((e) => {
                console.log(e)
              }).finally(() => {
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
        this.loading = true
        let params = {
          page: {
            current: this.page.current,
            length: this.page.size
          },
          queryLabDataGroupDicCo: {
            type: 'LAB_APPARATUS'
          }
        }
        api.chemicalLaboratory.classify.getLabDataGroupDicDoList(params).then((response) => {
          let data = response.data
          if (data.success) {
            this.tableData = data.data.data
            this.page.total = data.data.count
          } else {
            this.$message.error(data.errorMsg)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading = false
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
