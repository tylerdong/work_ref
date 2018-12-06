<!--组件名-->
<template>
  <div class="all-wrapper">
    <el-form :inline="true">
      <el-form-item>
        <el-select v-model="search.workshop" clearable placeholder="请选择车间" :loading="loading.workshopLoading">
          <el-option v-for="item in options.workshopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-tooltip effect="dark" content="请输入丝车条码后六位" placement="bottom">
          <el-input placeholder="请输入丝车号" v-model="search.carCode" v-popover:popover></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入纺位" v-model="search.item"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入落次" v-model="search.fallNo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-autocomplete class="inline-input" v-model="search.batchNo" :fetch-suggestions="querySearch" placeholder="请输入批号"></el-autocomplete>
      </el-form-item>
      <el-form-item>
        <el-select v-model="search.classesId" placeholder="请选择班次" clearable>
          <el-option v-for="item in options.classesListOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="search.dateValue" type="date" placeholder="请选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchClick" type="primary" icon="el-icon-search"></el-button>
      </el-form-item>
    </el-form>
    <div class="main-wrappper" v-loading="loading.list">
      <ul>
        <li class="no-data" v-show="!tableData.length">暂无数据</li>
        <li class="list-item"
            v-for="item in tableData">
          <div class="line">
            <div class="line1-item">丝车号</div>
            <div class="line1-item2 font-bold">{{item.silkCarNumber}}
              <span v-if="item.bindingSilkcarNumber"> * {{item.bindingSilkcarNumber}}</span>
            </div>
            <div class="line1-item">染判时间</div>
            <div class="line1-item2">{{item.time | timeFormat('YYYY-MM-DD HH:mm')}}</div>
          </div>
          <div class="line">
            <div class="line1-item">批号</div>
            <div class="line1-item2">{{item.productionPlanBatchName}}</div>
            <div class="line1-item">线别</div>
            <div class="line1-item2">{{item.productionPlanLineName}}</div>
            <div class="line1-item">位号</div>
            <div class="line1-item2">{{item.productionPlanItem}}
              <span v-if="item.bindingItem "> * {{item.bindingItem}}</span>
            </div>
            <div class="line1-item">染判工号</div>
            <div class="line1-item2">{{item.employeeNumber}}</div>
          </div>
          <div class="line">
            <div class="line1-item">班次</div>
            <div class="line1-item2">{{item.silkCodeClassesName}}</div>
            <div class="line1-item">落次</div>
            <div class="line1-item2">{{item.silkCodeFallNo}}
              <span v-if="item.bindingFallNo "> * {{item.bindingFallNo }}</span>
            </div>
            <div class="line1-item">织袜类型</div>
            <div :class="{green: item.hosieryType === '位与位交叉'}" class="line1-item2">{{item.hosieryType}}</div>
            <div class="line1-item">落筒方式</div>
            <div class="line1-item2">{{item.fallType}}</div>
          </div>
          <div class="line">
            <div class="line2-item1">染判</div>
            <div class="line2-item2">
              <div class="dye-box">
                <div class="dye-item" v-for="(item2, index) in item.silkInfoBoList">
                  <div class="daye-itme-index">{{item2.spindleNo ? item2.spindleNo : index + 1}}</div>
                  <div class="daye-itme-info" v-for="(item3, index3) in item2.silkExceptionRecordBoList">
                    <div
                      :class="{red: item3.downReasonId, hand: !(index3 === 0 && item2.silkExceptionRecordBoList.length > 1) && item.employeeId === userInfo.employeeId}"
                      class="daye-itme-info-btn" @click="dyeClick(Object.assign(item3, {silkCode: item2.silkCode}), index3, item.flowType, item.employeeId === userInfo.employeeId)">
                      <el-tooltip placement="top">
                        <div slot="content"><span v-if="item3.abnormalFlag">是否异常：{{item3.abnormalFlag | abnormalFlag}}<br/></span>染判类型：{{item3.sentenceType}}<br/><span v-if="item3.gradeName">丝锭等级：{{item3.gradeName}}<br/></span><span v-if="item3.downReasonName">降等原因：{{item3.downReasonName}}<br/></span>备注：{{item3.remark}}</div>
                        <div v-show="item3.level">
                          <span v-show="item3.sentenceLevelName">{{item3.sentenceLevelName.substring(0, 2)}}/</span>
                          <span :class="showColor(item3.level)">{{item3.level}}</span>
                        </div>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
              </div>
              <div class="submit-box">
                <el-button v-if="item.employeeId === userInfo.employeeId" @click="submitClick(item)" size="small" type="primary">提交</el-button>
              </div>
            </div>
          </div>
          <div v-if="item.flowType === '7'" class="tag">
            <span>2次</span>
          </div>
          <div v-if="item.flowType === '14'" class="tag">
            <span>3次</span>
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
      'wait-dialog': require('./wait-dialog.vue')
    },
    data () {
      return {
        userInfo: null,
        options: {
          workshopList: [],
          batchNoOptions: [],
          classesListOptions: []
        },
        search: {
          workshop: '',
          carCode: '',
          batchNo: '',
          item: '',
          fallNo: '',
          classesId: '',
          dateValue: ''
        },
        tableData: [],
        nowItem: null,
        page: {
          current: 1,
          size: 15,
          total: 0
        },
        loading: {
          list: false,
          workshopLoading: false
        }
      }
    },
    filters: {
      abnormalFlag: (val) => {
        if (val) {
          if (val === '1') {
            return '异常'
          }
          return '正常'
        }
        return ''
      }
    },
    mounted () {
      this.getData()
      this.userInfo = storage.getUser()
      this.getAllBatchList()
      this.getAllClassesList()
      this.getWorkshopList()
    },
    methods: {
      showColor (value) {
        if (value === 'F') {
          return 'color-f'
        }
        if (value === 'D') {
          return 'color-d'
        }
        if (value === 'L') {
          return 'color-l'
        }
        return 'color-of'
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
      getAllClassesList () {
        api.automatic.dictionary.getAllClassesList({}).then(response => {
          if (response.data.messageType === 1) {
            this.options.classesListOptions = response.data.data
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
        })
      },
      getAllBatchList () {
        api.automatic.dictionary.getAllBatchList({}).then(response => {
          if (response.data.messageType === 1) {
            for (let item of response.data.data) {
              item.value = item.batchNo
              this.options.batchNoOptions.push(item)
            }
          }
        }).catch(e => {
          console.error(e)
        }).finally(() => {
        })
      },
      querySearch (queryString, cb) {
        if (queryString) {
          let result = this.options.batchNoOptions.filter(item => {
            if (item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1) {
              return true
            } else {
              return false
            }
          })
          cb(result)
        } else {
          cb(this.options.batchNoOptions)
        }
      },
      searchClick () {
        this.page.current = 1
        this.getData()
      },
      getData () {
        this.loading.list = true
        let params = {
          pageIndex: this.page.current,
          pageCount: this.page.size,
          date: this.search.dateValue ? this.search.dateValue.getTime() : '',
          item: this.search.item,
          batchNo: this.search.batchNo,
          classesId: this.search.classesId,
          fallNo: this.search.fallNo,
          silkcarNumber: this.search.carCode,
          productionProcessId: storage.getUser().productionProcessId,
          workshopId: this.search.workshop
        }
        console.log(params)
        api.automatic.productionProcess.getSentencedProcessSilkCarList(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data)
            this.page.total = data.data.count
            for (let item of data.data.list) {
              item.silkInfoBoList = JSON.parse(item.silkInfoBoListJson)
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
              item.hosieryType = result
            }
            this.tableData = data.data.list
            console.log(this.tableData)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.list = false
        })
      },
      dyeClick (nowItem, index, type, canAction) {
        let typeBoolean = false
        if (type === '7' || type === '14') {
          typeBoolean = true
        }
        this.nowItem = nowItem
        if ((index === 0 && typeBoolean) || !canAction) {
          return
        }
        this.$refs.waitDialog.show(nowItem, typeBoolean)
      },
      submitClick (submitItem) {
        console.log(submitItem)
        this.$confirm('是否确认提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              let params = JSON.parse(JSON.stringify(submitItem))
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
              api.automatic.productionProcess.commitSentenceProcess(params).then((response) => {
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
      }
    }
  }
</script>
<style lang="scss" scoped>
  .color-f{
    color: #4dc1f1;
  }
  .color-d{
    color: #ccd00;
  }
  .color-l{
    color: #faa107;
  }
  .color-of{
    color: #ff0000;
  }
  .green{
    color: green;
  }
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
  }
  .action-bar{
    padding-bottom: 10px;
    .el-input, .el-select{
      width: 250px;
      display: inline-block;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
  .list-item{
    border-top: 1px solid #d9dfe5;
    border-left: 1px solid #d9dfe5;
    margin-bottom: 10px;
    position: relative;
  }
  .tag{
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    color: #fff;
    border: 15px solid #ff0000;
    border-bottom-color: transparent;
    border-right-color: transparent;
    span{
      width: 24px;
      display: block;
      font-size: 12px;
      margin-left: -15px;
      margin-top: -15px;
      transform: rotateZ(-45deg);
    }
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
    text-align: center;
    border-bottom: 1px solid #d9dfe5;
    border-right: 1px solid #d9dfe5;
    padding: 6px;
  }
  .daye-itme-info-btn{
    border-radius: 3px;
    border: 1px solid #d2d6de;
    height: 24px;
    line-height: 24px;
    &.hand{
      cursor: pointer;
    }
    &.red{
      border-color: #FF4949;
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
