<template>
  <div>
    <!--<main-breadcrumb nameId="0206"></main-breadcrumb>-->
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main tr">
        <el-select
          v-model="search.workshopId"
          filterable
          placeholder="按选择车间查询"
          :loading="loading.selectShop" clearable>
          <el-option
            v-for="item in shopList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>

        <el-select
          v-model="search.status"
          filterable
          placeholder="按处理状态查询" clearable>
          <el-option
            v-for="item in statusList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button type="primary" @click="getData">查询</el-button>
        <el-button
          type="danger"
          @click="handleEdit" :disabled="!this.radio">异常处理</el-button>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="选择" width="80px">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.row" :disabled="scope.row.status==='2'">{{scope.row.label}}</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="workshopName" label="所属车间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="silkCode" label="丝绽编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="lineName" label="线别" show-overflow-tooltip></el-table-column>
        <el-table-column prop="batchNo" label="批号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="spec" label="规格" show-overflow-tooltip></el-table-column>
        <el-table-column prop="item" label="位号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="fallNo" label="落次" show-overflow-tooltip></el-table-column>
        <el-table-column prop="classesName" label="班次" show-overflow-tooltip></el-table-column>
        <el-table-column prop="downGradeReasonName" label="异常原因" show-overflow-tooltip></el-table-column>
        <el-table-column prop="positionName" label="职位" show-overflow-tooltip></el-table-column>
        <el-table-column label="处理状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span :class="{'red':scope.row.status === '1'}">{{scope.row.status === '1'?'未处理':'已处理'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="employeeName" label="操作者" show-overflow-tooltip></el-table-column>
        <el-table-column prop="handleEmployeeName" label="处理人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
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
        @size-change="pageSizeChange" @current-change="pageCurrentChange">
      </el-pagination>
    </div>

    <D_dialog ref="refDialog" @callback="getData"></D_dialog>
  </div>
</template>

<script>
  import * as api from 'src/api'
  export default {
    components: {
      // 'main-breadcrumb': require('../../../common/breadcrumb.vue'),
      'D_dialog': require('./dialog.vue')
    },
    data () {
      return {
        radio: '',
        tableData: [],
        shopList: [],
        statusList: [
          {id: '1', name: '未处理'},
          {id: '2', name: '已处理'}
        ],
        search: {
          status: '',
          workshopId: ''
        },
        loading: {
          selectShop: false,
          table: false
        },
        page: {
          current: 1,
          size: 15,
          total: 0
        }
      }
    },
    mounted () {
      this.getShopList()
      this.getData()
    },
    methods: {
      getData () {
        this.loading.table = true
        let params = {
          status: this.search.status,
          workshopId: this.search.workshopId,
          pageIndex: this.page.current,
          pageCount: this.page.size
        }
        api.automatic.board.getSilkAlarmList(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.page.current = data.data.pageIndex
            this.page.total = data.data.count
            this.tableData = data.data.list
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.loading.table = false
        })
      },
      /* 获取所有车间信息 */
      getShopList () {
        this.loading.selectShop = true
        api.automatic.dictionary.getAllWorkshopList({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.shopList = data.data
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.loading.selectShop = false
        })
      },
      handleEdit () {
        this.$refs.refDialog.show(this.radio)
      },
      pageSizeChange (val) {
        this.page.size = val
        this.getData()
      },
      pageCurrentChange (val) {
        this.page.current = val
        this.getData()
      }
    }
  }
</script>

<style scoped lang="scss">
  .red{color: #f50000}
</style>
