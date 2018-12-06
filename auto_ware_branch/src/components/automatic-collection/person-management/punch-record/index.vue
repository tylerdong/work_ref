<!-- 考勤记录 -->
<template>
  <div>
    <!--<breadcrumb nameId="020203"></breadcrumb>-->
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <div class="fr">
          <!--<el-select v-model="searchInfo.workshopName" placeholder="选择所属车间">-->
            <!--<el-option-->
              <!--v-for="item in searchInfo.workshopNameOptions"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
          <el-date-picker
            v-model="searchInfo.date"
            type="date"
            placeholder="选择日期" @change="changeDate">
          </el-date-picker>
          <el-button type="primary" @click="getData">查询</el-button>
        </div>
      </div>
      <template>
        <el-table :data="tableData" border style="width: 100%" v-loading.body="loading" element-loading-text="拼命加载中">
          <el-table-column prop="workshopName" label="所属车间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="employeeName" label="姓名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="punchRecordType" label="打卡类型" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.punchRecordType === '1'?'上班打卡':'下班打卡'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="punchRecordTime" label="打卡时间" show-overflow-tooltip></el-table-column>
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
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from 'src/api'
  import vue from 'vue'
  export default {
    components: {
      // 'breadcrumb': require('../../../common/breadcrumb.vue')
    },
    data () {
      return {
        searchInfo: {
          date: '',
          workshopName: '',
          workshopNameOptions: []
        },
        tableData: [],
        loading: false,
        page: {
          index: 1,
          totle: 0,
          pageSize: 30,
          count: 10
        }
      }
    },
    mounted () {
      var myFilter = vue.filter('timeFormat')
      this.searchInfo.date = myFilter(Date.now(), 'YYYY-MM-DD')
      this.getData()
    },
    methods: {
      changeDate (value) {
        this.searchInfo.date = value
      },
      getData () {
        this.loading = true
        this.tableData.splice(0, this.tableData.length)
        let params = {
          date: this.searchInfo.date,
          pageIndex: this.page.index,
          pageCount: this.page.count
        }
        api.automatic.person.getPunchRecordList(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.page.totle = data.data.count
            this.page.count = data.data.pageCount
            this.tableData = data.data.list
          }
        }).finally(() => {
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
