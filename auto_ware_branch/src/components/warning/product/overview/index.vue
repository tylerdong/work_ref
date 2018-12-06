<!--丝锭批号-->
<template>
  <div>
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <el-input v-model="search.code" placeholder="类型编码" clearable class="input-item-18">
          </el-input>

          <el-date-picker v-model="search.startTime" type="datetime" placeholder="开始执行时间" class="input-item-18">
          </el-date-picker>

          <el-date-picker v-model="search.endTime" type="datetime" placeholder="结束执行时间" class="input-item-18">
          </el-date-picker>

          <el-button @click="getData" type="primary" icon="el-icon-search" :loading="loading.search"></el-button>
        </div>
      </div>
      <el-table :data="tableData" border v-loading="loading.list" element-loading-text="拼命加载中">
        <el-table-column label="类型" width="218">
          <template slot-scope="scope">{{`${scope.row.kpiTypeName}(${scope.row.kpiTypeCode})`}}</template>
        </el-table-column>
        <el-table-column prop="value" label="结果" width="80"></el-table-column>
        <el-table-column label="格式类型" width="78">
          <template slot-scope="scope">{{scope.row.formatType | formatType}}</template>
        </el-table-column>
        <el-table-column label="数据类型" width="78">
          <template slot-scope="scope">{{scope.row.dataType | dataType}}</template>
        </el-table-column>
        <el-table-column label="时间类型" width="78">
          <template slot-scope="scope">{{scope.row.timeType | timeType}}</template>
        </el-table-column>
        <el-table-column label="时间值" width="100">
          <template slot-scope="scope">{{scope.row.timeValue }}</template>
        </el-table-column>
        <el-table-column label="维度" prop="dimensionSplice"></el-table-column>
        <el-table-column label="执行时间" width="140">
          <template slot-scope="scope">{{scope.row.dwLoadDate | timeFormat('YYYY-MM-DD HH:mm')}}</template>
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
  </div>
</template>

<script type="text/ecmascript-6">
  // import dateFns from 'date-fns'
  import * as api from 'src/api'

  export default {
    components: {},
    data () {
      return {
        tableData: [],
        search: {
          code: '',
          startTime: '',
          endTime: ''
        },
        options: {
          organizations: new Map(),
          workshopList: new Map(),
          lineList: new Map(),
          gradeList: new Map()
        },
        page: {
          current: 1,
          size: 15,
          total: 0
        },
        loading: {search: false}
      }
    },
    mounted () {
      Promise.all([
        api.mdm.getOrganizationList({pageCount: 10000, pageIndex: 1}),
        api.dataAnalysis.getWorkShopListByOrgId({orgId: ''}),
        api.dataAnalysis.getLineListByWorId({workShopId: ''}),
        api.mdm.getAllSilkGradeList({})
      ]).then(response => {
        if (response[0].data.messageType === 1) {
          response[0].data.data.list.forEach(item => {
            this.options.organizations.set(item.orgId, item.orgName)
          })
        }
        if (response[1].data.messageType === 1) {
          response[1].data.data.forEach(item => {
            this.options.workshopList.set(item.workshopId, item.workshopName)
          })
        }
        if (response[2].data.messageType === 1) {
          response[2].data.data.forEach(item => {
            this.options.lineList.set(item.lineId, item.lineName)
          })
        }
        if (response[3].data.messageType === 1) {
          response[3].data.data.forEach(item => {
            this.options.gradeList.set(item.graId, item.graName)
          })
        }
        this.getData()
      })
    },
    methods: {
      getData () {
        this.loading.search = true
        let params = {
          pageIndex: this.page.current,
          pageCount: this.page.size,
          code: this.search.code,
          startTime: this.search.startTime ? this.search.startTime.getTime() : '',
          endTime: this.search.endTime ? this.search.endTime.getTime() : ''
        }
        api.dataAnalysis.getFactInfoList(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.page.total = data.data.count
            data.data.list.forEach(list => {
              let dimensionSplice = ''
              list.dimensionList.forEach(item => {
                dimensionSplice += `${item.dimensionName}: ${item.name};`
              })
              list = Object.assign(list, {dimensionSplice: dimensionSplice})
            })
            this.tableData = data.data.list
          }
        }).finally(() => {
          this.loading.search = false
        })
      },

      // 组织
      getOrganization () {
        let param = {pageCount: 10000, pageIndex: 1}
        api.mdm.getOrganizationList(param).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.organizations = data.data.list
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },

      // 根据车间选择线别
      getLineList () {
        api.dataAnalysis.getLineListByWorId({workShopId: ''}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.lineList = data.data
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).finally(() => {
        })
      },

      /* 获取等级下拉列表 */
      getAllSilkGradeList () {
        api.mdm.getAllSilkGradeList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.gradeList = data.data
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },

      /* 获取车间下拉列表 */
      getWorkshopList () {
        api.dataAnalysis.getWorkShopListByOrgId({orgId: ''})
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
