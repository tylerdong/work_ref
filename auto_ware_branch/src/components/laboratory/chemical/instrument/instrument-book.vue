<!--仪器台帐-->
<template>
  <div v-loading="loading.all">
    <div class="hy-admin__main-container">
      <div class="flex-div-row" style="background: white">
        <div class="flex-div-column hy-admin__search-main cf" ref="container">
          <el-tabs type="card" v-model="groupId" @tab-click="handleClick">
            <el-tab-pane v-for="(item,index) in options.group" :name="item.id" :label="item.name" :key="index"></el-tab-pane>
          </el-tabs>
          <div class="fr" style="margin-bottom: 20px">
            <el-input placeholder="仪器编号" v-model="searchInfo.number"></el-input>
            <el-button @click="search" type="primary">查询</el-button>
            <el-button @click="add" type="primary">新增</el-button>
          </div>
          <div>
            <el-table :data="tableData" border v-loading="loading.table" element-loading-text="拼命加载中">
              <el-table-column prop="number" label="仪器编号" show-overflow-tooltip></el-table-column>
              <el-table-column prop="factoryNumber" label="出厂编号" show-overflow-tooltip></el-table-column>
              <el-table-column prop="storagePlace" label="存放地点" show-overflow-tooltip></el-table-column>
              <el-table-column label="测量范围" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{scope.row.measuringStartRange + '~' + scope.row.measuringEndRange + scope.row.measuringRangeUnit}}
                </template>
              </el-table-column>
              <el-table-column prop="manufacturer" label="制造厂" show-overflow-tooltip></el-table-column>
              <el-table-column prop="useDepart" label="使用部门" show-overflow-tooltip></el-table-column>
              <el-table-column label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button @click="view(scope)" type="text" size="small">查看</el-button>
                  <el-button @click="edit(scope)" type="text" size="small">修改</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
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
          <instrument-book-view ref="view" :groupOptions="options.group"></instrument-book-view>
          <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" top="5%" width="80%">
            <instrument-info ref="info" :groupOptions="options.group" @success="success"></instrument-info>
            <template slot="footer">
              <el-button @click="confirm" type="primary">确定</el-button>
            </template>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as api from 'src/api'

  export default {
    components: {
      'instrument-book-view': require('./instrument-book-view.vue'),
      'instrument-info': require('./instrument-info.vue')
    },
    data () {
      return {
        options: {
          group: []
        },
        groupId: '',
        searchInfo: {
          number: ''
        },
        loading: {
          table: false,
          all: false
        },
        tableData: [],
        dialogTitle: '',
        dialogType: '',
        dialogVisible: false,
        page: {
          current: 1,
          size: 15,
          total: 0
        }
      }
    },
    mounted () {
      this.getTabData()
    },
    methods: {
      handleClick (tab, event) {
        this.searchInfo.number = ''
        this.getListData()
      },
      success () {
        this.dialogVisible = false
        this.getListData()
      },
      add () {
        this.dialogTitle = '新增'
        this.dialogType = 'add'
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs.info.renderData('add')
        })
      },
      view (scope) {
        this.$refs.view.show(scope.row.id)
      },
      edit (scope) {
        this.dialogTitle = '修改'
        this.dialogType = 'edit'
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs.info.renderData('edit', scope.row)
        })
      },
      confirm () {
        this.$refs.info.confirm(this.dialogType)
      },
      getTabData () { // 获取Tab列表
        this.loading.all = true
        let params = {
          page: {
            current: 1,
            length: 1000
          },
          queryLabDataGroupDicCo: {
            type: 'LAB_APPARATUS'
          }
        }
        api.chemicalLaboratory.classify.getLabDataGroupDicDoList(params).then((response) => {
          const data = response.data
          if (data.success === true) {
            this.options.group = data.data.data
            this.groupId = this.options.group[0].id
            this.getListData()
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.all = false
        })
      },
      getListData () { // 获取列表结构
        this.loading.table = true
        let params = {
          queryLabInstrumentManagementCo: {
            number: this.searchInfo.number,
            status: 'NORMAL',
            groupId: this.groupId
          },
          page: {
            current: this.page.current,
            length: this.page.size
          }
        }
        api.chemicalLaboratory.labInstrumentManagement.getLabInstrumentManagementDoList(params).then(response => {
          const data = response.data
          if (data.success === true) {
            if (!data.data) {
              this.tableData = []
              return
            }
            this.tableData = data.data.data
            this.page.total = data.data.count
            return true
          }
          if (data.success === false) {
            this.$message.error(data.errorMsg)
            return false
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.table = false
        })
      },
      search () {
        this.getListData()
      },
      /* 分页 */
      pageSizeChange (size) {
        this.page.size = size
        if (this.page.current === 1) {
          this.getListData()
        } else {
          this.page.current = 1
        }
      },
      pageCurrentChange (current) {
        this.page.current = current
        this.getListData()
      }
    }
  }
</script>
<style scoped>
  .left-tree {
    border-right: 1px solid #dee4ec;
  }

  .flex-div-row {
    display: flex;
    flex-direction: row;
  }

  .flex-div-column {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    width: 100%;
  }

  .select-box {
    width: 16rem;
  }

  .check_pending_table {
    border: 1px solid #f9f9f9;
    border-radius: 5px;
    min-width: 100%;
  }

  .check_pending_table tr th {
    min-width: 80px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #ccc;
  }

  .check_pending_table tr td {
    min-width: 80px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #ccc
  }
</style>
