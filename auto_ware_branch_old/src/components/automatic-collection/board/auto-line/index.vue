<template>
  <div class="content">
    <div class="all-wrapper1">
      <el-form :inline="true">
        <el-form-item>
          <el-select v-model="search.workshop" @change="changeWorkshop" placeholder="请选择车间"
                     class="margin-contral-picker" clearable>
            <el-option v-for="item in option.workshopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="search.line" placeholder="请选择线别" class="margin-contral-picker width1" multiple clearable>
            <el-option v-for="item in option.lineList" :key="item.id" :label="item.line" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchClick" style="width: 9rem">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="showClick" style="width: 9rem">显示看板</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="board-content" id="boardContent" ref="boardContent">
      <div class="title-box">
        <ul>
          <li><img class="logo" src="../../../../../static/img/logo.png" alt=""></li>
          <li><div>自动包装线管理看板</div></li>
          <li>
            <div class="date-box">
              <span id="currTime">2017-12-07</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="content-box">
        <ul>
          <li>丝车数量：<span>0</span>辆</li>
          <li>待包装量：<span>0</span>辆</li>
        </ul>
        <div class="flex-div" id="margin">
          <table border="1" class="main-table">
            <thead>
            <tr>
              <th>批号</th>
              <th>待包装量</th>
            </tr>
            </thead>
            <tbody>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            </tbody>
          </table>
          <table border="1" class="main-table">
            <thead>
              <tr>
                <th>批号</th>
                <th>待包装量</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            </tbody>
          </table>
          <table border="1" class="main-table">
            <thead>
              <tr>
                <th>批号</th>
                <th>待包装量</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>

        <table border="1" class="bottom-table main-table" id="bottom-table">
          <thead>
            <tr>
              <th>丝车号</th>
              <th>批号</th>
              <th>是否推入</th>
              <th>管色</th>
              <th>不能推入原因</th>
              <th>当前丝锭数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import * as api from 'src/api'
  export default {
    components: {},
    data () {
      return {
        option: { workshopList: [], lineList: [] },
        search: {
          line: [],
          workshop: ''
        },
        listData: [],
        loading: {
          workshop: false,
          line: false,
          table: false
        },
        timeinter: null
      }
    },
    mounted () {
      this.getWorkshopList()
      $('#currTime').text(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate())
    },
    deactivated () {
      clearInterval(this.timeinter)
    },
    methods: {
      showClick () {
        let docElm = this.$refs.boardContent
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen()
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen()
        }
        if (this.search.workshop && this.search.line.length > 0) {
          this.timeinter = setInterval(this.getData, 5000)
        }
      },
      getWorkshopList () {
        api.automatic.dictionary.getAllWorkshopList({}).then(response => {
          this.option.workshopList = response.data.data
        })
      },
      changeWorkshop (val) {
        if (!val) {
          this.option.lineList = []
          return
        }
        let params = {workShopId: val}
        api.automatic.productPlan.getAllLine(params).then(response => {
          this.option.lineList = response.data.data
        })
      },
      searchClick () {
        if (!this.search.workshop) {
          this.$message({type: 'error', message: '请选择车间'})
          return
        }
        if (this.search.line.length === 0) {
          this.$message({type: 'error', message: '请选择线别'})
          return
        }
        this.getData()
      },
      getData () {
        let paramIds = this.search.line.join(',')
        let params = {lineIds: paramIds}
        params = JSON.stringify(params)
        $.ajax({
          type: 'POST',
          url: window.global.ajaxAutomatictBaseUrl + 'api/automaticintegration/board/getAutomaticPackeBoard',
          data: params,
          contentType: 'application/json; charset=utf-8',
          success: function (response) {
            let data = JSON.parse(response)
            data = data.data
            $('#currTime').text(data.systemDate)
            $('.content-box>ul>li:eq(0)>span').html(data.silkcarTotalNum)
            $('.content-box>ul>li:eq(1)>span').html(data.packingSilkcarNum)
            let tr = {}
            for (let i = 0; i < 9; i++) {
              tr = $(`.flex-div>table tbody tr:eq(${i})`)
              $(tr).find('td:eq(0)').html(i < data.automaticBoardBoList.length ? data.automaticBoardBoList[i].batchNo : '&nbsp;')
              $(tr).find('td:eq(1)').html(i < data.automaticBoardBoList.length ? data.automaticBoardBoList[i].packingSilkcarNum : '&nbsp;')
            }
            if (data.automaticPackeBoardVoList.length > 0) {
              tr = $('#bottom-table>tbody>tr:eq(0)')
              $(tr).find('td:eq(0)').html(data.automaticPackeBoardVoList[0].silkcarCode)
              $(tr).find('td:eq(1)').html(data.automaticPackeBoardVoList[0].batchNo)
              $(tr).find('td:eq(2)').html(data.automaticPackeBoardVoList[0].automaticPackeFlage)
              $(tr).find('td:eq(3)').html(data.automaticPackeBoardVoList[0].paperTube)
              $(tr).find('td:eq(4)').html(data.automaticPackeBoardVoList[0].reason)
              $(tr).find('td:eq(5)').html(data.automaticPackeBoardVoList[0].unPackeNum)
            }
          },
          error: function (a, b, c) {
            console.log(a, b, c)
          },
          complete: function (xhr) {
            xhr = null
          }
        })
      }
    }
  }
</script>

<style scoped lang="css">
  .board-content {
    padding: 0.5rem 0.5rem;
    color: #fff;
    width: 100%;
    height: 100%;
    background: url("../../../../../static/img/background.jpg") center no-repeat;
    background-size: cover;
    overflow-y: auto;
  }
  .title-box {
    display: block;
    height: 8%;
  }
  .title-box ul li {
    width: 33.33%;
    float: left;
    height: 8rem;
    line-height: 8rem;
  }
  .title-box ul li:nth-child(2) > div {
    text-align: center;
    font-size: 5rem;
  }
  .title-box ul li:nth-child(3) > div {
    float: right;
    font-size: 3rem;
    border: .05rem solid #2c647c;
    padding: 0 1rem;
    height: 6rem;
    line-height: 6rem;
  }
  .content-box {
    margin: 1rem;
  }
  .content-box > ul {
    list-style: none;
    display: inline-block;
    border: .1em solid #2c647c;
    width: 99%;
    padding: 0;
    margin: 1rem;
  }
  .content-box > ul > li {
    float: left;
    width: 50%;
    text-align: center;
    font-size: 2.5rem;
    height: 4rem;
    line-height: 4rem;
    margin: 1rem auto;
  }
  .content-box > ul > li:first-child {
    border-right: 1px dashed #406161;
  }
  .content-box table {
    margin-top: 1rem;
    border-color: #1d9a9a;
    table-layout: fixed;
  }
  .flex-div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .flex-div > table {
    width: 33.3%;
    margin: 1rem;
  }
  .main-table {
    margin: 1rem 1rem;
  }
  .content-box table tr {
    height: 5rem;
    line-height: 5rem;
  }
  .content-box table tr:nth-child(odd) {
    background-color: rgba(6, 19, 31, 0.6);
  }
  .content-box table tr th, .content-box table tr td {
    text-align: center;
    font-size: 3rem;
  }
  .content-box table tr th {
    background-color: rgba(6, 19, 31, 0.6);
    font-weight: 700;
    color: #51ffff;
  }
  .bottom-table {
    width: 99%;
  }
  .width1 {
    width: 25rem;
  }
</style>
