<!--物检操作-->
<template>
  <div class="hy-admin__main-container all-wrapper">
    <div class="action-bar">
      <el-input v-model="search.silkNum" placeholder="请输入丝车号"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchClick"></el-button>
    </div>
    <div class="main-wrappper">
      <ul v-loading="loading.list">
        <li v-if="!tableData.length" class="tc no-data">{{noDataLabel}}</li>
        <li class="list-item" v-for="item in tableData">
          <div class="text">
            <div class="fixation">
              <h4>{{item.batchNo}}</h4>
              <p class="fixation-box">
                <span class="note">车间：</span>{{item.workshopName}}
                <span class="space">|</span>
                <span class="note">线别：</span>{{item.lineName}}
                <span class="space">|</span>
                <span class="note">规格：</span>{{item.spec}}
                <span class="space">|</span>
                <span class="note">落次：</span>{{item.fallNo}}
                <span class="space">|</span>
                <span class="note">纺位：</span>{{item.item}}
                <span class="space" v-if="item.remark">|</span>
              </p>
              <p class="fixation-box">
                <span class="note" v-if="item.remark">备注：</span>{{item.remark}}
              </p>
            </div>

            <div class="inner">
              <p class="tc"><span class="note">丝车编号</span></p>
              <p class="tc"><span>{{item.silkcarCode}}</span></p>
            </div>

            <div class="btn-box tr">
              <el-button size="small" type="primary" @click="checkClick(item)">备注录入</el-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <dialog-remark ref="dialog" @submitSuccess="getData"></dialog-remark>
  </div>
</template>
<script>
  import * as api from 'src/api/index'
  export default {
    components: {
      'dialog-remark': require('./dialog.vue')
    },
    data () {
      return {
        noDataLabel: '请输入丝车号查询',
        search: {
          silkNum: ''
        },
        tableData: [],
        loading: {
          list: false
        }
      }
    },
    mounted () {
//      this.getData()
    },
    methods: {
      checkClick (item) {
        this.$refs.dialog.show(item)
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
        api.automatic.productionProcess.silkcarWait(params).then((response) => {
          const data = response.data
          console.log(data)
          if (data.messageType === 1) {
            this.tableData = [data.data]
            console.log(this.tableData)
          }
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.loading.list = false
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
  .printing-bar{
    padding-left: 10px;
    .el-button{
      margin-left: 10px;
    }
  }
  .main-wrappper{
    border: 1px solid #efefef;
    border-radius: 4px;
    padding: 10px;
  }
  .list-item {
    padding: 20px 10px 10px 10px;
    border-bottom: 1px dashed #dee4ec;
    .btn-box {
      width: 80px;
    }
    .text {
      display: flex
    }
    .fixation {
      flex: 0 0 400px;
    }
    .check-wrapper {
      flex: 0 0 36px;
      align-items: center;
      display: flex;
    }
    .fixation-box {
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: normal;
      white-space: nowrap;
      width: 600px;
    }
    .fixation-jz{
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: normal;
      white-space: nowrap;
      min-width: 100px;
    }
    .time {min-width: 185px}
    .inner {
      flex: 1;
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
      margin-right: 5px;
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
    .notebg{
      color: #99a9bf;
      font-size: 18px;
    }
    .font1 {
      font-size: 16px;
      color: #000;
    }
  }
</style>
