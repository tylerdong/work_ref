<!--物检操作-->
<template>
  <div class="hy-admin__main-container all-wrapper">
    <div class="action-bar">
      <el-input v-model="search.silkNum" placeholder="请输入丝车编码"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchClick"></el-button>
    </div>
    <div class="main-wrappper">
      <ul v-loading="loading.list">
        <li v-if="!tableData.length" class="tc no-data">{{noDataLabel}}</li>
        <li class="list-item"
            v-for="item in tableData">
          <div class="line">
            <div class="line1-item">车间：</div>
            <div class="line1-item2 font-bold">{{item.workshopName}}</div>
            <div class="line1-item">线别：</div>
            <div class="line1-item2">{{item.lineName}}</div>
            <div class="line1-item">规格：</div>
            <div class="line1-item2">{{item.spec}}</div>
          </div>
          <div class="line">
            <div class="line1-item">落次：</div>
            <div class="line1-item2">{{item.fallNo}}</div>
            <div class="line1-item">纺位：</div>
            <div class="line1-item2">{{item.item}}</div>
            <div class="line1-item">丝车编号：</div>
            <div class="line1-item2">{{item.silkcarCode}}</div>
          </div>
          <div class="line">
            <div class="line1-item line1-item3">备注：</div>
            <div class="line1-item2 line1-item4">{{item.remark}}</div>
          </div>
          <div class="line">
            <div class="line2-item1">物检：</div>
            <div class="line2-item2">
              <div class="dye-box">
                <div class="dye-item" v-for="item2 in item.spindles">
                  <div class="daye-itme-index">{{item2.spindleNo}}</div>
                  <div class="daye-itme-info">
                    <div class="daye-itme-info-btn hand" @click="silkClick(item2, false)">
                      {{item2.spindleLevelName}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="submit-box">
                <el-button @click="silkClick(item, true)" size="small" type="primary">整车登记</el-button>
                <br/>
                <el-button @click="submitClick(item)" :loading="loading.submit" size="small" type="primary">提交</el-button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <dialog-check ref="dialog" :spindleLevelOptions="spindleLevelOptions"></dialog-check>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import storage from 'src/module/storage'
  export default {
    components: {
      'dialog-check': require('./dialog-check.vue')
    },
    data () {
      return {
        noDataLabel: '请输入丝车编码查询',
        spindleLevelOptions: [],
        workTypeDetail: null,
        search: {
          silkNum: ''
        },
        tableData: [],
        loading: {
          list: false,
          submit: false
        }
      }
    },
    mounted () {
      this.getWorkTypeDetail()
      this.getSpindleLevelOptions()
    },
    methods: {
      getSpindleLevelOptions () {
        this.loading.spindleLevel = true
        api.automatic.dictionary.getAllSilkGradeList({}).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data)
            this.spindleLevelOptions = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.spindleLevel = false
        })
      },
      getWorkTypeDetail () {
        let params = {
          workTypeId: storage.getUser().workTypeId
        }
        api.userCenter.getWorkTypeById(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            this.workTypeDetail = data.data
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
        })
      },
      searchClick () {
        this.noDataLabel = '暂无数据'
        this.getData()
      },
      getData () {
        this.loading.list = true
        let params = {
          silkcarCode: this.search.silkNum
        }
        api.automatic.productionProcess.silkcarWaitCheckList(params).then((response) => {
          const data = response.data
          console.log(data)
          if (data.messageType === 1) {
            for (let item of data.data.spindles) {
              item.spindleLevel = ''
              item.spindleLevelName = ''
            }
            this.tableData = [data.data]
            console.log(this.tableData)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.list = false
        })
      },
      silkClick (item, type) {
        this.$refs.dialog.show(item, type)
      },
      submitClick (item) {
        console.log(item)
        let silkCodes = []
        for (let item2 of item.spindles) {
          if (item2.spindleLevel) {
            silkCodes.push({silkCode: item2.silkCode, gradeId: item2.spindleLevel})
          }
        }
        this.loading.submit = true
        let params = {
          silkcarCode: item.silkcarCode,
          silks: silkCodes,
          productionProcessId: this.workTypeDetail.productionProcessId,
          employeeId: storage.getUser().employeeId
        }
        console.log(params)
        api.automatic.other.checkSilkAbnormal(params).then((response) => {
          const data = response.data
          if (data.messageType === 1) {
            console.log(data)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.submit = false
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .all-wrapper{
    margin: 10px;
    background-color: #fff;
    border-radius: 2px;
  }
  .no-data{
    height: 100px;
    line-height: 100px;
    color: #666;
  }
  .font-bold{
    font-weight: bold;
  }
  .action-bar{
    padding-bottom: 10px;
    .el-input{
      width: 240px;
      display: inline-block;
      margin-right: 10px;
    }
    .el-select, .el-date-editor{
      width: 160px;
      margin-right: 10px;
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
  }
  .submit-box{
    flex: 8;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
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
  .line1-item3{
    flex: 2;
  }
  .line1-item4{
    flex: 14;
  }
</style>
