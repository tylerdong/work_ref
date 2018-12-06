<!--组件名-->
<template>
  <div class="all-wrapper">
    <el-form :inline="true">
      <el-form-item>
        <el-checkbox class="all-checkbox" v-model="allSelected" @change="changeAll">全选</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-select v-model="search.workshop" :loading="loading.workshopLoading" clearable placeholder="请选择车间">
          <el-option v-for="item in options.workshopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入织袜工号" v-model="search.employeeNumber"></el-input>
      </el-form-item>
      <el-form-item>
        <el-tooltip effect="dark" content="请输入丝车条码后六位" placement="top">
          <el-input placeholder="请输入丝车号" v-model="search.carCode" v-popover:popover></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item>
        <el-select clearable v-model="search.lineId" placeholder="线别">
          <el-option v-for="item in options.lineId" :key="item.id" :label="item.line" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
      <el-select clearable v-model="search.hosieryType" placeholder="织袜类型">
        <el-option v-for="item in options.hosieryType" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="search.startTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择开始时间"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="search.endTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择结束时间"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchClick" type="primary" icon="el-icon-search"></el-button>
      </el-form-item>
      <el-form-item>
        <el-button class="fr" @click="batchSubmit" type="primary" :loading="loading.batchSubmit">批量提交</el-button>
      </el-form-item>
    </el-form>
    <!--<el-progress v-if="loadingShow" :percentage="loadingPrecent"></el-progress>-->
    <div class="main-wrappper" v-loading="loading.list">
      <ul>
        <li class="no-data" v-show="!tableData.length">暂无数据</li>
        <li class="list-item" v-for="item in tableData">
          <div class="item-wrapper">
            <el-checkbox class="item-checkbox" @change="changeItem(item)" v-model="item.isSelected"></el-checkbox>
            <!--每条记录拆出一个组件性能优化-->
            <wait-item @submitSuccess="getData" @openDialog="openDialog" :tableData="tableData" :item="item"></wait-item>
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
    <wait-dialog ref="waitDialog"></wait-dialog>
  </div>
</template>
<script>
  import * as api from 'api/index'
  import storage from 'storage'
  export default {
    components: {
      'wait-dialog': require('./wait-dialog.vue'),
      'wait-item': require('./wait-item.vue')
    },
    data () {
      return {
        // loadingShow: false,
        loadingInterval: null,
        loadingPrecent: 0,
        search: {
          carCode: '',
          workshop: '',
          employeeNumber: '',
          lineId: '',
          hosieryType: '',
          startTime: '',
          endTime: ''
        },
        options: {
          lineId: [],
          hosieryType: [
            { label: '正常抽样', value: '1' },
            { label: '位与锭交叉', value: '2' },
            { label: '位与位交叉', value: '3' }
          ],
          workshopList: []
        },
        tableData: [],
        page: {
          current: 1,
          size: 15,
          total: 0
        },
        loading: {
          list: false,
          workshopLoading: false,
          batchSubmit: false
        },
        allSelected: false
      }
    },
    mounted () {
      let start = new Date()
      start.setHours(0)
      start.setMinutes(0)
      this.search.startTime = start
      this.search.endTime = new Date()
      this.getData()
      this.getProductLine()
      this.getWorkshopList()
    },
    methods: {
      getProductLine () {
        this.loading.workshopLoading = true
        api.automatic.productPlan.getAllLine({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.lineId = data.data
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).finally(() => {
          this.loading.workshopLoading = false
        })
      },
      getWorkshopList () { // 车间
        this.loading.workshopLoading = true
        api.automatic.dictionary.getAllWorkshopList({}).then(response => {
          const data = response.data
          if (data.messageType === 1) {
            this.options.workshopList = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.workshopLoading = false
        })
      },
      openDialog (nowItem, type, isAllCar, isMulti) {
        this.$refs.waitDialog.show(nowItem, type, isAllCar, isMulti)
      },
      batchSubmit () {
        let haveCheck = false
        for (let item of this.tableData) {
          if (item.isSelected) {
            haveCheck = true
          }
        }
        if (!haveCheck) {
          this.$message('请选择要提交的丝车')
          return
        }
        console.log(this.tableData)
        this.$confirm('是否确认批量提交?', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          /* --------------------进度加载---------------- */
          this.loading.batchSubmit = true
          // this.loadingShow = true
          // this.loadingPrecent = 0
          // this.loadingInterval = setInterval(() => {
          //   if (this.loadingPrecent < 100) {
          //     this.loadingPrecent += parseInt(Math.random() * 10)
          //   } else {
          //     this.loadingPrecent = 0
          //   }
          // }, 500)
          /* ------------------------------------ */
          let sentenceCarList = []
          // instance.confirmButtonLoading = true
          for (let item of this.tableData) {
            if (item.isSelected) {
              let params = JSON.parse(JSON.stringify(item))
              for (let item of params.silkInfoBoList) {
                let item2 = item.silkExceptionRecordBoList
                for (let i in item2) {
                  if (i === '0') {
                    item2[i].type = 5
                  } else {
                    item2[i].type = 7
                  }
                }
              }
              params.employeeId = storage.getUser().employeeId
              params.productionProcessId = storage.getUser().productionProcessId
              console.log(params)
              sentenceCarList.push(params)
            }
          }
          let params = {sentenceCarList}
          params.employeeId = storage.getUser().employeeId
          params.productionProcessId = storage.getUser().productionProcessId
          console.log(params)
          api.automatic.productionProcess.commitSentenceProcessList(params).then((response) => {
            const data = response.data
            if (data.messageType === 1) {
              this.getData()
            }
          }).finally(() => {
            /* --------------------进度结束---------------- */
            this.loading.batchSubmit = false
            // this.loadingShow = false
            // clearInterval(this.loadingInterval)
            /* ------------------------------------ */
          })
        })
      },
      searchClick () {
        this.page.current = 1
        this.getData()
      },
      getData () {
        this.tableData = []
        this.loading.list = true
        this.allSelected = false
        let params = {
          pageIndex: this.page.current,
          pageCount: this.page.size,
          startTime: this.myTimeFormat(this.search.startTime),
          endTime: this.myTimeFormat(this.search.endTime),
          silkcarNumber: this.search.carCode,
          employeeNumber: this.search.employeeNumber,
          lineId: this.search.lineId,
          hosieryType: this.search.hosieryType,
          productionProcessId: storage.getUser().productionProcessId,
          workshopId: this.search.workshop
        }
        console.log(params)
        /* if (this.search.dateValue) {
          params.date = params.date.getTime()
        } */
        api.automatic.productionProcess.getToSentenceProcessSilkCarList(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.page.total = data.data.count
            for (let item of data.data.list) {
              item.isSelected = false
              let result = ''
              switch (item.hosieryType) {
                case '1':
                  result = '正常抽样'
                  break
                case '2':
                  result = '位与锭交叉'
                  break
                case '3':
                  result = '位与位交叉'
                  break
              }
              for (let item2 of item.silkInfoBoList) {
                item2.dyeCheck = false
                item2.silkExceptionRecordBoList.push({
                  sentenceLevelName: '',
                  sentenceLevelId: '',
                  level: '',
                  remark: '',
                  gradeId: '',
                  gradeName: '',
                  downReasonId: '',
                  sentenceType: '',
                  abnormalFlag: ''
                })
              }
              item.hosieryType = result
            }
            this.allSelected = false
            this.tableData = data.data.list
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.list = false
        })
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
      },
      changeAll () {
        for (let item of this.tableData) {
          item.isSelected = this.allSelected
        }
      },
      changeItem (item) {
        for (let temp of this.tableData) {
          if (temp.isSelected !== item.isSelected) {
            this.allSelected = false
            return
          }
        }
        this.allSelected = item.isSelected
      },
      myTimeFormat (time) {
        if (time) {
          let year = time.getFullYear()
          let month = time.getMonth() + 1
          month = month < 10 ? '0' + month : '' + month
          let date = time.getDate()
          date = date < 10 ? '0' + date : '' + date
          let hour = time.getHours()
          hour = hour < 10 ? '0' + hour : '' + hour
          let minute = time.getMinutes()
          minute = minute < 10 ? '0' + minute : '' + minute
          return year + '-' + month + '-' + date + 'T' + hour + ':' + minute
        }
        return ''
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
  .all-wrapper{
    padding: 10px;
  }
  .action-bar{
    padding-bottom: 10px;
    .el-input{
      width: 200px;
      display: inline-block;
      margin-right: 10px;
    }
  }
  .list-item{
    border-top: 1px solid #d9dfe5;
    border-left: 1px solid #d9dfe5;
    margin-bottom: 10px;
    position: relative;
  }
  .all-checkbox {
    margin: 5px;
  }
  .item-wrapper {
    display: flex;
    align-items: center;
  }
  .item-checkbox {
    margin: 5px;
  }
</style>
