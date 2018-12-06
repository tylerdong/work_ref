<template>
  <jk-dialog title="选择异常原因" :visible.sync="dialogVisible" width="500px">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="选择" width="80px">
        <template slot-scope="scope">
          <el-radio v-model="radio" :label="scope.row.id">{{scope.row.label}}</el-radio>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="降等原因" show-overflow-tooltip>
      </el-table-column>
    </el-table>

    <div class="hy-admin__pagination-wrapper cf">
      <el-pagination
        class="fr"
        :current-page="page.currentPage"
        :page-sizes="[15, 30, 40, 50]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <div class="dialog-footer tr">
      <el-button type="primary" @click="btnSure">确 定</el-button>
    </div>
  </jk-dialog>
</template>

<script>
  import * as api from 'src/api'
  export default {
    components: {
      'jkDialog': require('common/dialog-side.vue')
    },
    data () {
      return {
        dialogVisible: false,
        tableData: [],
        radio: '',
        page: {
          currentPage: 1,
          total: 20,
          pageSize: 20
        },
        loading: false
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      show (id) {
        this.radio = id
        this.dialogVisible = true
      },
      btnSure () {
        let radioDefault = {
          id: '',
          name: ''
        }
        for (let item of this.tableData) {
          if (item.id === this.radio) {
            radioDefault.id = item.id
            radioDefault.name = item.name
          }
        }
        this.$emit('callback', radioDefault)
        this.dialogVisible = false
      },
      getData () {
        this.loading = true
        let params = {
          workTypeId: '',
          pageIndex: this.page.currentPage,
          pageCount: this.page.pageSize
        }
        api.automatic.productInfo.getDownGrade(params).then(response => {
          if (response.data.messageType === 1) {
            this.tableData = response.data.data.list
            this.page.total = response.data.data.count
            return true
          }
          if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
            return true
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
          this.loading = false
        })
      },
      handleSizeChange (val) {
        this.page.pageSize = val
        this.getData()
      },
      handleCurrentChange (val) {
        this.page.currentPage = val
        this.getData()
      }
    }
  }
</script>

<style scoped lang="scss">
  .dialog-footer{padding-top: 20px}
</style>
