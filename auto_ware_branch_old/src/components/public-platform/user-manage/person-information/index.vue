<!-- 人员管理 -->
<template>
  <div>
    <!--<breadcrumb nameId="020201"></breadcrumb>-->
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr" style="width: 770px;">
          <el-input v-model="searchInfo.name" placeholder="请输入人员名称" />
          <el-select v-model="searchInfo.workshopId" placeholder="请选择车间" clearable>
            <el-option
              v-for="item in searchInfo.workshopOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-button type="primary" @click="getData" :loading="loadingstatus.searching">查询</el-button>
          <el-button type="primary" @click="TemplateDown">模板下载</el-button>
          <a ref="Template" href="" download=""></a>
          <el-button type="primary" @click="importTemplate" :loading="loadingstatus.uploading">模板导入</el-button>
          <input ref="filechoose" type="file" v-show="false" @change="upload($event)">
          <el-button type="primary" @click="btnAdd">新增</el-button>
        </div>
      </div>
      <template>
        <el-table :data="tableData" border style="width: 100%" v-loading.body="loading" element-loading-text="拼命加载中">
          <!--<el-table-column prop="organizationIdList" label="组织机构" min-width="100" show-overflow-tooltip></el-table-column>-->
          <el-table-column prop="subsystemName" label="所属子系统" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="workshopName" label="所属车间" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="employeeName" label="姓名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="employeeNumber" label="员工工号" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column label="性别" width="80">
            <template slot-scope="scope">
              {{scope.row.employeeGender | filterGender}}
            </template>
          </el-table-column>
          <el-table-column prop="employeePhone" label="手机号码" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column label="出生年月" show-overflow-tooltip min-width="100">
            <template slot-scope="scope">
              {{scope.row.employeeBirth | timeFormat('YYYY-MM')}}
            </template>
          </el-table-column>
          <el-table-column prop="workTypeName" label="工种" show-overflow-tooltip></el-table-column>
          <el-table-column prop="positionName" label="职位" show-overflow-tooltip></el-table-column>
          <el-table-column prop="employeeDescribe" label="描述" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="btnModify(scope)"
                type="text"
                size="small">
                修改
              </el-button>
              <!--<el-button-->
              <!--@click.native.prevent="deleteFun(scope)"-->
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
      <dialog_add ref="refDialog" @callback="getData" :workshop="searchInfo.workshopOptions"></dialog_add>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from 'src/api/index'
  export default {
    components: {
      'dialog_add': require('./dialog.vue')
      // 'breadcrumb': require('../../../common/breadcrumb.vue')
    },
    data () {
      return {
        searchInfo: {
          date: Date.now(),
          name: '',
          workshopId: '',
          workshopOptions: []
        },
        tableData: [],
        input: '',
        loading: true,
        type: '',
        page: {
          index: 1,
          totle: 0,
          pageSize: 30,
          count: 10
        },
        loadingstatus: {
          uploading: false,
          searching: false
        }
      }
    },
    mounted () {
      this.getData()
      this.getWorkshop()
    },
    methods: {
      upload (e) {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        api.automatic.person.addEmployeeByExcel(formData).then(response => {
          if (response.data.meta.code === 100000) {
            this.$message({type: 'success', message: '导入成功'})
          }
        }
        ).catch().finally(
          e.target.value = '',
          this.loadingstatus.uploading = false
        )
      },
      importTemplate () {
        this.loadingstatus.uploading = true
        this.$refs.filechoose.click()
      },
      TemplateDown () {
        this.$refs.Template.href = window.global.ajaxAutomatictBaseUrl + 'api/automaticintegration/employee/downloadEmployeeTemplet'
        this.$refs.Template.download = '人员信息模板'
        this.$refs.Template.click()
      },
      getWorkshop () {
        /* 获取所有车间 */
        api.automatic.dictionary.getAllWorkshopList().then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.searchInfo.workshopOptions = data.data
          }
        })
      },
      getData () {
        this.loadingstatus.searching = true
        let params = {
          workshopId: this.searchInfo.workshopId,
          name: this.searchInfo.name,
          pageIndex: this.page.index,
          pageCount: this.page.count
        }
        api.automatic.person.getEmployeeList(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.page.totle = data.data.count
            this.page.count = data.data.pageCount
            this.tableData = data.data.list
            this.loading = false
          }
        }).finally(() => {
          this.loadingstatus.searching = false
          this.loading = false
        })
      },
      btnAdd () {
        this.$refs.refDialog.show()
      },
      btnModify (scope) {
        let organizationIdList = ''
        let params = {
          employeeId: scope.row.employeeId
        }
        api.systemOrganization.getOrganizationByEmployeeId(params).then(response => {
          organizationIdList = response.data.data.organizationVo
          let newRow = JSON.parse(JSON.stringify(scope.row))
          this.$refs.refDialog.show({
            ...newRow,
            organizationIdList: organizationIdList
          })
        })
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
      resetDialog () {
        this.clearItem()
        this.$refs.refDialog.resetFields()
      },
      showDialog () {
        this.$refs.refDialog.dialog.visible = true
      },
      delFun (scope) {
        let params = {ids: scope.row.employeeId}
        api.automatic.person.deleteEmployee(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.$message({
              type: 'success',
              message: data.message
            })
            this.getData()
            return true
          }
        }).finally(() => {
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
    },
    filters: {
      filterGender: function (value) {
        if (value === 'M') {
          return '男'
        } else if (value === 'F') {
          return '女'
        }
      }
    }
  }
</script>
