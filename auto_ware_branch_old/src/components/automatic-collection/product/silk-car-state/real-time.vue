<!--组件名-->
<template>
  <div>
    <!--<main-breadcrumb nameId="020509"></main-breadcrumb>-->
    <div class="all-wrapper">
      <div class="action-bar">
        <el-input @keyup.enter="searchClick" placeholder="请输入丝车号" v-model="search.carCode"></el-input>
        <!--<el-date-picker v-model="search.startDateValue" type="date" :picker-options="pickerOptions0" @keyup.enter="searchClick"-->
          <!--@change="dtStartChange" placeholder="请选择开始日期"></el-date-picker>-->
        <!--<el-date-picker v-model="search.endDateValue" type="date" :picker-options="pickerOptions1" @keyup.enter="searchClick"-->
          <!--@change="dtEndChange" placeholder="请选择结束日期"></el-date-picker>-->
        <el-button @click="searchClick" type="primary" icon="el-icon-search"></el-button>
      </div>
      <div class="main-wrappper">
        <ul v-loading="loading.list">
          <li class="no-data" v-show="!tableData.length">暂无数据</li>
          <li class="list-item"
              v-for="item in tableData">
            <div class="line">
              <div class="line1-item">丝车号：</div>
              <div class="line1-item2 font-bold">{{item.silkCarNumber}}</div>
              <div class="line1-item">完成工艺：</div>
              <div class="line1-item2">{{item.productionProcessName}}</div>
              <div class="line1-item">完成时间：</div>
              <div class="line1-item2">{{item.productionProcessTime | timeFormat('YYYY-MM-DD HH:mm:ss')}}</div>
            </div>
            <div class="line">
              <div class="line2-item1">丝位：</div>
              <div class="line2-item2">
                <div class="dye-box">
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
      <detail-dialog ref="waitDialog"></detail-dialog>
    </div>
  </div>
</template>
<script>
  import * as api from 'api/index'
  export default {
    components: {
      'detail-dialog': require('./detail-dialog.vue')
      // 'main-breadcrumb': require('../../../common/breadcrumb.vue')
    },
    data () {
      return {
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
        search: {
          carCode: '',
          startDateValue: '',
          endDateValue: ''
        },
        tableData: [],
        nowItem: null,
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
    },
    methods: {
      searchClick () {
        this.page.current = 1
        this.getData()
      },
      getData () {
        this.loading.list = true
        let params = {
          pageIndex: this.page.current,
          pageCount: this.page.size,
          productionProcessStartDate: this.search.startDateValue,
          productionProcessEndDate: this.search.endDateValue,
          silkCarNumber: this.search.carCode
        }
        if (this.search.startDateValue) {
          params.productionProcessStartDate = params.productionProcessStartDate.getTime()
        }
        if (this.search.endDateValue) {
          params.productionProcessEndDate = params.productionProcessEndDate.getTime()
        }
        api.automatic.statement.getSilkCarStatusInfoList(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data)
            this.page.total = data.data.count
            this.tableData = data.data.list
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.list = false
        })
      },
      detailClick (nowItem) {
        this.$refs.waitDialog.show(nowItem, undefined)
      },
      dtStartChange (value) {
        if (value) {
          this.dtBaseEnd = this.search.startDateValue.getTime() + 8.64e7
        } else {
          this.dtBaseEnd = ''
        }
      },
      dtEndChange (value) {
        if (value) {
          this.dtBaseStart = this.search.endDateValue.getTime() - 8.64e7
        } else {
          this.dtBaseStart = ''
        }
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
  .no-data{
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #666;
  }
  .font-bold{
    font-weight: bold;
  }
  .all-wrapper{
    padding: 10px;
    margin: 10px;
    background-color: #fff;
    border-radius: 3px;
  }
  .action-bar{
    padding-bottom: 10px;
    .el-input{
      width: 250px;
      display: inline-block;
      margin-right: 10px;
    }
    .el-date-editor.el-input {
      width: 190px;
    }
  }
  .list-item{
    border-top: 1px solid #d9dfe5;
    border-left: 1px solid #d9dfe5;
    margin-bottom: 10px;
    position: relative;
  }
  .line{
    display: flex;
  }
  .line2-item1{
    flex: 9;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: #eef2f6;
    border-bottom: 1px solid #d9dfe5;
    border-right: 1px solid #d9dfe5;
  }
  .line2-item2{
    flex: 87;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #d9dfe5;
    border-right: 1px solid #d9dfe5;
  }
  .dye-box{
    flex: 80;
    overflow: hidden;
    border-top: 1px solid #d9dfe5;
    border-left: 1px solid #d9dfe5;
  }
  .dye-item{
    width: 8.3333%;
    float: left;
  }
  .daye-itme-index{
    text-align: center;
    border-bottom: 1px solid #d9dfe5;
    border-right: 1px solid #d9dfe5;
  }
  .daye-itme-info{
    height: 38px;
    text-align: center;
    border-bottom: 1px solid #d9dfe5;
    border-right: 1px solid #d9dfe5;
    padding: 6px;
  }
  .daye-itme-info-btn{
    border-radius: 3px;
    border: 1px solid #d2d6de;
    height: 24px;
    background-color: #d9dfe5;
    line-height: 24px;
    &.hand{
      cursor: pointer;
    }
    &.red{
      background-color: #ff4949;
      border-color: #ff4949;
    }
  }
  .submit-box{
    flex: 5;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .line1-item{
    flex: 9;
    height: 42px;
    line-height: 42px;
    background-color: #eef2f6;
    border-bottom: 1px solid #d9dfe5;
    border-right: 1px solid #d9dfe5;
    text-align: right;
  }
  .line1-item2{
    flex: 15;
    height: 42px;
    line-height: 42px;
    text-indent: 10px;
    border-bottom: 1px solid #d9dfe5;
    border-right: 1px solid #d9dfe5;
  }
</style>
