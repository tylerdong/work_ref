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
        <el-button @click="searchClick" type="primary" icon="el-icon-search" :loading="loading.list"></el-button>
      </el-form-item>
    </el-form>
    <div class="main-wrappper">
      <ul>
        <li class="no-data" v-show="!tableData.length">暂无数据</li>
        <li v-for="item in tableData" class="carpool-li">
          <table class="customized-table">
            <tr>
              <th>丝车编码：</th><td class="font-bold">{{item.silkcarCode}}</td>
              <th>染判时间：</th><td>{{item.sentenceDate | timeFormat('YYYY-MM-DD HH:mm')}}</td>
              <th>批次：</th><td>{{item.batchNo}}</td>
              <th>线别：</th><td>{{item.lineName}}</td>
            </tr>
            <tr>
              <th>班次：</th><td>{{item.className}}</td>
              <th>染判员工：</th><td>{{item.hosieryPerson}}</td>
              <th>织袜类型：</th>
              <td>{{item.sentenceItemBos[0].hosieryType | hosieryType}}</td>
              <th>落桶方式：</th><td>{{item.bindType | doffType}}</td>
            </tr>
            <tr v-for="(sentence, index) in item.sentenceItemBos">
              <th>
                <ul>
                  <li><span>染判</span></li>
                  <li>位号: {{sentence.item}}</li>
                  <li>落次: {{sentence.fallNo}}</li>
                </ul>
                <div v-if="item.hosieryCarpool && ['HOSIERY_PINCHE_2', 'HOSIERY_PINCHE_3'].includes(item.hosieryCarpool) && index === 0" class="carpool-div">
                  {{item.hosieryCarpool | operateType}}
                </div>
              </th>
              <td colspan="6">
                <wait-item :sentenceSilkInfoBos="sentence.sentenceSilkInfoBos" :hosieryType="item.sentenceItemBos[0].hosieryType"
                           @openDialog="dyeClick"></wait-item>
              </td>
              <td v-if="index === 0" :rowspan="item.sentenceItemBos.length">
                <el-button @click="submitClick(item)" type="text">提交</el-button>
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
      // 车间
      getWorkshopList () {
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
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.list = false
        })
      },
      dyeClick (nowItem) {
        this.nowItem = nowItem
        this.$refs.waitDialog.show(nowItem)
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
              submitItem = Object.assign(submitItem, { sentenceEmployeeId: this.userInfo.employeeId })
              let params = [submitItem]
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
    color: #ccdd00;
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
  .font-bold {
    font-weight: bold;
  }
  .all-wrapper{
    padding: 10px;
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
