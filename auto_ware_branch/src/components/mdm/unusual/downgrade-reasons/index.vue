<template>
  <div>
    <!--<main-breadcrumb nameId="020304"></main-breadcrumb>-->
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-button type="primary" @click="getData" :loading="loading.search">查询</el-button>
          <el-button type="primary" @click="chooseFun(null)">新增</el-button>
        </div>
      </div>

      <el-table :data="tableData" border style="width: 100%" element-loading-text="拼命加载中">
        <el-table-column prop="reaName" label="异常原因"></el-table-column>
        <el-table-column prop="downGradeReasonTypeName" label="异常原因类型"></el-table-column>
        <el-table-column prop="reaCode" label="编码"></el-table-column>
        <el-table-column prop="reaDescripe" label="描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="chooseFun(scope.row)" type="text">修改</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="hy-admin__pagination-wrapper">
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
      <D_dialog ref="refDialog" @callback="getData" :downGradeList="downGradeList"></D_dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from '../../../../api/index'
  export default {
    components: { 'D_dialog': require('./dialog.vue') },
    data () {
      return {
        tableData: [],
        downGradeList: [],
        page: {
          currentPage: 1,
          total: 20,
          pageSize: 15
        },
        loading: {
          search: false
        }
      }
    },
    mounted () {
      this.getDownGradeList()
      this.getData()
    },
    methods: {
      getData () {
        this.tableData = []
        this.loading.search = true
        let params = {
          pageIndex: this.page.currentPage,
          pageCount: this.page.pageSize
        }
        api.mdm.getDownGradeReasonList(params).then(response => {
          if (response.data.messageType === 1) {
            this.tableData = response.data.data.list
            this.page.total = response.data.data.count
          } else {
            this.$message.error(response.data.message)
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
          this.loading.search = false
        })
      },
      getDownGradeList () {
        let params = {}
        api.mdm.getAllDownGradeReasonTypeList(params).then(response => {
          if (response.data.messageType === 1) {
            this.downGradeList = response.data.data
          } else {
            this.$message.error(response.data.message)
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
        })
      },
      handleSizeChange (val) {
        this.page.pageSize = val
        this.getData()
      },
      handleCurrentChange (val) {
        this.page.currentPage = val
        this.getData()
      },
      chooseFun (data) {
        this.$refs.refDialog.toggle(data)
      }
    }
  }
</script>
<style scoped lang="scss">
  .tags {
    margin-right: 10px
  }
</style>
