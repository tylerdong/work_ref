<!--材料申请-->
<template>
  <div v-loading="loading.all">
    <div class="hy-admin__main-container">
      <div class="flex-div-row" style="background: white">
        <div class="flex-div-column hy-admin__search-main cf" ref="container">
          <el-tabs type="card" v-model="groupId" @tab-click="handleClick">
            <el-tab-pane v-for="item in options.group" :name="item.id" :label="item.name"></el-tab-pane>
          </el-tabs>
          <div class="fr" style="margin-bottom: 20px">
            <el-checkbox v-model="searchInfo.isWaitingInbound">待入库</el-checkbox>
            <el-date-picker v-model="searchInfo.startDate"></el-date-picker>
            至
            <el-date-picker v-model="searchInfo.startDate"></el-date-picker>
            <el-select v-model="searchInfo.classify">
              <el-option v-for="item in options.classify" :label="item" :value="item"></el-option>
            </el-select>
            <el-input v-model="searchInfo.name" placeholder="请输入名称"></el-input>
            <el-button @click="searchList" type="primary">查询</el-button>
            <el-button @click="add" type="primary">申请</el-button>
          </div>
          <div>
            <el-table :data="tableData" border v-loading="loading.table" element-loading-text="拼命加载中">
              <el-table-column prop="number" label="所属组织" show-overflow-tooltip></el-table-column>
              <el-table-column prop="accidentCause" label="名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="reporter" label="规格" show-overflow-tooltip></el-table-column>
              <el-table-column prop="register" label="申请数量" show-overflow-tooltip></el-table-column>
              <el-table-column prop="register" label="备注" show-overflow-tooltip></el-table-column>
              <el-table-column prop="register" label="申请人" show-overflow-tooltip></el-table-column>
              <el-table-column label="申请时间" show-overflow-tooltip>
                <template slot-slot-scope="scope">
                  {{ scope.row.registerDate | timeFormat('YYYY-MM-DD HH:mm') }}
                </template>
              </el-table-column>
              <el-table-column prop="register" label="当前状态" show-overflow-tooltip></el-table-column>
              <el-table-column prop="register" label="入库数量" show-overflow-tooltip></el-table-column>
              <el-table-column label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button @click="view(scope)" type="text" size="small">查看入库</el-button>
                  <el-button @click="inbound(scope)" type="text" size="small">入库</el-button>
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

          <apply-dialog ref="dialog" :groupOptions="options.group" @success="success"></apply-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as api from '../../../../api/index'
  import storage from 'storage'

  export default {
    components: {
      'apply-dialog': require('./apply-dialog.vue')
    },
    data () {
      return {
        searchInfo: {
          isWaitingInbound: false,
          startDate: '',
          endDate: ''
        },
        options: {
          group: []
        },
        groupId: '',
        tableData: [],
        loading: {
          table: false,
          all: false
        },
        page: {
          current: 1,
          size: 15,
          total: 0
        }
      }
    },
    mounted () {
      this.getTabData()
      this.userInfo = storage.getUser()
    },
    methods: {
      handleClick (tab, event) {
        this.getListData()
        this.searchInfo.number = ''
      },
      success () {
        this.getListData()
      },
      add () {
        this.$refs.dialog.show('add')
      },
      inbound (scope) {
        this.$refs.dialog.show('inbound', scope.row)
      },
      view (scope) {
//        todo
      },
      getTabData () { // 获取Tab列表
        this.loading.all = true
        let params = {
          page: {
            current: 1,
            length: 1000
          },
          queryLabDataGroupDicCo: {
            type: 'LAB_MATERIAL'
          }
        }
        api.physicalLaboratory.classify.getLabDataGroupDicDoList(params).then((response) => {
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
          queryLabInstrumentRepairCo: {
            number: this.searchInfo.number,
            groupId: this.groupId
          },
          page: {
            current: this.page.current,
            length: this.page.size
          }
        }
        api.physicalLaboratory.labInstrumentRepair.getLabInstrumentRepairDoList(params).then(response => {
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
      searchList () {
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
</style>
