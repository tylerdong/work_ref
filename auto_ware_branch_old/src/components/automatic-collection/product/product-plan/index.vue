<!--生产计划-->
<template>
  <div>
    <!--<main-breadcrumb nameId="020501"></main-breadcrumb>-->
    <div class="hy-admin__main-container">
      <div class="hy-admin__search-main cf">
        <el-select v-model="picker.workshopId" @change="changeWorkshop" placeholder="请选择车间"
                   class="margin-contral-picker" clearable>
          <el-option v-for="item in workshopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-select v-model="picker.lineId" placeholder="请选择线别" class="margin-contral-picker" clearable>
          <el-option v-for="item in lineList" :key="item.id" :label="item.line" :value="item.id"></el-option>
        </el-select>
        <el-autocomplete class="inline-input" v-model="picker.batchNo" :fetch-suggestions="querySearch"
                         placeholder="请输入批号" @select="handleSelect"></el-autocomplete>
        <el-date-picker v-model="picker.createTime" type="date" placeholder="选择日期"
                        @change="changePicker"></el-date-picker>
        <el-button type="primary" @click="getData" :loading="loading">查询</el-button>
        <div class="fr">
          <el-button type="primary" @click="chooseFun('add')">新增</el-button>
        </div>
      </div>

      <ul v-loading="loading" class="product-plan-wrapper">
        <li v-if="!tableData.length" class="tc">暂无数据</li>
        <li v-for="item in tableData">
          <div class="text">
            <div class="fixation">
              <h4>[{{ item.type === '1' ? '改批' : '样品' }}]<span> {{item.line}}-{{item.batchNo}}</span></h4>
              <p class="fixation-box">
                <span class="note">规格：</span>{{ item.centralValue }}dtex/{{ item.holeNum }}f
                <span class="space">|</span>
                <span class="note">位号：</span>{{ item.itemStart }}-{{ item.itemEnd }}#
                <span class="space">|</span>
                <span class="note">管色：</span>{{ item.paperTubeColor }}
              </p>
              <p>
                <span class="note">车间：</span>{{ item.workshopName }}
                <span class="space">|</span>
                <span v-if="item.endTimeFilter" class="note">起止日期：</span>
                <span v-else="item.endTimeFilter" class="note">开始日期：</span>
                {{ item.startTimeFilter }}<span v-if="item.endTimeFilter"> —— {{item.endTimeFilter}}</span>
              </p>
            </div>

            <div class="inner num-box">
              <p class="tc"><span class="note">计划产量</span></p>
              <p class="tc"><span class="red">{{item.num}}</span>吨/位.天</p>
            </div>

            <div class="inner">
              <p class="tc"><span class="note">锭重</span></p>
              <p class="tc"><span class="red">{{item.weight}}</span>kg</p>
            </div>

            <div class="tr">
              <!--<div class="btn-box tr">-->
              <!--<el-button-->
              <!--@click.native.prevent="btnDetail(item)"-->
              <!--size="small">-->
              <!--查看-->
              <!--</el-button>-->

              <el-button @click.native.prevent="chooseFun('edit', item)" type="primary" size="small"
                         :disabled="item.status!=='1'">修改
              </el-button>
              <!--<el-button-->
              <!--@click.native.prevent="executePlan(item)"-->
              <!--type="success"-->
              <!--size="small" :disabled="item.status==='3'">-->
              <!--{{ item.status==='1'?'执行':item.status==='2'?'完成':'已完成' }}-->
              <!--</el-button>-->
            </div>
          </div>
        </li>
      </ul>

      <div class="hy-admin__pagination-wrapper">
        <el-pagination
          class="fr"
          :current-page="page.currentPage"
          :page-sizes="[20, 30, 40, 50]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
      <D_dialog ref="refDialog" @callback="callback" :workshopList="workshopList"></D_dialog>
      <D_detail ref="refDetail" @callback="callback"></D_detail>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import vue from 'vue'
  import * as api from '../../../../api/index'

  export default {
    components: {
      'D_dialog': require('./dialog.vue'),
      // 'main-breadcrumb': require('../../../common/breadcrumb.vue'),
      'D_detail': require('./dialog-detail.vue')
    },
    data () {
      return {
        restaurants: [],
        lineList: [],
        workshopList: [],
        picker: {
          workshopId: '',
          lineId: '',
          batchNo: '',
          createTime: ''
        },
        tableData: [],
        page: {
          currentPage: 1,
          total: 20,
          pageSize: 20
        },
        loading: false
      }
    },
    mounted () {
      this.getData()
      this.getWorkshopList()
      this.getAllBatchList()
    },
    methods: {
      changePicker (value) {
        this.picker.createTime = value
      },
      /* 搜索建议 规格 */
      querySearch (queryString, cb) {
        if (queryString) {
          let result = this.restaurants.filter(item => {
            if (item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1) {
              return true
            } else {
              return false
            }
          })
          cb(result)
        } else {
          cb(this.restaurants)
        }
      },
      handleSelect (item) {
      },
      getData () {
        this.loading = true
        let params = {
          pageIndex: this.page.currentPage,
          pageCount: this.page.pageSize,
          workshopId: this.picker.workshopId,
          lineId: this.picker.lineId,
          batchNo: this.picker.batchNo,
          createTime: this.picker.createTime
        }
        var myFilter = vue.filter('timeFormat')
        api.automatic.productPlan.getPlan(params).then(response => {
          this.tableData.splice(0, this.tableData.length)
          for (let item of response.data.data.list) {
            if (item.startTime) {
              item.startTimeFilter = myFilter(item.startTime, 'YYYY-MM-DD')
            } else {
              item.startTimeFilter = ''
            }
            if (item.endTime) {
              item.endTimeFilter = myFilter(item.endTime, 'YYYY-MM-DD')
            } else {
              item.endTimeFilter = ''
            }
            this.tableData.push(item)
          }
          this.page.total = response.data.data.count
        }).catch(e => {
          console.error(e)
        }).finally(() => {
          this.loading = false
        })
      },
      getAllBatchList () {
        let params = {}
        api.automatic.dictionary.getAllBatchList(params).then(response => {
          for (let item of response.data.data) {
            item.value = item.batchNo
            this.restaurants.push(item)
          }
        }).catch(e => {
          console.error(e)
        })
      },
      getLineList () {
        if (!this.picker.workshopId) {
          this.lineList = []
          return
        }
        let params = {
          workShopId: this.picker.workshopId
        }
        api.automatic.productPlan.getAllLine(params).then(response => {
          this.lineList = response.data.data
        })
      },
      changeWorkshop () {
        this.getLineList()
        this.picker.lineId = ''
      },
      getWorkshopList () {
        api.automatic.dictionary.getAllWorkshopList({}).then(response => {
          this.workshopList = response.data.data
        })
      },
      handleSizeChange (val) {
        this.page.pageSize = val
        this.getData()
      },
      handleCurrentChange (val) {
        this.page.currentPage = val
        this.getData()
      },
      chooseFun (type, item) {
        console.log('this.restaurants')
        console.log(this.restaurants)
        if (type === 'add') {
          this.$refs.refDialog.$refs.newInfo.resetFields()
          this.$refs.refDialog.toggle({
            title: '新增',
            id: '',
            type: '',
            lineId: '',
            line: '',
            batchId: '',
            restaurants: this.restaurants,
            batchNo: '',
            centralValue: '',
            itemStart: '',
            itemEnd: '',
            paperTubeId: '',
            paperTubeColor: '',
            startTime: '',
            endTime: '',
            weightId: '',
            workshopId: '',
            num: '',
            status: '',
            disabled: false,
            dialogFormVisible: true
          })
        } else if (type === 'edit') {
          let endTimeDate = ''
          if (item.endTimeFilter) {
            endTimeDate = new Date(item.endTimeFilter)
          }
          this.$refs.refDialog.toggle({
            title: '修改',
            id: item.id,
            type: item.type,
            lineId: item.lineId,
            line: item.line,
            batchId: item.batchId,
            restaurants: this.restaurants,
            batchNo: item.batchNo,
            centralValue: item.centralValue,
            holeNum: item.holeNum,
            itemStart: item.itemStart,
            itemEnd: item.itemEnd,
            paperTubeColor: item.paperTubeColor,
            startTime: new Date(item.startTimeFilter),
            endTime: endTimeDate,
            num: item.num,
            weightId: item.weightId,
            workshopId: item.workshopId,
            weight: item.weight,
            disabled: false,
            dialogFormVisible: true
          })
        }
      },
      executePlan (item) {
        let params = {
          productionPlanId: item.id
        }
        api.automatic.productPlan.executePlan(params).then(response => {
          if (response.data.messageType === 1) {
            this.$message({
              type: 'success',
              message: response.data.message
            })
            this.getData()
            return true
          }
          if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
            return true
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
        })
      },
      btnDetail (item) {
        this.$refs.refDetail.show(item)
      },
      callback () {
        this.getData()
      }
    }
  }
</script>
<style scoped lang="scss">
  .hy-admin__main-container {
    margin: 10px;
    background: #fff;
  }

  .hy-admin__search-main {
    .margin-contral-picker {
      margin-bottom: 10px
    }
  }

  .product-plan-wrapper {
    li {
      padding: 20px 10px 10px 10px;
      border-bottom: 1px dashed #dee4ec;
      .text {
        display: flex
      }
      .fixation {
        flex: 0 0 450px;
      }
      .fixation-box {
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: normal;
        white-space: nowrap;
        width: 450px;
      }
      .fixation-jz {
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: normal;
        white-space: nowrap;
        min-width: 100px;
      }
      .time {
        min-width: 185px
      }
      .inner {
        flex: 1;
        min-width: 60px;
      }
      .btn-box {
        min-width: 170px;
      }
      .num-box {
        min-width: 120px;
      }
      .mini {
        font-size: 13px;
      }
      .user {
        color: #000;
        font-size: 15px;
      }
      .space {
        font-size: 16px;
        color: #99a9bf;
        margin-left: 10px;
        margin-right: 10px;
      }
      .red {
        color: #f50000;
        font-size: 18px;
        font-weight: bold;
        margin-right: 5px;
        font-family: 'Arial Bold';
      }

      .person {
        font-size: 16px;
      }

      h4 {
        margin: 0 0 10px;
        font-size: 16px;
        font-weight: bold;
        span {
          font-weight: normal;
          margin-left: 5px;
        }
      }
      .note {
        font-size: 13px;
        color: #99a9bf;
      }
      .notebg {
        color: #99a9bf;
        font-size: 18px;
      }
      .font1 {
        font-size: 16px;
        color: #000;
      }
    }
  }
</style>

