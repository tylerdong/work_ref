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
    <el-progress v-if="loadingShow" :percentage="loadingPrecent"></el-progress>
    <div class="main-wrappper" v-loading="loading.list">
      <ul>
        <li class="no-data" v-show="!tableData.length">暂无数据</li>
        <li v-for="item in tableData">
          <table class="customized-table">
            <tr>
              <td :rowspan="2 + item.sentenceItemBos.length">
                <el-checkbox class="item-checkbox" @change="changeItem(item)" v-model="item.isSelected"></el-checkbox>
              </td>
              <th>丝车编码：</th><td class="font-bold">{{item.silkcarCode}}</td>
              <th>织袜时间：</th><td>{{item.hosieryDate | timeFormat('YYYY-MM-DD HH:mm')}}</td>
              <th>批次：</th><td>{{item.batchNo}}</td>
              <th>线别：</th><td>{{item.lineName}}</td>
            </tr>
            <tr>
              <th>班次：</th><td>{{item.className}}</td>
              <th>织袜员工：</th><td>{{item.hosieryPerson}}</td>
              <th>织袜类型：</th><td>{{item.sentenceItemBos[0].hosieryType | hosieryType}}</td>
              <th>落桶方式：</th><td>{{item.bindType | doffType}}</td>
            </tr>
            <tr v-for="(sentence, index) in item.sentenceItemBos">
              <th>
                <ul>
                  <li><span>染判</span></li>
                  <li>位号: {{sentence.item}}</li>
                  <li>落次: {{sentence.fallNo}}</li>
                </ul>
                <div class="carpool-div" v-if="item.hosieryCarpool && ['HOSIERY_PINCHE_2', 'HOSIERY_PINCHE_3'].includes(item.hosieryCarpool) && index === 0">
                  {{item.hosieryCarpool | operateType}}
                </div>
              </th>
              <td colspan="6">
                <wait-item :sentenceSilkInfoBos="sentence.sentenceSilkInfoBos" :hosieryType="item.hosieryType"
                           @openDialog="silgleDyeClick"></wait-item>
              </td>
              <td v-if="index === 0" :rowspan="item.sentenceItemBos.length">
                <ul class="ul-butgroup">
                  <li>
                    <el-button @click="dyeClick(item, 1, item.sentenceItemBos[0].hosieryType, false, true)" type="text">批量登记</el-button>
                  </li>
                  <li>
                    <el-button @click="dyeClick(item, 1, item.sentenceItemBos[0].hosieryType, true)" type="text">整车登记</el-button>
                  </li>
                  <li>
                    <el-button @click="submitClick(item)" type="text">提交</el-button>
                  </li>
                </ul>
              </td>
            </tr>
          </table>
        </li>
      </ul>
    </div>
    <div class="hy-admin__pagination-wrapper cf">
      <el-pagination
        class="fr"
        :current-page="page.current"
        :page-sizes="[5]"
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
        loadingShow: false,
        loadingInterval: null,
        loadingPrecent: 0,
        userInfo: null,
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
          size: 5,
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
      this.userInfo = storage.getUser()
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
      // 批量提交
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
          this.loadingShow = true
          this.loadingPrecent = 0
          this.loadingInterval = setInterval(() => {
            if (this.loadingPrecent < 100) {
              this.loadingPrecent += parseInt(Math.random() * 10)
            } else {
              this.loadingPrecent = 0
            }
          }, 500)
          /* ------------------------------------ */
          let params = []
          for (let item of this.tableData) {
            if (item.isSelected) {
              item = Object.assign(item, { sentenceEmployeeId: this.userInfo.employeeId })
              params.push(item)
            }
          }
          api.automatic.productionProcess.commitSentenceProcess(params).then((response) => {
            const data = response.data
            if (data.messageType === 1) {
              this.getData()
            }
          }).finally(() => {
            /* --------------------进度结束---------------- */
            this.loading.batchSubmit = false
            this.loadingShow = false
            clearInterval(this.loadingInterval)
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
          startTime: this.search.startTime ? this.search.startTime.getTime() : '',
          endTime: this.search.endTime ? this.search.endTime.getTime() : '',
          silkcarNumber: this.search.carCode,
          employeeNumber: this.search.employeeNumber,
          lineId: this.search.lineId,
          hosieryType: this.search.hosieryType,
          productionProcessId: this.userInfo.productionProcessId,
          workshopId: this.search.workshop
        }
        api.automatic.productionProcess.getToSentenceProcessSilkCarList(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.page.total = data.data.count
            this.allSelected = false
            this.tableData = data.data.list
            this.tableData.forEach(data => {
              this.$set(data, 'isSelected', false)
              data.sentenceItemBos.forEach(sentence => {
                sentence.sentenceSilkInfoBos.forEach(silkInfo => {
                  if (!silkInfo.hasOwnProperty('level')) {
                    this.$set(silkInfo, 'dyeCheck', false)
                    this.$set(silkInfo, 'sentenceLevelId', '')
                    this.$set(silkInfo, 'sentenceStatus', '')
                    this.$set(silkInfo, 'sentenceType', '')
                    this.$set(silkInfo, 'level', '')
                    this.$set(silkInfo, 'silkGradId', '')
                    this.$set(silkInfo, 'silkGradeName', '')
                    this.$set(silkInfo, 'silkDownGradeId', '')
                    this.$set(silkInfo, 'silkDownGradeName', '')
                    this.$set(silkInfo, 'register', '')
                  }
                })
              })
            })
          } else {
            this.$message({type: 'error', message: data.message})
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.list = false
        })
      },
      // 单个降等
      silgleDyeClick (nowItem, index, type, isAllCar, isMulti) {
        let typeBoolean = false
        if (type === 'HOSIERY_PINCHE_2' || type === 'HOSIERY_PINCHE_3') {
          typeBoolean = true
        }
        if (index === 0 && typeBoolean) {
          return
        }
        this.openDialog(nowItem, typeBoolean, isAllCar, isMulti)
      },
      // 批量登记 & 整车登记
      dyeClick (nowItem, index, type, isAllCar, isMulti) {
        if (isMulti) {
          let dyeCheck = false
          for (let i = 0; i < nowItem.sentenceItemBos.length; i++) {
            for (let j = 0; j < nowItem.sentenceItemBos[i].sentenceSilkInfoBos.length; j++) {
              if (nowItem.sentenceItemBos[i].sentenceSilkInfoBos[j].dyeCheck) {
                dyeCheck = true
                break
              }
            }
            if (dyeCheck) break
          }
          if (!dyeCheck) {
            return this.$message({type: 'error', message: '请选择异常丝锭'})
          }
        }
        let typeBoolean = false
        if (type === 'HOSIERY_PINCHE_2' || type === 'HOSIERY_PINCHE_3') {
          typeBoolean = true
        }
        if (index === 0 && typeBoolean) {
          return
        }
        this.openDialog(nowItem, typeBoolean, isAllCar, isMulti)
      },
      submitClick (submitItem) {
        this.$confirm('是否确认提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              submitItem = Object.assign(submitItem, {sentenceEmployeeId: storage.getUser().employeeId})
              let param = [submitItem]
              api.automatic.productionProcess.commitSentenceProcess(param).then((response) => {
                const data = response.data
                if (data.messageType === 1) {
                  this.getData()
                  done()
                }
              }).finally(() => {
                instance.confirmButtonLoading = false
              })
            } else {
              done()
            }
          }
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
  .font-bold {
    font-weight: bold;
  }
  table {
    margin-bottom: 10px;
    tr {
      td:nth-child(1) {
        width: 80px;
      }
      th:first-child {
        width: 100px;
        position: relative;
      }
      td:last-child {
        width: 80px;
      }
    }
    td{
      padding: 8px 4px !important;
    }
    th {
      padding: 8px 0 !important;
    }
  }
  .all-checkbox {
    margin: 5px;
  }
  .item-checkbox {
    margin: 5px;
  }
  .ul-butgroup li {
    margin: 10px auto;
  }
  .carpool-div {
    position: absolute;
    text-align: center;
    color: #FFF;
    top: 18px;
    left: -22px;
    width: 100px;
    height: 0;
    border-width: 0 20px 20px 20px;
    border-style: none solid solid;
    border-color: transparent transparent red;
    transform: rotateZ(-45deg);
    font-size: 13px;
    font-weight: 400;
  }
</style>
