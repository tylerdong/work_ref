<!-- 排班管理 -->
<template>
  <div>
    <!--<breadcrumb nameId="020204"></breadcrumb>-->
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-select v-model="searchInfo.workshopId" placeholder="请选择车间" clearable>
            <el-option
              v-for="item in searchInfo.workshopOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-button type="primary" @click="getData('search')">查询</el-button>
          <el-button type="primary" @click="btnAdd()">新增</el-button>
        </div>
      </div>
      <template>
        <el-table :data="tableData" border style="width: 100%" v-loading.body="loading" element-loading-text="拼命加载中">
          <el-table-column label="开始时间" min-width="110" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.schedulingStartDate | timeFormat('YYYY-MM-DD')}}
            </template>
          </el-table-column>
          <el-table-column label="结束时间" min-width="110" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.schedulingEndDate | timeFormat('YYYY-MM-DD')}}
            </template>
          </el-table-column>
          <!--<el-table-column prop="classesStartTime" label="上班时间" min-width="100"show-overflow-tooltip></el-table-column>-->
          <!--<el-table-column prop="classesEndTime" label="下班时间" min-width="100"show-overflow-tooltip></el-table-column>-->
          <el-table-column prop="workshopName" label="所属车间" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="groupName" label="班组名称" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column label="班次">
            <template slot-scope="scope">
              {{scope.row.classesName}}
            </template>
          </el-table-column>
          <el-table-column label="班次类型" min-width="100">
            <template slot-scope="scope">
              {{scope.row.classesType | classesType}}
            </template>
          </el-table-column>
          <el-table-column label="当班人员" min-width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tag
                v-for="tag in scope.row.schedulingEmployeeMapInfoBoList"
                :key="tag.employeeId"
                class="tags">
                {{tag.employeeName}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="employeeName" label="值班长" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="100" >
            <template slot-scope="scope">
              <el-button @click.native.prevent="btnModify(scope)" type="text" size="small">修改</el-button>
              <!--<el-button-->
                <!--@click.native.prevent="btnDelete(scope)"-->
                <!--type="text"-->
                <!--size="small">-->
                <!--删除-->
              <!--</el-button>-->
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
      <D_dialog ref="refDialog" @callback="getData" :workshop="searchInfo.workshopOptions"></D_dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from 'src/api'
  export default {
    components: {
      'D_dialog': require('./dialog-info.vue')
      // 'breadcrumb': require('../../../common/breadcrumb.vue')
    },
    data () {
      return {
        searchInfo: {
          date: Date.now(),
          workshopId: '',
          workshopOptions: []
        },
        tableData: [],
        loading: true,
        page: {
          index: 1,
          totle: 0,
          pageSize: 30,
          count: 10
        }
      }
    },
    mounted () {
      this.getData()
      this.getSelectList()
    },
    filters: {
      classesType: function (value) {
        if (value === '3') {
          return '休'
        } else if (value === '2') {
          return '夜'
        } else if (value === '1') {
          return '白'
        }
      }
    },
    methods: {
      getSelectList () {
        /* 获取所有车间 */
        api.automatic.dictionary.getAllWorkshopList().then(response => {
          const data = response.data
          if (data.messageType === 1) {
            const items = data.data
            for (let item of items) {
              this.searchInfo.workshopOptions.push(item)
            }
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
      getData () {
        this.loading = true
        this.tableData.splice(0, this.tableData.length)
        let params = {
          workshopId: this.searchInfo.workshopId,
          date: new Date(),
          pageIndex: this.page.index,
          pageCount: this.page.count
        }
        /* 获取所有班次 */
        api.automatic.person.getSchedulingList(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            const items = data.data.list
            for (let item of items) {
              this.tableData.push(item)
            }
            this.page.totle = data.data.count
            this.page.count = data.data.pageCount
          }
        }).finally(() => {
          this.loading = false
        })
      },
      btnAdd () {
        this.$refs.refDialog.show()
      },
      btnModify (scope) {
        let newRow = JSON.parse(JSON.stringify(scope.row))
        this.$refs.refDialog.show(newRow)
      },
      callback () {
        this.getData()
      },
      btnDelete (scope) {
        this.$confirm('是否确定删除', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          this.delFun(scope)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      delFun (scope) {
        let params = {
          id: scope.row.classesId
        }
        api.automatic.person.deleteScheduling(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.$message.success(data.message)
            this.getData()
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
    }
  }
</script>
<style scoped lang="scss">
  .tags {
    margin-right: 10px
  }
</style>
