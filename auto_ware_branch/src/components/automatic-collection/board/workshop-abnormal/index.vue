<!--车间异常看板-->
<template>
  <div class="content">
    <div class="all-wrapper1">
      <el-form :model="search" ref="form" :rules="rules" :inline="true">
        <el-form-item prop="workshopId">
          <el-select v-model="search.workshopId" @change="changeWorkshop" placeholder="请选择车间"
                     class="margin-contral-picker" clearable>
            <el-option v-for="item in option.workshopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="lineId">
          <el-select v-model="search.lineId" placeholder="请选择线别" class="margin-contral-picker" clearable>
            <el-option v-for="item in option.lineList" :key="item.id" :label="item.line" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchclick" style="width: 9rem">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="showClick">显示看板</el-button>
        </el-form-item>
        <el-form-item>
          <el-input type="textarea" style="width: 210px; vertical-align: top;" :autosize="{ minRows: 1.3}" placeholder="请输入通知内容"
                    v-model="search.notice"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveNotice">保存通知</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="board-content " id="boardContent" ref="boardContent">
      <div class="title-box">
        <ul>
          <li><img class="logo" src="../../../../../static/img/logo.png" alt=""></li>
          <li><div>车间异常看板</div></li>
          <li>
            <div class="date-box">
              <span id="currTime">2017-12-07</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="content-box">
        <div class="right-box">
          <table border="1" class="right-table">
            <thead>
              <tr>
                <th>纺位</th><th>落次</th><th>锭号</th><th>等级</th><th>异常</th><th>状态</th><th>处理人</th><th>时间</th>
              </tr>
            </thead>
            <tbody  id="excepTbody">
              <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
              </tr>
              <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
              </tr>
              <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
              </tr>
              <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
              </tr>
              <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
              </tr>
              <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
              </tr>
              <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
              </tr>
              <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
              </tr>
              <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
              </tr>
              <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
              </tr>
            </tbody>
          </table>
          <ul class="page-box" id="pageUL">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
          </ul>
        </div>
        <div class="left-box">
          <table border="1" class="left-table">
            <thead>
              <tr>
                <th colspan="4">生产计划</th>
              </tr>
              <tr>
                <th>纺位</th>
                <th>批号</th>
                <th>规格</th>
                <th>管色</th>
              </tr>
            </thead>
            <tbody id="planTbody">
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="left-box">
          <table border="1" class="left-table notice-table">
            <tr>
              <th>通知</th>
            </tr>
            <tr>
              <td>
                <span>各位同仁们：</span>
                <p id="pNotice" ref="pNotice"></p>
                <label class="currDate" id="pNoticeDate"></label>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as api from 'src/api'
  import {boardConfig} from 'value-label'
  export default {
    components: {},
    data () {
      return {
        option: { workshopList: [], lineList: [] },
        search: { lineId: '', workshopId: '', notice: '' },
        abnormalPage: {pageIndex: 1, pageCount: 10, workshopId: '', line: ''},
        planPage: {pageIndex: 1, pageCount: 3, workshopId: '', lineId: ''},
        loading: { search: false },
        timeinter: null,
        boardConfig: {},
        interval: { requestInterval: 5 },
        rules: {
          workshopId: [{ required: true, message: '请选择车间', trigger: 'change blur' }],
          lineId: [{ required: true, message: '请选择线别', trigger: 'change blur' }]
        }
      }
    },
    mounted () {
      this.boardConfig = boardConfig
      this.getWorkshopList()
      let docElm = this.$refs.boardContent
      if (docElm.requestFullscreen) {
        docElm.addEventListener('fullscreenchange', () => {
          if (!document.fullscreen) {
            clearInterval(this.timeinter)
          }
        }, false)
      } else if (docElm.webkitRequestFullScreen) {
        docElm.addEventListener('webkitfullscreenchange', () => {
          if (!document.webkitIsFullScreen) {
            clearInterval(this.timeinter)
          }
        }, false)
      }
    },
    deactivated () {
      clearInterval(this.timeinter)
    },
    methods: {
      showClick () {
        this.$refs.form.validate(valid => {
          if (valid) {
            let docElm = $('#boardContent')[0]
            if (docElm.requestFullscreen) {
              docElm.requestFullscreen()
            } else if (docElm.webkitRequestFullScreen) {
              docElm.webkitRequestFullScreen()
            }
            let params = { groupId: this.boardConfig.workshopAbnormal.groupId }
            api.automatic.statement.getBoardConfig(params).then(response => {
              const data = response.data
              if (data.messageType === 1) {
                const list = data.data[0].list
                if (Array.isArray(list) && list.length > 0) {
                  this.interval.requestInterval = parseInt(list[0].requestInterval)
                  clearInterval(this.timeinter)
                  this.timeinter = setInterval(this.getData, this.interval.requestInterval * 1000)
                }
              } else {
                this.$message({type: 'error', message: data.message})
              }
            }).catch(e => {
              console.log(e)
            })
          }
        })
      },
      getData () {
        this.getNotice()
        this.getException()
        this.getPaln()
      },
      getWorkshopList () {
        api.automatic.dictionary.getAllWorkshopList({}).then(response => {
          this.option.workshopList = response.data.data
        })
      },
      changeWorkshop () {
        if (!this.search.workshopId) {
          this.option.lineList = []
          return
        }
        let params = {workShopId: this.search.workshopId}
        api.automatic.productPlan.getAllLine(params).then(response => {
          this.option.lineList = response.data.data
        })
      },
      searchclick () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.getData()
          }
        })
      },
      saveNotice () {
        if (!this.search.workshopId) {
          this.$message({type: 'error', message: '请选择车间'})
          return
        }
        if (!this.search.notice) {
          this.$message({type: 'error', message: '请填写通知'})
          return
        }
        let params = {
          workshopId: this.search.workshopId,
          lineId: this.search.lineId,
          notice: this.search.notice
        }
        $.ajax({
          type: 'POST',
          url: window.global.ajaxAutomatictBaseUrl + 'api/automaticintegration/board/setNotice',
          data: JSON.stringify(params),
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          success: (response) => {
            const data = response
            if (data.messageType === 1) {
              this.$message({type: 'success', message: data.message})
            } else {
              this.$message({type: 'error', message: data.message})
            }
          },
          error: function (xhr, status, error) {
            xhr = null
            console.log(error)
          },
          complete: function (xhr) {
            xhr = null
          }
        })
      },
      getNotice () {
        let param = {
          workshopId: this.search.workshopId,
          lineId: this.search.lineId
        }
        $.ajax({
          type: 'POST',
          url: window.global.ajaxAutomatictBaseUrl + 'api/automaticintegration/board/getNotice',
          data: JSON.stringify(param),
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          success: function (response) {
            if (response.data) {
              let data = response.data
              if (data.length > 0) {
                let endIndex = data.length - 10
                $('#pNotice').html(data.substring(0, endIndex))
                $('#pNoticeDate').html(data.substr(-10))
              }
            }
          },
          error: function (xhr, status, error) {
            xhr = null
            console.log(error)
          },
          complete: function (xhr) {
            xhr = null
          }
        })
      },
      getException () {
        this.abnormalPage.line = this.search.lineId
        this.abnormalPage.workshopId = this.search.workshopId
        $.ajax({
          type: 'POST',
          url: window.global.ajaxAutomatictBaseUrl + 'api/automaticintegration/board/exceptionBoard',
          data: JSON.stringify(this.abnormalPage),
          contentType: 'application/json; charset=utf-8',
          success: (response) => {
            response = JSON.parse(response)
            $('.currDate').text(response.data.systemDate)
            const excep = response.data
            /* ----------------------渲染页面--------------------------- */
            // 分页显示
            this.abnormalPage.pageIndex = (this.abnormalPage.pageIndex + 1) > excep.pageSize ? 1 : (this.abnormalPage.pageIndex + 1)
            // 加载页面
            let tr = {}
            let unspilled = false
            for (let j = 0; j < this.abnormalPage.pageCount; j++) {
              tr = $('#excepTbody tr')[j]
              unspilled = j < excep.list.length
              $(tr).find('td:eq(0)').html(unspilled ? excep.list[j].item : '&nbsp;')
              $(tr).find('td:eq(1)').html(unspilled ? excep.list[j].fall : '&nbsp;')
              $(tr).find('td:eq(2)').html(unspilled ? this.getSpindle(excep.list[j].spindle) : '&nbsp;')
              $(tr).find('td:eq(3)').html(unspilled ? this.getColor(excep.list[j].grade) : '&nbsp;')
              $(tr).find('td:eq(4)').html(unspilled ? this.getAbnormal(excep.list[j]) : '&nbsp;')
              $(tr).find('td:eq(5)').html(unspilled ? excep.list[j].status + '次' : '&nbsp;')
              $(tr).find('td:eq(6)').html(unspilled ? excep.list[j].handleEmployeeName : '&nbsp;')
              $(tr).find('td:eq(7)').html(unspilled ? excep.list[j].handleTime.substr(0, 10) : '&nbsp;')
            }
            let numberCount = 5
            let min = Math.floor((excep.pageIndex - 1) / numberCount) * numberCount + 1
            let max = excep.pageSize < (min + numberCount) ? excep.pageSize : (min + numberCount - 1)
            let li = {}
            for (let k = min; k <= max; k++) {
              li = $(`#pageUL>li:eq(${k})`)
              $(li).html(k.toString())
              if (k === excep.pageIndex) {
                $(li).addClass('current')
              } else {
                $(li).removeClass('current')
              }
            }
          },
          error: function (xhr, status, error) {
            xhr = null
            console.log(error)
          },
          complete: function (xhr) {
            xhr = null
          }
        })
      },
      getPaln () {
        this.planPage.lineId = this.search.lineId
        this.planPage.workshopId = this.search.workshopId
        $.ajax({
          type: 'POST',
          url: window.global.ajaxAutomatictBaseUrl + '/api/automaticintegration/board/getProductPlanBoard',
          data: JSON.stringify(this.planPage),
          contentType: 'application/json; charset=utf-8',
          success: (response) => {
            response = JSON.parse(response)
            if (response.data.pageVo) {
              const plan = response.data.pageVo
              /* ----------------------渲染页面--------------------------- */
              this.planPage.pageIndex = (this.planPage.pageIndex + 1) > plan.pageSize ? 1 : (this.planPage.pageIndex + 1)
              // 加载页面
              let tr = {}
              let unspilled = false
              for (let i = 0; i < this.planPage.pageCount; i++) {
                tr = $(`#planTbody tr:eq(${i})`)
                unspilled = i < plan.list.length
                $(tr).find('td:eq(0)').html(unspilled ? `${plan.list[i].itemStart}-${plan.list[i].itemEnd}` : '&nbsp;')
                $(tr).find('td:eq(1)').html(unspilled ? plan.list[i].batch : '&nbsp;')
                $(tr).find('td:eq(2)').html(unspilled ? `${plan.list[i].centralValue}/${plan.list[i].holeNum}` : '&nbsp;')
                $(tr).find('td:eq(3)').html(unspilled ? plan.list[i].paperTube : '&nbsp;')
              }
            }
            if (response.meta.code === 400058) {
              clearInterval(this.timeinter)
            }
          },
          error: function (xhr, status, error) {
            console.log(error)
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
  .right-box {
    float: right;
    margin-top: .8em;
    width: 58%;
    margin-left: 1%;
  }
  .left-box {
    float: left;
    width: 40%;
    margin-top: .8em;
  }
  .content-box table {
    width: 100%;
    margin-top: 1rem;
    border-color: #1d9a9a;
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
  .page-box {
    text-align: center;
    margin: .6em 0;
    list-style: none;
    padding: 0;
  }
  .page-box li {
    display: inline-block;
    width: 1.6em;
    height: 1.6em;
    line-height: 1.6em;
    border-radius: 50%;
    border: .1em solid #5ac2d8;
    margin-right: .6em;
  }
  .page-box li {
    display: inline-block;
    width: 4rem;
    height:4rem;
    line-height: 4rem;
    border-radius: 50%;
    border: .1rem solid #5ac2d8;
    margin-right: .6em;
    font-size: medium;
    font-weight: bold;
  }
  .page-box li.current {
    color: #000;
    background-color: #5ac2d8;
  }
  table.notice-table tr td {
    text-align: left;
  }
  table.notice-table label {
    float: right;
  }
</style>
