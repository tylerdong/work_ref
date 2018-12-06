<!--组件名-->
<template>
  <div>
    <!--<main-breadcrumb nameId="020509"></main-breadcrumb>-->
    <div class="all-wrapper">
      <div class="action-bar">
        <el-form :model="search" :rules="rules" ref="form" :inline="true">
          <el-form-item>
            <el-input placeholder="请输入丝车号" v-model="search.carCode"></el-input>
          </el-form-item>

          <el-form-item>
            <el-date-picker v-model="search.startDateValue" type="datetime" placeholder="请选择开始日期"></el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-date-picker v-model="search.endDateValue" type="datetime" placeholder="请选择结束日期"></el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button @click="searchClick" type="primary" icon="el-icon-search"></el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="main-wrappper">
        <ul v-loading="loading.list">
          <li class="no-data" v-show="!tableData.length">暂无数据</li>
          <li class="list-item" v-for="(item, index) in tableData">
            <div class="line">
              <div class="line1-item">丝车号：</div>
              <div class="line1-item2 font-bold">{{item.silkCarNumber}}</div>
              <div class="line1-item">完成工艺：</div>
              <div class="line1-item2">{{item.productionProcessName}}</div>
              <!--<el-select v-model="item.productionProcessId" placeholder="请选择"-->
                         <!--@change="currentTechnologyselect(item.productionProcessId, item.silkCarNumber, item.groupId, index)">-->
                  <!--<el-option v-for="item in technologyOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>-->
                <!--</el-select>-->
              <div class="line1-item">完成时间：</div>
              <div class="line1-item2">{{item.productionProcessTime | timeFormat('YYYY-MM-DD HH:mm:ss')}}</div>
              <div class="line1-item">操作人：</div>
              <div class="line1-item2">{{item.employeeName}}</div>
            </div>
            <div class="line">
              <div class="line2-item1">丝位：</div>
              <div class="line2-item2">
                <div v-if="item.silkInfoBoList && item.silkInfoBoList.length > 0" class="dye-box">
                  <div class="dye-item" v-for="(item2, index) in item.silkInfoBoList">
                    <div class="daye-itme-index">{{index + 1}}</div>
                    <div class="daye-itme-info">
                      <div v-if="item2.silkCode" :class="{red: item2.exceptionStatus}"
                           class="daye-itme-info-btn hand" @click="detailClick(item2)">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!--<div class="hy-admin__pagination-wrapper cf">-->
        <!--<el-pagination-->
          <!--class="fr"-->
          <!--:current-page="page.current"-->
          <!--:page-sizes="[15, 30, 50, 100]"-->
          <!--:page-size="page.size"-->
          <!--layout="total, sizes, prev, pager, next, jumper"-->
          <!--:total="page.total"-->
          <!--@size-change="pageSizeChange"-->
          <!--@current-change="pageCurrentChange">-->
        <!--</el-pagination>-->
      <!--</div>-->
      <detail-dialog ref="waitDialog"></detail-dialog>
    </div>
  </div>
</template>
<script>
  import * as api from 'src/api'
  export default {
    components: {
      'detail-dialog': require('./detail-dialog.vue')
      // 'main-breadcrumb': require('../../../common/breadcrumb.vue')
    },
    data () {
      return {
        dtBaseStart: '',
        dtBaseEnd: '',
        pickerStartOptions: {
          disabledDate: (time) => {
            if (this.dtBaseStart) {
              return time.getTime() > this.dtBaseStart || time.getTime() < this.dtBaseStart
            }
          }
        },
        pickerEndOptions: {
          disabledDate: (time) => {
            if (this.dtBaseEnd) {
              return time.getTime() < this.dtBaseEnd || time.getTime() > this.dtBaseEnd
            }
          }
        },
        technologyOptions: [],
        search: {
          carCode: '',
          startDateValue: '',
          endDateValue: ''
        },
        rules: {
          carCode: [{ type: 'string', required: true, message: '请输入丝车号' }],
          startDateValue: [{ type: 'date', required: true, message: '请选择开始日期', trigger: 'change' }],
          endDateValue: [{ type: 'date', required: true, message: '请选择结束日期', trigger: 'change' }]
        },
        tableData: [],
        nowItem: null,
        page: {current: 1, size: 15, total: 0},
        loading: {list: false}
      }
    },
    mounted () {
      // 查找所有工艺
      // this.showData()
      // 设置查询时间
      // this.getCurrentDate()
    },
    methods: {
      getCurrentDate () {
        this.search.endDateValue = new Date()
        this.search.startDateValue = new Date((new Date()).setHours(0, 0, 0, 0))
      },
      /** 选择开始时间，dtBaseEnd为开始时间加一天
       * */
      dtStartChange (value) {
        if (value) {
          this.dtBaseEnd = this.getMorningDate(value) + 8.64e7
          // this.search.endDateValue = Date.parse(value) + 8.64e7
        } else {
          this.dtBaseEnd = ''
        }
      },
      dtEndChange (value) {
        if (value) {
          this.dtBaseStart = this.getMorningDate(value) - 8.64e7
          // this.search.startDateValue = Date.parse(value) - 8.64e7
        } else {
          this.dtBaseStart = ''
        }
      },
      getMorningDate (date) {
        date = new Date(date)
        console.log(date)
        let year = date.getFullYear()
        let mon = date.getMonth() + 1
        let day = date.getDate()
        let dateMorning = Date.parse(`${year}/${mon}/${day}`)
        return dateMorning
      },
      searchClick () {
        this.page.current = 1
        this.getData()
      },
      // 选择工艺
      currentTechnologyselect (productionProcessId, silkCarNumber, groupId, index) {
        const loading = this.$loading({lock: true, text: 'Loading', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)'})
        const params = {proId: productionProcessId, silkCarNumber: silkCarNumber, groupId: groupId}
        api.automatic.statement.getSilkCarStatusHistoryInfo(params).then(response => {
          const data = response.data
          if (data.messageType === 1 && data.data) {
            this.tableData[index].silkInfoBoList = data.data.silkInfoBoList
            this.tableData[index].productionProcessTime = data.data.productionProcessTime
          } else {
            this.tableData[index].silkInfoBoList = []
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          loading.close()
        })
      },
      showData () {
        api.automatic.productionProcess.getAllProductProcessList({}).then(response => {
          const data = response.data
          this.technologyOptions = data.data
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          this.loading.list = false
        })
      },
      getData () {
        console.log(this.search)
        if (!this.search.carCode.trim()) {
          this.$message({type: 'warning', message: '请输入丝车号'})
          return
        }
        if (!Date.parse(this.search.startDateValue)) {
          this.$message({type: 'warning', message: '请选择开始日期'})
          return
        }
        if (!Date.parse(this.search.endDateValue)) {
          this.$message({type: 'warning', message: '请选择结束日期'})
          return
        }
        if (this.search.endDateValue.getTime() - this.search.startDateValue.getTime() < 0) {
          this.$message({type: 'warning', message: '开始日期必须小于结束日期'})
          return
        }
        if (this.search.endDateValue.getTime() - this.search.startDateValue.getTime() > 3 * 8.64e7) {
          this.$message({type: 'warning', message: '时间范围必须在三天之内'})
          return
        }

        let listLoading = this.$loading({
          lock: true,
          text: '数据量大，请耐心等待...',
          spinner: 'el-icon-loading'
        })
        let params = {
          pageIndex: this.page.current,
          pageCount: this.page.size,
          silkCarNumber: this.search.carCode,
          productionProcessEndDate: this.search.endDateValue ? this.search.endDateValue.getTime() : '',
          productionProcessStartDate: this.search.startDateValue ? this.search.startDateValue.getTime() : ''
        }
        api.automatic.statement.getSilkCarStatusHistoryInfoList(params).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            // this.page.total = data.data.count
            this.tableData = data.data
          }
        }).catch(e => {
          console.log(e)
        }).finally(() => {
          listLoading.close()
        })
      },
      detailClick (nowItem) {
        this.$refs.waitDialog.show(nowItem, this.tableData)
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
<style lang="scss" scoped>
.no-data {
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #666;
}
.font-bold {
  font-weight: bold;
}
.all-wrapper {
  padding: 10px;
  margin: 10px;
  background-color: #fff;
  border-radius: 3px;
}
.action-bar {
  padding-bottom: 10px;
  .el-input {
    width: 250px;
    display: inline-block;
    margin-right: 10px;
  }
  .el-date-editor.el-input {
    width: 190px;
  }
}
.list-item {
  border-top: 1px solid #d9dfe5;
  border-left: 1px solid #d9dfe5;
  margin-bottom: 10px;
  position: relative;
}
.line {
  display: flex;
}
.line2-item1 {
  flex: 9;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #eef2f6;
  border-bottom: 1px solid #d9dfe5;
  border-right: 1px solid #d9dfe5;
}
.line2-item2 {
  flex: 87;
  display: flex;
  padding: 5px;
  border-bottom: 1px solid #d9dfe5;
  border-right: 1px solid #d9dfe5;
}
.dye-box {
  flex: 80;
  overflow: hidden;
  border-top: 1px solid #d9dfe5;
  border-left: 1px solid #d9dfe5;
}
.dye-item {
  width: 8.3333%;
  float: left;
}
.daye-itme-index {
  text-align: center;
  border-bottom: 1px solid #d9dfe5;
  border-right: 1px solid #d9dfe5;
}
.daye-itme-info {
  height: 38px;
  text-align: center;
  border-bottom: 1px solid #d9dfe5;
  border-right: 1px solid #d9dfe5;
  padding: 6px;
}
.daye-itme-info-btn {
  border-radius: 3px;
  border: 1px solid #d2d6de;
  height: 24px;
  background-color: #d9dfe5;
  line-height: 24px;
  &.hand {
    cursor: pointer;
  }
  &.red {
    background-color: #ff4949;
    border-color: #ff4949;
  }
}
.submit-box {
  flex: 5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.line1-item {
  flex: 9;
  height: 42px;
  line-height: 42px;
  background-color: #eef2f6;
  border-bottom: 1px solid #d9dfe5;
  border-right: 1px solid #d9dfe5;
  text-align: right;
}
.line1-item2 {
  flex: 15;
  height: 42px;
  line-height: 42px;
  text-indent: 10px;
  border-bottom: 1px solid #d9dfe5;
  border-right: 1px solid #d9dfe5;
}
</style>
