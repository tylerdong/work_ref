<!--异常等级-->
<template>
  <div>
    <!--<main-breadcrumb nameId="020309"></main-breadcrumb>-->
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <!--<el-input></el-input>-->
          <!--<el-button type="primary" icon="search"></el-button>-->
          <el-button @click="add" type="primary">新增</el-button>
        </div>
      </div>
      <el-table :data="tableData" border v-loading="loading.list" element-loading-text="拼命加载中">
        <el-table-column prop="downGradeReasonName" label="降等原因" show-overflow-tooltip></el-table-column>
        <el-table-column prop="levelName" label="降等划分" show-overflow-tooltip></el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="edit(scope)" type="text">修改</el-button>
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
    <edit-dialog @submitSuccess="getData" ref="editDialog" :levelList="levelList" :positionList="positionList"></edit-dialog>
    <add-dialog @submitSuccess="getData" ref="addDialog" :levelList="levelList" :positionList="positionList"></add-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from 'src/api'
  export default {
    components: {
      // 'main-breadcrumb': require('common/breadcrumb.vue'),
      'edit-dialog': require('./dialog-edit.vue'),
      'add-dialog': require('./dialog-add.vue')
    },
    data () {
      return {
        tableData: [],
        levelList: [],
        positionList: [],
        page: {
          current: 1,
          size: 15,
          total: 0
        },
        loading: {
          list: false
        }
      }
    },
    mounted () {
      this.getData()
      this.getLevelList()
      this.getAllPositionList()
    },
    methods: {
      getData () {
        this.loading.list = true
        let params = {
          pageIndex: this.page.current,
          pageCount: this.page.size
        }
        api.automatic.productInfo.getUnusualGrageSetList(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.page.total = data.data.count
            this.tableData = data.data.list
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.loading.list = false
        })
      },
      add () {
        this.$refs.addDialog.show()
      },
      edit (listItem) {
        console.log(listItem)
        this.$refs.editDialog.show(listItem)
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
      },
      getLevelList () { // 获取所有等级
        let params = {
        }
        api.automatic.dictionary.getAllExceptionLevelList(params).then(response => {
          if (response.data.messageType === 1) {
            this.levelList = response.data.data
            return true
          }
          if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
            return true
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
        })
      },
      getAllPositionList () { // 获取所有职位
        let params = {
        }
        api.automatic.dictionary.getAllPositionList(params).then(response => {
          if (response.data.messageType === 1) {
            this.positionList = response.data.data
            return true
          }
          if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
            return true
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
        })
      }
    }
  }
</script>
