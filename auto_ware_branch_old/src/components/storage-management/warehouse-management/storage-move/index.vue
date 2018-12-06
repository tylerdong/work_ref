<!--库间转移-->
<template>
  <div class="page-wrapper">
    <div class="action-bar cf">
      <div class="fr">
        <el-input class="width1" v-model="search.number" placeholder="请输入库位"></el-input>
        <el-date-picker
          v-model="search.startDate"
          type="date"
          :picker-options="pickerOptions0"
          @keyup.enter="searchClick"
          @change="dtStartChange"
          placeholder="请选择开始日期">
        </el-date-picker>
        <el-date-picker
          v-model="search.endDate"
          type="date"
          :picker-options="pickerOptions1"
          @keyup.enter="searchClick"
          @change="dtEndChange"
          placeholder="请选择结束日期">
        </el-date-picker>
        <el-button @click="searchClick" type="primary" icon="el-icon-search"></el-button>
      </div>
    </div>
    <el-table :data="tableData" border v-loading="loading.table" style="width: 100%">
      <el-table-column prop="date" label="成品类型"></el-table-column>
      <el-table-column prop="date" label="批号"></el-table-column>
      <el-table-column prop="date" label="规格"></el-table-column>
      <el-table-column prop="date" label="等级"></el-table-column>
      <el-table-column prop="date" label="托盘类型"></el-table-column>
      <el-table-column prop="date" label="包装类型"></el-table-column>
      <el-table-column prop="date" label="净重"></el-table-column>
      <el-table-column prop="date" label="原库位"></el-table-column>
      <el-table-column prop="date" label="目标库位"></el-table-column>
      <el-table-column prop="date" label="转移数量"></el-table-column>
      <el-table-column prop="date" label="操作人"></el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            @click="detailClick(scope.row.numbers)"
            type="primary"
            size="small">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="hy-admin__pagination-wrapper cf">
      <el-pagination
        class="fr"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="page.currentPage"
        :page-sizes="page.sizes"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
    <detail-dialog ref="detailDialog"></detail-dialog>
  </div>
</template>

<script>
  export default {
    components: {
      'detail-dialog': require('./detail-dialog.vue')
    },
    data () {
      return {
        search: {
          number: '',
          startDate: '',
          endDate: ''
        },
        tableData: [],
        loading: {
          table: false
        },
        dtBaseStart: '',
        dtBaseEnd: '',
        pickerOptions0: {
          disabledDate: (time) => {
            if (this.dtBaseStart) {
              return time.getTime() > this.dtBaseStart
            }
          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            if (this.dtBaseEnd) {
              return time.getTime() < this.dtBaseEnd
            }
          }
        },
        page: {
          currentPage: 1,
          sizes: [15, 30, 50, 100],
          size: 15,
          total: 0
        }
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      searchClick () {
        this.page.currentPage = 1
        this.getData()
      },
      getData () {
        let startDate = this.search.startDate ? this.search.startDate.getTime() : ''
        let endDate = this.search.endDate ? this.search.endDate.getTime() : ''
        let params = {
          number: this.search.number,
          startDate,
          endDate
        }
        console.log(params)
        this.tableData = [
          {date: 'ceshi', numbers: [{number: '13122'}, {number: '34343'}]}
        ]
//      this.loading.table = true
//      api.automatic.barCode.foreignTradePackBoxCodePrint(params).then((response) => {
//        const data = response.data
//        if (data.messageType === 1) {
//          this.page.total = data.data.total
//          this.tableData = data.data.list
//        }
//      }).catch((e) => {
//        console.log(e)
//      }).finally(() => {
//        this.loading.table = false
//      })
      },
      detailClick (data) {
        this.$refs.detailDialog.show(data)
      },
      dtStartChange (value) {
        if (value) {
          this.dtBaseEnd = this.search.startDate.getTime() + 8.64e7
        } else {
          this.dtBaseEnd = ''
        }
      },
      dtEndChange (value) {
        if (value) {
          this.dtBaseStart = this.search.endDate.getTime() - 8.64e7
        } else {
          this.dtBaseStart = ''
        }
      },
      /* 分页 */
      sizeChange (val) {
        this.page.size = val
        if (this.page.currentPage === 1) {
          this.getData()
        } else {
          this.page.currentPage = 1
        }
      },
      currentChange (val) {
        this.page.currentPage = val
        this.getData()
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .page-wrapper{
    margin: 10px;
    padding: 10px;
    border-radius: 3px;
    background-color: #fff;
  }
  .action-bar{
    padding: 10px 0;
  }
</style>
